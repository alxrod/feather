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
            <p className="mt-0.5 text-sm text-gray-500 mr-1">{editString + ' '} at {genTimeString(props.msg.timestamp)}</p><ChatLabel label={props.msg.label}/>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-700">
          <div className="flex">
              <div className="flex items-center justify-between">
                <p className="text-grey-400 mr-1">You{" "}
                {props.msg.body.itemWorkerSettle === ITEM_APPROVED && props.yourRole === WORKER_TYPE ? (
                  <b className="text-green">approved</b>
                ) : props.msg.body.itemWorkerSettle === ITEM_REJECTED && props.yourRole === WORKER_TYPE ? (
                  <b className="text-red">rejected</b>
                ) : props.msg.body.itemBuyerSettle === ITEM_APPROVED && props.yourRole === BUYER_TYPE ? (
                  <b className="text-green">approved</b>
                ) : props.msg.body.itemBuyerSettle === ITEM_REJECTED && props.yourRole === BUYER_TYPE ? (
                  <b className="text-red">rejected</b>
                ) : (
                  <b className="text-gray-400 font-normal">are still deciding</b>
                )}
                </p>
              </div>
              <div>
                <p className="text-grey-400">{otherUsername}{" "}
                {props.msg.body.itemWorkerSettle === ITEM_APPROVED && props.yourRole === BUYER_TYPE ? (
                  <b className="text-green">approved</b>
                ) : props.msg.body.itemWorkerSettle === ITEM_REJECTED && props.yourRole === BUYER_TYPE ? (
                  <b className="text-red">rejected</b>
                ) : props.msg.body.itemBuyerSettle === ITEM_APPROVED && props.yourRole === WORKER_TYPE ? (
                  <b className="text-green">approved</b>
                ) : props.msg.body.itemBuyerSettle === ITEM_REJECTED && props.yourRole === WORKER_TYPE ? (
                  <b className="text-red">rejected</b>
                ) : (
                  <b className="text-gray-400 font-normal">are still deciding</b>
                )}
                </p>
              </div>
          </div>
          

          
        </div>
      </div>
    </>

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