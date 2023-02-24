import React, {useState, useRef, useEffect} from "react";
import { Redirect } from 'react-router-dom';
import feather_logo from "../../style/logo/feather_logo.svg";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { push } from 'connected-react-router'
import {useStripe, elements} from '@stripe/react-stripe-js';

import { CheckCircleIcon } from '@heroicons/react/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const AccountsList = (props) => {

  const [defaultId, setDefaultId] = useState("")

  useEffect(() => {
    setDefaultId(props.starterDefault)
  }, [props.starterDefault])

  const setDefault = (id) => {
    setDefaultId(id)
    props.setDefault(id)
  }
  return (
    <div className="px-4">
      {props.accounts.sort((a, b) => (b.accountId ===defaultId) - (a.accountId ===defaultId)).map((account, accountIdx) => (
        <div key={accountIdx} className="flex items-center justify-between">
          <div className="flex items-center">
            {defaultId === account.accountId ? (
            <CheckCircleIcon className="text-primary4 w-10 h-10" strokeWidth={1.5}/>
            ) : (
              <div className="w-10 h-10"/>
            )}
            <h2 className="ml-2 text-xl text-gray-500">Account {"•••••••• "}{account.accountLast4} is connected</h2>
          </div>
          <div className="flex items-center"> 
            {!(defaultId === account.accountId) && (
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary4 focus:ring-offset-2  mr-1"
              onClick={(e) => setDefault(account.accountId)}
            >
              {(defaultId === account.accountId) ? "Default" : "Set Default"}
            </button>
            )}
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 text-sm rounded-md shadow-sm font-medium leading-4 bg-red-100 text-red-800"
              onClick={(e) => {
                props.delete(account.accountId)}}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
    
  )
}

const mapStateToProps = ({ user, stripe}) => ({
  user: user.user,
  clientSecret: stripe.clientSecret,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  push,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountsList)


