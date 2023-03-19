import React, {useState, useRef, useEffect} from "react";
import ApiService from "../api.service"
import { RpcError } from "@protobuf-ts/runtime-rpc"
import { 
  ContractEditResponse
} from "../proto/communication/contract";
import {Oval} from 'react-loading-icons'
import ComponentSelect from "./ComponentSelect"
const ContractListCard = (props: any) => {
  const [selectedComponent, setSelectedComponent] = useState(props.component_options.length > 0 ? props.component_options[0] : null)
  
  const setItemNode = () => {
    ApiService.setItemFigmaNodes(
      props.user_id,
      props.user_token,
      props.contract_id,
      props.item_id,
      selectedComponent.id
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
  return (
    <div className="w-full h-full">
      <h1 className="font-bold text-2xl">Choose a component for this item</h1>
      {props.component_options.length > 0 ? (
        <>
          <p className="text-gray-400 text-sm">If you don't have any components, create one for your assets for the contract.</p>
          <ComponentSelect component_options={props.component_options} selected={selectedComponent} setSelected={setSelectedComponent}/>
          <div className="h-12"></div>
          <div className="flex justify-center w-full">
            <button 
              className="bg-primary5 font-bold text-white shadow-sm px-4 py-2 rounded-md"
              onClick={setItemNode}
            >
              Set Item Assets to {selectedComponent.name}
            </button>
          </div>
        </>
      ) : (
        <p className="mt-4 text-red-400 text-center">
          You need to create a component before you can set the item assets
        </p>
      )}
    </div>
  )
}

export default ContractListCard