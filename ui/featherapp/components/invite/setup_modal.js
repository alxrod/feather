import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon, CheckIcon } from '@heroicons/react/outline'

import RegisterCard from "../auth/register_card"
import LoginCard from "../auth/login_card"

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Link from "next/link"
import { 
  register,
} from "../../reducers/user/dispatchers/user.dispatcher";

import ConnectPayment, { CreatePaymentMethodContext } from "../stripe/connect_payment"
import {Oval} from 'react-loading-icons'

const SetupModal = (props) => {

  const [serverError, setServerError] = useState()
  const [loginMode, setLoginMode] = useState(null)
  const [defaultEmail, setDefaultEmail] = useState(undefined)
  const [connectLoading, setConnectLoading] = useState(false)

  useEffect(() => {
    if (defaultEmail === null && props.defaultEmail && props.defaultEmail !== "") {
      setDefaultEmail(props.defaultEmail)
    }
  }, [props.defaultEmail])

  useEffect(() => {
    if ((props.loginModeDefault === false || props.loginModeDefault) && loginMode === null) {
      setLoginMode(props.loginModeDefault)
    }
  }, [props.loginModeDefault])

  const onRegister = (values) => {
    const splitNames = values.fullName.split(" ")
    const firstName = splitNames[0]
    const lastName = splitNames[splitNames.length - 1]
    props.register(values.username, firstName, lastName, values.email, values.password).then( () => {
    }, err => {
        setServerError(err)
    })
  }

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary5 focus:ring-offset-2"
                    onClick={() => props.setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>


                {!props.isLoggedIn && !loginMode ? (
                  <div className="mt-4">
                    <h1 className="text-2xl font-semibold text-gray-600 text-center w-full">
                      Sign up to join the contract
                    </h1>
                    {!defaultEmail && (
                      <div className="flex justify-center text-gray-400 hover:text-primary5">
                        <button onClick={() => setLoginMode(true)}>or log in</button>
                      </div>
                    )}
                    <p className="text-center text-red-400 text-sm">{serverError}</p>
                    <div className="p-8 md:px-10 lg:px-16">
                      <RegisterCard onSubmit={onRegister} defaultEmail={defaultEmail}/>
                    </div>
                  </div>
                ) : !props.isLoggedIn && loginMode ? (
                  <div className="mt-4">
                    <h1 className="text-2xl font-semibold text-gray-600 text-center w-full">
                      Log in to join the contract
                    </h1>
                    {!defaultEmail && (
                      <div className="flex justify-center text-gray-400 hover:text-primary5">
                        <button onClick={() => setLoginMode(false)}>or sign up</button>
                      </div>
                    )}
                    <p className="text-red-400 text-sm">{serverError}</p>
                    <div className="p-8 md:px-10 lg:px-16">
                      <LoginCard defaultEmail={defaultEmail}/>
                    </div>
                  </div>
                ) : props.needPaymentMethod && !props.user.buyerModeEnabled? (
                  <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-semibold text-gray-600 text-center w-full">
                      Welcome Aboard Feather!
                    </h1>
                    <p className="pt-2 text-gray-500 text-center max-w-sm">Since {props.existingUsername} invited you to be a sponsor, you need to connect a payment method for the contract</p>
                    <div className="flex flex-col items-center py-8">
                      <ConnectPayment 
                        finishedConnecting={() => setConnectLoading(false)} 
                        secondaryHandle={() => {
                          // if (props.redirectRoute !== "") {
                          //   // props.setRedirectRoute("")
                          //   // props.push(props.redirectRoute)
                          // } else {
                          //   props.push("/contracts")
                          // }
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
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <h1 className="text-2xl font-semibold text-gray-600 text-center w-full">
                          You're all set
                        </h1>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Join the contract whenever you are ready to begin negotiating
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-primary6 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary6"
                        onClick={() => props.handleClaim()}
                      >
                        Join Contract
                      </button>
                    </div>
                  </div>
                )}



              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

const mapStateToProps = ({ user }) => ({
  user: user.user,
  isLoggedIn: user.isLoggedIn,
  
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  register,
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(SetupModal)