import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CalendarIcon, ChatAlt2Icon, CurrencyDollarIcon } from '@heroicons/react/outline'

import PriceField from "./price_field";
import DeadlineField from "./deadline_field";


const CombinedCriteria = (props) => {

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md w-full mr-5">
      <ul role="list" className="divide-y divide-gray-200 flex flex-row justify-between">
          <li key="price">
            <div className="block">
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="min-w-0 flex-1 flex items-center">
                  <div className="flex-shrink-0">
                    <CurrencyDollarIcon className="flex-shrink-0 text-gray-400 mr-1.5 h-9 w-9 text-green-400" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-1 md:gap-4">
                    <div>
                      <div className="mb-1">
                        <PriceField price_str={props.price_str} disabled={true}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </li>

          <li key="deadline">
            <div className="block">
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="min-w-0 flex-1 flex items-center">
                  <div className="flex-shrink-0">
                    <CalendarIcon className="flex-shrink-0 text-gray-400 mr-1.5 h-9 w-9 text-green-400" aria-hidden="true"/>
                  </div>
                  <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-1 md:gap-4">
                    <DeadlineField deadline_str={props.deadline_str} disabled={true}/>
                  </div>
                </div>
              </div>
              
            </div>
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