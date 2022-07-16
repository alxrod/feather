package services

import (
	"errors"
	"fmt"
	"log"
	"sync"
	"time"

	"github.com/TwiN/go-color"
	db "github.com/alxrod/feather/backend/db"
	comms "github.com/alxrod/feather/communication"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ChatAgent struct {
	ActiveRooms map[primitive.ObjectID]*CacheEntry
	accessMu    sync.Mutex
}

// NOTE: the cache entry struct is a sync abstraction only meant for internal use
// In the agent, don't return it
type CacheEntry struct {
	room  *db.ChatRoom
	conns []*Connection
	mu    sync.Mutex
}

type Connection struct {
	Stream       comms.Chat_JoinChatServer
	Id           primitive.ObjectID
	Active       bool
	Err          chan error
	CreationTime time.Time
}

func (agent *ChatAgent) SetRoom(room_id primitive.ObjectID, database *mongo.Database) (*db.ChatRoom, error) {
	// log.Println("Setting a chat room")
	room, err := db.ChatRoomQueryId(room_id, database)
	if err != nil {
		return nil, err
	}
	agent.accessMu.Lock()
	log.Printf("Setting a chat room as id %s\n", room.Id.Hex())
	agent.ActiveRooms[room.Id] = &CacheEntry{room: room}
	agent.accessMu.Unlock()
	return room, err
}

func (agent *ChatAgent) GetRoom(room_id primitive.ObjectID) (*db.ChatRoom, error) {
	if entry, ok := agent.ActiveRooms[room_id]; ok {
		return entry.room, nil
	} else {
		return nil, errors.New("The room you asked for is not in the cache")
	}
}

func (agent *ChatAgent) UserJoin(room_id, user_id primitive.ObjectID, stream comms.Chat_JoinChatServer, database *mongo.Database) (*Connection, error) {
	log.Printf("User %s joing %s \n", user_id, room_id)
	entry, ok := agent.ActiveRooms[room_id]
	if !ok {
		_, err := agent.SetRoom(room_id, database)
		if err != nil {
			return nil, err
		}
		entry = agent.ActiveRooms[room_id]
	}
	entry.mu.Lock()
	err := entry.room.UserJoin(user_id, database)
	if err != nil {
		entry.mu.Unlock()
		return nil, err
	}
	conn := &Connection{
		Stream:       stream,
		Id:           user_id,
		Active:       true,
		Err:          make(chan error),
		CreationTime: time.Now().Local(),
	}
	entry.conns = append(entry.conns, conn)

	entry.mu.Unlock()
	return conn, nil
}

func (agent *ChatAgent) UserLeave(room_id, user_id primitive.ObjectID, database *mongo.Database) error {
	entry, ok := agent.ActiveRooms[room_id]
	if !ok {
		return errors.New("The room you are trying to leave is not active")
	}
	entry.mu.Lock()
	err := entry.room.UserLeave(user_id, database)
	if err != nil {
		entry.mu.Unlock()
		return err
	}
	remove_idx := -1
	for idx, conn := range entry.conns {
		if conn.Id == user_id {
			remove_idx = idx
		}
	}
	if remove_idx < 0 || remove_idx >= len(entry.conns) {
		entry.mu.Unlock()
		return errors.New("There is no connection for the corresponding user leaving")
	} else {
		entry.conns = append(entry.conns[:remove_idx], entry.conns[remove_idx+1:]...)
	}
	entry.mu.Unlock()
	return nil
}

func (agent *ChatAgent) SendMessage(req *comms.SendRequest, database *mongo.Database) error {
	room_id, err := primitive.ObjectIDFromHex(req.RoomId)
	if err != nil {
		return errors.New("Invalid Room Id")
	}
	entry, ok := agent.ActiveRooms[room_id]
	if !ok {
		log.Println(color.Ize(color.Red, fmt.Sprintf("The room %s is not active", room_id.Hex())))
		return errors.New("You must join the room before sending messages, this room is not active")
	}
	entry.mu.Lock()
	msg, err := entry.room.AddMessage(req, database)
	if err != nil {
		entry.mu.Unlock()
		return err
	}
	entry.mu.Unlock()

	user_id := msg.UserId
	proto := msg.Proto()
	err = agent.BroadcastMessage(room_id, user_id, proto)

	return err
}

func (agent *ChatAgent) SendMessageInternal(msg *db.Message, database *mongo.Database) error {
	room_id := msg.RoomId
	entry, ok := agent.ActiveRooms[room_id]
	if !ok {
		log.Println(color.Ize(color.Red, fmt.Sprintf("The room %s is not active", room_id.Hex())))
		return errors.New("You must join the room before sending messages, this room is not active")
	}
	entry.mu.Lock()
	msg, err := entry.room.AddMessageInternal(msg, database)
	if err != nil {
		entry.mu.Unlock()
		return err
	}
	entry.mu.Unlock()

	proto := msg.Proto()
	go func(
		agent *ChatAgent,
		room_id primitive.ObjectID,
		user_id primitive.ObjectID,
		proto *comms.ChatMessage) {

		agent.BroadcastMessage(room_id, user_id, proto)

	}(agent, room_id, msg.UserId, proto)

	return nil
}

type ConnLog struct {
	time  time.Time
	index int
}

func (agent *ChatAgent) BroadcastMessage(room_id, user_id primitive.ObjectID, msg *comms.ChatMessage) error {
	log.Println("Broadcasting")
	entry, ok := agent.ActiveRooms[room_id]
	if !ok {
		return errors.New("You can't broadcast to an inactive room")
	}
	wait := sync.WaitGroup{}
	done := make(chan int)
	removals := make([]int, 0)

	users := make(map[primitive.ObjectID]*ConnLog)

	for idx, conn := range entry.conns {
		clog, exists := users[conn.Id]
		if !exists {
			users[conn.Id] = &ConnLog{
				time:  conn.CreationTime,
				index: idx,
			}
		} else {
			if conn.Active {
				if conn.CreationTime.After(clog.time) {
					entry.conns[users[conn.Id].index].Active = false
					users[conn.Id] = &ConnLog{
						time:  conn.CreationTime,
						index: idx,
					}
				} else {
					conn.Active = false
				}
			}
		}
	}

	// for idx, conn := range entry.conns {
	// 	log.Println(fmt.Sprintf("Conn: %s for user id %s created at %s is %b", idx, conn.Id, conn.CreationTime, conn.Active))
	// }

	for idx, conn := range entry.conns {
		wait.Add(1)

		go func(msg *comms.ChatMessage, conn *Connection, idx int) {
			defer wait.Done()
			if conn.Active {
				err := conn.Stream.Send(msg)
				log.Println(color.Ize(color.Yellow, fmt.Sprintf("Sending message %v to user %v", msg.Id, conn.Id)))

				if err != nil {
					log.Println(color.Ize(color.Red, fmt.Sprintf("Error with stream %v. Error: %v", conn.Stream, err)))
					conn.Active = false
					conn.Err <- err
				}
			} else {
				removals = append(removals, idx)
			}
		}(msg, conn, idx)
	}

	go func() {
		wait.Wait()

		newConns := make([]*Connection, 0)
		for idx, remainingConn := range entry.conns {
			found := false
			for removal := range removals {
				if idx == removal {
					found = true
				}
			}
			if !found {
				newConns = append(newConns, remainingConn)
			}
		}
		entry.conns = newConns
		log.Printf("After broadcasting we have %d connections in this room", len(entry.conns))
		close(done)
	}()

	<-done
	return nil
}
