import React, {useState, useRef, useEffect, createContext} from "react";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { 
  getInitialSetupSecret,
  confirmPaymentConnected,
} from "../../../reducers/stripe/dispatchers/stripe.setup.dispatcher";

import {useStripe} from '@stripe/react-stripe-js';
import MandateModal from "../mandate_modal"
import WarningModal from "./warning_modal";

export const CreatePaymentMethodContext = createContext(() => {})

const ConnectPayment = (props) => {
  const stripe = useStripe();
  const [clientSecret, setClientSecret] = useState("")
  const [setupIntent, setSetupIntent] = useState("")
  const [showMandate, setShowMandate] = useState(false)

  const [showWarning, setShowWarning] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleCreate = (e) => {
    props.getInitialSetupSecret().then(
      (secret) => {
        setClientSecret(secret)
        stripe.collectBankAccountForSetup({
          clientSecret: secret,
            expand: ['payment_method'],
            params: {
              payment_method_type: 'us_bank_account',
              payment_method_data: {
                billing_details: {
                  name: (props.user.firstName + " " + props.user.lastName),
                  email: props.user.email,
                },
              },
            },
        })
        .then(({setupIntent, error}) => {
          if (error) {
            console.error(error.message);
            // PaymentMethod collection failed for some reason.
          } else if (setupIntent.status === 'requires_payment_method') {
            // Customer canceled the hosted verification modal. Present them with other
            // payment method type options.
          } else if (setupIntent.status === 'requires_confirmation') {
            // We collected an account - possibly instantly verified, but possibly
            // manually-entered. Display payment method details and mandate text
            // to the customer and confirm the intent once they accept
            // the mandate.
            setSetupIntent(setupIntent)
            setShowMandate(true)
          }
          if (props.finishedConnecting) {
            props.finishedConnecting()
          }
          
        });
      },
      (error) => {
        console.log("Error: ", error)
        setErrorMsg(error)
        setShowWarning(true)
      }
    )
    
  }

  const handleAccept = (e) => {
    stripe.confirmUsBankAccountSetup(clientSecret).then(({setupIntent, error}) => {
      if (error) {
        console.error(error.message);
        // The payment failed for some reason.
      } else if (setupIntent.status === "requires_payment_method") {
        // Confirmation failed. Attempt again with a different payment method.
      } else if (setupIntent.status === "succeeded") {
        props.confirmPaymentConnected(setupIntent.payment_method).then(() => {
          props.secondaryHandle()
        })
      } else if (setupIntent.next_action?.type === "verify_with_microdeposits") {
      }
    });
  }
  // <button className="px-2 py-1 text-sm text-white bg-primary4 rounded-md" onClick={handleCreate}>Add Payment</button>
  return (
    <div>
      <CreatePaymentMethodContext.Provider value={handleCreate}>
          <WarningModal open={showWarning} setOpen={setShowWarning} errorMsg={errorMsg}/>
          {props.children}
          <MandateModal confirmMandate={handleAccept} showMandate={showMandate}/>
      </CreatePaymentMethodContext.Provider>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  user: user.user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getInitialSetupSecret,
  confirmPaymentConnected,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectPayment)