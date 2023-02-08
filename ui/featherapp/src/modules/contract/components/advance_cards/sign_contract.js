import { Link } from 'react-router-dom'
import { CheckIcon } from '@heroicons/react/solid'
import { ClockIcon } from '@heroicons/react/outline'
import { useEffect, useState, useMemo } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { signContract } from "../../../../reducers/contract/dispatchers/contract.dispatcher"
import { WORKER_TYPE, BUYER_TYPE, ADMIN_TYPE} from "../../../../services/user.service"


const SignButton = (props) => {
  const [role, setRole] = useState(WORKER_TYPE)

  const [workerSigned, setWorkerSigned] = useState(false)
  const [buyerSigned, setBuyerSigned] = useState(false)

  const youSigned = useMemo(() => {
    if (role === WORKER_TYPE) {
      return workerSigned
    } else if (role === BUYER_TYPE) {
      return buyerSigned
    } else {
      return false
    }
  })

  const [unresolved, setUnresolved] = useState(false)
  const [invalidDeadline, setInvalidDeadline] = useState(false)

  useEffect( () => {
    if (props.curContract.id && props.user) {
      if (props.curContract.worker.id === props.user.id) {
        setRole(WORKER_TYPE)
      } else if (props.curContract.buyer.id === props.user.id) {
        setRole(BUYER_TYPE)
      } else if (props.user.adminStatus) {
        setRole(ADMIN_TYPE)
      }
      setWorkerSigned(props.curContract.workerApproved)
      setBuyerSigned(props.curContract.buyerApproved)
    }
  }, [props.curContract, props.user, props.contractChanged])

  useEffect( () => {
    let invalid_deadline = false
    for (let i = 0; i < props.deadlines.length; i++) {
      if (props.curContract.currentDeadlineId === props.deadlines[i].id) {
        let now = new Date();
        if (now > props.deadlines[i].currentDate) {
          invalid_deadline = true
        }
      }
    }
    setInvalidDeadline(invalid_deadline)
  }, [props.deadlines, props.deadlinesChanged])

  useEffect( () => {
    for (let i = 0; i < props.messages.length; i++) {
      if (props.messages[i].body.resolved === false) {
        setUnresolved(true)
        return
      }
    }
    setUnresolved(false)
  }, [props.messages.length, props.messagesChanged])

  const signContract = () => {
    props.signContract(props.curContract.id)
  }

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Sign the Contract</h3>
          {role === ADMIN_TYPE ? (
            <div className="flex items-center">
              <p className="text-gray-400">Worker</p>
              {workerSigned ? (
                <CheckIcon className="w-4 h-4 text-green-400 ml-1"/>
              ) : (
                <ClockIcon className="w-4 h-4 text-gray-400 ml-1"/>
              )}
              <div className="w-4"></div>
              <p className="text-gray-400">Buyer</p>
              {buyerSigned ? (
                <CheckIcon className="w-4 h-4 text-green-400 ml-1"/>
              ) : (
                <ClockIcon className="w-4 h-4 text-gray-400 ml-1"/>
              )}
            </div>
          ) : ((role === WORKER_TYPE && props.curContract.buyerApproved) || (role === BUYER_TYPE && props.curContract.workerApproved)) ? (
            <div className="flex items-center">
              <p className="text-gray-400">Your partner has signed the contract</p>
              <CheckIcon className="w-4 h-4 text-green ml-1"/>
            </div>
          ) : (
            <div className="flex items-center">
              <p className="text-gray-400">You're waiting for your parter to sign</p>
              <ClockIcon className="w-4 h-4 text-gray-400 ml-1"/>
            </div>
          )}
        </div>
          
        {youSigned ? (
          <div className="w-full flex justify-center items-center mt-2">
            <h3 className="text-primary4 font-medium text-xl">You have already signed the contract</h3>
          </div>
        ) : invalidDeadline ? (
          <div className="mt-2 sm:flex sm:items-start sm:justify-between">
            <div className="max-w-4xl text-sm text-gray-500">
              <p>
                Your starting deadline is due before the current time. <b>Make the first deadline in the future to sign the contract</b>
              </p>
            </div>
          </div>
        ) : unresolved ? (
          <div className="mt-2 sm:flex sm:items-start sm:justify-between">
            <div className="max-w-4xl text-sm text-gray-500">
              <p>
                This contract still has unresolved suggestions. <b>Approve or reject all changes before signing the contract</b>
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-2 sm:flex sm:items-start sm:justify-between">
            <div className="max-w-4xl text-sm text-gray-500">
              <p>
                By pressing this button you are aggreeing to uphold the contract and all of the current criteria or else you may not get payment in full. <b>Make sure you approve of the conditions.</b>
              </p>
            </div>
            <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
              <button
                type="button"
                onClick={signContract}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-primary5 hover:bg-primary5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary5 text-lg"
              >
                I approve
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = ({ user, contract, deadlines, chat }) => ({
  curContract: contract.curContract,
  contractChanged: contract.contractChanged,

  deadlines: deadlines.deadlines,
  deadlinesChanged: deadlines.deadlinesChanged,

  messages: chat.messages,
  messagesChanged: chat.messagesChanged,

  user: user.user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  signContract
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignButton)