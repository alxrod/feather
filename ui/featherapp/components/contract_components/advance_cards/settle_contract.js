import { CheckIcon } from '@heroicons/react/solid'
import { ClockIcon } from '@heroicons/react/outline'
import { useEffect, useState, useMemo } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { settleContract } from "../../../reducers/contract/dispatchers/contract.dispatcher"
import { WORKER_TYPE, BUYER_TYPE, ADMIN_TYPE } from "../../../services/user.service"

const SignButton = (props) => {
  const [role, setRole] = useState(WORKER_TYPE)

  const [workerSettled, setWorkerSettled] = useState(false)
  const [buyerSettled, setBuyerSettled] = useState(false)
  const youSettled = useMemo(() => {
    if (role === WORKER_TYPE) {
      return workerSettled
    } else if (role === BUYER_TYPE) {
      return buyerSettled
    } else {
      return false
    }
  })

  useEffect( () => {
    if (props.curContract.id && props.user) {
      if (props.curContract.worker.id === props.user.id) {
        setRole(WORKER_TYPE)
      } else if (props.curContract.buyer.id === props.user.id) {
        setRole(BUYER_TYPE)
      } else if (props.user.adminStatus) {
        setRole(ADMIN_TYPE)
      }
      setWorkerSettled(props.curContract.workerApproved)
      setBuyerSettled(props.curContract.buyerApproved)
    }
  }, [props.curContract, props.user, props.contractChanged])

  const advanceContract = () => {
    props.settleContract(props.curContract.id)
  }

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Advance to Settling Mode</h3>
          {role === ADMIN_TYPE ? (
            <div className="flex items-center">
              <p className="text-gray-400">Worker</p>
              {workerSettled ? (
                <CheckIcon className="w-4 h-4 text-green-400 ml-1"/>
              ) : (
                <ClockIcon className="w-4 h-4 text-gray-400 ml-1"/>
              )}
              <div className="w-4"></div>
              <p className="text-gray-400">Buyer</p>
              {buyerSettled ? (
                <CheckIcon className="w-4 h-4 text-green-400 ml-1"/>
              ) : (
                <ClockIcon className="w-4 h-4 text-gray-400 ml-1"/>
              )}
            </div>
          ) : ((role === WORKER_TYPE && props.curContract.buyerApproved) || (role === BUYER_TYPE && props.curContract.workerApproved)) ? (
            <div className="flex items-center">
              <p className="text-gray-400">Your partner has advanced to settling</p>
              <CheckIcon className="w-4 h-4 text-green-400 ml-1"/>
            </div>
          ) : (
            <div className="flex items-center">
              <p className="text-gray-400">You're waiting for your parter to advance</p>
              <ClockIcon className="w-4 h-4 text-gray-400 ml-1"/>
            </div>
          )}
        </div>
          
        {youSettled ? (
          <div className="w-full flex justify-center items-center mt-2">
            <h3 className="text-primary4 font-medium text-xl">You have already advanced to settling</h3>
          </div>
        ) : (
          <div className="mt-2 sm:flex sm:items-start sm:justify-between">
            <div className="max-w-4xl text-sm text-gray-500">
              <p>
                By pressing this button you are indicating that all the work for this deadline has been complete
              </p>
            </div>
            <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
              <button
                type="button"
                onClick={advanceContract}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-primary5 hover:bg-primary6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary4 text-lg"
              >
                advance
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
  settleContract
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignButton)