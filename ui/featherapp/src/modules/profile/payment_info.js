import React, {useState, useRef, useEffect, useContext} from "react";
import { Redirect } from 'react-router-dom';
import feather_logo from "../../style/logo/feather_logo.svg";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { push } from 'connected-react-router'
import {useStripe, elements} from '@stripe/react-stripe-js';
import ConnectPayout, {CreatePayoutMethodContext} from "../stripe_components/connect_payout";
import ConnectPayment, { CreatePaymentMethodContext } from "../stripe_components/connect_payment";
import { 
  disconnectFca,
  disconnectExBa,
  setDefaultFca,
  listFcas,
  listExBAs,
  deleteConnectedAccount,
} from "../../reducers/stripe/dispatchers/stripe.setup.dispatcher";
import {
  changeWorkerStatus
} from "../../reducers/user/dispatchers/user.dispatcher";

import { CheckCircleIcon, ClockIcon, PlusIcon } from '@heroicons/react/outline'
import {Oval} from 'react-loading-icons'

import ErrorModal from "./error_modal";
import DisconnectBaWarning from "./ba_warning";

import AccountsList from "./accounts_list";

const PaymentInfo = (props) => {
  const stripe = useStripe()

  const redirectToStripe = (e) => {
    props.push("/profile/onboarding-refresh")
  }

  const [connectingToStripePayout, setConnectingToStripePayout] = useState(false)

  const [paymentMethods, setPaymentMethods] = useState([])
  const [exBankAcounts, setExBankAcounts] = useState([])

  const [errorModalOpen, setErrorModalOpen] = useState(false)
  const [baWarningOpen, setBaWarningOpen] = useState(false)

  const [errorTitle, setErrorTitle] = useState("")
  const [errorBody, setErrorBody] = useState("")

  const paymentContext = useContext(CreatePaymentMethodContext)
  const payoutContext = useContext(CreatePayoutMethodContext)

  useEffect(() => {
    if (props.user?.buyerModeEnabled) {
      refreshPaymentMethods()
    }
    if (props.user?.workerModeEnabled) {
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
    props.disconnectFca(id).then(
      () => {
        refreshPaymentMethods()
      },
      (error) => {
        setErrorTitle("Delete Not Allowed")
        setErrorBody(error)
        setErrorModalOpen(true)
      },
    )
  }
  const deleteStripeBa = () => {
    props.deleteConnectedAccount().then(
      () => {
        setExBankAcounts([])
        props.changeWorkerStatus(false)
        setBaWarningOpen(false)
      },
      (error) => {
        console.log("ERROR was: ", error)
        setErrorBody(error)
      }
    )
  }
  
  useEffect(() => {
    console.log(props.user)
  }, [props.user])

  return (
    <div className="max-w-2xl w-full">
      <ErrorModal 
        open={errorModalOpen}
        setOpen={setErrorModalOpen}
        title={errorTitle}
        body={errorBody}
      />
      <DisconnectBaWarning
        open={baWarningOpen}
        setOpen={setBaWarningOpen}
        onDelete={deleteStripeBa}
        body={errorBody}
      />
      <div className="overflow-hidden bg-white shadow sm:rounded-lg w-full" >
        <div>
          <div className="pr-4 py-2 sm:pr-6 flex items-center justify-between">
            <div className="p-4 sm:p-6 flex items-center justify-between w-full">
              <h1 className="text-4xl font-bold leading-6 text-gray-700">Payment Settings</h1>
              {/* {connectingToStripe && (
                <Oval className="w-9 h-9" stroke={"#7993A0"} fill={"#7993A0"} strokeWidth={4}/>
              )} */}
            </div>
            {paymentMethods.length > 0 && (
            <ConnectPayment secondaryHandle={refreshPaymentMethods}>
              <CreatePaymentMethodContext.Consumer>
                {value => <button className="p-1 text-sm text-white bg-primary4 hover:bg-primary5 focus:bg-primary6 rounded-full" onClick={value}><PlusIcon className="w-6 h-6" strokeWidth={3}/></button>}
              </CreatePaymentMethodContext.Consumer>
            </ConnectPayment>
            )}
          </div>
          <div className="border-gray-200">
            {paymentMethods.length > 0 ? ( 
            <AccountsList 
              accounts={paymentMethods} 
              starterDefault={props.user.defaultFca} 
              setDefault={props.setDefaultFca} 
              delete={deleteFca}
            />) : (
              <div className="w-full flex justify-center">
                <ConnectPayment secondaryHandle={refreshPaymentMethods}>
                  <CreatePaymentMethodContext.Consumer>
                    {value => <button className="px-4 py-3 text-white text-xl font-semibold bg-primary4 hover:bg-primary5 focus:bg-primary6 rounded-md" onClick={value}>Add your first account</button>}
                  </CreatePaymentMethodContext.Consumer>
                </ConnectPayment>
              </div>
            )}
          </div>
        </div>
        <br/>
      </div>
      <br/>
      <div className="overflow-hidden bg-white shadow sm:rounded-lg w-full">
        <div className="p-4 sm:p-6 flex items-center justify-between w-full">
          <h1 className="text-4xl font-bold leading-6 text-gray-700">Payout Settings</h1>
          {connectingToStripePayout && (
            <Oval className="w-9 h-9" stroke={"#7993A0"} fill={"#7993A0"} strokeWidth={4}/>
          )}
          {props.user.workerModeEnabled && (
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 text-base rounded-md shadow-sm font-medium leading-4 bg-red-100 text-red-800"
              onClick={() => setBaWarningOpen(true)}
            >
              Delete Account
            </button>
          )}
        </div>
        {exBankAcounts.length > 0 ? (
          <div className="px-8 pb-8 pt-2 border-gray-200 flex justify-between items-center">
            <div className="flex items-center">
              <CheckCircleIcon className="text-primary4 w-12 h-12" strokeWidth={1.5}/>
              <h2 className="ml-2 text-xl text-gray-500">Account {"•••••••• "}{exBankAcounts[0].accountLast4} is connected</h2>
            </div>

            <div>
              <ConnectPayout className="w-full" secondaryHandle={refreshPaymentMethods}>
                <CreatePayoutMethodContext.Consumer>
                  {value => 
                  <button onClick={() => {
                    setConnectingToStripePayout(true)
                    value()
                  }} className="px-2 py-1 text-white bg-primary4 rounded-md shadow-sm">
                      Edit Settings
                  </button>}
                </CreatePayoutMethodContext.Consumer>
              </ConnectPayout>
            </div>
          </div>
        ) : props.user.workerModeRequested && exBankAcounts.length == 0 ? (
          <div className="px-8 pb-8 pt-2 border-gray-200 flex justify-between items-center">
            <div className="flex items-center">
              <ClockIcon className="w-8 h-8 text-secondary5" strokeWidth={1.5}/>
              <h2 className="ml-2 text-xl text-gray-500">Stripe is still enabling your account, it'll be ready soon</h2>
            </div>

            <div>
              <ConnectPayout className="w-full" secondaryHandle={refreshPaymentMethods}>
                <CreatePayoutMethodContext.Consumer>
                  {value => <button onClick={() => {
                    setConnectingToStripePayout(true)
                    value()
                  }} className="px-2 py-1 text-white bg-primary4 rounded-md shadow-sm">Edit </button>}
                </CreatePayoutMethodContext.Consumer>
              </ConnectPayout>
            </div>
        </div>
        ) : (
          <div className="flex w-full flex-col items-center px-8 pt-4 pb-10">
            <ConnectPayout className="w-full max-w-2xl" secondaryHandle={refreshPaymentMethods}>
              <CreatePayoutMethodContext.Consumer>
                {value => <button onClick={() => {
                  setConnectingToStripePayout(true)
                  value()
                }} className="px-4 py-3 text-white text-xl font-semibold bg-primary4 rounded-md shadow-sm">Setup your first account for payouts</button>}
              </CreatePayoutMethodContext.Consumer>
            </ConnectPayout>
          </div>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = ({ user, stripe}) => ({
  user: user.user,
  clientSecret: stripe.clientSecret,
  
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  push,
  disconnectFca,
  disconnectExBa,
  listFcas,
  listExBAs,
  setDefaultFca,
  deleteConnectedAccount,
  changeWorkerStatus,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentInfo)