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

    changeBody(token, user_id, doc_id, item_id, new_body) {
        let suggestRequest = new SuggestItemReq();

        suggestRequest.setUserId(user_id);
        suggestRequest.setDocId(doc_id);
        suggestRequest.setItemId(item_id);
        suggestRequest.setNewBody(new_body);
        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            itemClient.changeBody(suggestRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve()
            });
        });
    }

    addItem(token, user_id, doc_id, item_name, item_body) {
        let addRequest = new SuggestAddItemReq();
        const item = {
            name: item_name,
            currentBody: item_body,
        }
        let itemEntity = this.generateItemEntity(item)
        addRequest.setItem(itemEntity)
        addRequest.setUserId(user_id)
        addRequest.setDocId(doc_id)

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            itemClient.addItem(addRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve(response.toObject())
            });
        });

    }

    deleteItem(token, user_id, doc_id, item_id, item_name, item_body) {
        let delRequest = new SuggestDelItemReq();
        const item = {
            id: item_id,
            name: item_name,
            currentBody: item_body,
        }
        let itemEntity = generateItemEntity(item)
        delRequest.setItem(itemEntity)
        delRequest.setUserId(user_id)
        delRequest.setDocId(doc_id)

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            itemClient.deleteItem(delRequest, metadata, function(error, response) {
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
export const generateItemEntity = (item) => {
    let entity = new ItemEntity()

    if (item.id) {
        entity.setId(item.id)
    }
    entity.setName(item.name)
    entity.setCurrentBody(item.currentBody)

    return entity
}

export default new ItemService();