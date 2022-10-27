import { CurrencyDollarIcon } from '@heroicons/react/outline'
import ChatLabel from "../chat_label"
import {editTypes, decisionTypes} from "../../../../../services/chat.service"
import {WORKER_TYPE, BUYER_TYPE} from "../../../../../services/user.service"
import { ArrowRightIcon } from '@heroicons/react/solid'
import DecideButton from "../../decide_button";
import { useEffect, useState } from "react";
import { reactPrice, updateLocalPrice } from "../../../../../reducers/contract/dispatchers/contract.price.dispatcher"
import { finishedReload } from '../../../../../reducers/chat/dispatchers/chat.dispatcher'
import { resolTypes } from "../../../../../services/chat.service"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MsgWrapper from "./components/msg_wrapper"
import MsgDecisionFooter from "./components/msg_decision_footer"

const PriceMsg = (props) => {
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

  const [otherUsername, setOtherUsername] = useState("")
  const [otherStatus, setOtherStatus] = useState(0)
  const [version, setVersion] = useState(1)
  

  useEffect( () => {
    if (props.reloaded === true) {
      if ((version+1) > 1) {
        props.updateLocalPrice(props.msg)
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
      // console.log("New Status for " + props.msg.id)
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
    props.reactPrice(props.curContract.id, props.msg.id, decisionTypes.YES)
  }
  const rejectChange = () => {
    props.reactPrice(props.curContract.id, props.msg.id, decisionTypes.NO)
  }
  
  

  return (
    <MsgWrapper msg={props.msg} editString={editString}>
      <div className="mt-2 text-sm text-gray-700">
        <div className="flex items-center">
          <div className="flex items-center">
            {(props.msg.body.resolStatus === resolTypes.CANCELED || props.msg.body.resolStatus === resolTypes.REJECTED) ? (
              <>
                {(yourStatus === decisionTypes.NO) ? (
                  <>
                    <p className="mr-1 text-lg">${props.msg.body.oldVersion}</p>
                    <ArrowRightIcon className="w-4 h-4 text-gray-500"/>
                    <p className="ml-1 text-gray-400 text-lg font-medium">$<s>{props.msg.body.newVersion}</s></p>
                  </>
                ) : (
                  <>
                    <p className="mr-1 text-lg">${props.msg.body.oldVersion}</p>
                    <ArrowRightIcon className="w-4 h-4 text-gray-500"/>
                    <p className="ml-1 text-gray-400 text-lg font-medium">$<s>{props.msg.body.newVersion}</s></p>
                  </>
                )}
              </>
            ) : (
              <>
                {(yourStatus === decisionTypes.NO) ? (
                  <>
                    <p className="mr-1 text-lg">${props.msg.body.oldVersion}</p>
                    <ArrowRightIcon className="w-4 h-4 text-gray-500"/>
                    <p className="ml-1 text-gray-400 text-lg font-medium">$<s>{props.msg.body.newVersion}</s></p>
                  </>
                ) : (
                  <>
                    <p className="mr-1 text-lg">${props.msg.body.oldVersion}</p>
                    <ArrowRightIcon className="w-4 h-4 text-gray-500"/>
                    <p className="ml-1 text-green text-lg font-medium">${props.msg.body.newVersion}</p>
                  </>
                )}
              </>
            )}

            
          </div>
          <div className="w-6"></div>
          <div className="w-16">
            {(yourStatus == decisionTypes.UNDECIDED) && (
              <DecideButton 
                approve={acceptChange}
                reject={rejectChange}
              />
            )} 
          </div>
        </div>
        <MsgDecisionFooter msg={props.msg} yourStatus={yourStatus} otherStatus={otherStatus} otherUsername={otherUsername} />
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
  reactPrice,
  updateLocalPrice,
  finishedReload,
}, dispatch)
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PriceMsg)