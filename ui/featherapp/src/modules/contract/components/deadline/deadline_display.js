/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon } from '@heroicons/react/solid'
import {useState, useEffect} from "react"
import {WORKER_TYPE, BUYER_TYPE} from "../../../../services/user.service"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DeadlineDisplay = (props) => {

  const [fDeadlines, setFormatedDeadlines] = useState([])

  const sortDeadlines = (deadlines) => {
    if (props.role === WORKER_TYPE) {
      deadlines.sort((a, b) => (a.worker.date > b.worker.date) ? 1 : -1)
      for (let i = 0; i < deadlines.length; i++) {
        deadlines[i].current = deadlines[i].worker
      }
    } else {
      deadlines.sort((a, b) => (a.buyer.date > b.buyer.date) ? 1 : -1)
      for (let i = 0; i < deadlines.length; i++) {
        deadlines[i].current = deadlines[i].buyer
      }
    }
    return deadlines
  }

  useEffect(() => {
    if (props.deadlines !== undefined) {
      console.log("Loading deadlines into display")
      const sortedDeadlines = sortDeadlines(props.deadlines)
      const now = new Date()
      for (let i = 0; i < sortedDeadlines.length; i++) {
        if (sortedDeadlines[i].current.date < now) {
          sortedDeadlines[i].status = "past"
        } else {
          sortedDeadlines[i].status = "future"
        }
        sortedDeadlines[i].id = i+1
      }
      setFormatedDeadlines(sortedDeadlines)

    }
    
  }, [props.deadlines])

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
                    <a
                      href="#"
                      className={"relative w-"+props.iconSize+" h-"+props.iconSize+" flex items-center justify-center bg-indigo-600 rounded-full hover:bg-indigo-900"}
                    >
                      <CheckIcon className={"w-"+(props.iconSize-2)+" h-"+(props.iconSize-2)+" text-white"} aria-hidden="true" />
                      {/* <span
                        className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-indigo-500"
                        aria-hidden="true"
                      /> */}
                      <span className="sr-only">{deadline.id}</span>
                    </a>
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
                    <a
                      href="#"
                      className={"group relative w-"+props.iconSize+" h-"+props.iconSize+" flex items-center justify-center bg-white border-2 border-gray-300 rounded-full hover:border-gray-400"}
                    >
                      <span
                        className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300"
                        aria-hidden="true"
                      />
                      <span className="sr-only">{deadline.id}</span>
                    </a>
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
            <p key={deadline.id} className="text-xs text-gray-400">{deadline.current.date.toLocaleDateString('en-us', { day:"numeric", month:"numeric"})}</p>

          ))}
        </ol>
      </nav>
    </div>
  )
}

export default DeadlineDisplay