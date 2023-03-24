import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import store from '../store'
import { Provider } from 'react-redux'
import '../styles/globals.css'
import AppWrapper from "../components/app_wrapper";
import Head from 'next/head';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const FeatherApp = ({Component, pageProps}) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href={process.env.NEXT_PUBLIC_FRONTEND_URL+"/favicon.ico"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <link rel="apple-touch-icon" href={process.env.NEXT_PUBLIC_FRONTEND_URL+"/logo192.png"} />
        
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link href="https://fonts.googleapis.com/css2?family=Bree+Serif&display=swap" rel="stylesheet"/>
        
        <link rel="manifest" href={process.env.NEXT_PUBLIC_FRONTEND_URL+"/manifest.json"} />

        <title>Feather</title>
      </Head>
      <Provider store={store}>
        <AppWrapper>
          <Elements stripe={stripePromise}>
            <Navbar/>
            <Component {...pageProps}/>
          </Elements>
        </AppWrapper>
      </Provider>
    </>
  )
}

export default FeatherApp
