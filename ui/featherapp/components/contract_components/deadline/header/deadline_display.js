/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon, XIcon, PlusIcon, TrashIcon } from '@heroicons/react/solid'
import {Fragment} from "react"
import {useState, useEffect, useContext, useRef } from "react"
import {Tooltip} from "flowbite-react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {unpackShort, unpackLong} from "./helpers";
import { sortDeadlines } from '../helpers'

import { DeadlineFieldContext } from '../deadline_field';

const DeadlineDisplay = (props) => {

  const [fDeadlines, setFormatedDeadlines] = useState([])
  const [selectedIdx, setSelectedIdx] = useState(-1)
  const [updateFlag, toggleUpdateFlag] = useState(false)
  const {sortedDeadlines, curDeadline, setSelectedID} = useContext(DeadlineFieldContext);

  const timelineRef = useRef(null)
  const absoluteRef = useRef(null)
  const [absoluteHeight, setAbsoluteHeight] = useState(25)
  const [bubbleWidth, setBubbleWidth] = useState(0)

  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const handleResize = () => {
    if (typeof window !== "undefined") {
      setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
      });
    }
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  const convertRemToPixels = (rem) => {    
    const px = parseFloat(rem) * parseFloat(getComputedStyle(document.documentElement).fontSize);
    return px
  }

  useEffect(() => {
    const proportional = timelineRef.current?.offsetWidth / sortedDeadlines.length
    const desired = convertRemToPixels(props.iconSize)
    if (proportional < desired) {
      setBubbleWidth(proportional)
    } else {
      setBubbleWidth(desired)
    }
    if (absoluteRef.current?.clientHeight) {
      setAbsoluteHeight(absoluteRef.current?.clientHeight)
    }
  }, [dimensions.width, dimensions.height, sortedDeadlines.length, absoluteRef.current])

  useEffect(() => {
    if (sortDeadlines.length !== 0) {
      const now = new Date()
      for (let i = 0; i < sortedDeadlines.length; i++) {
        if (sortedDeadlines[i].id === curDeadline.id && !props.preview) {
          setSelectedIdx(i)
        }
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
  }, [sortedDeadlines, props.deadlinesChanged])

  const handleDeadlineClick = (idx) => {
    if (curDeadline.id && !props.preview) {
      setSelectedIdx(idx)
      setSelectedID(fDeadlines[idx].id)
    }
  }

  return (
    <div className="flex flex-col relative items-center" ref={timelineRef} style={{height: absoluteHeight}}>
      <div className="absolute w-full my-auto" ref={absoluteRef}>
        {!props.preview && (
          <div className="flex justify-between">
            <p className="text-xs text-gray-400">Start</p>
            <div className="grow"></div>
            <p className="text-xs text-gray-400">End</p>
          </div>
        )}
        <ol role="list" className="flex grow w-full items-center justify-between top-[50%]">
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
                        style={{width: bubbleWidth, height: bubbleWidth}}
                        className={"cursor-pointer flex items-center justify-center rounded-full "+
                                  ((idx === selectedIdx) ? "bg-gray-200 hover:bg-gray-300" : 
                                  "border-2 border-gray-200 hover:border-gray-300")}
                        onClick={() => {handleDeadlineClick(deadline.idx)}}
                      >
                        {deadline.complete ? (
                          <CheckIcon className={
                            (idx === selectedIdx) ? "text-white" : "text-gray-600"} 
                            style={{width: bubbleWidth*0.5, height: bubbleWidth*0.5}}
                            aria-hidden="true" 
                          />
                        ) : (
                          <XIcon className={
                            (idx === selectedIdx) ? "text-white" : "text-gray-600"} 
                            style={{width: bubbleWidth*0.5, height: bubbleWidth*0.5}}
                            aria-hidden="true" 
                          />
                        )}
                        <span className="sr-only">{deadline.id}</span>
                        <span className="hidden">{updateFlag}</span>
                      </p>
                    </Tooltip><span
                          className={"h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300 " + (idx == selectedIdx ? "bg-primary5" : "")}
                          aria-hidden="true"
                        />
                  </>
                ) : (
                  <>
                    <Tooltip 
                      style="light" 
                      content={unpackLong(deadline)}
                    >
                      <p
                        href="#"
                        data-tooltip-target="tooltip-light" 
                        data-tooltip-style="light"
                        style={{width: bubbleWidth, height: bubbleWidth}}
                        className={"group cursor-pointer flex items-center justify-center rounded-full "+
                                  ((idx === selectedIdx && deadline.awaitingDeletion) ? "bg-red-600 hover:bg-red-700" :
                                  (idx === selectedIdx && deadline.awaitingCreation) ? "bg-gray-400 hover:bg-gray-500" :
                                  (idx === selectedIdx) ? "bg-primary5 hover:bg-primary5" : 
                                  (deadline.awaitingCreation) ? "border-2 border-gray-200 hover:border-gray-300" :
                                  (deadline.awaitingDeletion) ? "border-2 border-red-300 hover:border-red-400" : 
                                  "border-2 border-primary4 hover:primary5")}
                        onClick={() => {handleDeadlineClick(deadline.idx)}}
                      >
                        {deadline.awaitingCreation ? (
                          <PlusIcon className={
                              ((idx === selectedIdx) ? "text-white" : "text-gray-300")} 
                              style={{width: bubbleWidth*0.5, height: bubbleWidth*0.5}}
                              aria-hidden="true" 
                          />
                        ) : deadline.awaitingDeletion ? (
                          <TrashIcon className={
                            ((idx === selectedIdx) ? "text-white" : "text-red-300")} 
                            style={{width: bubbleWidth*0.5, height: bubbleWidth*0.5}}
                            aria-hidden="true" 
                          />
                        ) : (
                        <span
                          className={"h-3.5 w-3.5 rounded-full " + (
                            !(idx === selectedIdx) ? "hidden group-hover:flex group-hover:bg-primary5" : 
                            " bg-white")}
                          aria-hidden="true"
                        />
                        )}
                        <span className="sr-only">{deadline.id}</span>
                        <span className="hidden">{updateFlag}</span>
                      </p>
                    </Tooltip>

                  </>
                )}
              </li>
              {((idx !== fDeadlines.length - 1) && deadline.status === "past" ) && (
                <div key={idx*3-1} className="grow" aria-hidden="true">
                  <div className="h-0.5 w-full border-b-2 border-primary5" />
                </div>
              )}
              {((idx !== fDeadlines.length - 1) && deadline.status !== "past") && (
                <div key={idx*3} className="grow" aria-hidden="true">
                  <div className="h-0.5 w-full border-b-2 border-grey-300" />
                </div>
              )}
            </Fragment>

          ))}
        </ol>
        {(props.showDates && (
        <nav className="w-full flex flex-row items-center" aria-label="Deadlines">
          <ol role="list" className="flex grow w-full justify-between items-center">
            {fDeadlines.map((deadline, idx) => (
              <p key={deadline.id} className="text-xs text-gray-400">{unpackShort(deadline)}</p>

            ))}
          </ol>
        </nav>
      ))}
      </div>
     
    </div>
  )
}

const mapStateToProps = ({ deadlines }) => ({
  deadlinesChanged: deadlines.deadlinesChanged,
  deadlines: deadlines.deadlines,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeadlineDisplay) 