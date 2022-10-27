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
    console.log("Foudn it")
    return (<></>)
  }
  return (
    <div className="flex">
      {(props.yourStatus == decisionTypes.YES) && (
        <div className="flex items-center justify-between">
          <p className="text-grey-400 mr-1">You <b className="text-green">approved</b></p>
        </div>
      )}
      {(props.yourStatus == decisionTypes.NO) && (
        <div>
          <p className="text-grey-400 mr-1">You <b className="text-red">rejected</b></p>
        </div>
      )}
      {" "}
      {(showPartner && props.otherStatus == decisionTypes.YES) && (
        <div className="flex items-center justify-between">
          <p className="text-grey-400">{props.otherUsername} <b className="text-green">approved</b>{" "}</p>
        </div>
      )}
      {(showPartner && props.otherStatus == decisionTypes.NO) && (
        <div>
          <p className="text-grey-400">{props.otherUsername} <b className="text-red">rejected</b></p>
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