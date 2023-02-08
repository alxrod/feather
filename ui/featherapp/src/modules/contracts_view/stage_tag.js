import { Fragment } from 'react'
import React, {useState, useEffect} from 'react'

import {contractStages} from "../../services/contract.service"

export default (props) => {
    const [bgColor, setBgColor] = useState("bg-green-400")
    const [stage_text, setStageText] = useState("active")

    useEffect(() => {
        if (props.stage == undefined) {
            return 
        }
        if (props.stage === contractStages.INVITE) {
            setBgColor("bg-yellow-400")
            setStageText("Invited")
        }  
        else if (props.stage === contractStages.NEGOTIATE) {
            setBgColor("bg-yellow-400")
            setStageText("Negotiating")
        } 
        else if (props.stage === contractStages.SIGNED) {
            setBgColor("bg-green-400")
            setStageText("Signed")
        } 
        else if (props.stage === contractStages.ACTIVE) {
            setBgColor("bg-green-400")
            setStageText("Drafting")
        } 
        else if (props.stage === contractStages.SETTLE) {
            setBgColor("bg-yellow-400")
            setStageText("Settling")
        } 
        else if (props.stage === contractStages.COMPLETE) {
            setBgColor("bg-green-400")
            setStageText("Complete")
        } else {
            setBgColor("bg-red-400")
            setStageText("Invalid")
        }
    }, [props.stage])
    return (
        <Fragment key="1">
            <a
            href="#"
            className={"relative inline-flex items-center rounded-full px-3 py-0.5 text-sm " + bgColor}
            >
            <span className="font-medium text-white">{stage_text}</span>
            </a>{' '}
        </Fragment>
    )
}