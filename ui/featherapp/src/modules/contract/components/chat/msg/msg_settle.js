import { DocumentIcon } from '@heroicons/react/outline'
import ChatLabel from "../chat_label"
import {editTypes, decisionTypes} from "../../../../../services/chat.service"
import {WORKER_TYPE, BUYER_TYPE} from "../../../../../services/user.service"
import { ArrowRightIcon } from '@heroicons/react/solid'
import DecideButton from "../../decide_button";
import { useEffect, useState } from "react";
import { finishedReload } from '../../../../../reducers/chat/dispatchers/chat.dispatcher'
import { resolTypes } from "../../../../../services/chat.service"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const ContractSettleMsg = (props) => {
  const [deadlineName, setDeadlineName] = useState("")
  const genTimeString = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString([], {timeStyle: 'short'}) + " " + date.toLocaleDateString() 
  }

  let editString = "Settled"


  const [signerUsername, setSignerUsername] = useState("Unknown")


  useEffect( () => {
    if (props.curContract.id) {
      if (props.msg.body.signerId === props.curContract.buyer.id) {
        setSignerUsername(props.curContract.buyer.username)
      } else if (props.msg.body.signerId === props.curContract.worker.id) {
        setSignerUsername(props.curContract.worker.username)
      }
    }
  }, [props.curContract])

  useEffect( () => {
    for (let i = 0; i < props.deadlines.length; i++) {
      if (props.deadlines[i].id === props.msg.body.deadlineId) {
        setDeadlineName(props.deadlines[i].name)
      }
    }
  }, [props.deadlines.length])

  return (
    <>
      <div className="relative">
        <img
          className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
          src={"https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"}
          alt=""
        />

        <span className="absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px">
          <DocumentIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div>
          <div className="text-sm">
            <a href={"#"} className="font-medium text-gray-900">
              {props.msg.user.username}
            </a>
          </div>
          <div className="flex flex-wrap">
            <p className="mt-0.5 text-sm text-gray-500 mr-1">{editString + ' '} at {genTimeString(props.msg.timestamp)}</p><ChatLabel label={{name: deadlineName}}/>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-700">
          <div className="flex items-center">
            <div className="flex items-center">
              <h3 className="text-xl text-green font-medium">{signerUsername} advanced to settling on {deadlineName}</h3>
            </div>
            <div className="w-6"></div>
          </div>
        </div>
      </div>
    </>

  )
}

const mapStateToProps = ({ user, contract, deadlines }) => ({
  curContract: contract.curContract,
  user: user.user,
  deadlines: deadlines.deadlines,
})
  
const mapDispatchToProps = (dispatch) => bindActionCreators({
  finishedReload,
}, dispatch)
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractSettleMsg)