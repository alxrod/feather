import ChatService from "../services/chat.service";

import {authChecker} from "../services/user.service";
import {AUTH_FAILED} from "./user.reducer";

export const CHAT_JOIN = "chat/room/JOIN"
export const CHAT_LEAVE = "chat/room/LEAVE"
export const CHAT_MESSAGE_ATTEMPT_SEND = "chat/message/ATTEMPT_SEND"
export const CHAT_MESSAGE_SUCCESS_SEND = "chat/message/SUCCESS_SEND"
export const CHAT_MESSAGE_FAIL_SEND = "chat/message/FAIL_SEND"

export const CHAT_MESSAGE_HISTORY_PULLED = "chat/history/PULLED_MESSAGES"
export const CHAT_CLEAR_ROOM = "chat/room/CLEAR"

export const CHAT_MESSAGE_RECEIVE = "chat/message/RECEIVE"
export const CHAT_MESSAGE_UPDATE = "chat/message/UPDATE"
export const CHAT_CLEAR_RELOAD = "chat/message/CLEAR_RELOAD"

export const sendStates = {PENDING: 0, SUCCESS: 1, FAIL: 2, INACTIVE: 3}

const initialState = {
    roomId: "",
    isActive: false,
    messages: [],
    sending: sendStates.INACTIVE,
    
    reloadMsg: false,
    reloadIdx: 0,
}

export default (state = initialState, action) => {
    switch (action.type) {

        case CHAT_MESSAGE_HISTORY_PULLED:
            console.log("FINISHED HISTORY PULL:")
            console.log(action.payload)
            return {
                ...state,
                messages: action.payload
            }
        case CHAT_CLEAR_ROOM:
            return {
                ...state,
                roomId: "",
                isActive: false,
                messages: [],
                sending: sendStates.INACTIVE 
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
            console.log("NEW: Receiving message...")
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }

        case CHAT_MESSAGE_UPDATE:
            const [newMessage, idx] = editMessageState(state.messages, action.payload) 
            if (idx === -1) {
                return { ...state }
            }
            return {
                ...state,
                messages: state.messages.map(
                    (msg, i) => i === idx ? newMessage : msg
                ),
                reloadMsg: true,
                reloadIdx: idx,
            }
        case CHAT_CLEAR_RELOAD:
            return {
                ...state,
                reloadMsg: false,
                reloadIdx: -1,
            }

        default:
            return state
    }

}
const editMessageState = (msgs, info) => {
    let msg = {};
    let i = -1;
    for (i = 0; i < msgs.length; i++) {
        if (msgs[i].id === info.msgId) {
            msg = msgs[i]

            msg.body.buyerStatus = info.buyerStatus
            msg.body.workerStatus = info.workerStatus
            msg.body.resolStatus = info.resolStatus
            msg.body.resolved = info.resolved
            break
        }
    }
    return [msg, i];
}

export const joinChat = (room_id, role) => {
    return dispatch => {
        return authChecker(true).then(creds => {
            if (creds === undefined) {
                dispatch({ type: AUTH_FAILED})
                return Promise.reject("You must be logged in")
            }
            return Promise.resolve(creds)
        }).then((creds) => {
            return ChatService.joinChat(creds.access_token, creds.user_id, room_id, dispatch, role).then(
                () => {
                    dispatch({
                        type: CHAT_JOIN,
                        payload: {roomId: room_id},
                    });
                    return Promise.resolve();
                }
            );
        });
    }
};

export const clearChat = () => {
    return dispatch => {
        dispatch({
            type: CHAT_CLEAR_ROOM,
        });
    }
};
export const finishedReload = () => {
    return dispatch => {
        dispatch({
            type: CHAT_CLEAR_RELOAD,
        })
    }
}
export const sendMessage = (room_id, message, label) => {
    console.log("Sending " + message + " to " + room_id);
    return dispatch => {
        return authChecker(true).then(creds => {
            if (creds === undefined) {
                dispatch({ type: AUTH_FAILED})
                return Promise.reject("You must be logged in")
            }
            dispatch({
                type: CHAT_MESSAGE_ATTEMPT_SEND,
            });
            return Promise.resolve(creds)
        }).then((creds) => {
            return ChatService.sendMessage(creds.access_token, creds.user_id, room_id, message, label).then(
                () => {
                    dispatch({
                        type: CHAT_MESSAGE_SUCCESS_SEND,
                    });
                    return Promise.resolve();
                },
                () => {
                    dispatch({
                        type: CHAT_MESSAGE_FAIL_SEND,
                    });
                    return Promise.reject();
                }
            );
        });
    }
};

export const pullRecord = (room_id) => {
    console.log("Puling messages for " + room_id);
    return dispatch => {
        return authChecker(true).then(creds => {
            if (creds === undefined) {
                dispatch({ type: AUTH_FAILED})
                return Promise.reject("You must be logged in")
            }
            return Promise.resolve(creds)
        }).then((creds) => {
            return ChatService.pullRecord(creds.access_token, room_id).then(
                (data) => {

                    dispatch({
                        type: CHAT_MESSAGE_HISTORY_PULLED,
                        payload: data
                    });
                    // console.log("Successfully pulled messages")
                    return Promise.resolve();
                },
                (error) => {
                    // console.log("Failed to pull messages")
                    authChecker(error, dispatch);
                    return Promise.reject(error);
                }
            );
        })
    }
};
