import {LockOpenIcon} from "@heroicons/react/outline"
import { LockClosedIcon } from '@heroicons/react/solid'
import {editTypes, decisionTypes} from "../../../../services/chat.service"
import {WORKER_TYPE, BUYER_TYPE} from "../../../../services/user.service"
import DecideButton from "../../decide_button";
import { useEffect, useState } from "react";
import { reactLock, updateLocalLock } from "../../../../reducers/contract/dispatchers/contract.lock.dispatcher"
import { finishedReload } from '../../../../reducers/chat/dispatchers/chat.dispatcher'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MsgWrapper from "./components/msg_wrapper"
import MsgDecisionFooter from "./components/msg_decision_footer"
import { displayDecide, fontSize } from "./components/msg_helpers"

const ContractLockMsg = (props) => {
  const genTimeString = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString([], {timeStyle: 'short'}) + " " + date.toLocaleDateString() 
  }

  let editString = "Requested"
  if (props.msg.type === editTypes.APPROVE) {
    editString = "Approved"
  } else if (props.msg.type === editTypes.REJECT) {
    editString = "Rejected"
  } 

  const [yourStatus, setStatus] = useState(decisionTypes.UNDECIDED)

  const [otherUsername, setOtherUsername] = useState("")
  const [otherStatus, setOtherStatus] = useState(0)
  const [version, setVersion] = useState(1)
  

  useEffect( () => {
    if (props.reloaded === true) {
      if ((version+1) > 1) {
        props.updateLocalLock(props.msg.body.contractLock)
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
    props.reactLock(props.curContract.id, props.msg.id, decisionTypes.YES)
  }
  const rejectChange = () => {
    props.reactLock(props.curContract.id, props.msg.id, decisionTypes.NO)
  }
  
  
  const Icon = () => {
    if (props.msg.body.contractLock) {
      return (
        <LockOpenIcon className={"text-gray-400 " + (props.msg.isAdmin ? "h-4 w-4" : "h-5 w-5") } aria-hidden="true" />
      )
    } else {
      return (
        <LockClosedIcon className={"text-gray-400 " + (props.msg.isAdmin ? "h-4 w-4" : "h-5 w-5") } aria-hidden="true" />
      )
    }
    
  }
  return (
    <MsgWrapper msg={props.msg} editString={editString} icon={Icon} embedded={props.embedded}>
      <div className={"mt-2 text-gray-700 " + fontSize(1, props.embedded)}>
        <div className={props.embedded ? "" : "flex items-center"}>
          <div className="flex items-center">
            {props.msg.isAdmin ? (
              <h3 className={"text-gray-400 font-medium " + fontSize(3, props.embedded)}>{props.msg.user.username}{" "}<b className="text-primary4">{props.msg.body.contractLock ? "closed" : "opened"}</b>{" the edit lock"}</h3>              
            ) : (
              <h3 className={"text-gray-400 font-medium " + fontSize(3, props.embedded)}>{props.msg.user.username}{" requested to "}<b className="text-primary4">{props.msg.body.contractLock ? "close" : "open"}</b>{" the edit lock"}</h3>              
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

const mapStateToProps = ({ user, contract, deadlines }) => ({
  curContract: contract.curContract,
  user: user.user,
  deadlines: deadlines.deadlines,
})
  
const mapDispatchToProps = (dispatch) => bindActionCreators({
  reactLock,
  updateLocalLock,
  finishedReload,
}, dispatch)
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractLockMsg)