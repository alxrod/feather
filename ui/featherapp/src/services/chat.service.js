import { ChatClient } from "../proto/communication/chat_grpc_web_pb";
import { 
    ChatMessage,
    UserJoin,
    UserLeave,
    SendRequest,

} from "../proto/communication/chat_pb";
import {WORKER_TYPE, BUYER_TYPE} from "./user.service"
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');


export const chatClient = new ChatClient("https://localhost:8080");

class ContractService {

    // Calls
    // query_contract(token, user_id, contract_id) {
    //     let queryRequest = new QueryByIdRequest();
    //     queryRequest.setUserId(user_id);
    //     queryRequest.setContractId(contract_id);

    //     return new Promise( (resolve, reject) => { 
    //         var metadata = {"authorization": token}
    //         contractClient.queryById(queryRequest, metadata, function(error, response) {
    //             if (error) {
    //                 reject(error)
    //             }
    //             var resp = response.toObject();
                
    //             // Change times
    //             resp.contract.deadline.current = response.getContract().getDeadline().getCurrent().toDate()
    //             resp.contract.deadline.buyer = response.getContract().getDeadline().getBuyer().toDate()
    //             resp.contract.deadline.worker = response.getContract().getDeadline().getBuyer().toDate()

    //             resolve(resp)
    //         });
    //     });
    // }


}
export default new ContractService();