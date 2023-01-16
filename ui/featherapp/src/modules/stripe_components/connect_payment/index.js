import React, {useState, useRef, useEffect} from "react";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { 
  getInitialSetupSecret,
  confirmPaymentConnected,
} from "../../../reducers/stripe/dispatchers/stripe.setup.dispatcher";

import { push } from 'connected-react-router'
import {useStripe} from '@stripe/react-stripe-js';
import MandateModal from "../mandate_modal"
const ConnectPayment = (props) => {
  const stripe = useStripe();
  const [clientSecret, setClientSecret] = useState("")
  const [setupIntent, setSetupIntent] = useState("")
  const [showMandate, setShowMandate] = useState(false)

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
            console.log("Cancleed")
          } else if (setupIntent.status === 'requires_confirmation') {
            // We collected an account - possibly instantly verified, but possibly
            // manually-entered. Display payment method details and mandate text
            // to the customer and confirm the intent once they accept
            // the mandate.
            console.log("Need to confirm")
            setSetupIntent(setupIntent)
            setShowMandate(true)
          }
        });
      },
      (error) => {
        console.log("Failed to get intent secret, got error: ", error)
      }
    )
    
  }

  const handleAccept = (e) => {
    stripe.confirmUsBankAccountSetup(clientSecret).then(({setupIntent, error}) => {
      if (error) {
        console.error(error.message);
        // The payment failed for some reason.
      } else if (setupIntent.status === "requires_payment_method") {
        console.log("Try different payment method")
        // Confirmation failed. Attempt again with a different payment method.
      } else if (setupIntent.status === "succeeded") {
        console.log("Success")
        console.log(setupIntent)
        props.confirmPaymentConnected(setupIntent.payment_method).then(() => {
            props.secondaryHandle()
        })
      } else if (setupIntent.next_action?.type === "verify_with_microdeposits") {
        console.log("Verify")
      }
    });
  }
  
  return (
    <>

    <button className="px-2 py-1 text-sm text-white bg-indigo-500 rounded-md" onClick={handleCreate}>Add Payment</button>
    <MandateModal confirmMandate={handleAccept} showMandate={showMandate}/>
    
    </>
  )
}

const mapStateToProps = ({ user }) => ({
  user: user.user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  push,
  getInitialSetupSecret,
  confirmPaymentConnected,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectPayment)