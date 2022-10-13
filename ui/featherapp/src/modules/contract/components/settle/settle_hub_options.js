/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon, XIcon, ChevronRightIcon,} from '@heroicons/react/solid'
import { ClockIcon } from "@heroicons/react/outline"
import TextTag from "../tag_in_text"
import {ITEM_APPROVED, ITEM_REJECTED, ITEM_PENDING} from "../../../../custom_encodings"
import SettleOption from "./settle_option_selection"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SettleHubRow from "./settle_hub_row"

const SettleHubOption = (props) => {
  return (
    <ul role="list" className="divide-y divide-gray-200">
      {props.items.map((item) => (
        <SettleHubRow item={item}/>
      ))}
    </ul>
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