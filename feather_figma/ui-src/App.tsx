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
  "BACKGROUND_CONTRACT_QUERY": 2
}
function App() {
  const [token, setToken] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user_id, setUserId] = useState("")

  const [needLogin, setNeedLogin] = useState(true)
  const [finishedLoading, setFinishedLoading] = useState(false)

  const [displayMode, setDisplayMode] = useState(displayModes["CONTRACTS"])

  const [component_options, setComponentOptions] = useState([])
  const [contract_id, setContractId] = useState("")
  const [contract_secret, setContractSecret] = useState("")
  const [item_id, setItemId] = useState("")

  const selectedContract = (id: string) => {
    ApiService.queryContract(id, user_id, token).then(
      (resp: ContractResponse) => {
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
  useEffect(() => {
    if (displayMode === displayModes["BACKGROUND_CONTRACT_QUERY"] && contract_id !== "" && contract_secret !== "") {
      ApiService.queryContractSummary(contract_id, contract_secret).then(
        (resp: ContractInviteNub) => {
          const jsonContract = ContractInviteNub.toJson(resp)
          window.parent.postMessage(
            {pluginMessage: {type: "updated_contract", payload: jsonContract}}, '*'
          )
        },
        (err: RpcError) => {
          console.log("err: ", err.message)
          window.parent.postMessage(
            {pluginMessage: {type: "close"}}, '*'
          )
        }
      )
    }
  }, [displayMode, contract_id, contract_secret])
  
  window.onmessage = async (event) => {
    if (event.data.pluginMessage.type === 'set_display_mode') {
      setDisplayMode( (displayModes as any)[event.data.pluginMessage.payload] )
    } else if (event.data.pluginMessage.type === 'set_item_options') {
      setItemId(event.data.pluginMessage.payload.item_id)
      setContractId(event.data.pluginMessage.payload.contract_id)
      setComponentOptions(event.data.pluginMessage.payload.component_options)
    } else if (event.data.pluginMessage.type === 'pass_con_creds') {
      console.log("REceived creds:  ", event.data.pluginMessage.payload)
      setContractId(event.data.pluginMessage.payload.id)
      setContractSecret(event.data.pluginMessage.payload.secret)
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
        <div>
        {displayMode === displayModes["CONTRACTS"] ? (
          <div className="px-12">
            <ContractListCard user_id={user_id} token={token} selectedContract={selectedContract}/>
          </div>
        ) : displayMode === displayModes["ITEM_NODES"] ? (
          <div className="px-8">
            <ItemNodeSet 
              user_id={user_id}
              user_token={token}
              contract_id={contract_id}
              item_id={item_id}
              component_options={component_options}
            />
          </div>
        ) : (
          <div></div>
        )}
        </div>
      )}
    </div>
  )
}

export default App