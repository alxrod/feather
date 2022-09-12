import React, { useState, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CalendarIcon, ChatAlt2Icon, CurrencyDollarIcon } from '@heroicons/react/outline'
import WarningSign from "../warning_sign";
import ApprovalSign from "../approval_sign";
import {genEmptyContract} from "../../../../services/contract.service";

import PriceField from "../price/price_field";
import DeadlineField from "../deadline/deadline_field";


const CriticalCriteria = (props) => {

  const formatDate = (date) => {
    return date.toLocaleTimeString('en-US', {timeStyle: "short"}) + " " + date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
  }

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
                        <PriceField/>
                      </div>
                      {/* <ApprovalSign item_state={props.price_state}/>
                      <div className="mt-1">
                        <WarningSign item_state={props.price_assess}/>
                      </div> */}
                    </div>

                  </div>
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
                        <DeadlineField
                        // Useful syntax if create mode undefined
                          createMode={props.createMode ? true : false} 
                          deadlines={props.deadlines} 
                          changeDeadlines={props.changeDeadlines} 
                          disabled={!props.active} 
    
                          contractItemIds={props.contractItemIds}
                        />
                      </div>
                      {/* <ApprovalSign item_state={props.deadline_state}/>
                      <div className="mt-1">
                        <WarningSign item_state={props.deadline_assess}/>
                      </div> */}
                    </div>
                  </div>
                </div>
                
              </div>
              
            </div>
          </li>

      </ul>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  user: user.user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CriticalCriteria)