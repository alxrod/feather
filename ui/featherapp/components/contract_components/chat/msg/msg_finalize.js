import { DocumentIcon } from '@heroicons/react/outline'
import { useEffect, useState } from "react";
import { finishedReload } from '../../../../reducers/chat/dispatchers/chat.dispatcher'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MsgWrapper from "./components/msg_wrapper"
import { fontSize } from './components/msg_helpers'

const ContractFinalizeMsg = (props) => {

  let editString = "Finished"

  const [actorUsername, setActorUsername] = useState("Unknown")

  useEffect( () => {
    if (props.curContract.id || props.embedded === true) {
      setActorUsername(props.msg.user.username)
    }
  }, [props.curContract])

  const Icon = () => {
    return (
      <DocumentIcon className={"text-gray-400 " + (props.msg.isAdmin ? "h-4 w-4" : "h-5 w-5") } aria-hidden="true" />
    )
  }

  return (
    <MsgWrapper msg={props.msg} editString={editString} icon={Icon} embedded={props.embedded}>
      <div className={"mt-2 text-gray-700 " + fontSize(1, props.embedded)}>
        <div className="flex items-center">
          <div className="flex items-center">
            <h3 className={"text-gray-400 font-medium " + fontSize(4, props.embedded)}>
              {actorUsername +  
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