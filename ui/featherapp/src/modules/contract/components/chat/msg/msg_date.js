import { CalendarIcon } from '@heroicons/react/outline'
import ChatLabel from "../chat_label"
import {editTypes, decisionTypes} from "../../../../../services/chat.service"
import {WORKER_TYPE, BUYER_TYPE} from "../../../../../services/user.service"
import { ArrowRightIcon } from '@heroicons/react/solid'
import DecideButton from "../../decide_button";
import { useEffect, useState } from "react";
import { reactDate, updateLocalDate } from "../../../../../reducers/deadlines/dispatchers/deadlines.date.dispatcher"
import { finishedReload } from '../../../../../reducers/chat/dispatchers/chat.dispatcher'
import { resolTypes } from "../../../../../services/chat.service"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MsgWrapper from "./components/msg_wrapper"
import MsgDecisionFooter from "./components/msg_decision_footer"
import { displayDecide } from "./components/msg_helpers"

const DateMsg = (props) => {

  let editString = "Suggested"
  if (props.msg.type === editTypes.APPROVE) {
    editString = "Approved"
  } else if (props.msg.type === editTypes.REJECT) {
    editString = "Rejected"
  } 
  const genTimeString = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString([], {timeStyle: 'short'}) + " " + date.toLocaleDateString() 
  }

  const [yourStatus, setStatus] = useState(decisionTypes.UNDECIDED)

  const [otherUsername, setOtherUsername] = useState("")
  const [otherStatus, setOtherStatus] = useState(0)

  const [version, setVersion] = useState(1)
  const [deadlineName, setDeadlineName] = useState("Deadline")

  useEffect( () => {
    if (props.reloaded === true) {
      if ((version+1) > 1) {
        props.updateLocalDate(props.msg)
      }
      setVersion(version+1)
      props.finishedReload()
    }
  }, [props.reloaded])

  useEffect( () => {
    if (props.curContract.id) {
      if (props.curContract.worker.username === props.user.username) {
        setOtherUsername(props.curContract.buyer.username)
      } else {
        setOtherUsername(props.curContract.worker.username)
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

  useEffect( () => {
    if (props.msg) {
      if (props.yourRole == WORKER_TYPE) {
        setStatus(props.msg.body.workerStatus)
        setOtherStatus(props.msg.body.buyerStatus)
      } else if (props.yourRole == BUYER_TYPE) {
        setStatus(props.msg.body.buyerStatus)
        setOtherStatus(props.msg.body.workerStatus)
      } 
    }
    
  }, [props.msg, props.yourRole, version])

  const acceptChange = () => {
    props.reactDate(props.curContract.id, props.msg.id, props.msg.body.deadlineId, decisionTypes.YES)
    console.log("Accepting change")
  }
  const rejectChange = () => {
    props.reactDate(props.curContract.id, props.msg.id, props.msg.body.deadlineId, decisionTypes.NO)
    console.log("Rejecting change")
  }

  const Icon = () => {
    return (
      <CalendarIcon className={"text-gray-400 " + (props.msg.isAdmin ? "h-4 w-4" : "h-5 w-5") } aria-hidden="true" />
    )
  }
  return (
    <MsgWrapper embedded={props.embedded} msg={props.msg} editString={editString} icon={Icon}>
      <div className="mt-2 text-sm text-gray-700">
        <div className="flex items-center">
          <div className="flex flex-wrap items-center">
              {(props.msg.body.resolStatus === resolTypes.CANCELED || props.msg.body.resolStatus === resolTypes.REJECTED) ? (
                  <>
                  {(yourStatus === decisionTypes.NO) ? (
                      <>
                      <p className="mr-1 text-md">{genTimeString(props.msg.body.oldVersion)}</p>
                      <ArrowRightIcon className="w-4 h-4 text-gray-500"/>
                      <p className="ml-1 text-gray-400 text-md font-medium"><s>{genTimeString(props.msg.body.newVersion)}</s></p>
                      </>
                  ) : (
                      <>
                      <p className="mr-1 text-md">{genTimeString(props.msg.body.oldVersion)}</p>
                      <ArrowRightIcon className="w-4 h-4 text-gray-500"/>
                      <p className="ml-1 text-gray-400 text-md font-medium"><s>{genTimeString(props.msg.body.newVersion)}</s></p>
                      </>
                  )}
                  </>
              ) : (
                  <>
                  {(yourStatus === decisionTypes.NO) ? (
                      <>
                      <p className="mr-1 text-md">{genTimeString(props.msg.body.oldVersion)}</p>
                      <ArrowRightIcon className="w-4 h-4 text-gray-500"/>
                      <p className="ml-1 text-gray-400 text-md font-medium"><s>{genTimeString(props.msg.body.newVersion)}</s></p>
                      </>
                  ) : (
                      <>
                      <p className="mr-1 text-md">{genTimeString(props.msg.body.oldVersion)}</p>
                      <ArrowRightIcon className="w-4 h-4 text-gray-500"/>
                      <p className="ml-1 text-green text-md font-medium">{genTimeString(props.msg.body.newVersion)}</p>
                      </>
                  )}
                  </>
              )}

            
          </div>
          <div className="w-6"></div>
          <div className="w-16">
            {(displayDecide(props.msg, yourStatus, props.user, props.embedded)) && (
              <DecideButton 
                approve={acceptChange}
                reject={rejectChange}
              />
            )} 
          </div>
        </div>
        <MsgDecisionFooter 
          msg={props.msg} 
          embedded={props.embedded}
          yourStatus={yourStatus} 
          otherStatus={otherStatus} 
          adminStatus={props.msg.adminStatus}
          otherUsername={otherUsername}
        />
      </div>
    </MsgWrapper>

  )
}

const mapStateToProps = ({ user, contract, deadlines}) => ({
  curContract: contract.curContract,
  deadlines: deadlines.deadlines,
  user: user.user,
})
  
const mapDispatchToProps = (dispatch) => bindActionCreators({
  reactDate,
  updateLocalDate,
  finishedReload,
}, dispatch)
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateMsg)