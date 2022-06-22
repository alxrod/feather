import { ChatClient } from "../proto/communication/chat_grpc_web_pb";
import { 
    ChatMessage,
    UserJoin,
    UserLeave,
    SendRequest,
    
    ChatPullRequest,

} from "../proto/communication/chat_pb";
// import {WORKER_TYPE, BUYER_TYPE} from "./user.service"
// var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
export const CHAT_MESSAGE_RECEIVE = "chat/message/RECEIVE"

export const chatClient = new ChatClient("https://localhost:8080");

// export const testStream = () => {
//     let testReq = new TestRequest();
//     let stream = chatClient.testStream(testReq, {})
//     stream.on('data', function (response) {
//         console.log("Data:")
//         console.log(response.toObject())
//     })
//     stream.on('status', function(status) {
//         console.log(status.code);
//         console.log(status.details);
//         console.log(status.metadata);
//     });
// }
class ChatService {

    joinChat(token, user_id, room_id, dispatch) {
        let joinRequest = new UserJoin();
        joinRequest.setUserId(user_id);
        joinRequest.setRoomId(room_id);
        
        let metadata = {"authorization": token}

        let stream = chatClient.joinChat(joinRequest, metadata)

        stream.on('data', function (response) {
            const msg = response.toObject()
            // console.log("Received message: ")
            // console.log(msg)
            dispatch({
                type: CHAT_MESSAGE_RECEIVE,
                payload: msg,
            })
        })
        stream.on('status', function(status) {
            console.log(status.code);
            console.log(status.details);
            console.log(status.metadata);
        });
        stream.on('end', function(end) {
            console.log("Stream ended")
            console.log(end)
        });

        return Promise.resolve();
    }

    pullRecord(token, room_id) {
        let pullRequest = new ChatPullRequest();
        pullRequest.setRoomId(room_id);

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            chatClient.pullChatHistory(pullRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                } else {
                    console.log("message pull history success")
                    var resp = response.toObject();
                    console.log(resp)
                    resolve(resp.messagesList)
                }
            });
        });

    }

    sendMessage(token, user_id, room_id, text) {
        let sendRequest = new SendRequest();
        sendRequest.setUserId(user_id);
        sendRequest.setRoomId(room_id);
        sendRequest.setMessage(text);

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            
            chatClient.sendMessage(sendRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                } else {
                    resolve(response.toObject())
                }
            });
        });

    }
}
export default new ChatService();