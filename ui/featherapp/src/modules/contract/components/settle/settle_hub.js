import SettleProgress from "./user_settle_progress"
import SettleHubOptions from "./settle_hub_options"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { useState, useEffect } from "react"

const SettleHub = (props) => {
  const [curDeadline, setCurDeadline] = useState({})
  const [curItems, setCurItems] = useState([])
  const [totalItemLength, setTotalItemLength] = useState(0)
  const [yourApprovedCount, setYourApprovedCount] = useState(0)
  const [partnerApprovedCount, setPartnerApprovedCount] = useState(0)

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
          const worker_approved = 0
          const buyer_approved = 0
          for (let j =0; j < props.items.length; j++) {
            for (let k = 0; k < props.deadlines[i].itemsList.length; k++) {
              if (props.deadlines[i].itemsList[k].id == props.items[j].id) {
                new_items.push(props.items[j])
                if (props.items[j].workerSettled) {
                  worker_approved += 1
                } else if (props.items[j].buyerSettled) {
                  buyer_approved += 1
                }
                break
              }
            }
          }
          console.log("FOUND ALL ITEMS AS: ", new_items)
          setCurItems(new_items)
          setTotalItemLength(new_items.length)
          if (props.user.user_id === props.curContract.worker.Id) {
            setYourApprovedCount(worker_approved)
            setPartnerApprovedCount(buyer_approved)
          } else if (props.user.user_id === props.curContract.buyer.Id) {
            setYourApprovedCount(buyer_approved)
            setPartnerApprovedCount(worker_approved)
          }
        }
      }
    }
  }, [props.curContract, props.deadlines, props.items.length, props.contractChanged, props.deadlinesChanged, props.itemsChanged])

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
      <div className="px-4 pt-5 pb-2 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Settlement Status</h3>
          <div className="mt-1">
            <SettleProgress key="you" user_str="Your" progress={percentComplete(yourApprovedCount) }tasks_complete={yourApprovedCount} tasks_total={totalItemLength}/>
            <SettleProgress key="partner" user_str="Partner's" progress={percentComplete(partnerApprovedCount)} tasks_complete={partnerApprovedCount} tasks_total={totalItemLength}/>
          </div>
      </div>
      <div className="px-0 py-0 overflow-y-scroll overflow-x-hidden max-h-[150px]">{
        <SettleHubOptions items={curItems}/>
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