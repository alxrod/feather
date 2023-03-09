import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PlusIcon } from '@heroicons/react/solid'
import { createContract } from "../../reducers/contract/dispatchers/contract.dispatcher";
import { genEmptyDeadlineSet } from "../contract/components/deadline/helpers";
import { BUYER_TYPE, WORKER_TYPE } from '../../services/user.service';
import { push } from 'connected-react-router'

const CreateContract = (props) => {
  const setupNewContract = () => {
    let role = -1;
    if (props.user.workerModeEnabled) {
      role = WORKER_TYPE
    } 
    if (props.user.buyerModeEnabled) {
      role = BUYER_TYPE
    } 
    if (role === -1) {
      return
    }
    // (title, summary, price_set, deadlines, items, password, role)
    props.createContract("", "", {current:0, worker:0, buyer:0}, genEmptyDeadlineSet(), [], "", role).then(
      (id) => {
        props.push("/create/"+id)
      }
    )
  }

  return (
    <button
      type="button"
      className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary4 hover:bg-primary3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary4"
      onClick={setupNewContract}
    >
      <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
      New Contract
    </button>
  )
}

const mapStateToProps = ({  user }) => ({
  user: user.user,
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
  createContract,
  push,
}, dispatch)
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateContract)
