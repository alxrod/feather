import React, {useState, useRef, useEffect} from "react";
import ApiService from "../api.service"
import { RpcError } from "@protobuf-ts/runtime-rpc"
import { 
  ContractEditResponse
} from "../proto/communication/contract";
import {Oval} from 'react-loading-icons'

const ContractListCard = (props: any) => {

  const [contractNubs, setContractNubs] = useState([] as any[])
  const [genError, setGenError] = useState("")

  useEffect(() => {
    if (contractNubs.length === 0) {
      ApiService.setItemFigmaNodes(
        props.user_id,
        props.user_token,
        props.contract_id,
        props.item_id,
        props.node_ids
      ).then(
        (resp: ContractEditResponse) => {
          window.parent.postMessage( {pluginMessage: {type: "close", payload: {}}}, '*')
        },
        (err: RpcError) => {
          console.log("ERROR: ", err)
          window.parent.postMessage( {pluginMessage: {type: "close", payload: {}}}, '*')
        }
      )
    }
  }, [])
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Oval className="w-32 h-32" stroke={"#7993A0"} fill={"#7993A0"} strokeWidth={4}/>
    </div>
  )
}

export default ContractListCard