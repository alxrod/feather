import { DocumentIcon } from '@heroicons/react/outline'
import ChatLabel from "../chat_label"
import {editTypes, decisionTypes} from "../../../../../services/chat.service"
import {WORKER_TYPE, BUYER_TYPE} from "../../../../../services/user.service"
import { ArrowRightIcon } from '@heroicons/react/solid'
import DecideButton from "../../decide_button";
import { useEffect, useState, useMemo } from "react";
import { reactAddItem, updateLocalItemAdd } from "../../../../../reducers/contract.reducer"
import { finishedReload } from '../../../../../reducers/chat.reducer'
import { resolTypes } from "../../../../../services/chat.service"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const ItemCreateMsg = (props) => {

  let editString = "Created"
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
    if (props.selectedId !== "") {
      const contract = props.cachedContracts[props.selectedId]
      if (contract.worker.username === props.user.username) {
        setOtherUsername(contract.buyer.username)
      } else {
        setOtherUsername(contract.worker.username)
      }
    }
    
  }, [props.selectedId])

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
    props.reactAddItem(props.selectedId, props.msg.id, props.msg.body.item.id, decisionTypes.YES)
    console.log("Accepting change")
  }
  const rejectChange = () => {
    props.reactAddItem(props.selectedId, props.msg.id, props.msg.body.item.id, decisionTypes.NO)
    console.log("Rejecting change")
  }
  
  

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
          <div className="flex">
            <p className="mt-0.5 text-sm text-gray-500 mr-1">{editString + ' '} at {genTimeString(props.msg.timestamp)}</p><ChatLabel label={props.msg.label}/>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-700">
          <div className="flex items-center">
						<p className="text-gray-400 text-lg mr-2">{"Created " + props.msg.body.item.name}</p>
            <div className="w-2"></div>
            <div className="w-16">
              {(yourStatus == decisionTypes.UNDECIDED) && (
                <DecideButton 
                  approve={acceptChange}
                  reject={rejectChange}
                />
              )} 
            </div>
          </div>
					<div className="flex items-center mb-2 border-l-2 border-gray-400 pl-2 ml-2 m-1">
            <p>{props.msg.body.item.currentBody}</p>
          </div>
          <div className="flex">
            {(yourStatus == decisionTypes.YES) && (
              <div className="flex items-center justify-between">
                <p className="text-grey-400 mr-1">You <b className="text-green">approved</b></p>
              </div>
            )}
            {(yourStatus == decisionTypes.NO) && (
              <div>
                <p className="text-grey-400 mr-1">You <b className="text-red">rejected</b></p>
              </div>
            )}
            {" "}
            {(otherStatus == decisionTypes.YES) && (
              <div className="flex items-center justify-between">
                <p className="text-grey-400">{otherUsername} <b className="text-green">approved</b>{" "}</p>
              </div>
            )}
            {(otherStatus == decisionTypes.NO) && (
              <div>
                <p className="text-grey-400">{otherUsername} <b className="text-red">rejected</b></p>
              </div>
            )}
          </div>
          

          
        </div>
      </div>
    </>

  )
}

const mapStateToProps = ({ user, contract }) => ({
  selectedId: contract.selectedId,
  cachedContracts: contract.cachedContracts,
  curConItems: contract.curConItems,
  user: user.user,
})
  
const mapDispatchToProps = (dispatch) => bindActionCreators({
	updateLocalItemAdd,
	reactAddItem,
  finishedReload,
}, dispatch)
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemCreateMsg)