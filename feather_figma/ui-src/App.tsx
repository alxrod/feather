import React, { useEffect } from 'react'
import './App.css'
import { RpcError } from "@protobuf-ts/runtime-rpc"
import ApiService from "./api.service"
import { 
  UserSigninResponse
} from "./proto/communication/user";


function App() {
  useEffect(() => {
    if (typeof parent !== undefined) {
      ApiService.login("alex", "andrew2005").then(
        (response: UserSigninResponse) => {
          console.log("User WORKED: ", response.user?.username);
          parent?.postMessage?.({ pluginMessage: 'hello '+response.user?.username }, '*')
        },
        (err: RpcError) => {
          console.log("Error: ", err)
        })
    }
  }, [])

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
