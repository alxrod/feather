import React, { useEffect, useState} from 'react'
import './App.css'
import { RpcError } from "@protobuf-ts/runtime-rpc"
import ApiService from "./api.service"
import { 
  ContractEditResponse,
  ContractInviteNub,
  ContractResponse,
  ContractEntity
} from "./proto/communication/contract";
import { 
  UserSigninResponse
} from "./proto/communication/user";
import {
  Timestamp
} from "./proto/google/protobuf/timestamp"

import LoginCard from "./components/Login"
import ContractListCard from './components/ContractList';
import ItemNodeSet from "./components/ItemNodeSet";
import {Oval} from 'react-loading-icons'

const displayModes = {
  "CONTRACTS": 0,
  "ITEM_NODES": 1,
}
function App() {
  const [token, setToken] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user_id, setUserId] = useState("")

  const [needLogin, setNeedLogin] = useState(true)
  const [finishedLoading, setFinishedLoading] = useState(false)

  const [displayMode, setDisplayMode] = useState(displayModes["CONTRACTS"])

  const [node_ids, setNodeIds] = useState([])
  const [contract_id, setContractId] = useState("")
  const [item_id, setItemId] = useState("")

  const selectedContract = (id: string) => {
    ApiService.queryContract(id, user_id, token).then(
      (resp: ContractResponse) => {
        // Somehwere in this message send is a WASM out of bounds error but doesnt seem to change my code
        const jsonContract = resp.contract ? ContractEntity.toJson(resp.contract) : {}
        console.log("RECEIVED NEW CONTRACT: ", jsonContract)
        window.parent.postMessage(
          {pluginMessage: {type: "new_contract", payload: jsonContract}}, '*'
        )
      },
      (err: RpcError) => {
        console.log("err: ", err.message)
      }
    )
  }

  window.onmessage = async (event) => {
    if (event.data.pluginMessage.type === 'set_display_mode') {
      setDisplayMode( (displayModes as any)[event.data.pluginMessage.payload] )
    } else if (event.data.pluginMessage.type === 'set_item_nodes') {
      setItemId(event.data.pluginMessage.payload.item_id)
      setNodeIds(event.data.pluginMessage.payload.node_ids)
      setContractId(event.data.pluginMessage.payload.contract_id)
    } else if (event.data.pluginMessage.type === 'pass_credentials') {
      console.log("Msg received: ", event.data.pluginMessage)
      const t = event.data.pluginMessage.payload.token
      const to = event.data.pluginMessage.payload.timeout
      const un = event.data.pluginMessage.payload.username
      const p = event.data.pluginMessage.payload.password
      const id = event.data.pluginMessage.payload.user_id

      setToken(t)
      setUsername(un)
      setPassword(p)
      setUserId(id)

      if (id && t !== "" && to < (new Date())) {
        setNeedLogin(false)
        setFinishedLoading(true)
      } else if (un !== "" && p !== "") {
        ApiService.login(un, p).then(
          (resp: UserSigninResponse) => {
            // Somehwere in this message send is a WASM out of bounds error but doesnt seem to change my code
            const timeout = Timestamp.toDate(resp.tokenTimeout ? resp.tokenTimeout : Timestamp.now())
            window.parent.postMessage(
              {pluginMessage: {type: "login_success", payload: {
                token: resp.token, 
                timeout: timeout,
                username: un,
                password: p,
              }}}, '*'
            )
            setToken(resp.token)
            setUserId(resp.user?.id ? resp.user?.id : "")
            setNeedLogin(false)
            setFinishedLoading(true)
          },
          (err: RpcError) => {
            setNeedLogin(true)
            setFinishedLoading(true)
          }
        )
      }
    }
  }

  const signinSuccess = (id: string, token: string, timeout: Date, username: string, password: string) => {
    window.parent.postMessage(
      {pluginMessage: {type: "login_success", payload: {
        token: token, 
        timeout: timeout,
        username: username,
        password: password,
        user_id: id,
      }}},
      '*'
      
    )
    setToken(token)
    setUsername(username)
    setPassword(password)
    setUserId(id)
    setNeedLogin(false)
  }
  return (
    <div className="App w-full h-full">
      {!finishedLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Oval className="w-32 h-32" stroke={"#7993A0"} fill={"#7993A0"} strokeWidth={4}/>
        </div>
      ) : needLogin ? (
        <div className="px-12">
          <LoginCard signinSuccess={signinSuccess}/>
        </div>
      ) : (
        <div className="px-12">
        {displayMode === displayModes["CONTRACTS"] ? (
          <ContractListCard user_id={user_id} token={token} selectedContract={selectedContract}/>
        ) : displayMode === displayModes["ITEM_NODES"] ? (
          <h1>Connect your items!</h1>
        ) : (
          <ItemNodeSet 
            user_id={user_id}
            user_token={token}
            contract_id={contract_id}
            item_id={item_id}
            node_ids={node_ids}
          />
        )}
        </div>
      )}
    </div>
  )
}

export default App