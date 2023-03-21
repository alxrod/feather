import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SettleHubRow from "./settle_hub_row"
import { Fragment } from 'react'

const SettleHubOption = (props) => {
  return (
    <ul role="list" className="divide-y divide-gray-200">
      {props.items.map((item) => (
        <Fragment key={item.id}>
          <SettleHubRow item={item} deadline={props.deadline}/>
        </Fragment>
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