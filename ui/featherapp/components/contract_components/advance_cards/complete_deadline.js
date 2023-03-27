import { CheckIcon } from '@heroicons/react/solid'
import { ClockIcon } from '@heroicons/react/outline'
import { useEffect, useState, useMemo, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { finishDeadline, confirmDeadline, undoDeadline } from "../../../reducers/deadlines/dispatchers/deadlines.settle.dispatcher"
import { WORKER_TYPE, BUYER_TYPE, ADMIN_TYPE} from "../../../services/user.service"
import {ITEM_APPROVED, ITEM_REJECTED, ITEM_PENDING} from "../../../custom_encodings"
import {displayPrice } from "../../helpers"
import {Oval} from 'react-loading-icons'

import PayoutWarning from "./payout_warning"

const CompleteDeadlineButton = (props) => {
  const [role, setRole] = useState(WORKER_TYPE)

  const [buyerSettled, setBuyerSettled] = useState(false)

  const [curDeadline, setCurDeadline] = useState({})
  const [disputedItems, setDisputedItems] = useState([])
  const [advancingDeadline, setAdvancingDeadline] = useState(false)
  
  const [allowSettlement, setAllowSettlement] = useState(false)

  const [showWarning, setShowWarning] = useState(false)

  useEffect( () => {
    if (props.curContract.id && props.user) {
      let role = WORKER_TYPE
      if (props.curContract.worker.id === props.user.id) {
        role = WORKER_TYPE
      } else if (props.curContract.buyer.id === props.user.id) {
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
                if (props.items[k].buyerSettled === ITEM_PENDING) {
                  allSettled = false
                }
                if (props.items[k].buyerSettled === ITEM_REJECTED) {
                  disputed.push(props.items[k])
                }
              }
            }
          }
          setAllowSettlement((allSettled && role == BUYER_TYPE))
          setDisputedItems(disputed)
          
          setBuyerSettled(props.deadlines[i].buyerSettled)
          setRole(role)
        }
      }
    }
  }, [props.curContract, props.user, props.contractChanged, props.deadlinesChanged, props.itemsChanged])


  const SettleStatus = ({settled: settled, string: string}) => {
    return (
      <div className="flex items-center">
        <p className="text-gray-400 text-sm">{string}</p>
        {settled ? (
          <CheckIcon className="w-4 h-4 text-green-400 ml-1"/>
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
    setShowWarning(true)
  }

  const confirmFinishDeadline = () => {
    setShowWarning(false)
    setAdvancingDeadline(true)
    props.finishDeadline(props.curContract.id, curDeadline.id)
  }

  return (
    <>
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Finish Reviewing Deadline</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex">
              {role === WORKER_TYPE && buyerSettled ? (
                <div>
                  <SettleStatus settled={true} string={"Your partner has finished reviewing the deadline"}/>
                </div>
              ) : (role === WORKER_TYPE && !buyerSettled) ? (
                <div>
                  <SettleStatus settled={false} string={"Your partner is still reviewing this deadline"}/>
                </div>
              ) : (role === BUYER_TYPE && buyerSettled) ? (
                <div>
                  <SettleStatus settled={true} string={"You have finished reviewing this deadline"}/>
                </div>
              ) : (role === BUYER_TYPE && allowSettlement) ? (
                <div>
                  <SettleStatus settled={true} string={"Click payout when you are ready to pay your partner and move onto the next deadline"}/>
                </div>
              ) : (
                <div>
                  <SettleStatus settled={false} string={"You are still reviewing the contract"}/>
                </div>
              )}
            </div>

            <div className="flex flex-wrap mt-1">
              {!allowSettlement && (role === BUYER_TYPE) ? (
                <p className="mr-1">Before you can finish reviewing, you must approve or reject every required item.{" "}</p>
              ) : !allowSettlement && (role !== BUYER_TYPE) ? (
                <p className="mr-1">Your partner is still reviewing the deadline.{" "}</p>
              ) : (
                null
              )}

              {disputedItems.length !== 0 && (
                <p className="text-red-500">
                  {"Currently, "}
                  {disputedItems.map((item,idx) => (
                    <Fragment key={idx}>
                      <b className="font-semibold text-red-400">
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
                  <b className="text-red-400">
                    {"$"+displayPrice(curDeadline.currentPayout)} 
                  </b>
                  {" "}
                  payout will not go through.
                </p>
              )}
            </div>

            {allowSettlement && (
              <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center sm:justify-end">
                  {advancingDeadline && (
                    <Oval className="w-6 h-6 mr-2" stroke={"#7993A0"} fill={"#7993A0"} strokeWidth={4}/>
                  )}
                  <button
                    type="button"
                    onClick={handleFinishDeadline}
                    className="inline-flex items-center px-4 py-1 border border-transparent shadow-sm rounded-md text-white bg-primary5 hover:bg-primary5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary5 text-md"
                  >
                    Payout for Deadline
                  </button>
              </div>
            )}

          </div>
            
        </div>
      </div>
      <PayoutWarning 
        open={showWarning} 
        setOpen={setShowWarning} 
        onConfirm={confirmFinishDeadline}
        amount={(curDeadline.currentPayout / 100).toFixed(2)}
        fee={(curDeadline.currentPayout * (props.curContract.freeStatus ? 0 : 0.05) / 100).toFixed(2)}
        total={(curDeadline.currentPayout * (props.curContract.freeStatus ? 1 : 1.05) / 100).toFixed(2)}
      />
    </>
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