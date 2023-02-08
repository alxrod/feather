import { ChatAltIcon } from '@heroicons/react/solid'
import ChatLabel from "../chat_label"
import { useState, useEffect } from "react"
import MsgWrapper from "./components/msg_wrapper"
import { fontSize } from './components/msg_helpers'
export default (props) => {

  const genTimeString = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString([], {timeStyle: 'short'}) + " " + date.toLocaleDateString() 
  }
  const Icon = () => {
    return (
      <ChatAltIcon className={"text-gray-400 " + (props.msg.isAdmin ? "h-4 w-4" : "h-5 w-5") } aria-hidden="true" />
    )
  }
  return (
    <MsgWrapper embedded={props.embedded} msg={props.msg} editString={"Commented"} icon={Icon}>
        <div className={"mt-2 text-gray-700 " + fontSize(1, props.embedded)}>
          <p>{props.msg.body.message}</p>
        </div>
    </MsgWrapper>
  )
}
