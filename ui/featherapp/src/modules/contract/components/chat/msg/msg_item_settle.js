import { DocumentIcon } from '@heroicons/react/outline'
import ChatLabel from "../chat_label"
import {editTypes, decisionTypes} from "../../../../../services/chat.service"
import {WORKER_TYPE, BUYER_TYPE} from "../../../../../services/user.service"
import { ArrowRightIcon } from '@heroicons/react/solid'
import DecideButton from "../../decide_button";
import { useEffect, useState, useMemo } from "react";
import { finishedReload } from '../../../../../reducers/chat/dispatchers/chat.dispatcher'
import { resolTypes } from "../../../../../services/chat.service"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ITEM_APPROVED, ITEM_REJECTED, ITEM_PENDING } from "../../../../../custom_encodings"
import MsgWrapper from "./components/msg_wrapper"
import { displayDecide, fontSize } from "./components/msg_helpers"

const ItemSettleMsg = (props) => {

  let editString = "Settled"
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

  useEffect( () => {
    if (props.reloaded === true) {
      if ((version+1) > 1) {
        props.updateLocalItemAdd(props.msg)
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
  
  
  const Icon = () => {
    return (
      <DocumentIcon className={"text-gray-400 " + (props.msg.isAdmin ? "h-4 w-4" : "h-5 w-5") } aria-hidden="true" />
    )
  }
  return (
    <MsgWrapper msg={props.msg} editString={editString} icon={Icon} embedded={props.embedded}> 
      <div className={"mt-2 text-gray-700 " + fontSize(1, props.embedded)}>
        <div>
            {props.msg.isAdmin ? (
              <div className="flex items-center justify-between">
                {props.msg.body.itemAdminSettle === ITEM_APPROVED ? (
                  <p className="text-grey-400 mr-1">Admin overrode the settlment to be {" "}
                    <b className="text-primary4">approved</b>
                  </p>
                ) : props.msg.body.itemAdminSettle === ITEM_REJECTED ? (
                  <p className="text-grey-400 mr-1">Admin overrode the settlment to be {" "}
                    <b className="text-red-400">rejected</b>
                  </p>
                ) : (
                  <p className="text-grey-400 mr-1">Admin undid override</p>
                )}
              </div>
            ) : !props.user.adminStatus ? (
            <div className="flex">
              <div className="flex items-center justify-between">
                <p className="text-grey-400 mr-1">You{" "}
                {props.msg.body.itemWorkerSettle === ITEM_APPROVED && props.yourRole === WORKER_TYPE ? (
                  <b className="text-primary4">approved</b>
                ) : props.msg.body.itemWorkerSettle === ITEM_REJECTED && props.yourRole === WORKER_TYPE ? (
                  <b className="text-red-400">rejected</b>
                ) : props.msg.body.itemBuyerSettle === ITEM_APPROVED && props.yourRole === BUYER_TYPE ? (
                  <b className="text-primary4">approved</b>
                ) : props.msg.body.itemBuyerSettle === ITEM_REJECTED && props.yourRole === BUYER_TYPE ? (
                  <b className="text-red-400">rejected</b>
                ) : (
                  <b className="text-gray-400 font-normal">are still deciding</b>
                )}
                </p>
              </div>
              <div>
                <p className="text-grey-400">{otherUsername}{" "}
                {props.msg.body.itemWorkerSettle === ITEM_APPROVED && props.yourRole === BUYER_TYPE ? (
                  <b className="text-primary4">approved</b>
                ) : props.msg.body.itemWorkerSettle === ITEM_REJECTED && props.yourRole === BUYER_TYPE ? (
                  <b className="text-red-400">rejected</b>
                ) : props.msg.body.itemBuyerSettle === ITEM_APPROVED && props.yourRole === WORKER_TYPE ? (
                  <b className="text-primary4">approved</b>
                ) : props.msg.body.itemBuyerSettle === ITEM_REJECTED && props.yourRole === WORKER_TYPE ? (
                  <b className="text-red-400">rejected</b>
                ) : (
                  <b className="text-gray-400 font-normal">is still deciding</b>
                )}
                </p>
              </div>
            </div>
            ) : (
            <div className="flex">
              <div className="flex items-center justify-between">
                <p className="text-grey-400 mr-1">Worker{" "}
                  {props.msg.body.itemWorkerSettle === ITEM_APPROVED ? (
                    <b className="text-primary4">approved</b>
                  ) : props.msg.body.itemWorkerSettle === ITEM_REJECTED && props.yourRole === WORKER_TYPE ? (
                    <b className="text-red-400">rejected</b>
                  ) : (
                    <b className="text-gray-400 font-normal">is still deciding</b>
                  )}
                </p>
              </div>
              <div>
                <p className="text-grey-400 mr-1">Buyer{" "}
                  {props.msg.body.itemWorkerSettle === ITEM_APPROVED ? (
                    <b className="text-primary4">approved</b>
                  ) : props.msg.body.itemWorkerSettle === ITEM_REJECTED && props.yourRole === WORKER_TYPE ? (
                    <b className="text-red-400">rejected</b>
                  ) : (
                    <b className="text-gray-400 font-normal">is still deciding</b>
                  )}
                </p>
              </div>
            </div>  
            )}
        </div>
        

        
      </div>
    </MsgWrapper>

  )
}

const mapStateToProps = ({ user, contract }) => ({
  curContract: contract.curContract,
  user: user.user,
})
  
const mapDispatchToProps = (dispatch) => bindActionCreators({
  finishedReload,
}, dispatch)
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemSettleMsg)