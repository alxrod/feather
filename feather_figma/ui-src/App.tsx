import React, { useEffect, useState} from 'react'
import './App.css'
import { RpcError } from "@protobuf-ts/runtime-rpc"
import ApiService from "./api.service"
import { 
  ContractEditResponse,
  ContractInviteNub,
} from "./proto/communication/contract";
import { 
  UserSigninResponse
} from "./proto/communication/user";



function App() {

  window.onmessage = async (event) => {
    if (event.data.pluginMessage.type === 'query_contract') {
      ApiService.queryContract(
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
          window.parent.postMessage( {pluginMessage: {type: "item_nodes_success", payload: {}}}, '*')
        },
        (err: RpcError) => {
          window.parent.postMessage( {pluginMessage: {type: "item_nodes_fail", payload: {}}}, '*')
        }
      )
    }
  }


  // useEffect(() => {
  //   if (typeof parent !== undefined) {
  //     ApiService.login("alex", "play101").then(
  //       (response: UserSigninResponse) => {
  //         console.log("User WORKED: ", response.user?.username);
  //         parent?.postMessage?.({ pluginMessage: 'hello '+response.user?.username }, '*')
  //       },
  //       (err: RpcError) => {
  //         console.log("Error: ", err)
  //       })
  //   }
  // }, [])

  return (
    <div className="App">
      <h1>Hello</h1>
      <button
        onClick={() => {
          parent?.postMessage?.({ pluginMessage: 'close' }, '*')
        }}
      >
        Close
      </button>
    </div>
  )
}

export default App