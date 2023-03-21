import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {ITEM_AGREED, ITEM_DISAGREED, ITEM_WAITING_OTHER, ITEM_WAITING_YOU} from "../../custom_encodings"
import { CheckCircleIcon, ExclamationIcon } from '@heroicons/react/solid'
import { ClipboardCheckIcon } from '@heroicons/react/outline'
import DecideButton from './decide_button'

const ApprovalSign = (props) => {
  if (props.item_state === ITEM_AGREED ) {
    return (
      <div>
        <p className="flex items-center text-xs text-green-400">
          <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" />
          {ITEM_AGREED}
        </p>
      </div>
    )
  } else if (props.item_state === ITEM_DISAGREED) {
    return (
      <div>
        <p className="flex items-center text-xs text-red-400">
          <ExclamationIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-red-400" aria-hidden="true" />
          {ITEM_DISAGREED}
        </p>
      </div>
    )
  } else if (props.item_state === ITEM_WAITING_OTHER) {
    return (
      <div>
        <p className="flex items-center text-xs text-gray-400 ">
          <ClipboardCheckIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-500 " aria-hidden="true" />
          {ITEM_WAITING_OTHER}
        </p>
      </div>
    )
  } else {
    return (
      <div className="flex flex-row">
        <p className="flex items-center text-xs text-gray-400 mr-1">
          <ClipboardCheckIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-500 " aria-hidden="true" />
          {ITEM_WAITING_YOU}
        </p>
        <DecideButton/>
      </div>
    )
    
  }
}

const mapStateToProps = ({ }) => ({
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApprovalSign)