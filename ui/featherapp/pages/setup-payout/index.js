import React, {useState, useRef, useEffect, useContext} from "react";
import feather_logo from "../../public/feather_logo.svg";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import ConnectPayout, { CreatePayoutMethodContext } from "../../components/stripe/connect_payout"
import { setRedirectRoute } from "../../reducers/site/site.reducer";

import {Oval} from 'react-loading-icons'
import Image from "next/image"
import { useRouter } from "next/router"

const SetupPayment = (props) => {

  const router = useRouter()

  const [connectLoading, setConnectLoading] = useState(false)
  const [showSecondaryMsg, setShowSecondaryMsg] = useState(false)
  const [redirect, setRedirect] = useState("")

  useEffect(() => {
    if (props.redirectRoute !== "") {
      setRedirect(props.redirectRoute)
      props.setRedirectRoute("")
    }
  }, [props.redirectRoute])

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Image
              className="mx-auto h-12 w-auto"
              src={feather_logo}
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Get Paid!</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              If you want to be able to get paid for your contracts, get connected to stripe.
            </p>
          </div>
        
          <div className="flex flex-col items-center py-8">
            <ConnectPayout 
              finishedConnecting={() => {
                setConnectLoading(false)
                setShowSecondaryMsg(false)
              }}
              returnRoute={
                redirect !== "" ? redirect : (props.forwardToPayment ? "/setup-payment" : "/contracts")
              }>
              <CreatePayoutMethodContext.Consumer>
                {value => <button
                  type="submit"
                  className={"justify-center py-2 px-8 "+
                            "border border-transparent rounded-md "+
                            "shadow-sm text-xl font-medium text-white "+
                            "bg-primary5 hover:bg-primary6 focus:outline-none "+
                            "focus:ring-2 focus:ring-offset-2 focus:ring-primary4 "+
                            "disabled:bg-primary3" 
                            }
                  onClick={() => {
                    setConnectLoading(true)
                    setTimeout(() => {
                      setShowSecondaryMsg(true)
                    }, 1000)
                    value()
              
                  }}
                >
                  Connect Payout  
                </button>}
              </CreatePayoutMethodContext.Consumer>
            </ConnectPayout>

            {connectLoading ? (
              <div className="h-8 mt-4 flex flex-col items-center gap-y-4">
                {showSecondaryMsg && (
                  <h1 className="max-w-sm text-md text-primary7 text-center font-medium">Give us a second to create your account with Stripe and redirect you...</h1>
                )}
                <Oval className=" w-8 h-8" stroke={"#7993A0"} fill={"#7993A0"} strokeWidth={4}/>
              </div>
            ) : (
              <>
                <div className="h-12"/>
                <button onClick={
                  () => {
                    if (props.redirectRoute !== "") {
                      props.setRedirectRoute("")
                      router.push(props.redirectRoute)
                    } else {
                      router.push(props.forwardToPayment ? "/setup-payment" : "/contracts")
                    }
                  }
                } className="text-secondary5 text-lg font-bold hover:text-secondary4 cursor-pointer">
                  Set up later
                </button>
              </>
            )}
            <br/>
            
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
    forwardToPayment: site.registerForBothMethods
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setRedirectRoute
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SetupPayment)
