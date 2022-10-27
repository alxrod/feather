import { ChatAltIcon } from '@heroicons/react/solid'
import ChatLabel from "../chat_label"
import { useState, useEffect } from "react"
import MsgWrapper from "./components/msg_wrapper"

export default (props) => {
  const genTimeString = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString([], {timeStyle: 'short'}) + " " + date.toLocaleDateString() 
  }

  return (
    <MsgWrapper msg={props.msg} editString={"Commented"}>
        <div className="mt-2 text-sm text-gray-700">
          <p>{props.msg.body.message}</p>
        </div>
    </MsgWrapper>
  )
}
