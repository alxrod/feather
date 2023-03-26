import { CalendarIcon } from '@heroicons/react/outline'
import {editTypes, decisionTypes} from "../../../../services/chat.service"
import {WORKER_TYPE, BUYER_TYPE} from "../../../../services/user.service"
import { ArrowRightIcon } from '@heroicons/react/solid'
import DecideButton from "../../decide_button";
import { useEffect, useState } from "react";
import { reactPayout, updateLocalPayout } from "../../../../reducers/deadlines/dispatchers/deadlines.payout.dispatcher"
import { finishedReload } from '../../../../reducers/chat/dispatchers/chat.dispatcher'
import { resolTypes } from "../../../../services/chat.service"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MsgWrapper from "./components/msg_wrapper"
import MsgDecisionFooter from "./components/msg_decision_footer"
import { displayDecide, fontSize } from "./components/msg_helpers"
import { displayPrice} from "../../../helpers"

const PayoutMsg = (props) => {

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

  const [deadlineName, setDeadlineName] = useState("the current deadline")

  const [version, setVersion] = useState(1)
  useEffect( () => {
    if (props.reloaded === true) {
      if ((version+1) > 1) {
        props.updateLocalPayout(props.msg)
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

  useEffect( () => {
    for (let i = 0; i < props.deadlines.length; i++) {
      if (props.deadlines[i].id === props.msg.body.deadlineId) {
        setDeadlineName(props.deadlines[i].name)
      }
    }
  }, [props.deadlines.length])

  const acceptChange = () => {
    props.reactPayout(props.curContract.id, props.msg.id, props.msg.body.deadlineId, decisionTypes.YES)
  }
  const rejectChange = () => {
    props.reactPayout(props.curContract.id, props.msg.id, props.msg.body.deadlineId, decisionTypes.NO)
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
          <div className="flex items-center">
              <p className={"text-gray-400 mr-2 " + fontSize(3, props.embedded)}>{"Payout"}</p>
              {(props.msg.body.resolStatus === resolTypes.CANCELED || props.msg.body.resolStatus === resolTypes.REJECTED) ? (
                  <>
                  {(yourStatus === decisionTypes.NO) ? (
                      <>
                      <p className={"mr-1 " + fontSize(3, props.embedded)}>{displayPrice(props.msg.body.oldVersion)}%</p>
                      <ArrowRightIcon className="w-4 h-4 text-gray-500"/>
                      <p className={"ml-1 text-gray-400 font-medium " + fontSize(3, props.embedded)}><s>{displayPrice(props.msg.body.newVersion)}</s>%</p>
                      </>
                  ) : (
                      <>
                      <p className={"mr-1 " + fontSize(3, props.embedded)}>${displayPrice(props.msg.body.oldVersion)}</p>
                      <ArrowRightIcon className="w-4 h-4 text-gray-500"/>
                      <p className={"ml-1 text-gray-400 font-medium " + fontSize(3, props.embedded)}><s>{displayPrice(props.msg.body.newVersion)}</s>%</p>
                      </>
                  )}
                  </>
              ) : (
                  <>
                  {(yourStatus === decisionTypes.NO) ? (
                      <>
                      <p className={"mr-1 " + fontSize(3, props.embedded)}>{displayPrice(props.msg.body.oldVersion)}%</p>
                      <ArrowRightIcon className="w-4 h-4 text-gray-500"/>
                      <p className={"ml-1 text-gray-400 font-medium " + fontSize(3, props.embedded)}><s>${displayPrice(props.msg.body.newVersion)}</s></p>
                      </>
                  ) : (
                      <>
                      <p className={"mr-1 " + fontSize(3, props.embedded)}>${displayPrice(props.msg.body.oldVersion)}</p>
                      <ArrowRightIcon className="w-4 h-4 text-gray-500"/>
                      <p className={"ml-1 text-primary4 font-medium " + fontSize(3, props.embedded)}>${displayPrice(props.msg.body.newVersion)}</p>
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

const mapStateToProps = ({ user, contract, deadlines }) => ({
  curContract: contract.curContract,
  user: user.user,
  deadlines: deadlines.deadlines,
})
  
const mapDispatchToProps = (dispatch) => bindActionCreators({
  reactPayout,
  updateLocalPayout,
  finishedReload,
}, dispatch)
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PayoutMsg)