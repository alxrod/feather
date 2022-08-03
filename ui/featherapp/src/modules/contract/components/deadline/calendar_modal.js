/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'


import Calendar from "./calendar"
import CalendarTime from "./calendar_time"
import DeadlineDisplay from "./deadline_display"
import DeadlineSummary from "./deadline_summary"
import DeadlineChoice from "./deadline_choice"
import DeadlineItems from "./deadline_items"


import { PlusIcon } from '@heroicons/react/solid'
import { XIcon } from '@heroicons/react/outline'


const CalendarModal = (props) => {

  const cancelButtonRef = useRef(null)
  const [errorMsg, setErrorMsg] = useState("")
  const [selected, setSelected] = useState(0)

  const handleAddDeadline = () => {
    const newSelect = props.addDeadline()
    setSelected(newSelect)
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
                      Pick a deadline to <b className="text-indigo-600">edit</b> or <b className="text-indigo-600">add</b> a new one
                    </Dialog.Title>
                    
                    <div className="my-2">
                      <div className="w-full" >
                        <DeadlineDisplay 
                          role={props.role} 
                          reloadFlag={props.reloadFlag} 
                          deadlines={props.deadlines} 
                          iconSize={8}
                          sortDeadlines={props.sortDeadlines}
                          selected={selected}
                          setSelected={setSelected}
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
                            Choose a deadline from the <b className="text-indigo-600">dropdown</b> or click on it on the <b className="text-indigo-600">timeline</b>
                          </p>
                          <p className="mt-1 text-sm text-red">
                            {errorMsg}
                          </p>
                        </div>
                        <div className="sm:my-auto">
                          <button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={handleAddDeadline}>
                            <span className="flex items-center font-light">
                              <PlusIcon className="w-4 h-4"/>
                              Deadline
                            </span>
                          </button>
                          </div>
                        
                      </div>
                      
                      <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <div className="px-4 py-5 grid grid-cols-1 sm:grid-cols-2">
                          <div className="flex flex-col mr-1">
                            <DeadlineSummary 
                              role={props.role} 
                              deadline={props.deadlines[selected]} 
                              deadlines={props.deadlines} 
                              editDeadline={props.editDeadline}
                              saveDeadlines={props.saveDeadlines}
                              setErrorMsg={setErrorMsg}
                              createMode={props.createMode}

                              submitPayout={props.submitPayout}
                            />
                            <DeadlineItems
                              contractItems={props.contractItems}
                              addContractItem={props.addContractItem}
                              createMode={props.createMode}
                              deadline={props.deadlines[selected]}
                              editDeadline={props.editDeadline}
                              contractItemsChanged={props.contractItemsChanged}
                              changeItem={props.changeItem}
                            />
                          </div>
                          <div className="p-2 flex flex-col ml-1">
                            <Calendar 
                              role={props.role} 
                              editDeadline={props.editDeadline}
                              saveDeadlines={props.saveDeadlines}
                              deadlines = {props.deadlines}
                              deadline={props.deadlines[selected]}
                              setErrorMsg={setErrorMsg}
                              reloadFlag={props.reloadFlag}
                              createMode={props.createMode}
                            />
                            <CalendarTime
                              role={props.role} 
                              editDeadline={props.editDeadline}
                              saveDeadlines={props.saveDeadlines}
                              deadlines = {props.deadlines}
                              deadline={props.deadlines[selected]}
                              setErrorMsg={setErrorMsg}
                              reloadFlag={props.reloadFlag}
                              createMode={props.createMode}
                            />
                          </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                          <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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

export default CalendarModal