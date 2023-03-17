import React, { useState, useEffect } from "react"
import {contractStages} from "../api.service"


const ContractNub = (props:any) => {
  const [stageBg, setStageBg] = useState("#def7ec")
  const [stageTextColor, setStageTextColor] = useState("#04543e")

  useEffect(() => {
    if (props.contract.stage < contractStages.SETTLE) {
      setStageBg("#fdf6b2")
      setStageTextColor("#723b14")
    }
  }, [props.contract])

  const selectable = (props.contract.figmaLink === "")

  return (
      
      <div style={{opacity: 0.5}} className="overflow-hidden rounded-lg shadow border-2 border-white hover:border-primary5">
        <div className="px-4 py-5 sm:p-6">
        <div className="pb-5">
          <div className="flex flex-wrap justify-between">

            <h1 className="text-lg font-medium leading-6 text-gray-900">{props.contract.title}</h1>
            
            <div className="flex gap-x-2">
              <h3 className="text-lg font-normal leading-6 text-gray-400">${props.contract.price/100}</h3>

              <span style={{backgroundColor: stageBg, color: stageTextColor}}  className={"inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium"}>
                {props.contract.stage === contractStages.CREATE ? (
                  "Created"
                ) : props.contract.stage === contractStages.INVITE ? (
                  "Invited"
                ) : props.contract.stage === contractStages.NEGOTIATE ? (
                  "Negotiating"
                ) : props.contract.stage === contractStages.ACTIVE ? (
                  "Drafting"
                ) : props.contract.stage === contractStages.SETTLE ? (
                  "Settling"
                ) : props.contract.stage === contractStages.COMPLETE ? (
                  "Complete"
                ) : (
                  "Invalid"
                )}
              </span>
              
    

            </div>
          </div>
          <p className="mt-2 max-w-4xl text-sm text-gray-500">
            {props.contract.summary}
          </p>
        </div>
        </div>
      </div>
  )
}
export default ContractNub