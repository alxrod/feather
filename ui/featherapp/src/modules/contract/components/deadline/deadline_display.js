/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon } from '@heroicons/react/solid'
import {useState, useEffect} from "react"
import {WORKER_TYPE, BUYER_TYPE} from "../../../../services/user.service"
import {Tooltip} from "flowbite-react"


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DeadlineDisplay = (props) => {

  const [fDeadlines, setFormatedDeadlines] = useState([])
  const [updateFlag, toggleUpdateFlag] = useState(false)

  useEffect(() => {
    if (props.deadlines !== undefined) {
      console.log("Loading deadlines into display")
      const sortedDeadlines = props.deadlines
      const now = new Date()
      for (let i = 0; i < sortedDeadlines.length; i++) {
        sortedDeadlines[i].relDate = sortedDeadlines[i].current.date
        if (props.role === WORKER_TYPE) {
          sortedDeadlines[i].relDate = sortedDeadlines[i].worker.date
        } else if (props.role === BUYER_TYPE) {
          sortedDeadlines[i].relDate = sortedDeadlines[i].buyer.date
        }

        if (sortedDeadlines[i].relDate < now) {
          sortedDeadlines[i].status = "past"
        } else {
          sortedDeadlines[i].status = "future"
        }
      }
      console.log("Sorted Deadlines:")
      console.log(sortedDeadlines)
      setFormatedDeadlines(sortedDeadlines)
      toggleUpdateFlag(!updateFlag)
    }
  }, [props.deadlines, props.reloadFlag])

  const handleDeadlineClick = (idx) => {
    console.log("Selecting")
    console.log(idx)
    if (props.setSelected) {
      props.setSelected(idx)
    }
    
  }
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <p className="text-xs text-gray-400">Start</p>
        <p className="text-xs text-gray-400">End</p>
      </div>
      <nav className="w-full flex flex-row items-center relative" aria-label="Deadlines">
        <ol role="list" className="flex grow w-full items-center">
          {fDeadlines.map((deadline, idx) => (
            <>
              <li key={deadline.id}>
                {deadline.status === 'past' ? (
                  <>
                    <Tooltip 
                      style="light" 
                      content={"Deadline "+deadline.id+": " + deadline.relDate.toLocaleTimeString([], {timeStyle: 'short'}) + ", " +deadline.relDate.toLocaleDateString()}
                    >
                      <p
                        href="#"
                        data-tooltip-target="tooltip-light" 
                        data-tooltip-style="light"
                        className={"cursor-pointer relative w-"+props.iconSize+" h-"+props.iconSize+" flex items-center justify-center bg-indigo-600 rounded-full hover:bg-indigo-900"+
                                  ((idx == props.selected) ? "border-2 border-indigo-500" : "")
                        }
                        onClick={() => {handleDeadlineClick(deadline.idx)}}
                      >
                        <CheckIcon className={"w-"+(props.iconSize-2)+" h-"+(props.iconSize-2)+" text-white"} aria-hidden="true" />
                        {/* <span
                          className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-indigo-500"
                          aria-hidden="true"
                        /> */}
                        <span className="sr-only">{deadline.id}</span>
                        <div className="hidden">{updateFlag}</div>
                      </p>
                    </Tooltip>
                  </>
                // ) : step.status === 'current' ? (
                //   <>
                //     <div className="absolute inset-0 flex items-center" aria-hidden="true">
                //       <div className="h-0.5 w-full bg-gray-200" />
                //     </div>
                //     <a
                //       href="#"
                //       className="relative w-8 h-8 flex items-center justify-center bg-white border-2 border-indigo-600 rounded-full"
                //       aria-current="step"
                //     >
                //       <span className="h-2.5 w-2.5 bg-indigo-600 rounded-full" aria-hidden="true" />
                //       <span className="sr-only">{step.name}</span>
                //     </a>
                //   </>
                ) : (
                  <>
                    <Tooltip 
                      style="light" 
                      content={"Deadline "+deadline.id+": " + deadline.relDate.toLocaleTimeString([], {timeStyle: 'short'}) + ", " +deadline.relDate.toLocaleDateString()}
                    >
                      <p
                        href="#"
                        className={"cursor-pointer group relative w-"+props.iconSize+" h-"+props.iconSize+" flex items-center justify-center bg-white rounded-full " +
                                  ((idx == props.selected) ? "border-2 border-indigo-500" : "border-2 border-gray-300 hover:border-indigo-400")}
                        onClick={() => {handleDeadlineClick(deadline.idx)}}
                      >
                        <span
                          className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300"
                          aria-hidden="true"
                        />
                        <span className="sr-only">{deadline.id}</span>
                      </p>
                    </Tooltip>

                  </>
                )}
              </li>
              {((idx !== props.deadlines.length - 1) && deadline.status === "past" ) && (
                <div key={deadline.id*10} className="grow" aria-hidden="true">
                  <div className="h-0.5 w-full border-b-2 border-indigo-600" />
                </div>
              )}
              {((idx !== props.deadlines.length - 1) && deadline.status === "future" ) && (
                <div key={deadline.id*10} className="grow" aria-hidden="true">
                  <div className="h-0.5 border-b-2 border-grey-300" />
                </div>
              )}
            </>

          ))}
        </ol>
      </nav>

      <nav className="w-full flex flex-row items-center relative" aria-label="Deadlines">
        <ol role="list" className="flex grow w-full justify-between items-center">
          {fDeadlines.map((deadline, idx) => (
            <p key={deadline.id} className="text-xs text-gray-400">{deadline.relDate.toLocaleDateString('en-us', { day:"numeric", month:"numeric"})}</p>

          ))}
        </ol>
      </nav>
    </div>
  )
}

export default DeadlineDisplay