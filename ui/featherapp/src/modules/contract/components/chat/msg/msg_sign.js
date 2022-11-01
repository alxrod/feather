import { DocumentIcon } from '@heroicons/react/outline'
import ChatLabel from "../chat_label"
import {editTypes, decisionTypes} from "../../../../../services/chat.service"
import {WORKER_TYPE, BUYER_TYPE} from "../../../../../services/user.service"
import { ArrowRightIcon } from '@heroicons/react/solid'
import DecideButton from "../../decide_button";
import { useEffect, useState } from "react";
import { finishedReload } from '../../../../../reducers/chat/dispatchers/chat.dispatcher'
import { resolTypes } from "../../../../../services/chat.service"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MsgWrapper from "./components/msg_wrapper"

const ContractSignMsg = (props) => {
  const genTimeString = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString([], {timeStyle: 'short'}) + " " + date.toLocaleDateString() 
  }

  let editString = "Signed"


  const [signerUsername, setSignerUsername] = useState("Unknown")


  useEffect( () => {
    if (props.curContract.id) {
      if (props.msg.body.signerId === props.curContract.buyer.id) {
        setSignerUsername(props.curContract.buyer.username)
      } else if (props.msg.body.signerId === props.curContract.worker.id) {
        setSignerUsername(props.curContract.worker.username)
      }
    }
  }, [props.curContract])

  const Icon = () => {
    return (
      <DocumentIcon className={"text-gray-400 " + (props.msg.isAdmin ? "h-4 w-4" : "h-5 w-5") } aria-hidden="true" />
    )
  }
  return (
    <MsgWrapper msg={props.msg} editString={editString} icon={Icon}>
      <div className="mt-2 text-sm text-gray-700">
        <div className="flex items-center">
          <div className="flex items-center">
            <h3 className="text-xl text-green font-medium">{signerUsername} signed the contract</h3>
          </div>
          <div className="w-6"></div>
        </div>
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
  finishedReload,
}, dispatch)
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractSignMsg)