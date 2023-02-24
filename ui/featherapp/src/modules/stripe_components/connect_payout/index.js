import React, {useState, useRef, useEffect, createContext} from "react";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { 
    getAccountOnboardLink
} from "../../../reducers/stripe/dispatchers/stripe.setup.dispatcher";

import { push } from 'connected-react-router'
import {useStripe} from '@stripe/react-stripe-js';

export const CreatePayoutMethodContext = createContext(() => {})

const ConnectPayout = (props) => {
  const handleConnect = (e) => {
    props.getAccountOnboardLink(props.returnRoute).then(
      (url) => {
        if (props.finishedConnecting) {
          props.finishedConnecting()
        }
        window.location.replace(url);
      },
    )
  }

  return (
    <CreatePayoutMethodContext.Provider value={handleConnect}>
      {props.children}
    </CreatePayoutMethodContext.Provider>
  )
}

const mapStateToProps = ({ user }) => ({
  user: user.user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  push,
  getAccountOnboardLink,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectPayout)