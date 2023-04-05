import { DeadlineClient } from "../proto/communication/deadline_grpc_web_pb";
import { 
    DeadlineEntity,
    ItemNub,
    
    SuggestDateReq,
    ReactDateReq,

    SuggestPayoutReq,
    ReactPayoutReq,

    SuggestDeadlineItemsReq,
    ReactDeadlineItemsReq,

    SuggestAddDeadlineReq,
    ReactAddDeadlineReq,

    SuggestDelDeadlineReq,
    ReactDelDeadlineReq,

    FinishDeadlineRequest,

} from "../proto/communication/deadline_pb";

var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

export const deadlineClient = new DeadlineClient(process.env.NEXT_PUBLIC_API_URL);

export const genEmptyDeadline = (date) => {
    return {
        contractId: "",
        id: "",
        proposerId: "",
        awaitingApproval: false,
    
        currentPayout: 0,
        workerPayout: 0,
        buyerPayout: 0,
    
        itemsList: [],
    
        currentDate: date,
        workerDate: date,
        buyerDate: date,
    }
}

class DeadlineService {

    suggestPayout(token, user_id, contract_id, deadline_id, new_payout) {
        let suggestRequest = new SuggestPayoutReq();
        suggestRequest.setUserId(user_id);
        suggestRequest.setContractId(contract_id);
        suggestRequest.setDeadlineId(deadline_id);
        suggestRequest.setNewPayout(new_payout);

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.suggestPayout(suggestRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve()
            });
        });
    }
    reactPayout(token, user_id, contract_id, deadline_id, message_id, status) {
        let reactRequest = new ReactPayoutReq();

        reactRequest.setUserId(user_id);
        reactRequest.setContractId(contract_id);
        reactRequest.setMessageId(message_id);
        reactRequest.setDeadlineId(deadline_id);
        reactRequest.setStatus(status);

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.reactPayout(reactRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve(response)
            });
        });

    }

    suggestDate(token, user_id, contract_id, deadline_id, new_date) {
        let suggestRequest = new SuggestDateReq();

        suggestRequest.setUserId(user_id);
        suggestRequest.setContractId(contract_id);
        suggestRequest.setDeadlineId(deadline_id);
        const new_stamp = new google_protobuf_timestamp_pb.Timestamp()
        new_stamp.fromDate(new_date)
        suggestRequest.setNewDate(new_stamp);

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.suggestDate(suggestRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve()
            });
        });
    }

    reactDate(token, user_id, contract_id, deadline_id, message_id, status) {
        let reactRequest = new ReactDateReq();

        reactRequest.setUserId(user_id);
        reactRequest.setContractId(contract_id);
        reactRequest.setMessageId(message_id);
        reactRequest.setDeadlineId(deadline_id);
        reactRequest.setStatus(status);

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.reactDate(reactRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve(response)
            });
        });

    }


    addDeadline(token, user_id, contract_id, deadline) {
        let addRequest = new SuggestAddDeadlineReq();
        let deadlineEntity = this.generateDeadlineEntity(deadline)
        addRequest.setDeadline(deadlineEntity)
        addRequest.setUserId(user_id)
        addRequest.setContractId(contract_id)

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.suggestAddDeadline(addRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                } else {
                    resolve(cleanDeadline(response))
                }
            });
        });

    }

    reactAddDeadline(token, user_id, contract_id, deadline_id, message_id, status) {
        let reactRequest = new ReactAddDeadlineReq();

        reactRequest.setUserId(user_id);
        reactRequest.setContractId(contract_id);
        reactRequest.setMessageId(message_id);
        reactRequest.setDeadlineId(deadline_id);
        reactRequest.setStatus(status);

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.reactAddDeadline(reactRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve(response)
            });
        });

    }

    deleteDeadline(token, user_id, contract_id, deadline) {
        
        let delRequest = new SuggestDelDeadlineReq();
        let deadlineEntity = this.generateDeadlineEntity(deadline)
        delRequest.setDeadline(deadlineEntity)
        delRequest.setUserId(user_id)
        delRequest.setContractId(contract_id)

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.suggestDeleteDeadline(delRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve(response.toObject())
            });
        });

    }

    reactDeleteDeadline(token, user_id, contract_id, deadline_id, message_id, status) {
        let reactRequest = new ReactDelDeadlineReq();

        reactRequest.setUserId(user_id);
        reactRequest.setContractId(contract_id);
        reactRequest.setMessageId(message_id);
        reactRequest.setDeadlineId(deadline_id);
        reactRequest.setStatus(status);

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.reactDeleteDeadline(reactRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve(response)
            });
        });
    }
    
    changeDeadlineItems(token, user_id, contract_id, deadline_id, item_ids) {
        let changeRequest = new SuggestDeadlineItemsReq();
        changeRequest.setDeadlineId(deadline_id)
        changeRequest.setUserId(user_id)
        changeRequest.setContractId(contract_id)

        for (let i = 0; i < item_ids.length; i++) {
            changeRequest.addItemIds(item_ids[i], i)
        }

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.suggestDeadlineItems(changeRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve(response.toObject())
            });
        });
    }
    reactDeadlineItems(token, user_id, contract_id, deadline_id, message_id, status) {
        let reactRequest = new ReactDeadlineItemsReq();

        reactRequest.setUserId(user_id);
        reactRequest.setContractId(contract_id);
        reactRequest.setMessageId(message_id);
        reactRequest.setDeadlineId(deadline_id);
        reactRequest.setStatus(status);

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.reactDeadlineItems(reactRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve(response)
            });
        });
    }

    finishDeadline(token, user_id, contract_id, deadline_id) {
        let request = new FinishDeadlineRequest();
        request.setUserId(user_id);
        request.setContractId(contract_id);
        request.setDeadlineId(deadline_id);

        return new Promise( (resolve, reject) => {
            var metadata = {"authorization": token}
            contractClient.finishDeadline(request, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve(response.toObject())
            });
        });
    }

    isHexId = (h) => {
        var a = parseInt(h,16);
        return (a !== NaN && h.length === 24)
    }

    generateDeadlineEntity(deadline_info) {
        let entity = new DeadlineEntity();

        // Leaving out the deadline id because if generated on client side
        // Likely doesn't exist yet
        entity.setContractId(deadline_info.contractId);
        entity.setName(deadline_info.name)
        if (deadline_info.id && this.isHexId(deadline_info.id)) {
            entity.setId(deadline_info.id)
        }
        // proposer id generated by server sidebar

        entity.setCurrentPayout(deadline_info.currentPayout);
        entity.setWorkerPayout(deadline_info.workerPayout);
        entity.setBuyerPayout(deadline_info.buyerPayout)
        entity.setPayoutAwaitingApproval(deadline_info.payoutAwaitingApproval);
        entity.setDraftRequired(deadline_info.draftRequired);

        const current = new google_protobuf_timestamp_pb.Timestamp()
        current.fromDate(deadline_info.currentDate)
        entity.setCurrentDate(current)

        const worker = new google_protobuf_timestamp_pb.Timestamp()
        worker.fromDate(deadline_info.workerDate)
        entity.setWorkerDate(worker)

        const buyer = new google_protobuf_timestamp_pb.Timestamp()
        buyer.fromDate(deadline_info.buyerDate)
        entity.setBuyerDate(buyer)

        entity.setDateAwaitingApproval(deadline_info.dateAwaitingApproval);

        let i = 0
        for (const [_, item] of Object.entries(deadline_info.itemsList)) {
            const itemNub = new ItemNub()
            itemNub.setId(item.id)
            itemNub.setName(item.name)
            entity.addItems(itemNub, i)
            i++
        }
        entity.setItemsAwaitingApproval(deadline_info.itemsAwaitingApproval);

        return entity
    }  

}

const cleanDeadline = (deadline) => {
    const output = deadline.toObject()
    output.currentDate = deadline.getCurrentDate().toDate()
    output.workerDate =deadline.getWorkerDate().toDate()
    output.buyerDate = deadline.getBuyerDate().toDate()
    return output
}
export default new DeadlineService();