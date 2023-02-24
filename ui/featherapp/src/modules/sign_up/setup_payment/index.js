import React, {useState, useRef, useEffect} from "react";
import { Redirect } from 'react-router-dom';
import feather_logo from "../../../style/logo/feather_logo.svg";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { push } from 'connected-react-router'

import parse from "date-fns/parse";
import ConnectPayment, { CreatePaymentMethodContext } from "../../stripe_components/connect_payment"
import {Oval} from 'react-loading-icons'
import { setRedirectRoute } from "../../../reducers/site/site.reducer";

const SetupPayment = (props) => {
  const [connectLoading, setConnectLoading] = useState(false)
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-12 w-auto"
              src={feather_logo}
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Setup Payment</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              If you want pay for your contracts, connect here
            </p>
            {/* <p className="mt-2 text-center text-sm text-red-400">
              {mainMessage}
            </p> */}


          </div>
        
          <div className="flex flex-col items-center py-8">
            <ConnectPayment 
              finishedConnecting={() => setConnectLoading(false)} 
              returnRoute="/setup-payment"
              secondaryHandle={() => {
                if (props.redirectRoute !== "") {
                  props.setRedirectRoute("")
                  props.push(props.redirectRoute)
                } else {
                  props.push("/contracts")
                }
              }}>
              <CreatePaymentMethodContext.Consumer>
                {value=> <button
                  onClick={() => {
                    setConnectLoading(true)
                    value()
                  }}
                  type="submit"
                  className={"justify-center py-2 px-8 "+
                            "border border-transparent rounded-md "+
                            "shadow-sm text-xl font-medium text-white "+
                            "bg-primary5 hover:bg-primary6 focus:outline-none "+
                            "focus:ring-2 focus:ring-offset-2 focus:ring-primary4 "+
                            "disabled:bg-primary3" 
                            }
                >
                  Connect Payment  
                </button>}
              </CreatePaymentMethodContext.Consumer>
            </ConnectPayment>
            {connectLoading && (
              <Oval className="mt-4 w-8 h-8" stroke={"#7993A0"} fill={"#7993A0"} strokeWidth={4}/>
            )}
            <br/>
            <a onClick={() => {
              if (props.redirectRoute !== "") {
                props.setRedirectRoute("")
                props.push(props.redirectRoute)
              } else {
                props.push("/contracts")
              }
            }} className="text-secondary5 text-lg font-bold hover:text-secondary4 cursor-pointer">
              Set up later
            </a>
          </div>

          

        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ user, site }) => ({
    user: user.user,
    defaultRegisterRole: user.defaultRegisterRole,
    redirectLink: user.redirectLink,
    redirectRoute: site.redirectRoute
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    push,
    setRedirectRoute

}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SetupPayment)
