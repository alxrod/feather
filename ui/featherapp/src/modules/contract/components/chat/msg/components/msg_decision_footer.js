import { ChatAltIcon } from '@heroicons/react/solid'
import ChatLabel from "../../chat_label"
import { useState, useEffect } from "react"
import {editTypes, decisionTypes} from "../../../../../../services/chat.service"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {WORKER_TYPE, BUYER_TYPE} from "../../../../../../services/user.service"

const MsgDecisionFooter = (props) => {
  const [showPartner, setShowPartner] = useState(true)

  useEffect(() => {
    if (props.curContract.role == WORKER_TYPE && props.curContract.buyer.id === "") {
      setShowPartner(false)
    } else if (props.curContract.role == BUYER_TYPE && props.curContract.worker.id === "") {
      setShowPartner(false)
    }
  }, [props.curContract])

  if (props.msg.isAdmin) {
    return (<></>)
  } else if (props.msg.expired) {
    return (
      <div className="flex items-center justify-between">
        <p className="text-gray-400 mr-1">The deadline expired, so this message was discarded</p>
      </div> 
    )
  }

  if (props.embedded) {
    return (
      <></>
    )
  }
  return (
    <div className="flex">
      {(props.msg.adminOverride && props.adminStatus === decisionTypes.YES) && (
        <div className="flex items-center justify-between">
          <p className="text-gray-700 mr-1">Admin <b className="text-primary4">approved</b></p>
        </div>
      )}
      {(props.msg.adminOverride && props.adminStatus === decisionTypes.NO) && (
        <div className="flex items-center justify-between">
          <p className="text-gray-700 mr-1">Admin <b className="text-red-400">rejected</b></p>
        </div>
      )}
      {(!props.msg.adminOverride && props.yourStatus == decisionTypes.YES ) && (
        <div className="flex items-center justify-between">
          <p className="text-gray-700 mr-1">You <b className="text-primary4">approved</b></p>
        </div>
      )}
      {(!props.msg.adminOverride && props.yourStatus == decisionTypes.NO) && (
        <div>
          <p className="text-gray-700 mr-1">You <b className="text-red-400">rejected</b></p>
        </div>
      )}
      {" "}
      {(!props.msg.adminOverride && showPartner && props.otherStatus == decisionTypes.YES) && (
        <div className="flex items-center justify-between">
          <p className="text-gray-700">{props.otherUsername} <b className="text-primary4">approved</b>{" "}</p>
        </div>
      )}
      {(!props.msg.adminOverride && showPartner && props.otherStatus == decisionTypes.NO) && (
        <div>
          <p className="text-gray-700">{props.otherUsername} <b className="text-red-400">rejected</b></p>
        </div>
      )}
      
    </div>
  )
}

const mapStateToProps = ({ contract }) => ({
  curContract: contract.curContract,
})
  
const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MsgDecisionFooter)