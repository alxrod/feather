
import { useEffect, useState } from "react";
import { reactDate, updateLocalDate } from "../../../../reducers/deadlines/dispatchers/deadlines.date.dispatcher"
import { finishedReload } from '../../../../reducers/chat/dispatchers/chat.dispatcher'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MsgWrapper from "./components/msg_wrapper"
import MsgDecisionFooter from "./components/msg_decision_footer"
import { fontSize } from './components/msg_helpers'
import FigmaLogo from "../../figma_link/figma_logo"

const DateMsg = (props) => {

  const [otherUsername, setOtherUsername] = useState("")

  useEffect( () => {
    if (props.curContract.id) {
      if (props.curContract.worker.username === props.user.username) {
        setOtherUsername(props.curContract.buyer.username)
      } else {
        setOtherUsername(props.curContract.worker.username)
      }
    }
  }, [props.curContract])


  const Icon = () => {
    return (
      <FigmaLogo aria-hidden="true" />
    )
  }

  const pullFigmaKey = (url) => {
    const components = url.split("/file/")
    if (components.length < 2) {
      return "Invalid Link"
    }
    return components[1].split("/")[0]
  }
  return (
    <MsgWrapper embedded={props.embedded} msg={props.msg} editString={"Changed"} icon={Icon}>
      <div className="mt-2 text-sm text-gray-700">
        <div className="flex items-center">
          <div className="flex flex-wrap items-center">
            <p className={"mr-1  " + fontSize(2, props.embedded)}>Changed to Figma File <b className="text-primary5">{pullFigmaKey(props.msg.body.figmaLink)}</b></p>  
          </div>
          <div className="w-6"></div>
        </div>
        <MsgDecisionFooter 
          msg={props.msg} 
          embedded={props.embedded}
          otherStatus={otherStatus} 
          adminStatus={props.msg.adminStatus}
          otherUsername={otherUsername}
        />
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
)(DateMsg)