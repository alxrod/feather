import SettleProgress from "./user_settle_progress"
import SettleHubOptions from "./settle_hub_options"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { useState, useEffect } from "react"
import { ITEM_APPROVED } from "../../../custom_encodings"
import { WORKER_TYPE, BUYER_TYPE, ADMIN_TYPE } from "../../../services/user.service"

const SettleHub = (props) => {
  const [curDeadline, setCurDeadline] = useState({})
  const [curItems, setCurItems] = useState([])
  const [totalItemLength, setTotalItemLength] = useState(0)

  const [yourRole, setYourRole] = useState(WORKER_TYPE)

  const [buyerApprovedCount, setBuyerApprovedCount] = useState(0)

  const percentComplete = (count) => {
    return Math.round((count/totalItemLength)*100)+"%"
  }
  useEffect(() => {
    let curDeadlineId = props.curContract?.currentDeadlineId
    if (curDeadlineId && props.items.length > 0 && props.deadlines.length > 0) {
      for (let i = 0; i < props.deadlines.length; i++) {
        if (props.deadlines[i].id === curDeadlineId) {
          setCurDeadline(props.deadlines[i])
          const new_items = []
          let buyer_approved = 0
          for (let j =0; j < props.items.length; j++) {
            for (let k = 0; k < props.deadlines[i].itemsList.length; k++) {
              if (props.deadlines[i].itemsList[k].id == props.items[j].id) {
                new_items.push(props.items[j])
                if (props.items[j].buyerSettled === ITEM_APPROVED) {
                  buyer_approved += 1
                }
                break
              }
            }
          }
          setCurItems(new_items)
          setTotalItemLength(new_items.length)
          
          setBuyerApprovedCount(buyer_approved)
          if (props.user.id === props.curContract.worker.id) {
            setYourRole(WORKER_TYPE)
          } else if (props.user.id === props.curContract.buyer.id) {
            setYourRole(BUYER_TYPE)
          } else if (props.user.adminStatus) {
            setYourRole(ADMIN_TYPE)
          }
        }
      }
    }
  }, [props.curContract, props.deadlines, props.items.length, props.contractChanged, props.deadlinesChanged, props.itemsChanged])

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
      <div className="px-4 pt-5 pb-2 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Deadline Feedback</h3>
          <div className="mt-1">
            <SettleProgress 
              key={"buyer"} 
              user_str={"Review"} 
              progress={percentComplete(buyerApprovedCount)}
              tasks_complete={buyerApprovedCount}
              tasks_total={totalItemLength}
            />
          </div>
      </div>
      <div className="px-0 py-0 overflow-y-scroll overflow-x-hidden max-h-[150px]">{
        <SettleHubOptions items={curItems} deadline={curDeadline}/>
      }</div>
    </div>
  )
}

const mapStateToProps = ({ user, contract, items, deadlines}) => ({
  curContract: contract.curContract,
  itemsChanged: items.itemsChanged,
  contractChanged: contract.contractChanged,
  deadlinesChanged: deadlines.deadlinesChanged,
  items: items.items,
  deadlines: deadlines.deadlines,
  user: user.user,


})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(SettleHub)