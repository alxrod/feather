import { CalendarIcon } from '@heroicons/react/outline'
import ChatLabel from "../chat_label"
import {editTypes, decisionTypes} from "../../../../../services/chat.service"
import {WORKER_TYPE, BUYER_TYPE} from "../../../../../services/user.service"
import { ArrowRightIcon } from '@heroicons/react/solid'
import DecideButton from "../../decide_button";
import { useEffect, useState, useMemo } from "react";
import { reactDeleteDeadline, updateLocalDeadlineDelete } from "../../../../../reducers/deadlines/dispatchers/deadlines.delete.dispatcher"
import { finishedReload } from '../../../../../reducers/chat/dispatchers/chat.dispatcher'
import { resolTypes } from "../../../../../services/chat.service"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MsgWrapper from "./components/msg_wrapper"
import MsgDecisionFooter from "./components/msg_decision_footer"
import { displayDecide, fontSize } from "./components/msg_helpers"
import { displayPrice} from "../../../../helpers"

const DeadlineCreateMsg = (props) => {

  let editString = "Deleted"
  if (props.msg.type === editTypes.APPROVE) {
    editString = "Approved"
  } else if (props.msg.type === editTypes.REJECT) {
    editString = "Rejected"
  } 
  const genTimeString = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString([], {timeStyle: 'short'}) + " " + date.toLocaleDateString() 
  }

  const genTimeStringDate = (date) => {
    return date.toLocaleTimeString([], {timeStyle: 'short'}) + " " + date.toLocaleDateString() 
  }
  const [yourStatus, setStatus] = useState(decisionTypes.UNDECIDED)

  const [otherUsername, setOtherUsername] = useState("")
  const [otherStatus, setOtherStatus] = useState(0)

  const [version, setVersion] = useState(1)

  const [deadlineName, setDeadlineName] = useState("Deleted Deadline")

  useEffect( () => {
    if (props.reloaded === true) {
      if ((version+1) > 1) {
        props.updateLocalDeadlineDelete(props.msg)
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
      if (props.deadlines[i].id === props.msg.body.deadline.id) {
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
    props.reactDeleteDeadline(props.curContract.id, props.msg.id, props.msg.body.deadline.id, decisionTypes.YES)
    console.log("Accepting change")
  }
  const rejectChange = () => {
    props.reactDeleteDeadline(props.curContract.id, props.msg.id, props.msg.body.deadline.id, decisionTypes.NO)
    console.log("Rejecting change")
  }

  const Icon = () => {
    return (
      <CalendarIcon className={"text-gray-400 " + (props.msg.isAdmin ? "h-4 w-4" : "h-5 w-5") } aria-hidden="true" />
    )
  }
  return (
    <MsgWrapper msg={props.msg} editString={editString} icon={Icon} embedded={props.embedded}>
      <div className={"mt-2 text-gray-700 " + fontSize(1, props.embedded)}>
        <div className="flex items-center">
          <p className={"text-gray-400 mr-2 " + fontSize(3, props.embedded)}>{"Deleted " + deadlineName}</p>
          <div className="w-2"></div>
          <div className="w-16">
            {(displayDecide(props.msg, yourStatus, props.user, props.embedded)) && (
              <DecideButton 
                approve={acceptChange}
                reject={rejectChange}
              />
            )} 
          </div>
        </div>
        <div className="flex items-center mb-2 border-l-2 border-gray-400 pl-2 ml-2 m-1">
          <div className="flex">
            <p className={"text-red-400 mr-2 " + fontSize(3, props.embedded)}>{"Payout"}</p><p className={"mr-1 text-red " + fontSize(3, props.embedded)}>{displayPrice(props.msg.body.deadline.currentPayout)}%</p>
          </div>
          <p className="text-red-400">on {genTimeStringDate(props.msg.body.deadline.currentDate)}</p>
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

const mapStateToProps = ({ user, contract, deadlines }) => ({
  curContract: contract.curContract,
  deadlines: deadlines.deadlines,
  user: user.user,
})
  
const mapDispatchToProps = (dispatch) => bindActionCreators({
  reactDeleteDeadline,
  updateLocalDeadlineDelete,
  finishedReload,
}, dispatch)
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeadlineCreateMsg)