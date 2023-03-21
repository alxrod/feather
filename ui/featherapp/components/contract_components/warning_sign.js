import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {ITEM_FAIR_descript, ITEM_POS, ITEM_POS_descript, ITEM_NEG, ITEM_NEG_descript} from "../../custom_encodings"
import { CheckCircleIcon, ExclamationIcon, ScaleIcon } from '@heroicons/react/solid'


const WarningSign = (props) => {
  if (props.item_state === ITEM_POS ) {
    return (
      <div>
        <p className="flex items-center text-xs text-green-400">
          <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" />
          {ITEM_POS_descript}
        </p>
      </div>
    )
  } else if (props.item_state === ITEM_NEG) {
      return (
        <div>
          <p className="flex items-center text-xs text-red-400">
            <ExclamationIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-red-400" aria-hidden="true" />
            {ITEM_NEG_descript}
          </p>
        </div>
      )
  } else {
      return (
        <div>
          <p className="flex items-center text-xs text-yellow-400">
            <ScaleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-yellow-400" aria-hidden="true" />
            {ITEM_FAIR_descript}
          </p>
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
)(WarningSign)