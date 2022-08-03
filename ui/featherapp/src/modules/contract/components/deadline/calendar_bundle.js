import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import React, {useState, useEffect} from 'react'
import {WORKER_TYPE, BUYER_TYPE} from '../../../../services/user.service'
import Calendar from "./calendar"
import CalendarTime from "./calendar_time"
import DecideButton from '../decide_button'

const CalendarBundle = (props) => {

  const [decisionMode, setDecisionMode] = useState(false)
  const [timeoutId, setTimeoutId] = useState(false)

  const [origDeadline, setOrigDeadline] = useState(null)
  const changeDate = (new_deadline) => {
    console.log("Changing the deadline date!")

    // props.editDeadline(newDeadline)
    if (props.createMode === true) {
      props.editDeadline(new_deadline)
      if (timeoutId !== -1) {
        clearTimeout(timeoutId);
      }
      const id = setTimeout(function(){
        props.saveDeadlines()
        setTimeoutId(-1)
      },1000)
      setTimeoutId(id)
    } else {
      let your_date = new_deadline.current.date
      let main_date = new_deadline.current.date
      if (props.role === WORKER_TYPE) {
        your_date = new_deadline.worker.date
      }
      if (props.role === BUYER_TYPE) {
        your_date = new_deadline.buyer.date
      }

      your_date.setSeconds(0)
      main_date.setSeconds(0)
      if (Math.floor(your_date.getTime()/100.0) !== Math.floor(main_date.getTime()/100.0)) {
        setDecisionMode(true)
      } else {
        setDecisionMode(false)
      }
      
    }
    
  }

  useEffect( () => {
    if (props.deadline) {
      if (origDeadline === null) {
        setOrigDeadline(props.deadline)
      }
      setDecisionMode(false)
    }
  }, [props.deadline])

  return (
    <div className="w-full h-full">
      <div className="w-full h-6">
        {decisionMode && (
            <div className="w-full flex flex-wrap justify-between">
              <p className="text-gray-500">Commit your date change</p>
              <DecideButton/>
            </div>   
        )}
      </div>
      
      <Calendar 
        role={props.role} 
        changeDate={changeDate}
        deadlines = {props.deadlines}
        deadline={props.deadline}
        setErrorMsg={props.setErrorMsg}
        reloadFlag={props.reloadFlag}
        createMode={props.createMode}
        decisionMode={decisionMode}
      />
      <CalendarTime
        role={props.role} 
        changeDate={changeDate}
        deadlines = {props.deadlines}
        deadline={props.deadline}
        setErrorMsg={props.setErrorMsg}
        reloadFlag={props.reloadFlag}
        createMode={props.createMode}
      />
    </div>
  )
}

export default CalendarBundle


// props.editDeadline(newDeadline)
// setMinute(e.target.value)

// if (timeoutId !== -1) {
//   clearTimeout(timeoutId);
// }
// const id = setTimeout(function(){
//   props.saveDeadlines()
//   setTimeoutId(-1)
// },1000)
// setTimeoutId(id)