/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState, useEffect, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CalendarBundle from "./calendar/calendar_bundle"
import DeadlineDisplay from "./header/deadline_display"
import DeadlineSummary from "./deadline_summary"
import DeadlineChoice from "./header/deadline_choice"
import DeadlineItems from "./items/deadline_items"


import { PlusIcon, TrashIcon } from '@heroicons/react/solid'
import { XIcon } from '@heroicons/react/outline'

import { addDeadline, reactAddDeadline } from "../../../reducers/deadlines/dispatchers/deadlines.add.dispatcher"
import { deleteDeadline, reactDeleteDeadline, deleteLocalDeadline } from "../../../reducers/deadlines/dispatchers/deadlines.delete.dispatcher"
import { decisionTypes, msgMethods} from "../../../services/chat.service"
import { 
  genEmptyDeadline, 
  sortDeadlines, 
  getDeadlineIdBefore,
  addWeeks, 
  inBetweenDates
} from "./helpers"
import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service"

import { DeadlineFieldContext } from './deadline_field';

const CalendarModal = (props) => {

  // STATE
  const cancelButtonRef = useRef(null)
  const [errorMsg, setErrorMsg] = useState("")

  const [msgId, setMsgId] = useState("")

  const {
    sortedDeadlines, 
    curDeadline,
    setSelectedID
  } = useContext(DeadlineFieldContext);

  useEffect(() => {
    let final_msg_id = ""
    for (let i = 0; i < props.messages.length; i++) {
      if (props.messages[i].method === msgMethods.DEADLINE_CREATE) {
        if (props.messages[i].body.deadline.id === curDeadline.id) {
          final_msg_id = props.messages[i].id
        }
      } else if (props.messages[i].method === msgMethods.DEADLINE_DELETE) {
        if (props.messages[i].body.deadline.id === curDeadline.id) {
          final_msg_id = props.messages[i].id
        }
      } 
    }
    setMsgId(final_msg_id)
  }, [props.messages.length, curDeadline.id])

  // Use effect for detecting whether we are in new deadline mode
  // Specifically use reducer deadlines because updates first
  const addDeadline = () => {
    // Calc half way in between cur deadline and next deadline or at the next interval
    let curDate = curDeadline.currentDate
    if (props.role === WORKER_TYPE) {
      curDate = curDeadline.workerDate
    } else if (props.role === BUYER_TYPE) {
      curDate = curDeadline.buyerDate
    }

    let newDate = addWeeks(curDate,1)
    if (curDeadline.idx < (sortedDeadlines.length - 1) ) {
      const nextDeadline = sortedDeadlines[curDeadline.idx + 1] 
      let nextDate = nextDeadline.currentDate
      if (props.role === WORKER_TYPE) {
        nextDate = nextDeadline.workerDate
      } else if (props.role === BUYER_TYPE) {
        nextDate = nextDeadline.buyerDate
      }
      newDate = inBetweenDates(curDate, nextDate)
    }

    const new_deadline = genEmptyDeadline(newDate)
    new_deadline.name = ""
    if (!props.createMode) {
      new_deadline.awaitingCreation = true
    }
    new_deadline.id = (sortedDeadlines.length +1).toString()


    props.addDeadline(props.curContract.id, new_deadline).then(
      (deadline) => {
        setSelectedID(deadline.id)
      }
    )
  }


  const deleteDeadline = () => {
    if (props.deadlines.length <= 2 || props.deadlines.id === "") {
      return
    }
    if (props.createMode) {
      setSelectedID(sortedDeadlines[Math.max(0, curDeadline.idx-1)].id)
      props.deleteLocalDeadline(curDeadline)
    }
    props.deleteDeadline(props.curContract.id, curDeadline)
  }

  const confirmDeleteDeadline = () => {
    setSelectedID(sortedDeadlines[Math.max(0, curDeadline.idx-1)].id)
    props.reactDeleteDeadline(props.curContract.id, msgId, curDeadline.id, decisionTypes.YES)
  }
  const rejectDeleteDeadline = () => {
    props.reactDeleteDeadline(props.curContract.id, msgId, curDeadline.id, decisionTypes.NO)
  }

  const addNewPartnerDeadline = () => {
    props.reactAddDeadline(props.curContract.id, msgId, curDeadline.id, decisionTypes.YES)
  }
  
  const rejectNewPartnerDeadline = () => {
    setSelectedID(sortedDeadlines[Math.max(0, curDeadline.idx-1)].id)
    props.reactAddDeadline(props.curContract.id, msgId, curDeadline.id, decisionTypes.NO)
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
                          iconSize={"2.2rem"}
                          setSelectedID={setSelectedID}
                          showDates={true}
                        />
                      </div>
                      
                    </div>
                  </div>
                      <div className="my-2 flex w-full justify-between items-center sm:pr-6">
                        <div className="w-[150px] sm:w-[200px]">
                          <div className="h-4"/>
                            <div className="w-full">
                              <DeadlineChoice 
                                setSelectedID={setSelectedID} 
                                setErrorMsg={setErrorMsg}
                              />
                            </div>
                            <div className="h-4">
                              <p className="mt-1 text-sm text-red-400">
                                {errorMsg}
                              </p>
                            </div>
                          </div>
                        <div className="sm:my-auto">
                          {(curDeadline.awaitingCreation && curDeadline.locked) ? (
                            <div className="flex">
                              <button
                              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-400 focus:outline-none focus:ring-0 focus:ring-offset-0"
                              onClick={addNewPartnerDeadline}>
                                <span className="flex items-center font-light">
                                  <PlusIcon className="w-4 h-4"/>
                                  Add
                                </span>
                              </button>
                              <button
                              className="inline-flex justify-center ml-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-400 focus:outline-none focus:ring-0 focus:ring-offset-0"
                              onClick={rejectNewPartnerDeadline}>
                                <span className="flex items-center font-light">
                                  <XIcon className="w-4 h-4"/>
                                  Reject
                                </span>
                              </button>
                            </div>
                          ) : (curDeadline.awaitingCreation && !curDeadline.locked) ? (
                            <div className="flex">
                              <h1 className="text-xl text-gray-400">Edit your new deadline</h1>
                            </div>
                          ) : (curDeadline.awaitingDeletion && curDeadline.deadlineProposerId !== props.user.id) ? (
                            <div className="flex">
                              <button
                              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-400 focus:outline-none focus:ring-0 focus:ring-offset-0"
                              onClick={confirmDeleteDeadline}>
                                <span className="flex items-center font-light">
                                  <PlusIcon className="w-4 h-4"/>
                                  Delete
                                </span>
                              </button>
                              <button
                              className="inline-flex justify-center ml-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-200 focus:outline-none focus:ring-0 focus:ring-offset-0"
                              onClick={rejectDeleteDeadline}>
                                <span className="flex items-center font-light">
                                  <XIcon className="w-4 h-4"/>
                                  Keep
                                </span>
                              </button>
                            </div>
                          ) : (!props.universalLock && !curDeadline.locked) ? (
                            <>
                              <button
                              type="submit"
                              className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary5 hover:bg-primary6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary4"
                              onClick={addDeadline}>
                                <span className="flex items-center font-light">
                                  <PlusIcon className="w-4 h-4"/>
                                  Deadline
                                </span>
                                
                              </button>
                              <button
                              type="submit"
                              className="inline-flex justify-center py-2 px-4 border-2 border-primary5 shadow-sm text-sm font-medium rounded-md text-primary5  hover:bg-grey-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary4"
                              onClick={deleteDeadline}>
                                <span className="flex items-center font-light">
                                  <TrashIcon className="w-4 h-4 mr-1"/>
                                  Deadline
                                </span>
                                
                              </button>
                            </>
                          ) : (
                            null
                          )}
                        </div>
                        
                      </div>
                      
                      <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <div className="px-4 py-5 grid grid-cols-1 sm:grid-cols-2">
                          <div className="flex flex-col mr-1">
                            <DeadlineSummary 
                              role={props.role} 
                              universalLock={props.universalLock || curDeadline.locked}
                              
                              setErrorMsg={setErrorMsg}
                              createMode={props.createMode}

                              curPrice={props.curPrice}
                            />
                            <DeadlineItems
                              universalLock={props.universalLock || curDeadline.locked}
                              createMode={props.createMode}
                            />
                          </div>
                          <div className="p-2 flex flex-col ml-1">
                            <CalendarBundle
                              universalLock={props.universalLock || curDeadline.locked}
                              role={props.role} 


                              setErrorMsg={setErrorMsg}
                              createMode={props.createMode}
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
  deadlines: deadlines.deadlines,
  curContract: contract.curContract,
  messages: chat.messages,
  user: user.user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addDeadline,
  reactAddDeadline,
  deleteDeadline,
  reactDeleteDeadline,
  deleteLocalDeadline,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CalendarModal)