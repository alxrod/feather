import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, {useState, useEffect} from 'react'
import {WORKER_TYPE, BUYER_TYPE} from '../../../../services/user.service'
import { genEmptyDeadline } from "./helpers"
import Calendar from "./calendar"
import CalendarTime from "./calendar_time"
import DecideButton from '../decide_button'

import { reactDate, suggestDate } from '../../../../reducers/deadlines/dispatchers/deadlines.date.dispatcher'
import { msgMethods, decisionTypes } from "../../../../services/chat.service"



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

  const [proposedByPartner, setProposedByPartner] = useState(false)
  const [dateMsgId, setDateMsgId] = useState("")

  useEffect(() => {
    if (props.newDeadlineMode && !props.newDeadlineLocalMode) {
      setDateLock(true)
    }
  }, [props.newDeadlineMode])


  useEffect(() => {
    let final_date_id = ""
    for (let i = 0; i < props.messages.length; i++) {
      if (props.messages[i].method === msgMethods.DATE) {
        if (props.messages[i].dateBody.deadlineId === props.deadline.id) {
          final_date_id = props.messages[i].id
        }
      }
    }
    setDateMsgId(final_date_id)
  }, [props.messages.length, props.deadline])

  const changeDate = (new_deadline) => {
    console.log("Changing the deadline date!")

    // props.editDeadline(newDeadline)
    if (props.createMode || props.newDeadlineMode) {
      props.editDeadline(new_deadline)
      console.log("Updated the date on new one")
      console.log(new_deadline)
      if (timeoutId !== -1) {
        clearTimeout(timeoutId);
      }
      if (props.createMode) {
        const id = setTimeout(function(){
          props.saveDeadlines()
          setTimeoutId(-1)
        },1000)
        setTimeoutId(id)
      }
      
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
    props.setErrorMsg("")
    console.log("Orig deadline")
    console.log(origDeadline)
    props.editDeadline(origDeadline)
    setDecisionMode(false)
    setTimeoutId(-1)
    setDateMsgColor("text-gray-500")
    toggleCalRefresh(!calRefresh)
  }

  useEffect( () => {
    if (props.deadline) {
      if (props.deadline.dateAwaitingApproval) {
        if (props.deadline.dateProposerId === props.user.user_id) {
          setProposedByPartner(false)
        } else {
          setProposedByPartner(true)
        }
        console.log("SHOULD BE TRIGGERED")
        setDateLock(true)
        
      } else {
        setDateLock(false)
      }
      if (origDeadline === undefined) {
        const orig = structuredClone(props.deadline)
        setOrigDeadline(orig)
      }
      setDecisionMode(false)
    }
  }, [props.deadline])

  const approveChange = () => {
    props.reactDate(props.selectedId, dateMsgId, props.deadline.id, decisionTypes.YES)
  }
  const denyChange = () => {
    props.reactDate(props.selectedId, dateMsgId, props.deadline.id, decisionTypes.NO)
  }

  return (
    <div className="w-full h-full">
      <div className="w-full h-6">
        {decisionMode && (
            <div className="w-full flex flex-wrap justify-between">
              <p className={" "+dateMsgColor}>{dateMsg}</p>
              <DecideButton approve={submitDate} reject={rejectDate} />
            </div>   
        )}
        {(proposedByPartner && dateLock) && (
          <div className="w-full flex flex-wrap justify-between">
            <p className={" "+dateMsgColor}>Approve your partner's change</p>
            <DecideButton approve={approveChange} reject={denyChange}/>
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
  user: user.user,
  messages: chat.messages,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  suggestDate,
  reactDate,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CalendarBundle)

