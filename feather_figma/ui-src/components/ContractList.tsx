import React, {useState, useRef, useEffect} from "react";
import ApiService from "../api.service"
import { RpcError } from "@protobuf-ts/runtime-rpc"
import { 
  ContractNubSet,
  ContractNub,
  ContractEditResponse
} from "../proto/communication/contract";
import ContractNubView from "./ContractNub";

const ContractListCard = (props: any) => {

  const [contractNubs, setContractNubs] = useState([] as any[])
  const [genError, setGenError] = useState("")

  const selectContract = (contract_id: string) => {
    ApiService.confirmContractConnected(
      contract_id,
      props.user_id, 
      props.token,
    ).then(
      (resp: ContractEditResponse) => {
        props.selectedContract(contract_id)
      },
      (err: RpcError) => {
        setGenError(err.message)
      }
    )
    
  }
  useEffect(() => {
    if (contractNubs.length === 0) {
      ApiService.queryContractList(
        props.user_id, 
        props.token,
      ).then(
        (resp: ContractNubSet) => {
          const nubSet = []
          for (let i = 0; i < resp.contractNubs.length; i++) {
            nubSet.push(ContractNub.toJson(resp.contractNubs[i]))
          }
          setContractNubs(nubSet)
        },
        (err: RpcError) => {
          setGenError(err.message)
        }
      )
    }
  }, [])
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Your Contracts: </h1>
      {genError !== "" && (
        <p className="text-red-400">{genError}</p>
      )}
      {contractNubs.map((contract) => (
        <div key={contract.id} className="mb-2">
          <ContractNubView contract={contract} selectContract={selectContract}/>
        </div>
      ))}
    </div>
  )
}

export default ContractListCard