import { connect } from 'react-redux'
import { useMemo } from "react"
import { WORKER_TYPE, BUYER_TYPE } from "../../../../services/user.service"

/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon, XIcon, ChevronRightIcon,} from '@heroicons/react/solid'
import { ClockIcon } from "@heroicons/react/outline"
import TextTag from "../tag_in_text"
import {ITEM_APPROVED, ITEM_REJECTED, ITEM_PENDING} from "../../../../custom_encodings"
import SettleOption from "./settle_option_selection"
import { bindActionCreators } from 'redux'
import { useEffect, useState } from "react"

const SettleHubOption = (props) => {
  const [role, setRole] = useState(false)
  const [partnerStatus, setPartnerStatus] = useState(false)
  const [yourStatus, setYourStatus] = useState(false)

  useEffect(() => {
    if (props.curContract?.worker.id === props.user.user_id) {
      setRole(WORKER_TYPE)
      setPartnerStatus(props.item.buyerSettled)
      setYourStatus(props.item.workerSettled)
    } else {
      setRole(BUYER_TYPE)
      setYourStatus(props.item.buyerSettled)
      setPartnerStatus(props.item.workerSettled)
    }
  }, [props.user, props.curContract, props.itemsChanged, props.deadlinesChanged])


  const switchStatus = (new_status) => {
    
  }

  return (
    <li key={props.item.id}>
      <div className="block hover:bg-gray-50">
        <div className="flex items-center px-2 py-4">
          <div className="min-w-0 flex-1 flex items-center">
            <div className="min-w-0 flex-1 px-4 grid grid-cols-4 md:gap-4">
              <div className="col-span-3 flex items-center">
                <TextTag tagName={props.item.name}/>
                <p className="ml-2 flex items-center text-xs text-gray-500">
                {(partnerStatus == ITEM_PENDING) && (
                    <>
                    <b className="hidden sm:flex lg:hidden font-normal text-gray-600 mr-1">partner</b>
                    <ClockIcon className="flex-shrink-0 mr-1.5 h-3.5 w-3.5 text-gray-600" aria-hidden="true" />
                    <b className="hidden lg:flex sm:hidden font-normal">Your partner has not decided this item</b>
                    </>
                    
                )}
                {(partnerStatus == ITEM_APPROVED) && (
                    <>
                    <b className="hidden sm:flex lg:hidden font-normal text-green mr-1">partner</b>
                    <CheckIcon className="flex-shrink-0 mr-1.5 h-3.5 w-3.5 text-green" aria-hidden="true" />
                    <b className="hidden lg:flex sm:hidden font-normal text-green">Your partner has approved this item</b>
                    </>
                )}
                {(partnerStatus == ITEM_REJECTED) && (
                    <>
                    <b className="hidden sm:flex lg:hidden font-normal text-red mr-1">partner</b>
                    <XIcon className="flex-shrink-0 mr-1.5 h-3.5 w-3.5 text-red" aria-hidden="true" />
                    <b className="hidden lg:flex sm:hidden font-normal text-red">Your partner has rejected this item</b>
                    </>
                )}
                </p>
              </div>
              <div>
                <SettleOption status={yourStatus} switchStatus={switchStatus}/>
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
  deadlinesChanged: deadlines.deadlinesChanged,
  user: user.user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(SettleHubOption)