import * as actions from "./chat.actions";
import * as helpers from "./chat.helpers";

export const sendStates = {PENDING: 0, SUCCESS: 1, FAIL: 2, INACTIVE: 3}

const initialState = {
    roomId: "",
    isActive: false,
    messages: [],
    messagesChanged: false,
    sending: sendStates.INACTIVE,
    
    reloadMsg: false,
    reloadIdx: 0,
}

export default (state = initialState, action) => {
    switch (action.type) {

        case actions.CHAT_MESSAGE_HISTORY_PULLED:
            return {
                ...state,
                messagesChanged: !state.messagesChanged,
                messages: action.payload
            }
        case actions.CHAT_CLEAR_ROOM:
            return {
                ...state,
                roomId: "",
                isActive: false,
                messages: [],
                messagesChanged: !state.messagesChanged,
                sending: sendStates.INACTIVE 
            }
        case actions.CHAT_JOIN:
            return {
                ...state,
                roomId: action.payload.roomId,
                isActive: true,
                messages: [],
                messagesChanged: !state.messagesChanged,
            }
        case actions.CHAT_LEAVE:
            return {
                ...state,
                roomId: "",
                isActive: false,
                messages: [],
                messagesChanged: !state.messagesChanged,
            }

        case actions.CHAT_MESSAGE_ATTEMPT_SEND:
            return {
                ...state,
                sending: sendStates.PENDING,
            }
        case actions.CHAT_MESSAGE_SUCCESS_SEND:
            return {
                ...state,
                sending: sendStates.SUCCESS,
            }
        case actions.CHAT_MESSAGE_FAIL_SEND:
            return {
                ...state,
                sending: sendStates.FAIL,
            }

        case actions.CHAT_MESSAGE_RECEIVE:
            return {
                ...state,
                messages: [...state.messages, action.payload],
                messagesChanged: !state.messagesChanged,
            }

        case actions.CHAT_MESSAGE_UPDATE:
            const [newMessage, idx] = helpers.editMessageState(state.messages, action.payload) 
            if (idx === -1) {
                return { ...state }
            }
            return {
                ...state,
                messages: state.messages.map(
                    (msg, i) => i === idx ? newMessage : msg
                ),
                messagesChanged: !state.messagesChanged,
                reloadMsg: true,
                reloadIdx: idx,
            }
        case actions.CHAT_CLEAR_RELOAD:
            return {
                ...state,
                reloadMsg: false,
                reloadIdx: -1,
            }

        default:
            return state
    }

}