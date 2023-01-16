import React, {useState, useRef, useEffect} from "react";
import { Redirect } from 'react-router-dom';
import feather_logo from "../../style/logo/feather_logo.svg";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { push } from 'connected-react-router'
import {useStripe, elements} from '@stripe/react-stripe-js';
import ConnectPayout from "../stripe_components/connect_payout";
import ConnectPayment from "../stripe_components/connect_payment";
import TestSetupIntent from "../stripe_components/test_setup_intent";
import { 
  testCharge,
  disconnectFca,
  setDefaultFca,
  listFcas,
  listExBAs,
} from "../../reducers/stripe/dispatchers/stripe.setup.dispatcher";

import AccountsList from "./accounts_list";

const PaymentInfo = (props) => {
  const stripe = useStripe()

  const redirectToStripe = (e) => {
    props.push("/profile/onboarding-refresh")
  }

  const [paymentMethods, setPaymentMethods] = useState([])
  const [exBankAcounts, setExBankAcounts] = useState([])

  useEffect(() => {
    if (props.user?.buyerRequested) {
      refreshPaymentMethods()
    }
    if (props.user?.workerRequested) {
      refreshBankAccounts()
    }
  }, [props.user])

  const refreshPaymentMethods = () => {
    props.listFcas().then(
      (methods) => {
        console.log("Methods: ", methods)
        setPaymentMethods(methods)
      },
      (error) => {
        console.log("Failure mode")
      }
    )
  }

  const refreshBankAccounts = () => {
    props.listExBAs().then(
      (accounts) => {
        console.log("Accounts: ", accounts)
        setExBankAcounts(accounts)
      },
      (error) => {
        console.log("Failure mode")
      }
    )
  }
  const deleteFca = (id) => {
    props.disconnectFca(id).then(() => {
      refreshPaymentMethods()
    })
  }
  
  useEffect(() => {
    console.log(props.user)
  }, [props.user])

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div>
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Connected Accounts</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">How you get paid and pay for contracts on feather.</p>
        </div>
        {props.user.stripeConnected ? (
        <div>
          <div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Full name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{props.user.stripeInfo.firstName + " " + props.user.stripeInfo.lastName}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{props.user.email}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{props.user.stripeInfo.phone}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {props.user.stripeInfo.address.line1 + ", " +
                    (props.user.stripeInfo.address.line2 !== "" ? (props.user.stripeInfo.address.line2+ ", ") : "") +
                    props.user.stripeInfo.address.city + " " + props.user.stripeInfo.address.state 
                    + " " + props.user.stripeInfo.address.postalCode + ", " + props.user.stripeInfo.address.country}
                    </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {props.user.stripeInfo.dob.month + "/" + props.user.stripeInfo.dob.day + "/" +props.user.stripeInfo.dob.year }
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div>
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Bank Account</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">The account associated with Feather for payments and payouts</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Account Number</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{"********"+props.user.stripeInfo.lastFourAccount}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Routing Number</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{props.user.stripeInfo.routingNumber}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        ) : (
          <></>
        )}
        {props.user.buyerRequested && (
          <div>
            <div className="flex justify-between w-full px-4 pb-1 items-center">
              <h1 className="pl-2 pb-2 font-semibold text-gray-900 text-lg">Payment Methods</h1>
              <ConnectPayment secondaryHandle={refreshPaymentMethods}/>
            </div>
            <AccountsList accounts={paymentMethods} starterDefault={props.user.defaultFca} setDefault={props.setDefaultFca} delete={deleteFca}/>
          </div>
        )}
        
        <div>
          {props.user.workerRequested && (
            <div>
              <div className="flex justify-between w-full px-4 pb-1 items-center">
                <h1 className="pl-2 pb-2 font-semibold text-gray-900 text-lg">Payout Methods</h1>
                <ConnectPayout secondaryHandle={refreshPaymentMethods}/>
              </div>
              {/* starterDefault={} setDefault={} delete={} */}
              <AccountsList accounts={exBankAcounts} />
            </div>
          )}
        </div>
      </div>
      <TestSetupIntent/>
    </div>
    
  )
}

const mapStateToProps = ({ user, stripe}) => ({
  user: user.user,
  clientSecret: stripe.clientSecret,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  push,
  testCharge,
  disconnectFca,
  listFcas,
  listExBAs,
  setDefaultFca,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentInfo)