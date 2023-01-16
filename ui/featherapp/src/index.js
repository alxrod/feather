import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter }  from 'connected-react-router'
import store from './store'
import { history } from "./reducers"
import App from './modules/app'


import "./tailwind.generated.css";

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const target = document.querySelector('#root')
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </ConnectedRouter>
  </Provider>,
  target
)