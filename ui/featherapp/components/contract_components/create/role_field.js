import { useMemo, useEffect, useState, Fragment } from 'react'
import { Switch } from '@headlessui/react'
import { WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RoleModal from "./role_field_modal"
import { CogIcon } from '@heroicons/react/outline'


import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const RoleField = (props) => {

  const [roles, setRoles]= useState({
    buyer: {name: "Buyer", available: false, code: BUYER_TYPE},
    worker: {name: "Worker", available: true, code: WORKER_TYPE},
  }) 
  
  useEffect(() => {
    if (props.role === WORKER_TYPE) {
      setRole(roles.worker)
    } else if (props.role === BUYER_TYPE) {
      setRole(roles.buyer)
    }
  }, [props.role])

  const [selectedRole, setSelectedRole] = useState(roles.worker)

  const [modalOpen, setModalOpen] = useState(false)
  useEffect(() => {
    let newRoles = {...roles}
    if (props.user?.workerModeEnabled === true) {
      const updatedWorker = newRoles.worker
      updatedWorker.available = true
      setSelectedRole(newRoles.worker)
      props.changeRole(newRoles.worker.code)
      newRoles = {
        ...newRoles,
        worker: updatedWorker
      }
    } else {
      newRoles = {
        ...newRoles,
        worker: {
          ...newRoles.worker,
          available: false,
        }
      }
    }
    
    if (props.user?.buyerModeEnabled === true) {
      const updatedBuyer = newRoles.buyer
      updatedBuyer.available = true
      setSelectedRole(newRoles.buyer)
      props.changeRole(newRoles.buyer.code)
      newRoles = {
        ...newRoles,
        buyer: updatedBuyer
      }
    } else {
      newRoles = {
        ...newRoles,
        buyer: {
          ...newRoles.buyer,
          available: false,
        }
      }
    }
    setRoles(newRoles)
  }, [props.user])

  const setRole = (newRole) => {
    if (!newRole.available) {
      setModalOpen(true)
    } else {
      setSelectedRole(newRole)
      props.changeRole(newRole.code)
    }
  }

  return (
    <form action="#" className="relative flex flex-col mt-5">
      <div className="flex flex-col border border-gray-300 rounded-lg shadow-sm focus-within:border-primary4 focus-within:ring-1 focus-within:ring-primary4">
        <div className="flex flex-row items-center justify-between pr-4">
          <div className="flex">
            <h1 className="text-lg text-primary6 font-medium pl-3 mr-1 py-3">Your Role</h1>
            <div 
                className="flex text-gray-400 hover:text-primary4 cursor-pointer items-center ml-2"
                onClick={() => setModalOpen(true)}
            >
              <p className="hidden lg:flex">(set up more roles)</p>
            </div>
          </div>
          <div className="relative flex">
            <Listbox className="" value={selectedRole} onChange={setRole}>
              {({ open }) => (
                <>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default  py-2 px-6 text-left rounded-md border border-gray-300 shadow-sm focus:border-primary4 focus:outline-none focus:ring-1 focus:ring-primary4 sm:text-sm">
                      <span className="flex items-center">

                        <span className="ml-2 mr-4 block">{selectedRole.name}</span>
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {Object.keys(roles).sort(function(a,b){return (roles[a].available === roles[b].available)? 0 : roles[a].available? -1 : 1;}).map((key, i) => (
                          <Listbox.Option
                            key={roles[key].name}
                            className={({ active }) =>
                              classNames(
                                active ? 'bg-secondary2 text-secondary7' : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-3 pr-9'
                              )
                            }
                            value={roles[key]}
                          >
                            {({ selected, active }) => (
                              <>
                                <div className="flex items-center">
                                  <span
                                    className={classNames(
                                      roles[key].available ? 'bg-primary4' : 'bg-gray-200',
                                      'inline-block h-2 w-2 flex-shrink-0 rounded-full'
                                    )}
                                    aria-hidden="true"
                                  />
                                  <span
                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                  >
                                    {roles[key].name}
                                    <span className="sr-only"> is {roles[key].available ? 'enabled' : 'disabled'}</span>
                                  </span>
                                </div>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? 'text-primary7' : 'text-primary5',
                                      'absolute inset-y-0 right-0 flex items-center pr-4'
                                    )}
                                  >
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
            <div 
              className="flex text-gray-400 hover:text-primary4 cursor-pointer items-center ml-2"
              onClick={() => setModalOpen(true)}
            >
              <CogIcon className="hidden sm:flex lg:hidden ml-2 w-5 h-5 mt-1" strokeWidth={1.5}/>
            </div>

          </div>
        </div>
      </div>
      <RoleModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>
    </form>
  )
}

const mapStateToProps = ({ user }) => ({
  user: user.user,
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoleField)