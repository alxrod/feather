import { Link } from 'react-router-dom'
import { CheckIcon } from '@heroicons/react/solid'
import { ClockIcon } from '@heroicons/react/outline'
import { useEffect, useState, useMemo, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { finishDeadline, confirmDeadline, undoDeadline } from "../../../../reducers/deadlines/dispatchers/deadlines.settle.dispatcher"
import { WORKER_TYPE, BUYER_TYPE, ADMIN_TYPE} from "../../../../services/user.service"
import {ITEM_APPROVED, ITEM_REJECTED, ITEM_PENDING} from "../../../../custom_encodings"
const CompleteDeadlineButton = (props) => {
  const [role, setRole] = useState(WORKER_TYPE)

  const [workerSettled, setWorkerSettled] = useState(false)
  const [buyerSettled, setBuyerSettled] = useState(false)
  const [adminSettled, setAdminSettled] = useState(false)
  const [curDeadline, setCurDeadline] = useState({})
  const [disputedItems, setDisputedItems] = useState([])

  const [confirmMode, setConfirmMode] = useState(false)
  const [undoMode, setUndoMode] = useState(false)
  
  const [allowSettlement, setAllowSettlement] = useState(false)

  const youSettled = useMemo(() => {
    if (role === WORKER_TYPE) {
      return workerSettled
    } else if (role === BUYER_TYPE) {
      return buyerSettled
    } else if (role === ADMIN_TYPE) {
      return adminSettled
    } else {
      return false
    }
  })

  useEffect( () => {
    if (props.curContract.id && props.user) {
      let role = WORKER_TYPE
      if (props.curContract.worker.id === props.user.user_id) {
        role = WORKER_TYPE
      } else if (props.curContract.buyer.id === props.user.user_id) {
        role = BUYER_TYPE
      }
      for (let i = 0; i < props.deadlines.length; i++) {
        if (props.deadlines[i].id === props.curContract.currentDeadlineId) {
          setCurDeadline(props.deadlines[i])
          let allSettled = true
          const disputed = []
          for (let k = 0; k < props.items.length; k++) {
            for (let j = 0; j < props.deadlines[i].itemsList.length; j++) {
              if (props.items[k].id === props.deadlines[i].itemsList[j].id) {
                if (role === WORKER_TYPE && props.items[k].workerSettled === ITEM_PENDING) {
                  allSettled = false
                } else if (role === BUYER_TYPE && props.items[k].buyerSettled === ITEM_PENDING) {
                  allSettled = false
                }

                if (props.items[k].buyerSettled === ITEM_REJECTED || props.items[k].workerSettled === ITEM_REJECTED) {
                  disputed.push(props.items[k])
                }
              }
            }
          }
          setAllowSettlement(allSettled)
          setDisputedItems(disputed)
          
          setWorkerSettled(props.deadlines[i].workerSettled)
          setBuyerSettled(props.deadlines[i].buyerSettled)
          setAdminSettled(props.deadlines[i].adminSettled)
          setRole(role)

          if (role === WORKER_TYPE && props.deadlines[i].workerSettled) {
            setUndoMode(true)
          } else if (role === BUYER_TYPE && props.deadlines[i].buyerSettled) {
            setUndoMode(true)
          } else {
            setUndoMode(false)
          }
          setConfirmMode(props.deadlines[i].workerSettled && props.deadlines[i].buyerSettled)
          
        }
      }
    }
  }, [props.curContract, props.user, props.contractChanged, props.deadlinesChanged, props.itemsChanged])

  const advanceContract = () => {
    // props.settleContract(props.curContract.id)
  }

  const SettleStatus = ({settled: settled, string: string}) => {
    return (
      <div className="flex items-center">
        <p className="text-gray-400 text-sm">{string}</p>
        {settled ? (
          <CheckIcon className="w-4 h-4 text-green ml-1"/>
        ) : (
          <ClockIcon className="w-4 h-4 text-gray-400 ml-1"/>
        )}
      </div>
    )
  }

  const percentageString = (payout) => {
    return payout + "%"
  }

  const handleFinishDeadline = () => {
    props.finishDeadline(props.curContract.id, curDeadline.id)
  }
  const handleConfirmDeadline = () => {
    props.confirmDeadline(props.curContract.id, curDeadline.id)
  }

  const handleUndoDeadline = () => {
    props.undoDeadline(props.curContract.id, curDeadline.id)
  }

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Finalize Settlement</h3>

          {role === ADMIN_TYPE ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex">
              {workerSettled ? (
                <SettleStatus settled={true} string={"Worker has finished settling"}/>
              ) : (
                <SettleStatus settled={false} string={"Worker is still settling"}/>
              )}
              {buyerSettled ? (
                <div className="lg:ml-2">
                  <SettleStatus settled={true} string={"Buyer has finished settling"}/>
                </div>
              ) : (
                <div className="lg:ml-2">
                  <SettleStatus settled={false} string={"Buyer is still settling"}/>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex">
              {(role === WORKER_TYPE && workerSettled) || (role === BUYER_TYPE && buyerSettled) ? (
                <SettleStatus settled={true} string={"You have finished settling"}/>
              ) : (
                <SettleStatus settled={false} string={"You are still finishing settling"}/>
              )}
              {(role === WORKER_TYPE && buyerSettled) || (role === BUYER_TYPE && workerSettled) ? (
                <div className="lg:ml-2">
                  <SettleStatus settled={true} string={"Your partner has finished settling"}/>
                </div>
              ) : (
                <div className="lg:ml-2">
                  <SettleStatus settled={false} string={"Your partner is still finishing settling"}/>
                </div>
              )}
            </div>
          )}
          <div className="flex flex-wrap mt-1">
            {!allowSettlement && (
              <p className="mr-1">Before you can finish settling, you must approve or reject every required item.{" "}</p>
            )}
            {disputedItems.length !== 0 && (
              <p>
                {"Currently, "}
                {disputedItems.map((item,idx) => (
                  <Fragment key={idx}>
                    <b className="font-normal text-indigo-700">
                      {item.name}
                    </b>
                    {idx < disputedItems.length-2 ? ", " :
                    (idx === disputedItems.length-2 && disputedItems.length == 2) ? " and " : 
                    idx === disputedItems.length-2 ? ", and " : 
                    ""}
                  </Fragment>
                ))}{" "}
                {disputedItems.length === 1 ? "is " : "are "} 
                disputed so the{" "}
                <b className="text-indigo-500">
                  {percentageString(curDeadline.currentPayout)} 
                </b>
                {" "}
                payout will not go through.
              </p>
            )}    
          </div>
          {allowSettlement && (
            <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center sm:justify-end">
              {undoMode && (
                <button
                  type="button"
                  onClick={handleUndoDeadline}
                  className="inline-flex items-center px-4 py-1 border border-transparent shadow-sm rounded-md text-indigo-900 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200 text-md mr-2"
                >
                undo
              </button>
              )}
              {confirmMode ? (
                <button
                  type="button"
                  onClick={handleConfirmDeadline}
                  className="inline-flex items-center px-4 py-1 border border-transparent shadow-sm rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-md"
                >
                  confirm
                </button>
              ) : !youSettled ? (
                <button
                  type="button"
                  onClick={handleFinishDeadline}
                  className="inline-flex items-center px-4 py-1 border border-transparent shadow-sm rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-md"
                >
                  finish
                </button>
              ) : null}
            </div>
          )}

        </div>
          
      </div>
    </div>
  )
}

const mapStateToProps = ({ user, contract, deadlines, items}) => ({
  curContract: contract.curContract,
  contractChanged: contract.contractChanged,
  user: user.user,
  deadlines: deadlines.deadlines,
  deadlinesChanged: deadlines.deadlinesChanged,
  itemsChanged: items.itemsChanged,
  items: items.items,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  finishDeadline,
  confirmDeadline,
  undoDeadline,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompleteDeadlineButton)