import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import store from '../store'
import { Provider } from 'react-redux'
import '../styles/globals.css'
import AppWrapper from "../components/app_wrapper";

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const FeatherApp = ({Component, pageProps}) => {
  return (
    <Provider store={store}>
      <AppWrapper>
        <Elements stripe={stripePromise}>
          <Navbar/>
          <Component {...pageProps}/>
        </Elements>
      </AppWrapper>
    </Provider>
  )
}

export default FeatherApp
