import React, {useState, useRef, useEffect} from "react";
import { Redirect } from 'react-router-dom';
import feather_logo from "../../style/logo/feather_logo.svg";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { push } from 'connected-react-router'
import {useStripe, elements} from '@stripe/react-stripe-js';
import ConnectPayout from "../stripe_components/connect_payout";
import ConnectPayment from "../stripe_components/connect_payment";

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
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
            >
              Account Number
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Set Default</span>
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Delete</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.accounts.map((account, accountIdx) => (
            <tr key={accountIdx}>
              <td
                className={classNames(
                  accountIdx === 0 ? '' : 'border-t border-transparent',
                  'relative py-4 pl-4 sm:pl-6 pr-3 text-sm'
                )}
              >
                <div className="font-medium text-gray-900">
                  ********{account.accountLast4}
                </div>
                {accountIdx !== 0 ? <div className="absolute right-0 left-6 -top-px h-px bg-gray-200" /> : null}
              </td>
             
              <td
                className={classNames(
                  accountIdx === 0 ? '' : 'border-t border-transparent',
                  'relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-sm font-medium'
                )}
              >
                {defaultId !== account.accountId && (
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-red"
                    onClick={(e) => {props.delete(account.accountId)}}
                  >
                    Delete
                  </button>
                )}
                {accountIdx !== 0 ? <div className="absolute right-0 left-0 -top-px h-px bg-gray-200" /> : null}
              </td>

              <td
                className={classNames(
                  accountIdx === 0 ? '' : 'border-t border-transparent',
                  'relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-sm font-medium'
                )}
              >
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                  disabled={defaultId === account.accountId}
                  onClick={(e) => setDefault(account.accountId)}
                >
                  {(defaultId === account.accountId) ? "Default" : "Set Default"}
                </button>
                {accountIdx !== 0 ? <div className="absolute right-6 left-0 -top-px h-px bg-gray-200" /> : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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


