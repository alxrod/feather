import React, {useState, useEffect} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {ExclamationCircleIcon} from "@heroicons/react/outline"
import {WORKER_TYPE, BUYER_TYPE} from "../../../../services/user.service"

import { LockOpenIcon, ArrowRightIcon } from '@heroicons/react/outline'
import { LockClosedIcon } from '@heroicons/react/solid'

function isNumeric(num){
  return !isNaN(num)
}

const CalendarTime = (props) => {

  const [yourDate, setYourDate] = useState(new Date())
  const [hour, setHour] = useState("12")
  const [minute, setMinute] = useState("00")
  const [period, setPeriod] = useState("AM")

  const [timeoutId, setTimeoutId] = useState(-1)

  useEffect( () => {
    if (props.deadline !== undefined) {
      let datetime = props.deadline.currentDate
      if (props.role === WORKER_TYPE) {
        datetime = props.deadline.workerDate
      }
      if (props.role == BUYER_TYPE) {
        datetime = props.deadline.buyerDate
      }
      setYourDate(datetime)

      const hour_24 = datetime.getHours()
      let hour = hour_24
      let period = "AM"
      if (hour_24 === 0) {
        hour = 12
        period = "AM"
      } else if (hour_24 == 12) {
        period = "PM"
      } else if (hour_24 > 12) {
        hour -= 12
        period = "PM"
      }
      setHour(hour)
      setMinute(datetime.getMinutes())
      setPeriod(period)
    }
  }, [props.deadline, props.reloadFlag, props.calRefresh])

  useEffect( () => {
    if (yourDate.getTime() === props.deadline.currentDate.getTime() && props.dateLock) {
      console.log("Setting the partner as main date")
      let datetime = props.deadline.currentDate
      if (props.role === WORKER_TYPE) {
        datetime = props.deadline.buyerDate
      }
      if (props.role == BUYER_TYPE) {
        datetime = props.deadline.workerDate
      }
      setYourDate(datetime)
      const hour_24 = datetime.getHours()
      let hour = hour_24
      let period = "AM"
      if (hour_24 === 0) {
        hour = 12
        period = "AM"
      } else if (hour_24 == 12) {
        period = "PM"
      } else if (hour_24 > 12) {
        hour -= 12
        period = "PM"
      }

      setHour(hour)
      setMinute(datetime.getMinutes())
      setPeriod(period)

    } 
  }, [props.dateLock])

  const handleMinuteChange = (e) => {
    let minutes = parseInt(e.target.value)
    if (e.target.value === "") {
      minutes = 0
    }
    if ((isNumeric(e.target.value) && 
        minutes >= 0 &&
        minutes < 60) || (e.target.value === "")) {

      let newDate = yourDate
      newDate.setMinutes(minutes)

      if (!timeCheck(newDate)) {
        return
      }
      const newDeadline = props.deadline
      if (props.role === WORKER_TYPE) {
        newDeadline.workerDate = newDate
      } else if (props.role === BUYER_TYPE) {
        newDeadline.buyerDate = newDate
      }
      props.changeDate(newDeadline)
    }
  }

  const handleHourChange = (e) => {
    let hour_24 = parseInt(e.target.value)
    if (period === "PM" && hour_24 < 12) {
      hour_24 += 12
    } else if (hour_24 === 12 && period === "AM") {
      hour_24 = 0
    }
    let newDate = yourDate
    newDate.setHours(hour_24)
    
    if (!timeCheck(newDate)) {
      return
    }
    const newDeadline = props.deadline
    if (props.role === WORKER_TYPE) {
      newDeadline.workerDate = newDate
    } else if (props.role === BUYER_TYPE) {
      newDeadline.buyerDate = newDate
    }
    setHour(e.target.value)
    props.changeDate(newDeadline)
  }

  const handlePeriodChange = (e) => {
    const period = e.target.value
    
    let hour_24 = parseInt(hour)
    if (period === "PM" && hour_24 < 12) {
      hour_24 += 12
    } else if (hour_24 === 12 && period === "AM") {
      hour_24 = 0
    }
    let newDate = yourDate
    newDate.setHours(hour_24)
    
    if (!timeCheck(newDate)) {
      return
    }


    const newDeadline = props.deadline
    if (props.createMode === true) {
      newDeadline.workerDate = newDate
      newDeadline.currentDate = newDate
      newDeadline.buyerDate = newDate
    } else if (props.role === WORKER_TYPE) {
      newDeadline.workerDate = newDate
    } else if (props.role === BUYER_TYPE) {
      newDeadline.buyerDate = newDate
    }
    props.changeDate(newDeadline)

    setPeriod(period)
  }

  const timeCheck = (newDate) => {
    const now = new Date()
    if (newDate < now) {
      props.setErrorMsg("You can't set a deadline in the past")
      return false
    }
    if (props.deadline.idx > 0) {
      let prev = props.deadlines[props.deadline.idx - 1]
      if (props.role === WORKER_TYPE) {
        if (prev.workerDate > newDate) {
          props.setErrorMsg(("You can't make this deadline due before Deadline " + prev.id))
          return false
        }
      } else if (props.role === BUYER_TYPE) {
        if (prev.buyerDate > newDate) {
          props.setErrorMsg(("You can't make this deadline due before Deadline " + prev.id))
          return false
        }
      }
    }

    if (props.deadline.idx < props.deadlines.length-1) {
      let next = props.deadlines[props.deadline.idx + 1]
      if (props.role === WORKER_TYPE) {
        if (next.workerDate < newDate) {
          props.setErrorMsg(("You can't make this deadline due after Deadline " + next.id))
          return false
        }
      } else if (props.role === BUYER_TYPE) {
        if (next.buyerDate < newDate) {
          props.setErrorMsg(("You can't make this deadline due after Deadline " + next.id))
          return false
        }
      }
    }
    props.setErrorMsg("")
    return true
  }
  
  return (
    <>
      <div className="flex items-center flex-row justify-end">
        <div className="flex items-center">
            <p className="text-gray-500 text mt-6">Time </p>
            <span className="mx-1 text-gray-500 mt-6 h-full" id="price-currency">
              {props.dateLock && (
                <LockClosedIcon className="w-4 h-4"/>
              )}
              {!props.dateLock && (
                <LockOpenIcon className="w-4 h-4"/>
              )}
            </span>
        </div>
        <div className="mr-10">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Hour
            </label>
            <select
                id="location"
                name="location"
                disabled={props.dateLock}
                className="cursor-pointer mt-1 block w-full pl-3 pr-10 mr-10py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={hour}
                onChange={handleHourChange}
            >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
            </select>
        </div>
        <div className="mr-10">
            <label htmlFor="minutes" className="block text-sm font-medium text-gray-700">
                Minutes
            </label>
            <input
                disabled={props.dateLock}
                type="text"
                name="minutes"
                id="minutes"
                className="cursor-pointer focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md w-12"
                value={minute}
                onChange={handleMinuteChange}
                aria-describedby="time-minutes"
              />
        </div>
        <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Period
            </label>
            <select
                id="location"
                name="location"
                disabled={props.dateLock}
                className="cursor-pointer mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={period}
                onChange={handlePeriodChange}
            >
                <option>AM</option>
                <option>PM</option>
            </select>
        </div>
      </div> 
    </>             
  )
}

const mapStateToProps = ({ }) => ({
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CalendarTime)