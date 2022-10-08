import { ContractClient } from "../proto/communication/contract_grpc_web_pb";
import { 
    DeadlineEntity,
    PriceEntity,
    ContractEntity,
    ItemEntity,
    ItemNub,
    
    
    ContractCreateRequest,
    ContractResponse,
    QueryByUserRequest,
    QueryByIdRequest,
    InviteDataRequest,

    ContractSuggestPrice,
    ContractSuggestPayout,
    ContractSuggestDate,
    ContractSuggestItem,

    ContractReactPrice,
    ContractReactPayout,
    ContractReactDate,
    ContractReactItem,

    ContractSuggestAddItem,
    ContractReactAddItem,
    ContractSuggestDelItem,
    ContractReactDelItem,

    ContractSuggestAddDeadline,
    ContractReactAddDeadline,
    ContractSuggestDelDeadline,
    ContractReactDelDeadline,

    ContractSuggestDeadlineItems,
    ContractReactDeadlineItems,

    ClaimContractRequest,
    SignContractRequest,

    ContractToggleLockRequest,
    ContractReactLockRequest,
    

} from "../proto/communication/contract_pb";
import {msgMethods,decisionTypes} from "./chat.service"
import {WORKER_TYPE, BUYER_TYPE} from "./user.service"
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

export const contractClient = new ContractClient("https://localhost:8080");
export const contractStages = {
    CREATE: 0,
    INVITE: 1,
    NEGOTIATE: 10,
    ACTIVE: 30,
    SETTLING: 40,
    COMPLETE: 50,
}

export const genEmptyContract = () => {
    const now = new Date();
    return {
        id: "", 
        worker: {id: "", username: "", type: WORKER_TYPE}, 
        buyer: {id: "", username: "", type: BUYER_TYPE},
        price: {current: 0, worker: 0, buyer: 0},
        deadlines: {
            current: new Date(), worker: new Date(), buyer: new Date()
        },
        title: "",
        summary: "",
        stage: 0,
        itemsList: [],
        deadlinesList: [
            genEmptyDeadline(new Date(now.getTime() + 1*86400000)),
            genEmptyDeadline(new Date(now.getTime() + 8*86400000))
        ], 
    }
}
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
                let contractObj = cleanDeadlines(response.getContract())
                contractObj.role = resp.role
                resolve(contractObj)
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
                    console.log("Error:")
                    console.log(error)
                    reject(error)
                }
                console.log("RESPONSE")
                console.log(response)
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
    
    create_contract(token, user_id, title, summary, intro_message, price_set, deadlines, items, password, role) {
        // console.log("At service: ")
        // console.log(items)

        let createRequest = new ContractCreateRequest();   

        createRequest.setUserId(user_id);
        createRequest.setTitle(title);
        createRequest.setSummary(summary);
        createRequest.setIntroMessage(intro_message);
        createRequest.setPrice(this.generatePriceEntity(price_set));
        createRequest.setPassword(password)
        createRequest.setRole(role)

        let i = 0
        for (const [_, item] of Object.entries(items)) {
            const itemEntity = this.generateItemEntity(item)
            createRequest.addItems(itemEntity, i);
            i++
        }

        i = 0
        for (const [_, deadline] of Object.entries(deadlines)) {
            deadline.name = "Deadline " + (i+1)
            const deadlineEntity = this.generateDeadlineEntity(deadline)
            createRequest.addDeadlines(deadlineEntity, i)
            i++
        }
        console.log(createRequest)
        // console.log(createRequest)
        

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.create(createRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                // console.log(response)
                var resp = response.toObject();
                resp.contract.role = resp.role
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

    reactPrice(token, user_id, contract_id, message_id, status) {
        let reactRequest = new ContractReactPrice();
        reactRequest.setUserId(user_id);
        reactRequest.setContractId(contract_id);
        reactRequest.setMessageId(message_id);
        reactRequest.setStatus(status);

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.reactPrice(reactRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve(response)
            });
        });

    }

    suggestPayout(token, user_id, contract_id, deadline_id, new_payout) {
        let suggestRequest = new ContractSuggestPayout();
        suggestRequest.setUserId(user_id);
        suggestRequest.setContractId(contract_id);
        suggestRequest.setDeadlineId(deadline_id);
        suggestRequest.setNewPayout(new_payout);

        console.log("Sending payout")
        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.suggestPayout(suggestRequest, metadata, function(error, response) {
                console.log("...Received")
                if (error) {
                    reject(error)
                }
                resolve()
            });
        });
    }
    reactPayout(token, user_id, contract_id, deadline_id, message_id, status) {
        let reactRequest = new ContractReactPayout();
        console.log("Reacing to payout...");
        console.log(user_id)
        console.log(contract_id)
        console.log(deadline_id)
        console.log(message_id)

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
        let suggestRequest = new ContractSuggestDate();

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
        let reactRequest = new ContractReactDate();

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

    suggestItem(token, user_id, contract_id, item_id, new_body) {
        let suggestRequest = new ContractSuggestItem();

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
        let reactRequest = new ContractReactItem();

        reactRequest.setUserId(user_id);
        reactRequest.setContractId(contract_id);
        reactRequest.setMessageId(message_id);
        reactRequest.setItemId(item_id);
        reactRequest.setStatus(status);
        console.log("attempting to send")

        console.log(user_id)
        console.log(contract_id)
        console.log(item_id)
        console.log(message_id)
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
        let addRequest = new ContractSuggestAddItem();
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
        let reactRequest = new ContractReactAddItem();

        reactRequest.setUserId(user_id);
        reactRequest.setContractId(contract_id);
        reactRequest.setMessageId(message_id);
        reactRequest.setItemId(item_id);
        reactRequest.setStatus(status);
        console.log("attempting to send")

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.reactAddItem(reactRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve(response)
            });
        });

    }

    deleteItem(token, user_id, contract_id, item_id, item_name, item_body) {
        let delRequest = new ContractSuggestDelItem();
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
                console.log("Call back")
                console.log(error)
                console.log(response)
                if (error) {
                    reject(error)
                }
                resolve(response.toObject())
            });
        });

    }

    reactDeleteItem(token, user_id, contract_id, item_id, message_id, status) {
        let reactRequest = new ContractReactDelItem();

        reactRequest.setUserId(user_id);
        reactRequest.setContractId(contract_id);
        reactRequest.setMessageId(message_id);
        reactRequest.setItemId(item_id);
        reactRequest.setStatus(status);
        console.log("attempting to send")

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.reactDeleteItem(reactRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve(response)
            });
        });

    }


    addDeadline(token, user_id, contract_id, deadline) {
        let addRequest = new ContractSuggestAddDeadline();
        let deadlineEntity = this.generateDeadlineEntity(deadline)
        addRequest.setDeadline(deadlineEntity)
        addRequest.setUserId(user_id)
        addRequest.setContractId(contract_id)

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.suggestAddDeadline(addRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve(response.toObject())
            });
        });

    }

    reactAddDeadline(token, user_id, contract_id, deadline_id, message_id, status) {
        let reactRequest = new ContractReactAddDeadline();

        reactRequest.setUserId(user_id);
        reactRequest.setContractId(contract_id);
        reactRequest.setMessageId(message_id);
        reactRequest.setDeadlineId(deadline_id);
        reactRequest.setStatus(status);
        console.log("attempting to send")

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
        console.log("DELETING DEADLINE W")
        console.log(user_id)
        console.log(contract_id)
        
        let delRequest = new ContractSuggestDelDeadline();
        let deadlineEntity = this.generateDeadlineEntity(deadline)
        console.log(deadline)
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
        let reactRequest = new ContractReactDelDeadline();

        reactRequest.setUserId(user_id);
        reactRequest.setContractId(contract_id);
        reactRequest.setMessageId(message_id);
        reactRequest.setDeadlineId(deadline_id);
        reactRequest.setStatus(status);
        console.log("attempting to send")

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
        let changeRequest = new ContractSuggestDeadlineItems();

        changeRequest.setDeadlineId(deadline_id)
        changeRequest.setUserId(user_id)
        changeRequest.setContractId(contract_id)

        for (let i = 0; i < item_ids.length; i++) {
            changeRequest.addItemIds(item_ids[i], i)
        }
        console.log(contract_id)
        console.log(user_id)
        console.log(deadline_id)

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
        let reactRequest = new ContractReactDeadlineItems();

        reactRequest.setUserId(user_id);
        reactRequest.setContractId(contract_id);
        reactRequest.setMessageId(message_id);
        reactRequest.setDeadlineId(deadline_id);
        reactRequest.setStatus(status);
        console.log("attempting to send")

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


    claimContract(token, user_id, contract_id, password) {
        let claimRequest = new ClaimContractRequest();
        claimRequest.setUserId(user_id);
        claimRequest.setContractId(contract_id);
        claimRequest.setPassword(password);

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.claim(claimRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve(response.toObject())
            });
        });
    }

    signContract(token, user_id, contract_id) {
        let signRequest = new SignContractRequest();
        signRequest.setUserId(user_id);
        signRequest.setContractId(contract_id);

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.sign(signRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve(response.toObject())
            });
        });
    }

    toggleLock(token, user_id, contract_id, lockState) {
        let lockRequest = new ContractToggleLockRequest();
        lockRequest.setUserId(user_id);
        lockRequest.setContractId(contract_id);
        lockRequest.setContractLock(lockState);

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.toggleLock(lockRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve(response.toObject())
            });
        });
    }
    reactLock(token, user_id, contract_id, message_id, status) {
        let reactRequest = new ContractReactLockRequest();

        reactRequest.setUserId(user_id);
        reactRequest.setContractId(contract_id);
        reactRequest.setMessageId(message_id);
        reactRequest.setStatus(status);

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            contractClient.reactLock(reactRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve(response)
            });
        });
    }

    queryInvite(contract_id) {
        let queryRequest = new InviteDataRequest();
        queryRequest.setId(contract_id);
        console.log("Trying")
        return new Promise( (resolve, reject) => { 
            contractClient.inviteQuery(queryRequest, null, function(error, response) {
                if (error) {
                    reject(error)
                }
                const resp = response.toObject()
                resp.deadline = response.getDeadline().toDate()
                resolve(resp)
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
        if (this.isHexId(deadline_info.id)) {
            console.log("GOING FOR IT")
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

    generatePriceEntity(price_set) {
        let entity = new PriceEntity();
        entity.setCurrent(price_set.current)
        entity.setWorker(price_set.worker)
        entity.setBuyer(price_set.buyer)
        return entity
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

const cleanDeadlines = (contractEntity) => {
    const contractObj = (contractEntity.toObject())
    for (let i = 0; i < contractEntity.getDeadlinesList().length; i++) {
        contractObj.deadlinesList[i].currentDate = contractEntity.getDeadlinesList()[i].getCurrentDate().toDate()
        contractObj.deadlinesList[i].workerDate = contractEntity.getDeadlinesList()[i].getWorkerDate().toDate()
        contractObj.deadlinesList[i].buyerDate = contractEntity.getDeadlinesList()[i].getBuyerDate().toDate()
    }
    return contractObj
}

export default new ContractService();