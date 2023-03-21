import { DocumentIcon } from '@heroicons/react/outline'
import {editTypes, decisionTypes} from "../../../../services/chat.service"
import {WORKER_TYPE, BUYER_TYPE} from "../../../../services/user.service"
import DecideButton from "../../decide_button";
import { useEffect, useState, useMemo } from "react";
import { reactAddItem, updateLocalItemAdd } from "../../../../reducers/items/dispatchers/items.add.dispatcher"
import { finishedReload } from '../../../../reducers/chat/dispatchers/chat.dispatcher'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MsgWrapper from "./components/msg_wrapper"
import MsgDecisionFooter from "./components/msg_decision_footer" 
import { displayDecide, fontSize } from "./components/msg_helpers"

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
    props.reactAddItem(props.curContract.id, props.msg.id, props.msg.body.item.id, decisionTypes.YES)
    console.log("Accepting change")
  }
  const rejectChange = () => {
    props.reactAddItem(props.curContract.id, props.msg.id, props.msg.body.item.id, decisionTypes.NO)
    console.log("Rejecting change")
  }
  
  
  const Icon = () => {
    return (
      <DocumentIcon className={"text-gray-400 " + (props.msg.isAdmin ? "h-4 w-4" : "h-5 w-5") } aria-hidden="true" />
    )
  }
  return (
    <MsgWrapper msg={props.msg} editString={editString} icon={Icon} embedded={props.embedded}>
      <div className={"mt-2 text-gray-700 " + fontSize(1, props.embedded)}>
        <div className="flex items-center">
          <p className={"text-gray-400 mr-2 " + fontSize(3, props.embedded)}>{"Created " + props.msg.body.item.name}</p>
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
          <p className="text-primary4">{props.msg.body.item.currentBody}</p>
        </div>
        <MsgDecisionFooter 
          msg={props.msg} 
          yourStatus={yourStatus} 
          otherStatus={otherStatus} 
          adminStatus={props.msg.adminStatus}
          otherUsername={otherUsername}
          embedded={props.embedded}
        />
      </div>
    </MsgWrapper>

  )
}

const mapStateToProps = ({ user, contract }) => ({
  curContract: contract.curContract,
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