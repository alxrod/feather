import React, {useState, useRef, useEffect} from "react";
import { Redirect } from 'react-router-dom';
import feather_logo from "../../style/logo/feather_logo.svg";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { 
  register,
} from "../../reducers/user/dispatchers/user.dispatcher";

import { push } from 'connected-react-router'
import {
  toggleFromRegister
} from "../../reducers/site/site.reducer";


const SetupPayment = (props) => {

  return (

    
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <h1 className="font-md text-2xl">Connect to our payment provider</h1>
          <div className="flex justify-center mt-2">
            <button className="text-indigo-500 font-bold" onClick={() => props.push("/profile/onboarding-refresh")}>Set up bank account</button>
            <p className="mx-1">or</p>
            <button className="text-gray-500" onClick={() => props.push("/contracts")}>setup later</button>
          </div>
        <br/>
        </div>
    </div>
  )
}

// stripe.collectBankAccountToken({
//   clientSecret: '{FINANCIAL_CONNECTIONS_SESSION_CLIENT_SECRET}'
// })
//   .then(function(result) {
//     if (result.error) {
//       // Inform the customer that there was an error.
//       console.log(result.error.message);
//     } else if (result.token) {
//       // Use result.token to set your user's external payout account
//       console.log(result.token)
//     }
//   });

const mapStateToProps = ({ user, site }) => ({
    user: user.user,
    fromRegister: site.fromRegister
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    register,
    push,
    toggleFromRegister,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SetupPayment)
