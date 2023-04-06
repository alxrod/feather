import { ChatClient } from "../proto/communication/chat_grpc_web_pb";
import { 
    UserJoin,
    UserLeave,
    SendRequest,
    
    CommentMsgBody,

    ChatPullRequest,
    NewMessagesRequest,

} from "../proto/communication/chat_pb";

import { 
    DOCUMENT_FIGMA_LINK_CHANGE
} from "../reducers/document/document.actions"

import { 
    DEADLINE_UPDATE_DATE,
    DEADLINE_ADD,
    DEADLINE_REPLACE,
    DEADLINE_DELETE,

} from "../reducers/deadlines/deadlines.actions"

import { 
    ITEM_UPDATE_BODY,
    ITEM_DELETE,
    ITEM_ADD,
    ITEM_CHANGE_FIGMA_COMPONENT,
} from "../reducers/items/items.actions"

import { CHAT_MESSAGE_RECEIVE, CHAT_MESSAGE_UPDATE, CHAT_REJOIN_BEGIN} from "../reducers/chat/chat.actions"

export const chatClient = new ChatClient(process.env.NEXT_PUBLIC_API_URL);

export const labelTypes = {
    DEADLINE: 3,
    PRICE: 1,
    ITEM: 2,
    UNLABELED: 0,
}

export const msgMethods = {
    COMMENT:   0,
	ITEM:      1,
	DATE:      2,
	PAYOUT:    5,
	PRICE:     3,
	REVISION:  4,
    ITEM_CREATE: 6,
    ITEM_DELETE: 7,
    DEADLINE_CREATE: 8,
    DEADLINE_DELETE: 9,
    DEADLINE_ITEMS: 10,
    CONTRACT_SIGN: 11,
    CONTRACT_LOCK: 12,
    CONTRACT_SETTLE: 13,
    CONTRACT_ITEM_SETTLE: 14,
    REQUEST_ADMIN: 15,
    RESOLVE_ADMIN: 16,
    FINALIZE_SETTLE: 17,
    DEADLINE_EXPIRED: 18,
    DEADLINE_SETTLED: 19,
    CONTRACT_FIGMA_SET: 20,
    FIGMA_ITEM_NODES: 21,
}

export const deadlineItemTypes = {
	ITEM_ADDED: 1,
	ITEM_RESOLVED: 2,
	ITEM_REMOVED: 3,
}

export const editTypes = {
    SUGGEST: 1,
    APPROVE: 2,
    REJECT: 3,
}

export const decisionTypes = {
    YES: 2,
    NO: 1,
    UNDECIDED: 0,
}
export const resolTypes = {
    UNDECIDED: 0,
	APPROVED: 1,
	REJECTED: 2,
	CANCELED: 3,
}


class ChatService {

    joinChat(token, user_id, room_id, dispatch) {
        let joinRequest = new UserJoin();
        joinRequest.setUserId(user_id);
        joinRequest.setRoomId(room_id);
        
        let metadata = {"authorization": token}

        let stream = chatClient.joinChat(joinRequest, metadata)

        stream.on('data', function (response) {
            const msg = response.toObject()
            const formatedMsg = reformatBody(msg)
            parseMessage(formatedMsg, user_id, dispatch)
            if (msg.method !== msgMethods.REVISION) {
                dispatch({
                    type: CHAT_MESSAGE_RECEIVE,
                    payload: formatedMsg,
                })
            } 
        })

        
        stream.on('error', function (error) {
            dispatch({
                type: CHAT_REJOIN_BEGIN,
            })
        })
        stream.on('status', function(status) {
            // console.log(status.code);
            // console.log(status.details);
            // console.log(status.metadata);
        });
        stream.on('end', function(end) {
            // console.log("Stream ended")
            // console.log(end)
        });

        return Promise.resolve();
    }

    leaveChat(token, user_id, room_id) {
        let leaveRequest = new UserLeave();
        leaveRequest.setRoomId(room_id);
        leaveRequest.setUserId(user_id);

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            chatClient.leaveChat(leaveRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                } else {
                    resolve()
                }
            });
        });
    }

    pullRecord(token, user_id, room_id) {
        let pullRequest = new ChatPullRequest();
        pullRequest.setRoomId(room_id);
        pullRequest.setUserId(user_id);

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            chatClient.pullChatHistory(pullRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                } else {
                    var resp = response.toObject();
                    let messages = []
                    
                    for (let i=0; i<resp.messagesList.length; i++) {
                        messages.push(reformatBody(resp.messagesList[i]))
                    }
                    // console.log("Messages:")
                    // console.log(messages)
                    resolve(messages)
                }
            });
        });

    }

    pullNewMessages(token, user_id, doc_mode) {
        let req = new NewMessagesRequest();
        req.setUserId(user_id);
        req.setDocMode(doc_mode);

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            chatClient.pullNewMessages(req, metadata, function(error, response) {
                if (error) {
                    reject(error)
                } else {
                    var resp = response.toObject();
                    let messages = []
                    
                    for (let i=0; i<resp.messagesList.length; i++) {
                        const reformMsg = reformatBody(resp.messagesList[i].message)
                        reformMsg.documentInfo = resp.messagesList[i].document
                        messages.push(reformMsg)
                    }

                    resolve(messages.reverse())
                }
            });
        });
        
    }

    sendMessage(token, user_id, room_id, text) {
        let sendRequest = new SendRequest();
        sendRequest.setUserId(user_id);
        sendRequest.setRoomId(room_id);

        let body = new CommentMsgBody();
        body.setMessage(text);
        sendRequest.setBody(body);

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            
            chatClient.sendCommentMessage(sendRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                } else {
                    resolve(response.toObject())
                }
            });
        });
    }
}

const parseMessage = (msg, dispatch) => {
    if (msg.method === msgMethods.DATE) {
        let newDate = {
            deadlineId: msg.body.deadlineId,
            oldVersion: new Date(msg.body.oldVersion.seconds*1000),
            newVersion: new Date(msg.body.newVersion.seconds*1000)
        }
        dispatch({
            type: DEADLINE_UPDATE_DATE,
            payload: newDate,
        })
    } else if (msg.method === msgMethods.ITEM) {
        let newBody = {
            itemId: msg.body.itemId,
            oldVersion: msg.body.oldVersion,
            newVersion: msg.body.newVersion
        }
        dispatch({
            type: ITEM_UPDATE_BODY,
            payload: newBody,
        })
    } else if (msg.method === msgMethods.ITEM_CREATE) {
        dispatch({
            type: ITEM_ADD,
            payload: msg.body.item,
        });
    } else if (msg.method === msgMethods.ITEM_DELETE) {
        dispatch({
            type: ITEM_DELETE,
            payload: msg.body.item,
        });
    } else if (msg.method === msgMethods.DEADLINE_CREATE) {
        dispatch({
            type: DEADLINE_ADD,
            payload: msg.body.deadline,
        });
    } else if (msg.method === msgMethods.DEADLINE_DELETE) {
        dispatch({
            type: DEADLINE_DELETE,
            payload: {id: msg.body.deadline.id, proposerId: msg.user.id},
        });
    
    } else if (msg.method === msgMethods.DEADLINE_ITEMS) {
        dispatch({
            type: DEADLINE_REPLACE,
            payload: msg.body.deadline,
        })
    } else if (msg.method === msgMethods.CONTRACT_FIGMA_SET) {
        dispatch({
            type: DOCUMENT_FIGMA_LINK_CHANGE,
            payload: {link: msg.body.figmaLink}
        })
    } else if (msg.method === msgMethods.FIGMA_ITEM_NODES) {
        dispatch({
            type: ITEM_CHANGE_FIGMA_COMPONENT,
            payload: {
                item_id: msg.body.itemId,
                component_id: msg.body.componentId,
            }
        })
    }
}

const reformatBody = (msg) => {
    if (msg.method === msgMethods.COMMENT) {
        msg.body = msg.commentBody
    } else if (msg.method === msgMethods.ITEM) {
        msg.body = msg.itemBody
    } if (msg.method === msgMethods.DATE) {
        msg.body = msg.dateBody
    } else if (msg.method === msgMethods.ITEM_CREATE) {
        msg.body = msg.itemCreateBody
    } else if (msg.method === msgMethods.ITEM_DELETE) {
        msg.body = msg.itemDeleteBody
    } else if (msg.method === msgMethods.DEADLINE_CREATE) {
        msg.deadlineCreateBody.deadline.currentDate = new Date(1000 * msg.deadlineCreateBody.deadline.currentDate.seconds)
        msg.deadlineCreateBody.deadline.workerDate = new Date(1000 * msg.deadlineCreateBody.deadline.workerDate.seconds)
        msg.deadlineCreateBody.deadline.buyerDate = new Date(1000 * msg.deadlineCreateBody.deadline.buyerDate.seconds)
        msg.body = msg.deadlineCreateBody
    } else if (msg.method === msgMethods.DEADLINE_DELETE) {
        msg.deadlineDeleteBody.deadline.currentDate = new Date(1000 * msg.deadlineDeleteBody.deadline.currentDate.seconds)
        msg.deadlineDeleteBody.deadline.workerDate = new Date(1000 * msg.deadlineDeleteBody.deadline.workerDate.seconds)
        msg.deadlineDeleteBody.deadline.buyerDate = new Date(1000 * msg.deadlineDeleteBody.deadline.buyerDate.seconds)
        msg.body = msg.deadlineDeleteBody
    } else if (msg.method === msgMethods.DEADLINE_ITEMS) {
        msg.deadlineItemBody.deadline.currentDate = new Date(1000 * msg.deadlineItemBody.deadline.currentDate.seconds)
        msg.deadlineItemBody.deadline.workerDate = new Date(1000 * msg.deadlineItemBody.deadline.workerDate.seconds)
        msg.deadlineItemBody.deadline.buyerDate = new Date(1000 * msg.deadlineItemBody.deadline.buyerDate.seconds)
        msg.body = msg.deadlineItemBody
    } else if (msg.method === msgMethods.CONTRACT_FIGMA_SET) {
        msg.body = msg.figmaLinkBody
    } else if (msg.method === msgMethods.FIGMA_ITEM_NODES) {
        msg.body = msg.figmaItemNodesBody
    } else {
        msg.body = {}
    }

    return msg
}
export default new ChatService();