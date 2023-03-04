import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { LibraryIcon, CheckIcon, XIcon } from '@heroicons/react/outline'
import { ArrowRightIcon } from '@heroicons/react/solid'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { setRedirectRoute } from "../../../../reducers/site/site.reducer"

const RoleModal = (props) => {

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={props.modalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={props.setModalOpen}>
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
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary1 sm:mx-0 sm:h-10 sm:w-10">
                    <LibraryIcon className="h-6 w-6 text-primary5" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Contract Role
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        In the contract, the <b className="text-primary5">buyer</b> pays for the tasks by the specified deadlines and the <b className="text-primary5">worker</b> gets paid for completing them.
                      </p>
                      <div className="mt-2 grid grid-cols-1 gap-y-2">
                        {props.user?.workerModeEnabled ? (
                          <div className="flex items-center text-sm text-gray-500"><CheckIcon className="w-4 h-4 text-green-500 mr-2"/> You are enabled to be a worker</div>
                        ) : (
                          <div className="flex items-center text-sm text-gray-500"><XIcon className="w-4 h-4 text-red-500 mr-2"/> 
                            <p>You haven't set up payouts to be a worker yet, set it up<a className="font-semibold text-primary6 cursor-pointer ml-1" onClick={() => {
                              props.setRedirectRoute((props.curContract.id !== "" && props.curContract.id !== null && props.curContract.id !== undefined) ? ("/create/"+props.curContract.id) : "/create/new")
                              props.push("/setup-payout")
                            }}>here</a></p>
                          </div>
                        )}
                        {props.user?.buyerModeEnabled ? (
                          <div className="flex items-center text-sm text-gray-500"><CheckIcon className="w-4 h-4 text-green-500 mr-2"/> You are enabled to be a buyer</div>
                        ) : (
                          <div className="flex items-center text-sm text-gray-500">
                            <XIcon className="w-4 h-4 text-red-500 mr-2"/> 
                            <p>You haven't set up payment to be a buyer yet, set it up<a className="font-semibold text-primary6 cursor-pointer ml-1" onClick={() => {
                              props.setRedirectRoute((props.curContract.id !== "" && props.curContract.id !== null && props.curContract.id !== undefined) ? ("/create/"+props.curContract.id) : "/create/new")
                              props.push("/setup-payment")}
                            }>here</a></p>
                          </div>
                        )}                       
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md border text-primary6 border-transparent bg-primary1 px-4 py-2 text-base font-medium text-white shadow-sm hover:primary-2 focus:outline-none focus:ring-2 focus:ring-primary2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      props.setRedirectRoute((props.curContract.id !== "" && props.curContract.id !== null && props.curContract.id !== undefined) ? ("/create/"+props.curContract.id) : "/create/new")
                      props.push("/profile")
                    }}
                  >
                    Setup Profile
                    <ArrowRightIcon className="w-4 h-4 text-primary5 ml-2"/>
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary5 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => props.setModalOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

const mapStateToProps = ({ user, contract }) => ({
  user: user.user,
  curContract: contract.curContract
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
  push,
  setRedirectRoute
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoleModal)