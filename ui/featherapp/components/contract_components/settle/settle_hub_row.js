import { connect } from 'react-redux'
import { WORKER_TYPE, BUYER_TYPE, ADMIN_TYPE } from "../../../services/user.service"

/* This example requires Tailwind CSS v2.0+ */
import TextTag from "../tag_in_text"
import {ITEM_APPROVED, ITEM_REJECTED, ITEM_PENDING} from "../../../custom_encodings"
import SettleOption from "./settle_option_selection"
import { bindActionCreators } from 'redux'
import { useEffect, useState, useMemo } from "react"
import { settleItem } from "../../../reducers/items/dispatchers/items.settle.dispatcher"

import { CheckIcon } from '@heroicons/react/solid'
import { XIcon, ClockIcon } from '@heroicons/react/outline'

const SettleHubOption = (props) => {
  const [yourRole, setYourRole] = useState(false)

  const [buyerStatus, setBuyerStatus] = useState(ITEM_PENDING)


  useEffect(() => {
    setBuyerStatus(props.item.buyerSettled)
    if (props.curContract?.worker.id === props.user.id) {
      setYourRole(WORKER_TYPE)
    } else if (props.curContract?.buyer.id === props.user.id) {
      setYourRole(BUYER_TYPE)
    }
    
  }, [props.user, props.curContract, props.itemsChanged, props.deadlinesChanged])


  const switchStatus = (new_status) => {
    if (new_status !== buyerStatus) {
      props.settleItem(props.curContract.id, props.deadline.id, props.item.id, new_status) //contract_id, deadline_id, item_id, new_state
    }
    setBuyerStatus(new_status)
  }
  

  return (
    <li>
      <div className="block hover:bg-gray-50">
        <div className="flex items-center px-2 py-4">
          <div className="min-w-0 flex-1 flex items-center">
            <div className="min-w-0 flex-1 px-4 grid grid-cols-4 md:gap-4">
              <div className="flex items-center">
                <TextTag tagName={props.item.name}/>
              </div>
              <div className="col-span-3 flex justify-end">
                {yourRole === BUYER_TYPE ? (
                  <SettleOption 
                    buyerSettled={props.item.buyerSettled}
                    deadlineBuyerSettled={props.deadline.buyerSettled}
                    role={yourRole}
                    switchStatus={switchStatus}
                  />
                ) : (
                  (props.item.buyerSettled == ITEM_APPROVED) ? (
                    <p className="flex text-primary5 items-center">
                      <CheckIcon className="flex-shrink-0 inline-block h-5 w-5 text-green-400 mr-2"/> {props.curContract?.buyer.username} approved this item
                    </p>
                  ) : (props.item.buyerSettled == ITEM_REJECTED) ? (
                    <p className="flex text-red-400 items-center">
                      <XIcon className=" flex-shrink-0 inline-block h-5 w-5 text-red-400 mr-2"/> {props.curContract?.buyer.username} rejected this item
                    </p>
                  ) : (
                    <p className="flex text-gray-500 items-center">
                      <ClockIcon className="flex-shrink-0 inline-block h-5 w-5 mr-2"/> {props.curContract?.buyer.username} is still reviewing
                    </p>
                  )
                )}
                
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