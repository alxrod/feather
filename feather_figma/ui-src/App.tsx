import React, { useEffect, useState} from 'react'
import './App.css'
import { RpcError } from "@protobuf-ts/runtime-rpc"
import ApiService from "./api.service"
import { 
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
          console.log("Queried Contract: ", nub.title);
          // Somehwere in this message send is a WASM out of bounds error but doesnt seem to change my code
          window.parent.postMessage(
            {pluginMessage: JSON.stringify({type: "new_contract", payload: ContractInviteNub.toJsonString(nub)})},
            '*'
          )
        },
        (err: RpcError) => {
          console.log("Error: ", err)
        }
      )
      // window.parent.postMessage({pluginMessage: "Hellow World"}, '*')
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