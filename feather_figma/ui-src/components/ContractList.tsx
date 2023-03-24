import React, {useState, useRef, useEffect} from "react";
import ApiService from "../api.service"
import { RpcError } from "@protobuf-ts/runtime-rpc"
import { 
  ContractNubSet,
  ContractNub,
  ContractEditResponse
} from "../proto/communication/contract";
import ContractNubView from "./ContractNub";
import {contractStages} from "../api.service";

export const isValidUrl = (urlString: string) => {
  var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
  return !!urlPattern.test(urlString);
}

export const getKey = (link: string) => {
  if (link === "" || link === undefined) {
    return ""
  }
  const spl = link.split("file/")
  if (spl.length < 2) {
    return ""
  }
  const spl2 = spl[1].split("/")
  return spl2[0]
}

const ContractListCard = (props: any) => {

  const [contractNubs, setContractNubs] = useState([] as any[])
  const [genError, setGenError] = useState("")
  const [link, setLink] = useState("")
  const [linkInContracts, setLinkInContracts] = useState(false)
  

  const changeLink = (e:any) => {
    const newVal = e.target.value
    setLink(newVal)
    if (isValidUrl(newVal) && (newVal).includes("figma.com/file/")) {
      
      setGenError("")
      
      for (let i = 0; i < contractNubs.length; i++) {
        if (getKey(contractNubs[i].figmaLink) == getKey(newVal)) {
          setLinkInContracts(true)
          break
        }
      }
    }
  }


  const selectContract = (contract_id: string) => {
    if (!isValidUrl(link)) {
      setGenError("You did not enter a valid link")
      return
    } else if (!link.includes("figma.com/file/")) {
      setGenError("That is not a figma link")
      return
    }
    ApiService.confirmContractConnected(
      contract_id,
      props.user_id, 
      link,
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
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          This File's Shareable Link
        </label>
        {genError !== "" && (
          <p className="text-red-400">{genError}</p>
        )}
        <div className="mt-1 mb-2">
          <input
            id="link"
            name="link"
            type="text"
            required
            value={link}
            onChange={changeLink}
            placeholder="Click Share then paste here"
            className={
              `appearance-none block w-full px-3 py-2 border border-gray-300 
              rounded-md shadow-sm placeholder-gray-400 focus:outline-none
              focus:ring-primary4 focus:border-primary4 sm:text-sm `}
          />
        </div>
      </div>
      

      <p className="block text-sm font-medium text-gray-700 mb-1">
        Then click the contract you want to connect to:
      </p>
      {contractNubs.filter(contract => contract.stage > contractStages.CREATE).map((contract) => (
        <div key={contract.id} className="mb-2">
          <ContractNubView contract={contract} selectContract={selectContract} link={link} linkInContracts={linkInContracts}/>
        </div>
      ))}
    </div>
  )
}

export default ContractListCard