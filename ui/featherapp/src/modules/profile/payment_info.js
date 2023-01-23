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

import { CreditCardIcon } from '@heroicons/react/outline'


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

    <div className="overflow-hidden bg-white shadow sm:rounded-lg max-w-2xl w-full" >
      {props.user.buyerRequested && (
        <>
          <div className="pl-3 pr-4 py-2 sm:pr-6 flex items-center justify-between">
            <div className="flex items-center">
              <CreditCardIcon className="m-2 w-6 h-6 text-primary5"/>
              <h3 className="text-lg font-medium leading-6 text-gray-700">Buyer Settings (payment) </h3>
            </div>
            <ConnectPayment secondaryHandle={refreshPaymentMethods}/>
          </div>
          <div className="border-t border-gray-200">
            <AccountsList 
              accounts={paymentMethods} 
              starterDefault={props.user.defaultFca} 
              setDefault={props.setDefaultFca} 
              delete={deleteFca}
            />
          </div>
        </>
      )}
      {props.user.workerRequested && (
        <>
          <div className="pl-3 pr-4 py-2 sm:pr-6 flex items-center justify-between">
            <div className="flex items-center">
              <CreditCardIcon className="m-2 w-6 h-6 text-primary5"/>
              <h3 className="text-lg font-medium leading-6 text-gray-700">Worker Settings (payout) </h3>
            </div>
            <ConnectPayout secondaryHandle={refreshPaymentMethods}/>
          </div>
          <div className="border-t border-gray-200">
            <AccountsList accounts={exBankAcounts} />
          </div>
        </>
      )}
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