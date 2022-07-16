import { ChatAltIcon } from '@heroicons/react/solid'
import ChatLabel from "../chat_label"
import {editTypes, decisionTypes} from "../../../../../services/chat.service"
import {WORKER_TYPE, BUYER_TYPE} from "../../../../../services/user.service"
import { ArrowRightIcon } from '@heroicons/react/solid'
import DecideButton from "../../decide_button";
import { useEffect, useState } from "react";


const modes = {
  DECIDING: 1,
  APPROVED: 2,
  REJECTED: 3,
}
export default (props) => {
  const genTimeString = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString([], {timeStyle: 'short'}) + " " + date.toLocaleDateString() 
  }

  let editString = "Suggested"
  if (props.msg.type === editTypes.APPROVE) {
    editString = "Approved"
  } else if (props.msg.type === editTypes.REJECT) {
    editString = "Rejected"
  } 

  const [yourStatus, setStatus] = useState(decisionTypes.UNDECIDED)
  console.log("Msg:")
  console.log(props.msg)
  console.log(props.yourRole)

  useEffect( () => {
    if (props.yourRole == WORKER_TYPE) {
      setStatus(props.msg.body.workerStatus)
    } else if (props.yourRole == BUYER_TYPE) {
      setStatus(props.msg.body.buyerStatus)
    } 
  }, [props.msg, props.yourRole])

  
  

  return (
    <>
      <div className="relative">
        <img
          className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
          src={"https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"}
          alt=""
        />

        <span className="absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px">
          <ChatAltIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div>
          <div className="text-sm">
            <a href={"#"} className="font-medium text-gray-900">
              {props.msg.user.username}
            </a>
          </div>
          <div className="flex">
            <p className="mt-0.5 text-sm text-gray-500 mr-1">{editString + ' '} at {genTimeString(props.msg.timestamp)}</p><ChatLabel label={props.msg.label}/>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-700">
          <div className="flex items-center">
            <div className="flex items-center">
              <p className="mr-1 text-lg">${props.msg.body.oldVersion}</p>
              <ArrowRightIcon className="w-4 h-4 text-gray-500"/>
              <p className="ml-1 text-green text-lg font-medium">${props.msg.body.newVersion}</p>
            </div>
            <div className="w-6"></div>
            <div className="w-16">
              {(yourStatus == decisionTypes.UNDECIDED) && (
                <DecideButton/>
              )} 
            </div>
          </div>
          {(yourStatus == decisionTypes.YES) && (
              <div className="flex items-center justify-between">
                <p className="text-grey-400 mr-2">You <b className="text-green">approved</b> this change</p>
                <button><u><i className="text-grey-100">undo</i></u></button>
              </div>
            )}
            {(yourStatus == decisionTypes.NO) && (
              <div>
                <p className="text-red">You rejected this change</p>
                <button className="text-red">Undo</button>
              </div>
            )}
          

          
        </div>
      </div>
    </>

  )
}
