import { DocumentClient } from "../proto/communication/document_grpc_web_pb";
import { 
    DeadlineEntity,
    PriceEntity,
    ItemEntity,
    ItemNub,
    
    
    DocumentCreateRequest,

    QueryByUserRequest,
    QueryByIdRequest,

} from "../proto/communication/document_pb";

import { generateItemEntity } from "./item.service"
import { generateDeadlineEntity } from "./deadline.service"

var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

export const documentClient = new DocumentClient(process.env.NEXT_PUBLIC_API_URL);

class DocumentService {

    queryDocument(token, user_id, doc_id) {
        let queryRequest = new QueryByIdRequest();
        queryRequest.setUserId(user_id);
        queryRequest.setId(doc_id);

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            documentClient.queryDocById(queryRequest, metadata, function(error, response) {
                if (error) {
                    reject(error.message)
                    return 
                }
                var resp = response.toObject();
                
                // Change times
                let docObj = cleanDeadlines(response)
                resolve(docObj)
            });
        });
    }

    queryDocumentNubs(token, user_id) {
        let queryRequest = new QueryByUserRequest();
        queryRequest.setUserId(user_id);
        return new Promise( (resolve, reject) => { 
          var metadata = {"authorization": token}
          documentClient.queryDocsByUser(queryRequest, metadata, function(error, response) {
            if (error) {
                reject(error)
                console.log("Error: ", error)
            }

            var resp = response.toObject();
            // Convert proto times to js times
            const protoNubs = response.getDocumentNubsList()

            for (let i = 0; i < protoNubs.length; i++) {
                const deadlineNubs = protoNubs[i].getDeadlinesList()
                for (let j = 0; j < deadlineNubs.length; j++) {
                    resp.documentNubsList[i].deadlinesList[j].currentDate = deadlineNubs[j].getCurrentDate().toDate()
                }
            }
            resolve(resp)
          });
        });
    }
    
    createDocument(token, user_id, title, summary, deadlines, items) {

        let createRequest = new DocumentCreateRequest();   
        createRequest.setUserId(user_id);
        createRequest.setTitle(title);
        createRequest.setSummary(summary);

        let i = 0
        for (const [_, item] of Object.entries(items)) {
            const itemEntity = generateItemEntity(item)
            createRequest.addItems(itemEntity, i);
            i++
        }

        i = 0
        for (const [_, deadline] of Object.entries(deadlines)) {
            deadline.name = "Deadline " + (i+1)
            const deadlineEntity = generateDeadlineEntity(deadline)
            createRequest.addDeadlines(deadlineEntity, i)
            i++
        }
        

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            documentClient.createDoc(createRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                var resp = response.toObject();
                resolve(resp)
            });
        });
    }

    isHexId = (h) => {
        var a = parseInt(h,16);
        return (a !== NaN && h.length === 24)
    }
}

const cleanDeadlines = (contractEntity) => {
    const contractObj = (contractEntity.toObject())
    for (let i = 0; i < contractEntity.getDeadlinesList().length; i++) {
        contractObj.deadlinesList[i].currentDate = contractEntity.getDeadlinesList()[i].getCurrentDate().toDate()
        contractObj.deadlinesList[i].workerDate = contractEntity.getDeadlinesList()[i].getWorkerDate().toDate()
        contractObj.deadlinesList[i].buyerDate = contractEntity.getDeadlinesList()[i].getBuyerDate().toDate()
    }
    return contractObj
}

const cleanDeadline = (deadline) => {
    const output = deadline.toObject()
    output.currentDate = deadline.getCurrentDate().toDate()
    output.workerDate = deadline.getWorkerDate().toDate()
    output.buyerDate = deadline.getBuyerDate().toDate()
    return output
}

export default new DocumentService();