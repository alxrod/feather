/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon } from '@heroicons/react/solid'
import {Fragment} from "react"
import {useState, useEffect, useCallback} from "react"
import {WORKER_TYPE, BUYER_TYPE} from "../../../../services/user.service"
import {Tooltip} from "flowbite-react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';



const DeadlineDisplay = (props) => {

  const [fDeadlines, setFormatedDeadlines] = useState([])
  const [updateFlag, toggleUpdateFlag] = useState(false)

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const unpackLong = (deadline) => {
    let date = deadline.relDate
    if (date === undefined) {
      if (deadline.currentDate === undefined) {
        return ""
      } else {
        date = deadline.currentDate
      }
    }
    return (date.toLocaleTimeString([], {timeStyle: 'short'}) + 
    ", " + date.toLocaleDateString())
  }

  const unpackShort = (deadline) => {
    let date = deadline.relDate
    if (date === undefined) {
      if (deadline.currentDate === undefined) {
        return ""
      } else {
        date = deadline.currentDate
      }
    }
    return date.toLocaleDateString('en-us', { day:"numeric", month:"numeric"})
  }

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
        let relDate = sortedDeadlines[i].relDate
        if (relDate === undefined) {
          relDate = sortedDeadlines[i].currentDate
        }

        if (relDate < now) {
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
      {!props.preview && (
        <div className="flex justify-between">
          <p className="text-xs text-gray-400">Start</p>
          <div className="grow"></div>
          <p className="text-xs text-gray-400">End</p>
        </div>
      )}
      <nav className="w-full flex flex-row items-center relative" aria-label="Deadlines">
        <ol role="list" className="flex grow w-full items-center">
          {fDeadlines.map((deadline, idx) => (
            <Fragment key={idx}>
              <li>
                {deadline.status == "past" ? (
                  <>
                    <Tooltip 
                      style="light" 
                      content={unpackLong(deadline)}
                    >
                      <p
                        href="#"
                        data-tooltip-target="tooltip-light" 
                        data-tooltip-style="light"
                        className={"cursor-pointer relative w-"+props.iconSize+" h-"+props.iconSize+" flex items-center justify-center rounded-full "+
                                  ((idx === props.selected && !deadline.awaitingCreation && !deadline.awaitingDeletion) ? "border-2 border-primary4 bg-primary4 hover:border-primary6 hover:bg-primary6" : 
                                   (deadline.awaitingCreation) ? "border-2 bg-green-400 border-green-400" : 
                                   (deadline.awaitingDeletion) ? "border-2 bg-red-400 border-red-400" : 
                                   "bg-primary5 hover:bg-primary6")
                        }
                        onClick={() => {handleDeadlineClick(deadline.idx)}}
                      >
                        {deadline.complete && (
                          <CheckIcon className={"w-"+(props.iconSize-2)+" h-"+(props.iconSize-2)+" text-white"} aria-hidden="true" />
                        )}
                        <span className="sr-only">{deadline.id}</span>
                        <span className="hidden">{updateFlag}</span>
                      </p>
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <Tooltip 
                      style="light" 
                      content={unpackLong(deadline)}
                    >
                      <p
                        href="#"
                        className={"cursor-pointer group relative w-"+props.iconSize+" h-"+props.iconSize+" flex items-center justify-center bg-white rounded-full " +
                                  ((idx == props.selected && !deadline.awaitingCreation && !deadline.awaitingDeletion) ? "border-2 border-primary4" : 
                                  (deadline.awaitingCreation) ? "border-2 border-green" : 
                                  (deadline.awaitingDeletion) ? "border-2 border-red-400" :
                                  "border-2 border-gray-300 hover:border-primary3")}
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
                  <div className="h-0.5 w-full border-b-2 border-primary5" />
                </div>
              )}
              {((idx !== props.deadlines.length - 1) && deadline.status !== "past") && (
                <div key={idx*3} className="grow" aria-hidden="true">
                  <div className="h-0.5 w-full border-b-2 border-grey-300" />
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
              <p key={deadline.id} className="text-xs text-gray-400">{unpackShort(deadline)}</p>

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