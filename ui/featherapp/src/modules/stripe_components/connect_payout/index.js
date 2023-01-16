import React, {useState, useRef, useEffect} from "react";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { 
    getAccountOnboardLink
} from "../../../reducers/stripe/dispatchers/stripe.setup.dispatcher";

import { push } from 'connected-react-router'
import {useStripe} from '@stripe/react-stripe-js';

const ConnectPayout = (props) => {
  const handleConnect = (e) => {
    props.getAccountOnboardLink().then(
      (url) => {
        window.location.replace(url);
      },
    )
  }

  return (
    <button className="px-2 py-1 text-sm text-white bg-indigo-500 rounded-md"onClick={handleConnect}>Connect Payouts</button>
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