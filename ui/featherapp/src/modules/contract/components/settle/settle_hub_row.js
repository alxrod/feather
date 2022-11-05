import { connect } from 'react-redux'
import { WORKER_TYPE, BUYER_TYPE, ADMIN_TYPE } from "../../../../services/user.service"

/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon, XIcon, ChevronRightIcon,} from '@heroicons/react/solid'
import { ClockIcon } from "@heroicons/react/outline"
import TextTag from "../tag_in_text"
import {ITEM_APPROVED, ITEM_REJECTED, ITEM_PENDING} from "../../../../custom_encodings"
import SettleOption from "./settle_option_selection"
import { bindActionCreators } from 'redux'
import { useEffect, useState, useMemo } from "react"
import { settleItem } from "../../../../reducers/items/dispatchers/items.settle.dispatcher"

const SettleHubOption = (props) => {
  const [yourRole, setYourRole] = useState(false)
  const [workerStatus, setWorkerStatus] = useState(ITEM_PENDING)
  const [buyerStatus, setBuyerStatus] = useState(ITEM_PENDING)
  const [adminStatus, setAdminStatus] = useState(ITEM_PENDING)

  const partnerStatus = useMemo(() => {
    if (yourRole === WORKER_TYPE) {
      return buyerStatus
    } else if (yourRole === BUYER_TYPE) {
      return workerStatus
    }
  })
  const yourStatus = useMemo(() => {
    if (yourRole === WORKER_TYPE) {
      return workerStatus
    } else if (yourRole === BUYER_TYPE) {
      return buyerStatus
    }
  })

  useEffect(() => {
    setWorkerStatus(props.item.workerSettled)
    setBuyerStatus(props.item.buyerSettled)
    setAdminStatus(props.item.adminSettled)

    if (props.curContract?.worker.id === props.user.user_id) {
      setYourRole(WORKER_TYPE)
    } else if (props.curContract?.buyer.id === props.user.user_id) {
      setYourRole(BUYER_TYPE)
    } else if (props.user.admin_status) {
      setYourRole(ADMIN_TYPE)
    }
  }, [props.user, props.curContract, props.itemsChanged, props.deadlinesChanged])


  const setYourStatus = (new_status) => {
    if (yourRole === WORKER_TYPE) {
      setWorkerStatus(new_status)
    } else if (yourRole === BUYER_TYPE) {
      setBuyerStatus(new_status)
    }
  }
  const switchStatus = (new_status) => {
    if (new_status !== yourStatus) {
      props.settleItem(props.curContract.id, props.deadline.id, props.item.id, new_status) //contract_id, deadline_id, item_id, new_state
    }
    setYourStatus(new_status)
  }
  

  return (
    <li>
      <div className="block hover:bg-gray-50">
        <div className="flex items-center px-2 py-4">
          <div className="min-w-0 flex-1 flex items-center">
            <div className="min-w-0 flex-1 px-4 grid grid-cols-4 md:gap-4">
              <div className="col-span-3 flex items-center">
                <TextTag tagName={props.item.name}/>
                <p className="ml-2 flex items-center text-xs text-gray-500">
                {(adminStatus !== ITEM_PENDING) ? (
                  <>
                    <b className="hidden sm:flex lg:hidden font-normal text-gray-600 mr-1">Override</b>
                    {adminStatus === ITEM_APPROVED ? (
                      <CheckIcon className="flex-shrink-0 mr-1.5 h-3.5 w-3.5 text-green" aria-hidden="true" />
                    ) : adminStatus === ITEM_REJECTED ? (
                      <XIcon className="flex-shrink-0 mr-1.5 h-3.5 w-3.5 text-red" aria-hidden="true" />
                    ) : null}
                    <b className="hidden lg:flex sm:hidden font-normal">Admin overrode this item</b>
                  </>
                ) : (yourRole !== ADMIN_TYPE && adminStatus === ITEM_PENDING && partnerStatus == ITEM_PENDING) ? (
                    <>
                    <b className="hidden sm:flex lg:hidden font-normal text-gray-600 mr-1">Partner</b>
                    <ClockIcon className="flex-shrink-0 mr-1.5 h-3.5 w-3.5 text-gray-600" aria-hidden="true" />
                    <b className="hidden lg:flex sm:hidden font-normal">Your partner has not decided this item</b>
                    </>
                    
                ) : (yourRole !== ADMIN_TYPE && adminStatus === ITEM_PENDING && partnerStatus == ITEM_APPROVED) ? (
                    <>
                    <b className="hidden sm:flex lg:hidden font-normal text-green mr-1">Partner</b>
                    <CheckIcon className="flex-shrink-0 mr-1.5 h-3.5 w-3.5 text-green" aria-hidden="true" />
                    <b className="hidden lg:flex sm:hidden font-normal text-green">Your partner has approved this item</b>
                    </>
                ) : (yourRole !== ADMIN_TYPE && adminStatus === ITEM_PENDING && partnerStatus == ITEM_REJECTED) ? (
                    <>
                    <b className="hidden sm:flex lg:hidden font-normal text-red mr-1">Partner</b>
                    <XIcon className="flex-shrink-0 mr-1.5 h-3.5 w-3.5 text-red" aria-hidden="true" />
                    <b className="hidden lg:flex sm:hidden font-normal text-red">Your partner has rejected this item</b>
                    </>
                ) : (yourRole === ADMIN_TYPE) ? (
                    <div className="flex">
                      <b className="hidden lg:flex sm:hidden font-normal text-gray-600 mr-1">worker</b>
                      {(workerStatus === ITEM_APPROVED) ? (
                        <CheckIcon className="flex-shrink-0 mr-1.5 h-3.5 w-3.5 text-green" aria-hidden="true" />
                      ) : (workerStatus === ITEM_REJECTED) ? (
                        <XIcon className="flex-shrink-0 mr-1.5 h-3.5 w-3.5 text-red" aria-hidden="true" />
                      ) : (
                        <ClockIcon className="flex-shrink-0 mr-1.5 h-3.5 w-3.5 text-gray-600" aria-hidden="true" />
                      )}

                      <b className="hidden lg:flex sm:hidden font-normal text-gray-600 mr-1">buyer</b>
                      {(buyerStatus === ITEM_APPROVED) ? (
                        <CheckIcon className="flex-shrink-0 mr-1.5 h-3.5 w-3.5 text-green" aria-hidden="true" />
                      ) : (buyerStatus === ITEM_REJECTED) ? (
                        <XIcon className="flex-shrink-0 mr-1.5 h-3.5 w-3.5 text-red" aria-hidden="true" />
                      ) : (
                        <ClockIcon className="flex-shrink-0 mr-1.5 h-3.5 w-3.5 text-gray-600" aria-hidden="true" />
                      )}
                    </div>
                ) : null}
                </p>
              </div>
              <div>
                <SettleOption 
                  workerSettled={props.item.workerSettled} 
                  buyerSettled={props.item.buyerSettled}
                  adminSettled={props.item.adminSettled}
                  deadlineWorkerSettled={props.deadline.workerSettled}
                  deadlineBuyerSettled={props.deadline.buyerSettled}
                  role={yourRole}
                  status={yourStatus} 
                  switchStatus={switchStatus}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
const mapStateToProps = ({ user, contract, items, deadlines}) => ({
  curContract: contract.curContract,
  itemsChanged: items.itemsChanged,
  contractChanged: contract.contractChanged,
  deadlines: deadlines.deadlines,
  deadlinesChanged: deadlines.deadlinesChanged,
  user: user.user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  settleItem,
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(SettleHubOption)