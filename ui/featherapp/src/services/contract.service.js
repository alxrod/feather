import { ContractClient } from "../proto/communication/contract_grpc_web_pb";
import { 
    DeadlineEntity,
    PriceEntity,
    ContractEntity,
    ItemEntity,
    ItemChunk,
    
    ContractCreateRequest,
    ContractResponse,

} from "../proto/communication/contract_pb";
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

export const contractClient = new ContractClient("https://localhost:8080");

class ContractService {

    // Calls
    create_contract(token, user_id, title, summary, intro_message, price_set, deadline_set, items) {
        console.log("At service: ")
        console.log(items)

        let createRequest = new ContractCreateRequest();   

        createRequest.setUserId(user_id);
        createRequest.setTitle(title);
        createRequest.setSummary(summary);
        createRequest.setIntroMessage(intro_message);
        createRequest.setPrice(this.generatePriceEntity(price_set));
        createRequest.setDeadline(this.generateDeadlineEntity(deadline_set));
        let i = 0
        for (const [_, item] of Object.entries(items)) {
            const itemEntity = this.generateItemEntity(item)
            createRequest.addItems(itemEntity, i);
            i++
        }
        console.log(createRequest)
        

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.create(createRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                console.log(response)
                var resp = response.toObject();
                resolve(resp)
            });
        });
    }

    // Helpers
    generateDeadlineEntity(time_set) {
        let entity = new DeadlineEntity();

        const current = new google_protobuf_timestamp_pb.Timestamp()
        current.fromDate(time_set.current)
        entity.setCurrent(current)

        const worker = new google_protobuf_timestamp_pb.Timestamp()
        worker.fromDate(time_set.worker)
        entity.setWorker(worker)

        const buyer = new google_protobuf_timestamp_pb.Timestamp()
        buyer.fromDate(time_set.buyer)
        entity.setBuyer(buyer)

        return entity
    }  

    generatePriceEntity(price_set) {
        let entity = new PriceEntity();
        entity.setCurrent(price_set.current)
        entity.setWorker(price_set.worker)
        entity.setBuyer(price_set.buyer)
        return entity
    }

    generateChunkEntity(chunk) {
        let entity = new ItemChunk();
        entity.setType(chunk.type)
        entity.setAuthorId(chunk.author)

        // For now we're faking this
        entity.setWorkerApprove(true)
        entity.setBuyerApprove(true)
        entity.setText(chunk.text);
        return entity
    }

    generateItemEntity(item) {
        let entity = new ItemEntity()
        entity.setName(item.name)
        for (let i=0; i<item.text.length; i++) {
            entity.addBody(this.generateChunkEntity(item.text[i], i))
        }
        return entity
    }

}
export default new ContractService();