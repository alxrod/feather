import { Link } from 'react-router-dom'
import { CheckIcon } from '@heroicons/react/solid'
import { ClockIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { signContract } from "../../../reducers/contract/dispatchers/contract.dispatcher"
import { WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service"


const SignButton = (props) => {
  const [role, setRole] = useState(WORKER_TYPE)
  const [youSigned, setYouSigned] = useState(false)
  useEffect( () => {
    if (props.curContract.id && props.user) {
      console.log("CONTRACT: ", props.curContract)
      if (props.curContract.worker.id === props.user.user_id) {
        setRole(WORKER_TYPE)
        if (props.curContract.workerApproved) {
          setYouSigned(true)
        } else {
          setYouSigned(false)
        }
      } else if (props.curContract.buyer.id === props.user.user_id) {
        setRole(BUYER_TYPE)
        if (props.curContract.buyerApproved) {
          setYouSigned(true)
        } else {
          setYouSigned(false)
        }
      }
    }
  }, [props.curContract, props.user, props.contractChanged])

  const signContract = () => {
    props.signContract(props.curContract.id)
  }

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Sign the Contract</h3>
          {((role === WORKER_TYPE && props.curContract.buyerApproved) || (role === BUYER_TYPE && props.curContract.workerApproved)) ? (
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
            <h3 className="text-indigo-500 font-medium text-xl">You have already signed the contract</h3>
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
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-lg"
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

const mapStateToProps = ({ user, contract}) => ({
  curContract: contract.curContract,
  contractChanged: contract.contractChanged,
  user: user.user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  signContract
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignButton)