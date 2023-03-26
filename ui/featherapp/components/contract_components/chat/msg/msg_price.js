import { CurrencyDollarIcon } from '@heroicons/react/outline'
import {editTypes, decisionTypes} from "../../../../services/chat.service"
import { ArrowRightIcon } from '@heroicons/react/solid'
import DecideButton from "../../decide_button";
import { useEffect, useState } from "react";
import { reactPrice, updateLocalPrice } from "../../../../reducers/contract/dispatchers/contract.price.dispatcher"
import { finishedReload } from '../../../../reducers/chat/dispatchers/chat.dispatcher'
import { resolTypes } from "../../../../services/chat.service"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MsgWrapper from "./components/msg_wrapper"
import MsgDecisionFooter from "./components/msg_decision_footer"
import { displayDecide, assignStatus, fontSize } from "./components/msg_helpers"
import { displayPrice} from "../../../helpers"

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
    assignStatus(props.msg, props.user, props.yourRole, setStatus, setOtherStatus)
    
  }, [props.msg, props.yourRole, props.user, version])

  const acceptChange = () => {
    props.reactPrice(props.curContract.id, props.msg.id, decisionTypes.YES)
  }
  const rejectChange = () => {
    props.reactPrice(props.curContract.id, props.msg.id, decisionTypes.NO)
  }
  
  
  const Icon = () => {
    return (
      <CurrencyDollarIcon className={"text-gray-400 " + (props.msg.isAdmin ? "h-4 w-4" : "h-5 w-5") } aria-hidden="true" />
    )
  }
  return (
    <MsgWrapper msg={props.msg} editString={editString} icon={Icon} embedded={props.embedded}>
      <div className={"mt-2 text-gray-700 " + fontSize(1, props.embedded)}>
        <div className="flex items-center">
          <div className="flex items-center">
            {(props.msg.body.resolStatus === resolTypes.CANCELED || props.msg.body.resolStatus === resolTypes.REJECTED) ? (
              <>
                {(yourStatus === decisionTypes.NO) ? (
                  <>
                    <p className={"mr-1 " + fontSize(3, props.embedded)}>${displayPrice(props.msg.body.oldVersion)}</p>
                    <ArrowRightIcon className="w-4 h-4 text-gray-500"/>
                    <p className={"ml-1 text-gray-400 font-medium " + fontSize(3, props.embedded)}>$<s>{displayPrice(props.msg.body.newVersion)}</s></p>
                  </>
                ) : (
                  <>
                    <p className={"mr-1 " + fontSize(3, props.embedded)}>${displayPrice(props.msg.body.oldVersion)}</p>
                    <ArrowRightIcon className="w-4 h-4 text-gray-500"/>
                    <p className={"ml-1 text-gray-400 font-medium " + fontSize(3, props.embedded)}>$<s>{displayPrice(props.msg.body.newVersion)}</s></p>
                  </>
                )}
              </>
            ) : (
              <>
                {(yourStatus === decisionTypes.NO) ? (
                  <>
                    <p className={"mr-1  " + fontSize(3, props.embedded)}>${displayPrice(props.msg.body.oldVersion)}</p>
                    <ArrowRightIcon className="w-4 h-4 text-gray-500"/>
                    <p className={"ml-1 text-gray-400 font-medium " + fontSize(3, props.embedded)}>$<s>{displayPrice(props.msg.body.newVersion)}</s></p>
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
          embedded={props.embedded}
          msg={props.msg} 
          yourStatus={yourStatus} 
          otherStatus={otherStatus} 
          adminStatus={props.msg.adminStatus}
          otherUsername={otherUsername} />
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