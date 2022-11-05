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

const ContractFinalizeMsg = (props) => {
  const genTimeString = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString([], {timeStyle: 'short'}) + " " + date.toLocaleDateString() 
  }

  let editString = "Finished"

  const [actorUsername, setActorUsername] = useState("Unknown")

  useEffect( () => {
    if (props.curContract.id) {
      setActorUsername(props.msg.user.username)
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
            <h3 className="text-xl text-gray-400 font-medium">
              {actorUsername} 
              {props.msg.body.confirmed ? " confirmed the final settlement" : 
              props.msg.body.undo ? " went back to reviewing items" : 
              " finished reviewing contract items"}
            </h3>
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
)(ContractFinalizeMsg)