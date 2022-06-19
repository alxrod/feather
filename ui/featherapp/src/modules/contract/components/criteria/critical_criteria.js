import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CalendarIcon, ChatAlt2Icon, CurrencyDollarIcon } from '@heroicons/react/outline'
import WarningSign from "../warning_sign";
import ApprovalSign from "../approval_sign";

import PriceField from "../price/price_field";
import DeadlineField from "../deadline/deadline_field";


const CriticalCriteria = (props) => {

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
          <li key="price">
            <div className="block hover:bg-gray-50">
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="min-w-0 flex-1 flex items-center">
                  <div className="flex-shrink-0">
                    <CurrencyDollarIcon className="flex-shrink-0 text-gray-400 mr-1.5 h-9 w-9 text-green-400" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-1 md:gap-4">
                    <div>
                      <div className="mb-1">
                        <PriceField price_str={props.price_str}/>
                      </div>
                      <ApprovalSign item_state={props.price_state}/>
                      <div className="mt-1">
                        <WarningSign item_state={props.price_assess}/>
                      </div>
                    </div>

                  </div>
                </div>
                
                <div>
                  <ChatAlt2Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
              </div>
              
            </div>
          </li>

          <li key="deadline">
            <div className="block hover:bg-gray-50">
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="min-w-0 flex-1 flex items-center">
                  <div className="flex-shrink-0">
                    <CalendarIcon className="flex-shrink-0 text-gray-400 mr-1.5 h-9 w-9 text-green-400" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-1 md:gap-4">
                    <div>
                      <div className="mb-1">
                        <DeadlineField deadline_str={props.deadline_str}/>
                      </div>
                      <ApprovalSign item_state={props.deadline_state}/>
                      <div className="mt-1">
                        <WarningSign item_state={props.deadline_assess}/>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <ChatAlt2Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
)(CriticalCriteria)