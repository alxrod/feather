import { ChatClient } from "../proto/communication/chat_grpc_web_pb";
import { 
    ChatMessage,
    UserJoin,
    UserLeave,
    SendRequest,
    
    CommentMsgBody,

    ChatPullRequest,
    ChatLabel,

} from "../proto/communication/chat_pb";
import { 
    CONTRACT_UPDATE_PRICE, 
    CONTRACT_SEND_EDIT,
    CONTRACT_UPDATE_PAYOUT,
    CONTRACT_DEADLINE_RELOAD,
} from "../reducers/contract.reducer"

import {WORKER_TYPE, BUYER_TYPE} from "./user.service"
// var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
import { CHAT_MESSAGE_RECEIVE, CHAT_MESSAGE_UPDATE } from "../reducers/chat.reducer"


export const chatClient = new ChatClient("https://localhost:8080");

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

    joinChat(token, user_id, room_id, dispatch, role) {
        let joinRequest = new UserJoin();
        joinRequest.setUserId(user_id);
        joinRequest.setRoomId(room_id);
        
        let metadata = {"authorization": token}

        let stream = chatClient.joinChat(joinRequest, metadata)

        stream.on('data', function (response) {
            const msg = response.toObject()
            const formatedMsg = reformatBody(msg)
            parseMessage(formatedMsg, role, user_id, dispatch)
            if (msg.method !== msgMethods.REVISION) {
                dispatch({
                    type: CHAT_MESSAGE_RECEIVE,
                    payload: formatedMsg,
                })
            }
            
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

    sendMessage(token, user_id, room_id, text, label) {
        let sendRequest = new SendRequest();
        sendRequest.setUserId(user_id);
        sendRequest.setRoomId(room_id);
        sendRequest.setMethod(msgMethods.COMMENT)

        
        let body = new CommentMsgBody();
        body.setMessage(text);
        sendRequest.setCommentBody(body);

        let labelEntity = new ChatLabel();
        labelEntity.setType(label.type);
        labelEntity.setName(label.name);
        labelEntity.setItemId(label.id);
        sendRequest.setLabel(labelEntity);

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            
            chatClient.sendMessage(sendRequest, metadata, function(error, response) {
                if (error) {
                    console.log("Error")
                    console.log(error)
                    console.log(token)
                    reject(error)
                } else {
                    resolve(response.toObject())
                }
            });
        });
    }
}

const parseMessage = (msg, role, this_user_id, dispatch) => {
    if (msg.method === msgMethods.PRICE) {
        dispatch({
            type: CONTRACT_SEND_EDIT,
        })
        const newPrice = {
            proposerId: msg.user.id,
            current: msg.body.oldVersion,
            awaitingApproval: !msg.body.resolved,
            buyer: msg.body.oldVersion,
            worker: msg.body.oldVersion,
        }
        if (this_user_id === msg.user.id) {
            if (role === WORKER_TYPE) {
                newPrice.worker = msg.body.newVersion
            } else {
                newPrice.buyer = msg.body.newVersion
            }   
        } else if (this_user_id !== msg.user.id) {
            if (role === WORKER_TYPE) {
                newPrice.buyer = msg.body.newVersion
            } else {
                newPrice.worker = msg.body.newVersion
            }   
        }
        console.log("Suggestion new price:")
        console.log(newPrice)
        dispatch({
            type: CONTRACT_UPDATE_PRICE,
            payload: newPrice,
        })
    } else if (msg.method === msgMethods.PAYOUT) {
        console.log("Received payout message")
        console.log(msg)

        const newPayout = {
            proposerId: msg.user.id,
            deadlineId: msg.body.deadlineId,
            current: msg.body.oldVersion,
            awaitingApproval: !msg.body.resolved,
            buyer: msg.body.oldVersion,
            worker: msg.body.oldVersion,
        }
        if (this_user_id === msg.user.id) {
            if (role === WORKER_TYPE) {
                newPayout.worker = msg.body.newVersion
            } else {
                newPayout.buyer = msg.body.newVersion
            }   
        } else if (this_user_id !== msg.user.id) {
            if (role === WORKER_TYPE) {
                newPayout.buyer = msg.body.newVersion
            } else {
                newPayout.worker = msg.body.newVersion
            }   
        }
        console.log("Suggestion new payout:")
        console.log(newPayout)
        dispatch({
            type: CONTRACT_UPDATE_PAYOUT,
            payload: newPayout,
        })
        dispatch({
            type: CONTRACT_DEADLINE_RELOAD,
        })

    } else if (msg.method === msgMethods.REVISION) {
        dispatch({
            type: CONTRACT_SEND_EDIT,
        })
        dispatch({
            type: CHAT_MESSAGE_UPDATE,
            payload: msg.body,
        })
        
    }
}

const reformatBody = (msg) => {
    if (msg.method === msgMethods.COMMENT) {
        msg.body = msg.commentBody
    } else if (msg.method === msgMethods.ITEM) {
        msg.body = msg.itemBody
    } else if (msg.method === msgMethods.PAYOUT) {
        msg.body = msg.payoutBody
    } else if (msg.method === msgMethods.DATE) {
        msg.body = msg.dateBody
    } else if (msg.method === msgMethods.PRICE) {
        msg.body = msg.priceBody
    } else if (msg.method === msgMethods.REVISION) {
        msg.body = msg.revBody
    } else {
        msg.body = {}
    }
    return msg
}
export default new ChatService();