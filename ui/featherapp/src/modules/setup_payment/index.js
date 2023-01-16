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
import PaymentModule from "./payment_module";

const SetupPayment = (props) => {

  const paymentSuccess = () => {
    props.push("/profile")
  }

  return (
        <>
          <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <img
                className="mx-auto h-12 w-auto"
                src={feather_logo}
                alt="Workflow"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Set Up Your Bank Account</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                So you can get paid!
              </p>
            </div>
    
            <PaymentModule paymentSuccess={paymentSuccess}/>
          </div>
        </>
    )

   
}

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
