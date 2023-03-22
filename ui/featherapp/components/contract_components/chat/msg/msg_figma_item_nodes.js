
import { useEffect, useState } from "react";
import { reactDate, updateLocalDate } from "../../../../reducers/deadlines/dispatchers/deadlines.date.dispatcher"
import { finishedReload } from '../../../../reducers/chat/dispatchers/chat.dispatcher'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MsgWrapper from "./components/msg_wrapper"
import { fontSize } from './components/msg_helpers'
import FigmaLogo from "../../figma_link/figma_logo"

const FigmaNodesMsg = (props) => {

  const Icon = () => {
    return (
      <FigmaLogo aria-hidden="true" />
    )
  }

  return (
    <MsgWrapper embedded={props.embedded} msg={props.msg} editString={"Changed"} icon={Icon}>
      <div className="mt-2 text-sm text-gray-700">
        <div className="flex items-center">
          <div className="flex flex-wrap items-center">
            <p className={"mr-1  " + fontSize(2, props.embedded)}>Changed to Related Figma Assets</p>  
          </div>
          <div className="w-6"></div>
        </div>
      </div>
    </MsgWrapper>
  )
}

const mapStateToProps = ({ user, contract, deadlines}) => ({
  curContract: contract.curContract,
  deadlines: deadlines.deadlines,
  user: user.user,
})
  
const mapDispatchToProps = (dispatch) => bindActionCreators({
  reactDate,
  updateLocalDate,
  finishedReload,
}, dispatch)
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FigmaNodesMsg)