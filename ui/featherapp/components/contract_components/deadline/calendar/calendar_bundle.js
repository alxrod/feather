import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, {useState, useEffect, useContext} from 'react'
import {WORKER_TYPE, BUYER_TYPE} from '../../../../services/user.service'
import { genEmptyDeadline } from "../helpers"
import Calendar from "./calendar"
import CalendarTime from "./calendar_time"
import DecideButton from '../../decide_button'

import { reactDate, suggestDate } from '../../../../reducers/deadlines/dispatchers/deadlines.date.dispatcher'
import { editDeadline } from '../../../../reducers/deadlines/dispatchers/deadlines.add.dispatcher'
import { msgMethods, decisionTypes } from "../../../../services/chat.service"

import { DeadlineFieldContext } from '../deadline_field';

const CalendarBundle = (props) => {
  const {sortedDeadlines, curDeadline} = useContext(DeadlineFieldContext);

  const [dateMsg, setDateMsg] = useState("Commit your date change")
  const [dateMsgColor, setDateMsgColor] = useState("text-gray-500") 
  const [newDate, setNewDate] = useState(new Date())

  const [decisionMode, setDecisionMode] = useState(false)
  const [timeoutId, setTimeoutId] = useState(false)
  const [dateLock, setDateLock] = useState(false)

  const [origDeadline, setOrigDeadline] = useState(undefined)
  
  const [calRefresh, toggleCalRefresh] = useState(false)

  const [proposedByPartner, setProposedByPartner] = useState(false)
  const [dateMsgId, setDateMsgId] = useState("")

  useEffect(() => {
    if (props.deleteDeadlineMode) {
      setDateLock(true)
    }
  }, [props.deleteDeadlineMode])


  useEffect(() => {
    let final_date_id = ""
    for (let i = 0; i < props.messages.length; i++) {
      if (props.messages[i].method === msgMethods.DATE) {
        if (props.messages[i].dateBody.deadlineId === curDeadline.id) {
          final_date_id = props.messages[i].id
        }
      }
    }
    setDateMsgId(final_date_id)
  }, [props.messages.length, curDeadline])

  const changeDate = (new_deadline) => {
    if (!props.createMode) {
      let your_date = new_deadline.currentDate
      let main_date = new_deadline.currentDate
      if (props.role === WORKER_TYPE) {
        your_date = new_deadline.workerDate
      }
      if (props.role === BUYER_TYPE) {
        your_date = new_deadline.buyerDate
      }

      your_date.setSeconds(0)
      main_date.setSeconds(0)
      setNewDate(your_date)

      if (Math.floor(your_date.getTime()/100.0) !== Math.floor(main_date.getTime()/100.0)) {
        setDecisionMode(true)
      } else {
        setDecisionMode(false)
      }
    } else {
      props.editDeadline(new_deadline)
    }
  }

  const submitDate = () => {
    if (props.createMode !== true) {
      setDateLock(true)
      setDecisionMode(false)
      // props.editDeadline(newDeadline)
      // props.saveDeadlines()
      props.suggestDate(props.curContract.id, curDeadline.id, newDate)
    }
  }

  const rejectDate = () => {
    props.setErrorMsg("")
    props.editDeadline(origDeadline)
    setDecisionMode(false)
    setTimeoutId(-1)
    setDateMsgColor("text-gray-500")
    toggleCalRefresh(!calRefresh)
  }

  useEffect( () => {
    if (curDeadline) {
      if (curDeadline.dateAwaitingApproval) {
        if (curDeadline.dateProposerId === props.user.id) {
          setProposedByPartner(false)
        } else {
          setProposedByPartner(true)
        }
        setDateLock(true)
        
      } else if (props.universalLock) {
        setDateLock(true)
      } else {
        setDateLock(false)
      }
      if (origDeadline === undefined) {
        const orig = structuredClone(curDeadline)
        setOrigDeadline(orig)
      }
      setDecisionMode(false)
    }
  }, [curDeadline, props.deadlinesChanged, props.universalLock])

  const approveChange = () => {
    props.reactDate(props.curContract.id, dateMsgId, curDeadline.id, decisionTypes.YES)
  }
  const denyChange = () => {
    props.reactDate(props.curContract.id, dateMsgId, curDeadline.id, decisionTypes.NO)
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
        universalLock={props.universalLock}
        role={props.role} 
        changeDate={changeDate}
        setErrorMsg={props.setErrorMsg}
        reloadFlag={props.deadlinesChanged}
        createMode={props.createMode}
        decisionMode={decisionMode}
        calRefresh={calRefresh}
        dateLock={dateLock}
      />
      <CalendarTime
        role={props.role} 
        changeDate={changeDate}
        setErrorMsg={props.setErrorMsg}
        reloadFlag={props.deadlinesChanged}
        createMode={props.createMode}
        calRefresh={calRefresh}
        dateLock={dateLock}
      />
    </div>
  )
}

const mapStateToProps = ({ user, contract, chat, deadlines }) => ({
  curContract: contract.curContract,
  user: user.user,
  messages: chat.messages,
  deadlinesChanged: deadlines.deadlinesChanged,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  suggestDate,
  reactDate,
  editDeadline
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CalendarBundle)

