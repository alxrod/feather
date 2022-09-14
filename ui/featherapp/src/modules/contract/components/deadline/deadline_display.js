/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon } from '@heroicons/react/solid'
import {Fragment} from "react"
import {useState, useEffect, useCallback} from "react"
import {WORKER_TYPE, BUYER_TYPE} from "../../../../services/user.service"
import {Tooltip} from "flowbite-react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DeadlineDisplay = (props) => {

  const [fDeadlines, setFormatedDeadlines] = useState([])
  const [updateFlag, toggleUpdateFlag] = useState(false)

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    if (props.deadlines !== undefined) {
      const sortedDeadlines = props.deadlines
      // console.log("Sorting dates ")
      const now = new Date()
      for (let i = 0; i < sortedDeadlines.length; i++) {
        // sortedDeadlines[i].relDate = sortedDeadlines[i].current.date
        // if (props.role === WORKER_TYPE) {
        //   sortedDeadlines[i].relDate = sortedDeadlines[i].worker.date
        // } else if (props.role === BUYER_TYPE) {
        //   sortedDeadlines[i].relDate = sortedDeadlines[i].buyer.date
        // }

        if (sortedDeadlines[i].relDate < now) {
          sortedDeadlines[i].status = "past"
        } else {
          sortedDeadlines[i].status = "future"
        }
      }
      setFormatedDeadlines(sortedDeadlines)
      toggleUpdateFlag(!updateFlag)
    }
  }, [props.deadlines, props.deadlinesChanged])

  const handleDeadlineClick = (idx) => {
    if (props.setSelected) {
      props.setSelected(idx)
    }
  }
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <p className="text-xs text-gray-400">Start</p>
        <div className="grow"></div>
        <p className="text-xs text-gray-400">End</p>
      </div>
      <nav className="w-full flex flex-row items-center relative" aria-label="Deadlines">
        <ol role="list" className="flex grow w-full items-center">
          {fDeadlines.map((deadline, idx) => (
            <Fragment key={idx}>
              <li>
                {deadline.status === 'past' ? (
                  <>
                    <Tooltip 
                      style="light" 
                      content={"Deadline "+(deadline.idx+1)+": " + (deadline.relDate || deadline.currentDate).toLocaleTimeString([], {timeStyle: 'short'}) + ", " +(deadline.relDate || deadline.currentDate).toLocaleDateString()}
                    >
                      <p
                        href="#"
                        data-tooltip-target="tooltip-light" 
                        data-tooltip-style="light"
                        className={"cursor-pointer relative w-"+props.iconSize+" h-"+props.iconSize+" flex items-center justify-center rounded-full "+
                                  ((idx === props.selected && !deadline.awaitingCreation && !deadline.awaitingDeletion) ? "border-2 border-indigo-300 bg-indigo-500 hover:bg-indigo-900" : 
                                   (deadline.awaitingCreation) ? "border-2 bg-green border-green" : 
                                   (deadline.awaitingDeletion) ? "border-2 bg-red border-red" : 
                                   "bg-indigo-600 hover:bg-indigo-900")
                        }
                        onClick={() => {handleDeadlineClick(deadline.idx)}}
                      >
                        <CheckIcon className={"w-"+(props.iconSize-2)+" h-"+(props.iconSize-2)+" text-white"} aria-hidden="true" />
                        {/* <span
                          className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-indigo-500"
                          aria-hidden="true"
                        /> */}
                        <span className="sr-only">{deadline.id}</span>
                        <span className="hidden">{updateFlag}</span>
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
                      content={"Deadline "+(deadline.idx+1)+": " + (deadline.relDate || deadline.currentDate).toLocaleTimeString([], {timeStyle: 'short'}) + ", " +(deadline.relDate || deadline.currentDate).toLocaleDateString()}
                    >
                      <p
                        href="#"
                        className={"cursor-pointer group relative w-"+props.iconSize+" h-"+props.iconSize+" flex items-center justify-center bg-white rounded-full " +
                                  ((idx == props.selected && !deadline.awaitingCreation && !deadline.awaitingDeletion) ? "border-2 border-indigo-500" : 
                                  (deadline.awaitingCreation) ? "border-2 border-green" : 
                                  (deadline.awaitingDeletion) ? "border-2 border-red" :
                                  "border-2 border-gray-300 hover:border-indigo-400")}
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
                <div key={idx*3-1} className="grow" aria-hidden="true">
                  <div className="h-0.5 w-full border-b-2 border-indigo-600" />
                </div>
              )}
              {((idx !== props.deadlines.length - 1) ) && (
                <div key={idx*3} className="grow" aria-hidden="true">
                  <div className="h-0.5 border-b-2 border-grey-300" />
                </div>
              )}
            </Fragment>

          ))}
        </ol>
      </nav>
      {(props.showDates && (
        <nav className="w-full flex flex-row items-center relative" aria-label="Deadlines">
          <ol role="list" className="flex grow w-full justify-between items-center">
            {fDeadlines.map((deadline, idx) => (
              <p key={deadline.id} className="text-xs text-gray-400">{(deadline.relDate || deadline.currentDate).toLocaleDateString('en-us', { day:"numeric", month:"numeric"})}</p>

            ))}
          </ol>
        </nav>
      ))}
    </div>
  )
}

const mapStateToProps = ({ deadlines }) => ({
  deadlinesChanged: deadlines.deadlinesChanged,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeadlineDisplay) 