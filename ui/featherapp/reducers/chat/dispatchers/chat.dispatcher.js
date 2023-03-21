import ChatService from "../../../services/chat.service";

import * as chatActions from "../chat.actions";
import * as helpers from "../../helpers";


export const joinChat = (room_id, role) => {
    return dispatch => {
        return helpers.authCheck().then(
            (creds) => {
                return ChatService.joinChat(creds.access_token, creds.user_id, room_id, dispatch, role).then(
                    () => {
                        dispatch({
                            type: chatActions.CHAT_JOIN,
                            payload: {roomId: room_id},
                        });
                        return Promise.resolve();
                    }
                );
            },
            (error) => {
                return Promise.reject(error.message);
            }
        );
    }
};

export const clearChat = (room_id) => {
    return dispatch => {
        return helpers.authCheck().then(
            (creds) => {
                return ChatService.leaveChat(creds.access_token, creds.user_id, room_id).then(
                    () => {
                        dispatch({
                            type: chatActions.CHAT_CLEAR_ROOM,
                        });
                        return Promise.resolve();
                    }
                );
            },
            (error) => {
                return Promise.reject(error.message);
            }
        );

    }
};
export const finishedReload = () => {
    return dispatch => {
        dispatch({
            type: chatActions.CHAT_CLEAR_RELOAD,
        })
    }
}
export const sendMessage = (room_id, message, label) => {
    return dispatch => {
        return helpers.authCheck().then(
            (creds) => {
                return ChatService.sendMessage(creds.access_token, creds.user_id, room_id, message, label).then(
                    () => {
                        dispatch({
                            type: chatActions.CHAT_MESSAGE_SUCCESS_SEND,
                        });
                        return Promise.resolve();
                    },
                    () => {
                        dispatch({
                            type: chatActions.CHAT_MESSAGE_FAIL_SEND,
                        });
                        return Promise.reject();
                    }
                );
            },
            (error) => {
                return Promise.reject(error.message);
            }
        );
    }
};

export const pullRecord = (room_id) => {
    return dispatch => {
        return helpers.authCheck().then(
            (creds) => {
                return ChatService.pullRecord(creds.access_token, creds.user_id, room_id).then(
                    (data) => {
                        dispatch({
                            type: chatActions.CHAT_MESSAGE_HISTORY_PULLED,
                            payload: data
                        });
                        return Promise.resolve();
                    },
                    (error) => {
                        return Promise.reject(error);
                    }
                );
            },
            (error) => {
                return Promise.reject(error.message);
            }
        )
    }
};

export const pullNewMessages = () => {
    return dispatch => {
        return helpers.authCheck().then(
            (creds) => {
                return ChatService.pullNewMessages(creds.access_token, creds.user_id).then(
                    (data) => {
                        dispatch({
                            type: chatActions.CHAT_PULL_NEW_MESSAGES,
                            payload: data
                        });
                        return Promise.resolve();
                    },
                    (error) => {
                        return Promise.reject(error);
                    }
                );
            },
            (error) => {
                return Promise.reject(error.message);
            }
        )
    }
};
