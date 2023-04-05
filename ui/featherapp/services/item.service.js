import { ItemClient } from "../proto/communication/item_grpc_web_pb";
import { 
    ItemEntity,
    
    SuggestItemReq,
    ReactItemReq,
    SuggestAddItemReq,
    ReactAddItemReq,
    SuggestDelItemReq,
    ReactDelItemReq,
    ContractSettleItemRequest,
    
} from "../proto/communication/item_pb";

export const itemClient = new ItemClient(process.env.NEXT_PUBLIC_API_URL);

class ItemService {

    suggestItem(token, user_id, contract_id, item_id, new_body) {
        let suggestRequest = new SuggestItemReq();

        suggestRequest.setUserId(user_id);
        suggestRequest.setContractId(contract_id);
        suggestRequest.setItemId(item_id);
        suggestRequest.setNewBody(new_body);
        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.suggestItem(suggestRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve()
            });
        });
    }

    reactItem(token, user_id, contract_id, item_id, message_id, status) {
        let reactRequest = new ReactItemReq();

        reactRequest.setUserId(user_id);
        reactRequest.setContractId(contract_id);
        reactRequest.setMessageId(message_id);
        reactRequest.setItemId(item_id);
        reactRequest.setStatus(status);

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.reactItem(reactRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve(response)
            });
        });

    }

    addItem(token, user_id, contract_id, item_name, item_body) {
        let addRequest = new SuggestAddItemReq();
        const item = {
            name: item_name,
            currentBody: item_body,
            workerBody: item_body,
            buyerBody: item_body,
        }
        let itemEntity = this.generateItemEntity(item)
        addRequest.setItem(itemEntity)
        addRequest.setUserId(user_id)
        addRequest.setContractId(contract_id)

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.suggestAddItem(addRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve(response.toObject())
            });
        });

    }

    reactAddItem(token, user_id, contract_id, item_id, message_id, status) {
        let reactRequest = new ReactAddItemReq();

        reactRequest.setUserId(user_id);
        reactRequest.setContractId(contract_id);
        reactRequest.setMessageId(message_id);
        reactRequest.setItemId(item_id);
        reactRequest.setStatus(status);

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.reactAddItem(reactRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve(response.toObject())
            });
        });

    }

    deleteItem(token, user_id, contract_id, item_id, item_name, item_body) {
        let delRequest = new SuggestDelItemReq();
        const item = {
            id: item_id,
            name: item_name,
            currentBody: item_body,
            workerBody: item_body,
            buyerBody: item_body,
        }
        let itemEntity = this.generateItemEntity(item)
        delRequest.setItem(itemEntity)
        delRequest.setUserId(user_id)
        delRequest.setContractId(contract_id)

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.suggestDeleteItem(delRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve(response.toObject())
            });
        });

    }

    reactDeleteItem(token, user_id, contract_id, item_id, message_id, status) {
        let reactRequest = new ReactDelItemReq();

        reactRequest.setUserId(user_id);
        reactRequest.setContractId(contract_id);
        reactRequest.setMessageId(message_id);
        reactRequest.setItemId(item_id);
        reactRequest.setStatus(status);

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.reactDeleteItem(reactRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve(response.toObject())
            });
        });

    }
    
    settleItem(token, user_id, contract_id, deadline_id, item_id, new_state) {
        let settleRequest = new ContractSettleItemRequest()
        settleRequest.setUserId(user_id)
        settleRequest.setContractId(contract_id)
        settleRequest.setDeadlineId(deadline_id)
        settleRequest.setItemId(item_id)
        settleRequest.setNewState(new_state)
        return new Promise( (resolve, reject) => {
            var metadata = {"authorization": token}
            contractClient.settleItem(settleRequest, metadata, function(error, response) {
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

    generateItemEntity(item) {
        let entity = new ItemEntity()

        if (item.id) {
            entity.setId(item.id)
        }
        entity.setName(item.name)
        entity.setCurrentBody(item.currentBody)
        entity.setBuyerBody(item.buyerBody)
        entity.setWorkerBody(item.workerBody)

        return entity
    }

}

export default new ItemService();