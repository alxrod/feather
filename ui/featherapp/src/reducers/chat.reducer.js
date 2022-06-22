import ChatService, {CHAT_MESSAGE_RECEIVE} from "../services/chat.service";

export const CHAT_JOIN = "chat/room/JOIN"
export const CHAT_LEAVE = "chat/room/LEAVE"

export const CHAT_MESSAGE_ATTEMPT_SEND = "chat/message/ATTEMPT_SEND"
export const CHAT_MESSAGE_SUCCESS_SEND = "chat/message/SUCCESS_SEND"
export const CHAT_MESSAGE_FAIL_SEND = "chat/message/FAIL_SEND"

export const CHAT_MESSAGE_HISTORY_PULLED = "chat/history/PULLED_MESSAGES"

export const sendStates = {PENDING: 0, SUCCESS: 1, FAIL: 2, INACTIVE: 3}

const initialState = {
    roomId: "",
    isActive: "",
    messages: [],
    sending: sendStates.INACTIVE 
}

export default (state = initialState, action) => {
    switch (action.type) {

        case CHAT_MESSAGE_HISTORY_PULLED:
            return {
                ...state,
                messages: action.payload
            }
        case CHAT_JOIN:
            return {
                ...state,
                roomId: action.payload.roomId,
                isActive: true,
                messages: []
            }
        case CHAT_LEAVE:
            return {
                ...state,
                roomId: "",
                isActive: false,
                messages: []
            }

        case CHAT_MESSAGE_ATTEMPT_SEND:
            return {
                ...state,
                sending: sendStates.PENDING,
            }
        case CHAT_MESSAGE_SUCCESS_SEND:
            return {
                ...state,
                sending: sendStates.SUCCESS,
            }
        case CHAT_MESSAGE_FAIL_SEND:
            return {
                ...state,
                sending: sendStates.FAIL,
            }

        case CHAT_MESSAGE_RECEIVE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        default:
            return state
    }

}

export const joinChat = (room_id) => {
    return dispatch => {
        const {token, id} = getTokenId()
        if (token === false) {
            return Promise.reject("You must be logged in")
        }

        return ChatService.joinChat(token, id, room_id, dispatch).then(
            () => {
                dispatch({
                    type: CHAT_JOIN,
                    payload: {roomId: room_id},
                });
                return Promise.resolve();
            }
        );
    }
};

export const sendMessage = (room_id, message) => {
    console.log("Sending " + message + " to " + room_id);
    return dispatch => {
        const {token, id} = getTokenId()
        if (token === false) {
            return Promise.reject("You must be logged in")
        }
        dispatch({
            type: CHAT_MESSAGE_ATTEMPT_SEND,
        });
        return ChatService.sendMessage(token, id, room_id, message).then(
            () => {
                dispatch({
                    type: CHAT_MESSAGE_SUCCESS_SEND,
                });
                // console.log("Successfully sent message")
                return Promise.resolve();
            },
            () => {
                dispatch({
                    type: CHAT_MESSAGE_FAIL_SEND,
                });
                // console.log("Failed to send message")
                return Promise.reject();
            }
        );
    }
};

export const pullRecord = (room_id) => {
    console.log("Puling messages for " + room_id);
    return dispatch => {
        const {token, id} = getTokenId()
        if (token === false) {
            return Promise.reject("You must be logged in")
        }
        return ChatService.pullRecord(token, room_id).then(
            (data) => {
                // console.log("Received data, contents:")
                // console.log(data)
                dispatch({
                    type: CHAT_MESSAGE_HISTORY_PULLED,
                    payload: data
                });
                // console.log("Successfully pulled messages")
                return Promise.resolve();
            },
            (error) => {
                // console.log("Failed to pull messages")
                return Promise.reject(error);
            }
        );
    }
};


const getTokenId = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    let token = ""
    let id = ""
    const err = false
    if (user !== null) {
        token = user.access_token
        id = user.user_id
    }
    if (token === "") {
        return {err, err}
    }
    return {token, id}
}
