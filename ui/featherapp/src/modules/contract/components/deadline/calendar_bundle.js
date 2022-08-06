import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, {useState, useEffect} from 'react'
import {WORKER_TYPE, BUYER_TYPE} from '../../../../services/user.service'
import { genEmptyDeadline } from "./helpers"
import Calendar from "./calendar"
import CalendarTime from "./calendar_time"
import DecideButton from '../decide_button'
import { suggestDate } from '../../../../reducers/contract.reducer'


const CalendarBundle = (props) => {
  const [dateMsg, setDateMsg] = useState("Commit your date change")
  const [dateMsgColor, setDateMsgColor] = useState("text-gray-500") 
  const [newDate, setNewDate] = useState(new Date())
  const [newDeadline, setNewDeadline] = useState(genEmptyDeadline())

  const [decisionMode, setDecisionMode] = useState(false)
  const [timeoutId, setTimeoutId] = useState(false)
  const [dateLock, setDateLock] = useState(false)

  const [origDeadline, setOrigDeadline] = useState(undefined)
  
  const [calRefresh, toggleCalRefresh] = useState(false)

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
      setNewDeadline(new_deadline)
      setNewDate(your_date)

      if (Math.floor(your_date.getTime()/100.0) !== Math.floor(main_date.getTime()/100.0)) {
        setDecisionMode(true)
      } else {
        setDecisionMode(false)
      }
      
    }
    
  }

  const submitDate = () => {
    if (props.createMode !== true) {
      setDateLock(true)
      setDecisionMode(false)
      // props.editDeadline(newDeadline)
      // props.saveDeadlines()
      props.suggestDate(props.selectedId, newDeadline.id, newDate)
    }
  }

  const rejectDate = () => {
    console.log("Reseting date")
    props.setErrorMsg("")
    props.editDeadline(origDeadline)
    setDecisionMode(false)
    setTimeoutId(-1)
    setDateMsgColor("text-gray-500")
    toggleCalRefresh(!calRefresh)
  }

  useEffect( () => {
    if (props.deadline) {
      console.log("Calendar Bundle Detecting Deadline:")
      console.log(props.deadline)
      if (props.deadline.dateAwaitingApproval) {
        setDateLock(true)
      } else {
        setDateLock(false)
      }
      if (origDeadline === undefined) {

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
              <p className={" "+dateMsgColor}>{dateMsg}</p>
              <DecideButton approve={submitDate} reject={rejectDate} />
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
        calRefresh={calRefresh}
        dateLock={dateLock}
      />
      <CalendarTime
        role={props.role} 
        changeDate={changeDate}
        deadlines = {props.deadlines}
        deadline={props.deadline}
        setErrorMsg={props.setErrorMsg}
        reloadFlag={props.reloadFlag}
        createMode={props.createMode}
        calRefresh={calRefresh}
        dateLock={dateLock}
      />
    </div>
  )
}

const mapStateToProps = ({ user, contract, chat }) => ({
  selectedId: contract.selectedId,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  suggestDate
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CalendarBundle)

