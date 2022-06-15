import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter }  from 'connected-react-router'
import store from './store'
import { history } from "./reducers"
import App from './modules/app'


import "./tailwind.generated.css";

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {/* <BrowserRouter> */}
        <div>
          <App />
        </div>
      {/* </BrowserRouter> */}
    </ConnectedRouter>
  </Provider>,
  target
)