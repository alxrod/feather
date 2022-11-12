/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon, UserIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'

import f_logo from "../../style/logo/f_logo.svg";
import feather_logo from "../../style/logo/feather_logo.svg";

import { bindActionCreators } from 'redux'
import { logout } from "../../reducers/user/dispatchers/user.dispatcher";
import { connect } from "react-redux";
import ContractTimeline from "../contract/components/contract_timeline"
import { contractStages } from "../../services/contract.service"
import { useLocation } from 'react-router-dom'
import { push } from "connected-react-router"
import ProfilePhoto from "../general_components/profile_photo"
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const NavBar = (props) => {
  const [inContractView, toggleInContractView] = useState(false)
  const [contractStage, setContractStage] = useState(0)
  const loc = useLocation()

  useEffect(() => {
    if (props.curContract.id) {
      toggleInContractView(true)
      setContractStage(props.curContract.stage)
    } else {
      toggleInContractView(false)
      if (loc.pathname.split("/")[1] === "create") {
        toggleInContractView(true)
        setContractStage(contractStages.CREATE)
      }
    }

  }, [props.curContract, loc])
  
  if (props.showNavbar) {
    return (
      <Disclosure as="nav" className="bg-white shadow">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="block lg:hidden h-8 w-auto"
                      src={f_logo}
                      alt="Workflow"
                    />
                    <img
                      className="hidden lg:block h-8 w-auto"
                      src={feather_logo}
                      alt="Workflow"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                    <div className="flex px-1 pt-1 font-medium ">
                      <Link
                          to="/contracts"
                          className=" text-gray-900 inline-flex items-center"
                      >
                          Contracts
                      </Link>
                      {/* <div className="inline-flex items-center bg-red m-auto px-1 py-0 rounded-full">
                          <p className="text-white">3</p>
                      </div> */}
                      
                    </div>
                    
                    <div className="flex px-1 pt-1 font-medium">
                      <Link
                          to="/messages"
                          className="border-transparent text-gray-500 hover:text-gray-700 inline-flex items-center mr-1"
                      >
                        Messages
                      </Link>
                      <div className="inline-flex items-center bg-red m-auto px-1 py-0 rounded-full">
                        <span className="inline-flex items-center px-0.75 py-0.25 rounded-full text-sm font-light bg-red-100 text-white">
                          3
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <button
                    type="button"
                    className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                  </button>

                  {/* Profile dropdown */}
                  {props.isLoggedIn ? (
                  <Menu as="div" className="ml-3 relative z-10">
                    <div>
                      <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        <div className="flex items-center">
                          <h1 className="mr-2 text-gray-400 text-lg">@{props.user.username}</h1>
                          {/* <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          /> */}
                          <ProfilePhoto width={8} height={8} user={props.user}/>
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Your Account
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="#"
                              onClick={() => {
                                props.logout()
                                props.push("/")
                              }}
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Log out
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  ) : (
                    <div className="flex px-1 pt-1 font-medium space-x-4">
                        <Link
                          to="/login"
                          className={classNames('text-indigo-500 hover:text-indigo-600 inline-flex items-center')}
                        >
                          Log in
                        </Link>
    
                        <Link
                          to="/register"
                          className={classNames('text-gray-700 hover:text-gray-900 inline-flex items-center')}
                        >
                          Sign up
                        </Link>
                    </div>
                  )}
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="pt-2 pb-3 space-y-1">
                {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="bg-indigo-50 text-black-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  <Link
                    to="/contracts"
                    className=" text-gray-900 inline-flex items-center"
                  >
                    Contracts
                  </Link>
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  <Link
                    to="/messages"
                    className=" text-gray-900 inline-flex items-center"
                  >
                    Messages
                  </Link>
                </Disclosure.Button>
              </div>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4">
                  {props.isLoggedIn && (
                  <>
                    <div className="flex-shrink-0">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                        {props.isLoggedIn && (
                          <h1 className="ml-1">@{props.user.username}</h1>
                        )}
                      </div>
                    </div>

                  </>
                  )}
                </div>
                <div className="mt-3 space-y-1">
                {props.isLoggedIn &&(
                  <Disclosure.Button
                    as="a"
                    href="/profile"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                  {({ active }) => (
                    <Link
                      to="/profile"
                      className={classNames(active ? 'bg-gray-100' : '', 'text-sm text-gray-700')}
                    >
                      Account
                    </Link>
                  )}
                </Disclosure.Button>
                )}
                {!props.isLoggedIn && (
                  <>
                    <Disclosure.Button
                      as="a"
                      href="/login"
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    >
                      {({ active }) => (
                        <Link
                          to="/login"
                          className={classNames(active ? 'bg-gray-100' : '', 'text-sm text-gray-700')}
                        >
                          Log in
                        </Link>
                      )}
                    </Disclosure.Button>

                    <Disclosure.Button
                      as="a"
                      href="/register"
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    >
                      {({ active }) => (
                        <Link
                          to="/register"
                          className={classNames(active ? 'bg-gray-100' : '', 'text-sm text-gray-700')}
                        >
                          Sign up
                        </Link>
                      )}
                    </Disclosure.Button>
                  </>
                )}
                {props.isLoggedIn && (
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  {({ active }) => (
                    <Link
                      to="#"
                      onClick={() => {
                        props.logout()
                        props.push("/")
                      }}
                      className={classNames(active ? 'bg-gray-100' : '', 'text-sm text-gray-700')}
                    >
                      Log out
                    </Link>
                  )}
                </Disclosure.Button>
                )}
                </div>
              </div>
            </Disclosure.Panel>
            {inContractView && (
              <ContractTimeline stage={contractStage}/>
            )}
            
          </>
        )}
        
      </Disclosure>
    )
  } else {
    return <></>
  }
}

const mapStateToProps = ({ user, site, contract }) => ({
  isLoggedIn: user.isLoggedIn,
  user: user.user,
  showNavbar: site.showNavbar,
  curContract: contract.curContract,

})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  logout,
  push,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)