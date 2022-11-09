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
    CONTRACT_STAGE_UPDATE, 
    CONTRACT_TOGGLE_LOCK,
    CONTRACT_ADMIN_REQUEST_CHANGED
} from "../reducers/contract/contract.actions"

import { 
    CONTRACT_UPDATE_PAYOUT,
    CONTRACT_UPDATE_DATE,
    CONTRACT_ADD_DEADLINE_FROM_DB,
    CONTRACT_DEADLINE_SUGGEST_DELETE,
    CONTRACT_DEADLINE_REPLACE,
    CONTRACT_DEADLINE_REMOVE,
    CONTRACT_DEADLINE_FINALIZE_SETTLE,

} from "../reducers/deadlines/deadlines.actions"

import { 
    CONTRACT_ITEM_UPDATE_BODY,
    CONTRACT_ITEM_RELOAD,
    CONTRACT_ITEM_REMOVE,
    CONTRACT_ITEM_REPLACE_SUGGEST,
    CONTRACT_ITEM_SUGGEST_DELETE,
    CONTRACT_ITEM_SETTLE_UPDATE,
} from "../reducers/items/items.actions"

import {queryContract } from "../reducers/contract/dispatchers/contract.dispatcher"

import {WORKER_TYPE, BUYER_TYPE} from "./user.service"
import {contractStages } from "./contract.service"
// var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
import { CHAT_MESSAGE_RECEIVE, CHAT_MESSAGE_UPDATE, CHAT_REJOIN_BEGIN} from "../reducers/chat/chat.actions"

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
        stream.on('error', function (error) {
            dispatch({
                type: CHAT_REJOIN_BEGIN,
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
            
            chatClient.sendCommentMessage(sendRequest, metadata, function(error, response) {
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

const adjustNewVersion = (newVersion, msg, this_user_id, role) => {
    if (msg.body.resolStatus === resolTypes.APPROVED) {
        newVersion.current = msg.body.newVersion
        newVersion.buyer = msg.body.newVersion
        newVersion.worker = msg.body.newVersion
    } else if (this_user_id === msg.user.id) {
        if (role === WORKER_TYPE) {
            newVersion.worker = msg.body.newVersion
        } else {
            newVersion.buyer = msg.body.newVersion
        }   
    } else if (this_user_id !== msg.user.id) {
        if (role === WORKER_TYPE) {
            newVersion.buyer = msg.body.newVersion
        } else {
            newVersion.worker = msg.body.newVersion
        }   
    }
    return newVersion
}
const parseMessage = (msg, role, this_user_id, dispatch) => {
    if (msg.method === msgMethods.PRICE) {
        let newPrice = {
            proposerId: msg.user.id,
            current: msg.body.oldVersion,
            awaitingApproval: !msg.body.resolved,
            buyer: msg.body.oldVersion,
            worker: msg.body.oldVersion,
        }
        newPrice = adjustNewVersion(newPrice, msg, this_user_id, role)
        
        dispatch({
            type: CONTRACT_UPDATE_PRICE,
            payload: newPrice,
        })
    } else if (msg.method === msgMethods.PAYOUT) {
        let newPayout = {
            proposerId: msg.user.id,
            deadlineId: msg.body.deadlineId,
            current: msg.body.oldVersion,
            awaitingApproval: !msg.body.resolved,
            buyer: msg.body.oldVersion,
            worker: msg.body.oldVersion,
        }
        newPayout = adjustNewVersion(newPayout, msg, this_user_id, role)

        dispatch({
            type: CONTRACT_UPDATE_PAYOUT,
            payload: newPayout,
        })

    } else if (msg.method === msgMethods.DATE) {
        console.log("RECEIVED DATE MSG W INFO: ", msg)
        let newDate = {
            proposerId: msg.user.id,
            deadlineId: msg.body.deadlineId,
            current: msg.body.oldVersion,
            awaitingApproval: !msg.body.resolved,
            buyer: msg.body.oldVersion,
            worker: msg.body.oldVersion,
        }
        newDate = adjustNewVersion(newDate, msg, this_user_id, role)
        newDate.current = new Date(newDate.current.seconds*1000)
        newDate.worker = new Date(newDate.worker.seconds*1000)
        newDate.buyer = new Date(newDate.buyer.seconds*1000)

        dispatch({
            type: CONTRACT_UPDATE_DATE,
            payload: newDate,
        })
    } else if (msg.method === msgMethods.ITEM) {
        let newBody = {
            proposerId: msg.user.id,
            itemId: msg.body.itemId,
            current: msg.body.oldVersion,
            awaitingApproval: !msg.body.resolved,
            buyer: msg.body.oldVersion,
            worker: msg.body.oldVersion,
        }
        newBody = adjustNewVersion(newBody, msg, this_user_id, role)
        dispatch({
            type: CONTRACT_ITEM_UPDATE_BODY,
            payload: newBody,
        })
    } else if (msg.method === msgMethods.ITEM_CREATE) {
        dispatch({
            type: CONTRACT_ITEM_REPLACE_SUGGEST,
            payload: msg.body.item,
        });
    } else if (msg.method === msgMethods.ITEM_DELETE) {
        if (msg.body.resolved) {
            dispatch({
                type: CONTRACT_ITEM_REMOVE,
                payload: msg.body.item,
            });
        } else {
            dispatch({
                type: CONTRACT_ITEM_SUGGEST_DELETE,
                payload: msg.body.item.id,
            });
        }
        
    } else if (msg.method === msgMethods.DEADLINE_CREATE) {
        dispatch({
            type: CONTRACT_ADD_DEADLINE_FROM_DB,
            payload: msg.body.deadline,
        });
    } else if (msg.method === msgMethods.DEADLINE_DELETE) {
        if (msg.body.resolved) {
            dispatch({
                type: CONTRACT_DEADLINE_REMOVE,
                payload: {id: msg.body.deadline.id, proposerId: msg.user.id},
            });
        } else {
            dispatch({
                type: CONTRACT_DEADLINE_SUGGEST_DELETE,
                payload: {id: msg.body.deadline.id, proposerId: msg.user.id},
            });
        }
    } else if (msg.method === msgMethods.DEADLINE_ITEMS) {
        dispatch({
            type: CONTRACT_DEADLINE_REPLACE,
            payload: msg.body.deadline,
        })
    } else if (msg.method === msgMethods.REVISION) {
        dispatch({
            type: CHAT_MESSAGE_UPDATE,
            payload: msg,
        })
    } else if (msg.method === msgMethods.CONTRACT_SIGN || msg.method === msgMethods.CONTRACT_SETTLE) {
        let workerApproved = false;
        let buyerApproved = false;
        if (msg.body.signerId === this_user_id) {
            if (role === WORKER_TYPE) {
                workerApproved = true
            } else if (role === BUYER_TYPE) {
                buyerApproved = true
            }
        } else {
            if (role === WORKER_TYPE) {
                buyerApproved = true
            } else if (role === BUYER_TYPE) {
                workerApproved = true
            }
        }
        dispatch({
            type: CONTRACT_STAGE_UPDATE,
            payload: {
                stage: msg.body.contractStage,
                workerApproved: workerApproved,
                buyerApproved: buyerApproved,
                id: msg.body.contractId,
            }
        })
    } else if (msg.method === msgMethods.CONTRACT_ITEM_SETTLE) {
        dispatch({
            type: CONTRACT_ITEM_SETTLE_UPDATE,
            payload: {
                workerSettled: msg.body.itemWorkerSettle,
                buyerSettled: msg.body.itemBuyerSettle,
                adminSettled: msg.body.itemAdminSettle,
                itemId: msg.body.itemId,
            }
        })
    } else if (msg.method === msgMethods.CONTRACT_LOCK) {
        if (msg.isAdmin) {
            dispatch({
                type: CONTRACT_TOGGLE_LOCK,
                payload: {
                    lockState: msg.body.contractLock
                }
            });
        }
    } else if (msg.method === msgMethods.REQUEST_ADMIN) {
        dispatch({
            type: CONTRACT_ADMIN_REQUEST_CHANGED,
            payload: true,
        })
    } else if (msg.method === msgMethods.RESOLVE_ADMIN) {
        dispatch({
            type: CONTRACT_ADMIN_REQUEST_CHANGED,
            payload: false,
        })
    } else if (msg.method === msgMethods.FINALIZE_SETTLE) {
        dispatch({
            type: CONTRACT_DEADLINE_FINALIZE_SETTLE,
            payload: msg.body
        })
    } else if (msg.method === msgMethods.DEADLINE_EXPIRED) {
        dispatch({
            type: CONTRACT_STAGE_UPDATE,
            payload: {
                stage: contractStages.SETTLE,
                workerApproved: true,
                buyerApproved: true,
                id: msg.body.contractId,
            }
        })
    } else if (msg.method === msgMethods.DEADLINE_SETTLED) {
        dispatch({
            type: CONTRACT_STAGE_UPDATE,
            payload: {
                stage: msg.body.contractStage,
                workerApproved: false,
                buyerApproved: false,
                id: msg.body.contractId,
            }
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
    } else if (msg.method === msgMethods.CONTRACT_SIGN) {
        msg.body = msg.contractSignBody 
    } else if (msg.method === msgMethods.CONTRACT_LOCK) {
        msg.body = msg.contractLockBody
    } else if (msg.method === msgMethods.CONTRACT_SETTLE) {
        msg.body = msg.contractSettleBody 
    } else if (msg.method === msgMethods.CONTRACT_ITEM_SETTLE) {
        msg.body = msg.settleItemBody
    } else if (msg.method === msgMethods.FINALIZE_SETTLE) {
        msg.body = msg.finalizeBody
    } else if (msg.method === msgMethods.DEADLINE_EXPIRED) {
        msg.body = msg.deadlineExpireBody
    } else if (msg.method === msgMethods.DEADLINE_SETTLED) {
        msg.body = msg.deadlineSettledBody
    } else {
        msg.body = {}
    }

    return msg
}
export default new ChatService();