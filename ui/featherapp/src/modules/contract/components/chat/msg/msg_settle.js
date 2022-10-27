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

const ContractSettleMsg = (props) => {
  const [deadlineName, setDeadlineName] = useState("")
  const genTimeString = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString([], {timeStyle: 'short'}) + " " + date.toLocaleDateString() 
  }

  let editString = "Settled"


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

  useEffect( () => {
    for (let i = 0; i < props.deadlines.length; i++) {
      if (props.deadlines[i].id === props.msg.body.deadlineId) {
        setDeadlineName(props.deadlines[i].name)
      }
    }
  }, [props.deadlines.length])

  return (
    <MsgWrapper msg={props.msg} editString={editString}>
        <div className="mt-2 text-sm text-gray-700">
          <div className="flex items-center">
            <div className="flex items-center">
              <h3 className="text-xl text-green font-medium">{signerUsername} advanced to settling on {deadlineName}</h3>
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
)(ContractSettleMsg)