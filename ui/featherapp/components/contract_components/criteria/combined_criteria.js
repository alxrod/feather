import React, { useState, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/outline'

import PriceField from "../price/price_field";
import DeadlineField from "../deadline/deadline_field";


const CombinedCriteria = (props) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md w-full mr-5">
      <ul role="list" className="divide-y divide-gray-200">
          <li key="price" className="w-full flex justify-start p-4 items-center">
            <div className="flex-shrink-0">
              <CurrencyDollarIcon className="flex-shrink-0 text-gray-400 mr-1.5 h-9 w-9 text-primary5" aria-hidden="true" />
            </div>
            <div className="mb-1">
              <PriceField createMode={props.createMode ? true : false} price_str={props.price_str} price={props.price} changePrice={props.changePrice} disabled={!props.active}/>
            </div>
          </li>

          <li key="deadline" className="w-full p-4 flex justify-between items-center">
            <div>
              <CalendarIcon className="flex-shrink-0 text-gray-400 mr-1.5 h-9 w-9 text-primary5" aria-hidden="true"/>
            </div>
            <DeadlineField 
              createMode={props.createMode ? true : false} 
              disabled={!props.active} 
              curPrice={props.price}
            />
          </li>
      </ul>
    </div>
  )
}

const mapStateToProps = ({ }) => ({
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CombinedCriteria)