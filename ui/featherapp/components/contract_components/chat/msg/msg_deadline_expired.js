
import { finishedReload } from '../../../../reducers/chat/dispatchers/chat.dispatcher'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fontSize } from './components/msg_helpers'

const DeadlineExpiredMsg = (props) => {
  const genTimeString = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString([], {timeStyle: 'short'}) + " " + date.toLocaleDateString() 
  }

  return (
    <div className="mt-2 text-sm text-gray-700 w-full border-gray-400">
      <div className="flex justify-center items-center">
        <div className="grow border-gray-300 border-b h-1"></div>
        <div className="flex items-center">
          <h3 className={"font-medium text-gray-500 px-4 " + fontSize(4, props.embedded)}>Deadline Expired</h3>
        </div>
        <div className="grow border-gray-300 border-b h-1"></div>
      </div>
    </div>

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
)(DeadlineExpiredMsg)