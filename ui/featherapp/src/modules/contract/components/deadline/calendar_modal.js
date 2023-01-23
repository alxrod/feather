/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CalendarBundle from "./calendar_bundle"
import DeadlineDisplay from "./deadline_display"
import DeadlineSummary from "./deadline_summary"
import DeadlineChoice from "./deadline_choice"
import DeadlineItems from "./deadline_items"


import { PlusIcon, TrashIcon } from '@heroicons/react/solid'
import { XIcon } from '@heroicons/react/outline'

import { reactAddDeadline } from "../../../../reducers/deadlines/dispatchers/deadlines.add.dispatcher"
import { deleteDeadline, reactDeleteDeadline, deleteLocalDeadline } from "../../../../reducers/deadlines/dispatchers/deadlines.delete.dispatcher"
import { decisionTypes, msgMethods} from "../../../../services/chat.service"
import { genEmptyDeadline } from "./helpers"

const CalendarModal = (props) => {

  // STATE
  const cancelButtonRef = useRef(null)
  const [errorMsg, setErrorMsg] = useState("")
  const [selected, setSelected] = useState(0)

  const [newDeadlineIndex, setNewDeadlineIndex] = useState(-1)
  // Indicates if there is a new deadline in the array
  const [newDeadlineMode, toggleNewDeadlineMode] = useState(false)
  // Indicates whether there is a new local, non db uploaded deadline
  const [newDeadlineLocalMode, toggleNewDeadlineLocalMode] = useState(false)
  // Indicates if selected current new deadline
  const [newDeadlineSelected, toggleNewDeadlineSelected] = useState(false)
  // If the new deadline is proposed by you,

  const [deleteDeadlineMode, toggleDeleteDeadlineMode] = useState(false)
  const [deleteDeadlineSelected, toggleDeleteDeadlineSelected] = useState(false)
  const [deleteDeadlineIndex, setDeleteDeadlineIndex] = useState(-1)

  const [proposedByPartner, setProposedByPartner] = useState(false)
  const [msgId, setMsgId] = useState("")
  const [lastLength, setLastLength] = useState(0)
  // Check to see if current deadline is the new deadline we've created
  useEffect( () => {
    if (props.deadlines.length > 0) {
      if (props.deadlines[selected].awaitingCreation) {
        toggleNewDeadlineSelected(true)
        return
      } else if (props.deadlines[selected].awaitingDeletion) {
        toggleDeleteDeadlineSelected(true)
        return
      }      
    }
    toggleNewDeadlineSelected(false)
    toggleDeleteDeadlineSelected(false)
  }, [selected, props.deadlinesChanged])

  // Use effect for determining whether deadline change is from partner and gettign the ID
  useEffect(() => {
    let final_msg_id = ""
    for (let i = 0; i < props.messages.length; i++) {
      if (props.messages[i].method === msgMethods.DEADLINE_CREATE) {
        if (props.messages[i].body.deadline.id === props.deadlines[selected].id) {
          final_msg_id = props.messages[i].id
        }
      } else if (props.messages[i].method === msgMethods.DEADLINE_DELETE) {
        if (props.messages[i].body.deadline.id === props.deadlines[selected].id) {
          final_msg_id = props.messages[i].id
        }
      } 
    }
    setMsgId(final_msg_id)

  }, [props.messages.length, selected])

  // Use effect for detecting whether we are in new deadline mode
  // Specifically use reducer deadlines because updates first
  useEffect( () => {
    if (props.reducerDeadlines.length > 0) {

      if (props.reducerDeadlines.length < lastLength) {
        setSelected(props.reducerDeadlines.length - 1)
      }

      setLastLength(props.reducerDeadlines.length)
      let foundLocalAdd = false
      let foundNew = false
      let foundDelete = false
      let propPartner = false

      for (let i = 0; i < props.reducerDeadlines.length; i++) {
        if (props.reducerDeadlines[i].id === "TEMPORARY") {
          foundLocalAdd = true
        }
        if (props.reducerDeadlines[i].awaitingCreation) {
          setNewDeadlineIndex(i)
          foundNew = true
          if (props.reducerDeadlines[i].deadlineProposerId === props.user.id || props.reducerDeadlines[i].id === "TEMPORARY") {
            propPartner = false
          } else {
            propPartner = true
          }
        } else if (props.reducerDeadlines[i].awaitingDeletion) {
          setDeleteDeadlineIndex(i)
          foundDelete = true
          if (props.reducerDeadlines[i].deadlineProposerId === props.user.id) {
            propPartner = false
          } else {
            propPartner = true
          }
        }

        
      }
    
      toggleDeleteDeadlineMode(foundDelete)
      toggleNewDeadlineMode(foundNew)
      toggleNewDeadlineLocalMode(foundLocalAdd)
      setProposedByPartner(propPartner)
    }
  }, [props.reducerDeadlines.length, props.deadlinesChanged])

  const handleAddDeadline = () => {
    // add this because not necessarily going into the reducer yet
    setProposedByPartner(false)
    setNewDeadlineIndex(-1)
    props.addDeadline(selected)
  }

  const handleDeleteDeadline = () => {
    if (props.deadlines.length <= 2) {
      return
    }
    if (props.createMode) {
      if (selected === props.deadlines.length - 1) {
        setSelected(props.deadlines.length - 2)
      }
      setNewDeadlineIndex(-1)
      toggleNewDeadlineMode(false)
      props.deleteLocalDeadline(props.deadlines[selected])
    } else {
      setProposedByPartner(false)
      props.deleteDeadline(props.curContract.id, props.deadlines[selected])
    }
    
  }

  const confirmDeleteDeadline = () => {
    if (selected === props.deadlines.length - 1) {
      setSelected(props.deadlines.length - 2)
    }
    props.reactDeleteDeadline(props.curContract.id, msgId, props.deadlines[selected].id, decisionTypes.YES)
  }
  const rejectDeleteDeadline = () => {
    props.reactDeleteDeadline(props.curContract.id, msgId, props.deadlines[selected].id, decisionTypes.NO)
  }

  const confirmNewDeadline = () => {
    if (props.deadlines[selected].awaitingCreation) {
      setNewDeadlineIndex(-1)
      toggleNewDeadlineMode(false)
      props.confirmNewDeadline(props.deadlines[selected])
    }    
  } 

  const cancelNewDeadline = () => {
    if (selected === props.deadlines.length - 1) {
      setSelected(props.deadlines.length - 2)
    }
    setNewDeadlineIndex(-1)
    toggleNewDeadlineMode(false)
    props.deleteLocalDeadline({id: "TEMPORARY"})
  }

  const addNewPartnerDeadline = () => {
    props.reactAddDeadline(props.curContract.id, msgId, props.deadlines[selected].id, decisionTypes.YES)
  }
  
  const rejectNewPartnerDeadline = () => {
    props.reactAddDeadline(props.curContract.id, msgId, props.deadlines[selected].id, decisionTypes.NO)
    if (selected === props.deadlines.length - 1) {
      setSelected(props.deadlines.length - 2)
    }
  }

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={props.setOpen}>
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

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-6xl min-h-[60vh] sm:w-full sm:p-6">
                <div>
                  <div className="flex justify-end">
                    <button onClick={() => {props.setOpen(false)}}>
                      <XIcon className="h-5 w-5 text-gray-400"/>
                    </button>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Pick a deadline to <b className="text-primary5">edit</b> or <b className="text-primary5">add</b> a new one
                    </Dialog.Title>
                    
                    <div className="my-2">
                      <div className="w-full" >
                        <DeadlineDisplay 
                          role={props.role} 
                          deadlines={props.deadlines} 
                          iconSize={8}
                          selected={selected}
                          setSelected={setSelected}
                          showDates={true}
                        />
                      </div>
                      
                    </div>
                  </div>
                      <div className="my-2 flex justify-between">
                        <div>
                          <div className="max-w-xs">
                            <DeadlineChoice 
                              selected={selected} 
                              setSelected={setSelected} 
                              deadlines={props.deadlines}
                              setErrorMsg={setErrorMsg}
                            />
                          </div>
                          <p className="mt-1 text-sm text-gray-600">
                            Choose a deadline from the <b className="text-primary5">dropdown</b> or click on it on the <b className="text-primary5">timeline</b>
                          </p>
                          <div className="h-4">
                            <p className="mt-1 text-sm text-red">
                              {errorMsg}
                            </p>
                          </div>
                        </div>
                        <div className="sm:my-auto">
                          {(!newDeadlineMode && !deleteDeadlineMode && !props.universalLock) && (
                            <>
                              <button
                              type="submit"
                              className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary5 hover:bg-primary6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary4"
                              onClick={handleAddDeadline}>
                                <span className="flex items-center font-light">
                                  <PlusIcon className="w-4 h-4"/>
                                  Deadline
                                </span>
                                
                              </button>
                              <button
                              type="submit"
                              className="inline-flex justify-center py-2 px-4 border-2 border-primary5 shadow-sm text-sm font-medium rounded-md text-primary5  hover:bg-grey-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary4"
                              onClick={handleDeleteDeadline}>
                                <span className="flex items-center font-light">
                                  <TrashIcon className="w-4 h-4 mr-1"/>
                                  Deadline
                                </span>
                                
                              </button>
                            </>
                          )}
                          {(newDeadlineMode) && (
                            <div className="w-full flex justify-end">
                              {( ((proposedByPartner || newDeadlineLocalMode) && !newDeadlineSelected ) ? 
                                (
                                  <h3 className="text-sm text-gray-500"><b className="font-medium text-green">Confirm</b>/<b className="font-medium text-red">cancel</b> before creating another deadline</h3>
                                ) : 
                                (
                                  ((!newDeadlineSelected || (!proposedByPartner && !newDeadlineLocalMode)) ? (<h3 className="text-sm text-gray-500">Awaiting partner to approve new deadline</h3>) : (<></>))
                                ) 
                              )}
                            </div>
                          )}
                          {(deleteDeadlineMode) && (
                            <div className="w-full flex justify-end">
                              {( (proposedByPartner && !deleteDeadlineSelected) ? 
                                (
                                  <h3 className="text-sm text-gray-500"><b className="font-medium text-green">Confirm</b>/<b className="font-medium text-red">cancel</b> before deleting another deadline</h3>
                                ) : 
                                (
                                  (!proposedByPartner ? (<h3 className="text-sm text-gray-500">Awaiting partner to approve new deadline</h3>) : (<></>))
                                ) 
                              )}
                            </div>
                          )}
                          {(newDeadlineSelected && newDeadlineMode && newDeadlineLocalMode && !deleteDeadlineMode) && (
                            <div className="flex">
                              <button
                              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green focus:outline-none focus:ring-0 focus:ring-offset-0"
                              onClick={confirmNewDeadline}>
                                <span className="flex items-center font-light">
                                  <PlusIcon className="w-4 h-4"/>
                                  Confirm
                                </span>
                              </button>
                              <button
                              className="inline-flex justify-center ml-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red focus:outline-none focus:ring-0 focus:ring-offset-0"
                              onClick={cancelNewDeadline}>
                                <span className="flex items-center font-light">
                                  <XIcon className="w-4 h-4"/>
                                  Cancel
                                </span>
                              </button>
                            </div>
                          )}

                          {(newDeadlineSelected && newDeadlineMode && proposedByPartner && !deleteDeadlineMode) && (
                            <div className="flex">
                              <button
                              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green focus:outline-none focus:ring-0 focus:ring-offset-0"
                              onClick={addNewPartnerDeadline}>
                                <span className="flex items-center font-light">
                                  <PlusIcon className="w-4 h-4"/>
                                  Add
                                </span>
                              </button>
                              <button
                              className="inline-flex justify-center ml-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red focus:outline-none focus:ring-0 focus:ring-offset-0"
                              onClick={rejectNewPartnerDeadline}>
                                <span className="flex items-center font-light">
                                  <XIcon className="w-4 h-4"/>
                                  Reject
                                </span>
                              </button>
                            </div>
                          )}

                          {(deleteDeadlineSelected && deleteDeadlineMode && proposedByPartner && !newDeadlineMode) && (
                            <div className="flex">
                              <button
                              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green focus:outline-none focus:ring-0 focus:ring-offset-0"
                              onClick={confirmDeleteDeadline}>
                                <span className="flex items-center font-light">
                                  <PlusIcon className="w-4 h-4"/>
                                  Delete
                                </span>
                              </button>
                              <button
                              className="inline-flex justify-center ml-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red focus:outline-none focus:ring-0 focus:ring-offset-0"
                              onClick={rejectDeleteDeadline}>
                                <span className="flex items-center font-light">
                                  <XIcon className="w-4 h-4"/>
                                  Keep
                                </span>
                              </button>
                            </div>
                          )}
                        </div>
                        
                      </div>
                      
                      <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <div className="px-4 py-5 grid grid-cols-1 sm:grid-cols-2">
                          <div className="flex flex-col mr-1">
                            <DeadlineSummary 
                              role={props.role} 
                              universalLock={props.universalLock}
                              deadline={props.deadlines[selected] ? props.deadlines[selected] : genEmptyDeadline(new Date())}
                              deadlines={props.deadlines} 
                              editDeadline={props.editDeadline}
                              saveDeadlines={props.saveDeadlines}
                              setErrorMsg={setErrorMsg}
                              createMode={props.createMode}
                              newDeadlineMode={newDeadlineSelected}
                              deleteDeadlineMode={deleteDeadlineSelected}
                              newDeadlineLocalMode={newDeadlineLocalMode}

                              curPrice={props.curPrice}
                              submitPayout={props.submitPayout}
                            />
                            <DeadlineItems
                              contractItemIds={props.contractItems}
                              universalLock={props.universalLock}
                              createMode={props.createMode}
                              newDeadlineMode={newDeadlineSelected}
                              deleteDeadlineMode={deleteDeadlineSelected}
                              newDeadlineLocalMode={newDeadlineLocalMode}
                              deadline={props.deadlines[selected] ? props.deadlines[selected] : genEmptyDeadline(new Date())}
                              editDeadline={props.editDeadline}
                            />
                          </div>
                          <div className="p-2 flex flex-col ml-1">
                            <CalendarBundle
                              universalLock={props.universalLock}
                              role={props.role} 
                              editDeadline={props.editDeadline}
                              saveDeadlines={props.saveDeadlines}
                              deadlines = {props.deadlines}
                              deadline={props.deadlines[selected] ? props.deadlines[selected] : genEmptyDeadline(new Date())}
                              setErrorMsg={setErrorMsg}
                              createMode={props.createMode}
                              newDeadlineMode={newDeadlineSelected}
                              deleteDeadlineMode={deleteDeadlineSelected}
                              newDeadlineLocalMode={newDeadlineLocalMode}
                            />
                          </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                          <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary5 hover:bg-primary6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary4"
                            onClick={() => {props.setOpen(false)}}
                          >
                            Done
                          </button>
                        </div>
                      </div>
                </div>
                {/* <CalendarTime deadline={props.deadline} role={props.role} changeDeadline={props.changeDeadline} setOpen={props.setOpen}/> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

const mapStateToProps = ({ deadlines, contract, chat, user }) => ({
  deadlinesChanged: deadlines.deadlinesChanged,
  reducerDeadlines: deadlines.deadlines,
  curContract: contract.curContract,
  messages: chat.messages,
  user: user.user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  reactAddDeadline,
  deleteLocalDeadline,
  deleteDeadline,
  reactDeleteDeadline,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CalendarModal)