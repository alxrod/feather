import React from 'react'
import ReactDOM from 'react-dom'
import { RpcError } from "@protobuf-ts/runtime-rpc"
import ApiService from "./api.service"
import { 
  ContractEditResponse,
  ContractInviteNub,
} from "./proto/communication/contract";

const App = () => {
  window.onmessage = async (event) => {
    if (event.data.pluginMessage.type === 'query_contract') {
      ApiService.queryContractSummary(
        event.data.pluginMessage.payload.id,
        event.data.pluginMessage.payload.secret,
      ).then(
        (nub: ContractInviteNub) => {
          // Somehwere in this message send is a WASM out of bounds error but doesnt seem to change my code
          window.parent.postMessage(
            {pluginMessage: {type: "new_contract", payload: ContractInviteNub.toJson(nub)}},
            '*'
          )
        },
        (err: RpcError) => {
          console.log("Error: ", err)
        }
      )
    } else if (event.data.pluginMessage.type === 'set_item_nodes') {
      ApiService.setItemFigmaNodes(
        event.data.pluginMessage.payload.contract_id,
        event.data.pluginMessage.payload.contract_secret,
        event.data.pluginMessage.payload.item_id,
        event.data.pluginMessage.payload.node_ids,
      ).then(
        (nub: ContractEditResponse) => {
          console.log("WAS A SUCCESS")
          window.parent.postMessage( {pluginMessage: {type: "item_nodes_success", payload: {}}}, '*')
        },
        (err: RpcError) => {
          console.log("ERROR: ", err)
          window.parent.postMessage( {pluginMessage: {type: "item_nodes_fail", payload: {}}}, '*')
        }
      )
    }
  }
  return (
    <></>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))


