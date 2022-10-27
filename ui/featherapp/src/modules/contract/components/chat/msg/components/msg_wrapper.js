import { ChatAltIcon } from '@heroicons/react/solid'
import ChatLabel from "../../chat_label"
import { useState, useEffect } from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
export default (props) => {
  const genTimeString = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString([], {timeStyle: 'short'}) + " " + date.toLocaleDateString() 
  }

  return (
    <>
      <div className="relative">
        <img
          className={"h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center " + (props.msg.isAdmin ? "ring-2 ring-indigo-500" : "ring-8 ring-white")}
          src={"https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"}
          alt=""
        />

        <span className={"absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px " + (props.msg.isAdmin ? "border-2 border-indigo-500" : "")}>
          <ChatAltIcon className={"text-gray-400 " + (props.msg.isAdmin ? "h-4 w-4" : "h-5 w-5") } aria-hidden="true" />
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div>
          <div className="text-sm flex justify-start items-center">
            <p className={"font-medium " + (props.msg.isAdmin ? "text-indigo-600" : "text-gray-900")}>
              {props.msg.user.username}
            </p>
            {props.msg.isAdmin && (
              <p className={"text-xs text-gray-400 ml-2"}>
                <i>(admin)</i>
              </p>
            )}
          </div>
          <div className="flex flex-wrap ">
            <p className="mt-0.5 text-sm text-gray-500 mr-1">{props.editString} at {genTimeString(props.msg.timestamp)}</p><ChatLabel label={props.msg.label}/>
          </div>
        </div>
        {props.children}
      </div>
    </>

  )
}
