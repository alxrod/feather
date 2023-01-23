import React, { useState, useEffect, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CalendarIcon, ChatAlt2Icon, CurrencyDollarIcon } from '@heroicons/react/outline'
import WarningSign from "../warning_sign";
import ApprovalSign from "../approval_sign";
import {genEmptyContract} from "../../../../services/contract.service";

import { LockOpenIcon } from "@heroicons/react/outline"
import { LockClosedIcon } from '@heroicons/react/solid'

import PriceField from "../price/price_field";
import DeadlineField from "../deadline/deadline_field";


const UniversalLockCard = (props) => {

  const [lockMsg, setLockMsg] = useState("")
  const [btnLabel, setBtnLabel] = useState("unlock")
  useEffect( () => {
    if (props.universalLock) {
      setLockMsg("Contract is locked")
      setBtnLabel("unlock")
    } else {
      setLockMsg("Contract is unlocked")
      setBtnLabel("lock")
    }
    
  }, [props.universalLock])

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="hover:bg-gray-50 items-center w-full px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {(props.universalLock) ? (
              <LockClosedIcon className="flex-shrink-0 text-gray-400 mr-3 h-9 w-9" aria-hidden="true" /> 
            ) : (
              <LockOpenIcon className="flex-shrink-0 text-gray-400 mr-3 h-9 w-9" aria-hidden="true" />
            )}
            <div className="flex flex-wrap">
              <h3 className="text-gray-600 flex flex-wrap">{lockMsg}</h3>
            </div>
          </div>
          <button
                type="button"
                onClick={props.requestLockChange}
                className="ml-3 inline-flex items-center px-4 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary7 bg-primary1 hover:bg-primary4 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary4"
          >
            {btnLabel}
          </button>
        </div>
        
      </div>
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
)(UniversalLockCard)