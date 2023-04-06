import { DeadlineClient } from "../proto/communication/deadline_grpc_web_pb";
import { 
    DeadlineEntity,
    ItemNub,
    
    SuggestDateReq,

    SuggestDeadlineItemsReq,

    SuggestAddDeadlineReq,

    SuggestDelDeadlineReq,

} from "../proto/communication/deadline_pb";

var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

export const deadlineClient = new DeadlineClient(process.env.NEXT_PUBLIC_API_URL);

class DeadlineService {

    changeDate(token, user_id, doc_id, deadline_id, new_date) {
        let suggestRequest = new SuggestDateReq();

        suggestRequest.setUserId(user_id);
        suggestRequest.setDocId(doc_id);
        suggestRequest.setDeadlineId(deadline_id);
        const new_stamp = new google_protobuf_timestamp_pb.Timestamp()
        new_stamp.fromDate(new_date)
        suggestRequest.setNewDate(new_stamp);

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            deadlineClient.changeDate(suggestRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve()
            });
        });
    }

    addDeadline(token, user_id, doc_id, deadline) {
        let addRequest = new SuggestAddDeadlineReq();
        let deadlineEntity = generateDeadlineEntity(deadline)
        addRequest.setDeadline(deadlineEntity)
        addRequest.setUserId(user_id)
        addRequest.setDocId(doc_id)

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            deadlineClient.addDeadline(addRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                } else {
                    resolve(cleanDeadline(response))
                }
            });
        });

    }

    deleteDeadline(token, user_id, doc_id, deadline) {
        
        let delRequest = new SuggestDelDeadlineReq();
        let deadlineEntity = generateDeadlineEntity(deadline)
        delRequest.setDeadline(deadlineEntity)
        delRequest.setUserId(user_id)
        delRequest.setDocId(doc_id)

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            deadlineClient.deleteDeadline(delRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve(response.toObject())
            });
        });

    }

    changeDeadlineItems(token, user_id, doc_id, deadline_id, item_ids) {
        let changeRequest = new SuggestDeadlineItemsReq();
        changeRequest.setDeadlineId(deadline_id)
        changeRequest.setUserId(user_id)
        changeRequest.setDocId(doc_id)

        for (let i = 0; i < item_ids.length; i++) {
            changeRequest.addItemIds(item_ids[i], i)
        }
        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            deadlineClient.changeDeadlineItems(changeRequest, metadata, function(error, response) {
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

}

const cleanDeadline = (deadline) => {
    const output = deadline.toObject()
    output.currentDate = deadline.getCurrentDate().toDate()
    return output
}

export const generateDeadlineEntity = (deadline_info) => {
    let entity = new DeadlineEntity();

    // Leaving out the deadline id because if generated on client side
    // Likely doesn't exist yet
    entity.setDocId(deadline_info.DocId);
    entity.setName(deadline_info.name)
    if (deadline_info.id && this.isHexId(deadline_info.id)) {
        entity.setId(deadline_info.id)
    }

    const current = new google_protobuf_timestamp_pb.Timestamp()
    current.fromDate(deadline_info.currentDate)
    entity.setCurrentDate(current)

    let i = 0
    for (const [_, item] of Object.entries(deadline_info.itemsList)) {
        const itemNub = new ItemNub()
        itemNub.setId(item.id)
        itemNub.setName(item.name)
        entity.addItems(itemNub, i)
        i++
    }
    return entity
}  
export default new DeadlineService();