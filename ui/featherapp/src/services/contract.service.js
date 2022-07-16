import { ContractClient } from "../proto/communication/contract_grpc_web_pb";
import { 
    DeadlineEntity,
    PriceEntity,
    ContractEntity,
    ItemEntity,
    ItemChunk,
    
    
    ContractCreateRequest,
    ContractResponse,
    QueryByUserRequest,
    QueryByIdRequest,

    ContractSuggestPrice,

} from "../proto/communication/contract_pb";
import {msgMethods} from "./chat.service"
import {WORKER_TYPE, BUYER_TYPE} from "./user.service"
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');


export const contractClient = new ContractClient("https://localhost:8080");
export const contractStages = {
    INVITE: 0,
    NEGOTIATE: 10,
    SIGNED: 20,
    ACTIVE: 30,
    SETTLING: 40,
    COMPLETE: 50,
}

export const genEmptyContract = () => {
    return {
        id: "", 
        worker: {id: "", username: "", type: WORKER_TYPE}, 
        buyer: {id: "", username: "", type: BUYER_TYPE},
        price: {current: 0, worker: 0, buyer: 0},
        deadline: {current: new Date(), worker: new Date(), buyer: new Date()},
        title: "",
        summary: "",
        stage: 0,
        itemsList: [],
    }
}


class ContractService {

    // Calls
    query_contract(token, user_id, contract_id) {
        let queryRequest = new QueryByIdRequest();
        queryRequest.setUserId(user_id);
        queryRequest.setContractId(contract_id);

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.queryById(queryRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                var resp = response.toObject();
                
                // Change times
                resp.contract.deadline.current = response.getContract().getDeadline().getCurrent().toDate()
                resp.contract.deadline.buyer = response.getContract().getDeadline().getBuyer().toDate()
                resp.contract.deadline.worker = response.getContract().getDeadline().getBuyer().toDate()

                resolve(resp)
            });
        });
    }

    query_contract_nubs(token, user_id) {
        let queryRequest = new QueryByUserRequest();
        queryRequest.setUserId(user_id);
        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.queryByUser(queryRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                var resp = response.toObject();
                
                // Convert proto times to js times
                const protoNubs = response.getContractNubsList()
                for (let i = 0; i < protoNubs.length; i++) {
                    resp.contractNubsList[i].deadline = protoNubs[i].getDeadline().toDate()
                }
                localStorage.setItem("contractNubs", JSON.stringify(resp.contractNubsList));
                resolve(resp)
            });
        });
    }
    
    create_contract(token, user_id, title, summary, intro_message, price_set, deadline_set, items, password) {
        // console.log("At service: ")
        // console.log(items)

        let createRequest = new ContractCreateRequest();   

        createRequest.setUserId(user_id);
        createRequest.setTitle(title);
        createRequest.setSummary(summary);
        createRequest.setIntroMessage(intro_message);
        createRequest.setPrice(this.generatePriceEntity(price_set));
        createRequest.setDeadline(this.generateDeadlineEntity(deadline_set));
        createRequest.setPassword(password)
        let i = 0
        for (const [_, item] of Object.entries(items)) {
            const itemEntity = this.generateItemEntity(item)
            createRequest.addItems(itemEntity, i);
            i++
        }
        // console.log(createRequest)
        

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.create(createRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                // console.log(response)
                var resp = response.toObject();
                resolve(resp)
            });
        });
    }

    suggestPrice(token, user_id, contract_id, new_price) {
        let suggestRequest = new ContractSuggestPrice();
        suggestRequest.setUserId(user_id);
        suggestRequest.setContractId(contract_id);
        suggestRequest.setNewPrice(new_price);

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.suggestPrice(suggestRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve()
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