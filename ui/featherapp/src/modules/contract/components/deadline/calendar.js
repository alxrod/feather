import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import React, {useState, useEffect} from 'react'
import {WORKER_TYPE, BUYER_TYPE} from '../../../../services/user.service'
import {Tooltip} from "flowbite-react"

import { LockOpenIcon, ArrowRightIcon } from '@heroicons/react/outline'
import { LockClosedIcon } from '@heroicons/react/solid'

import * as dayjs from 'dayjs'
var isoWeek = require('dayjs/plugin/isoWeek')
var isToday = require('dayjs/plugin/isToday')


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Calendar = (props) => {
  dayjs.extend(isoWeek)
  dayjs.extend(isToday)
  
  const datePlaceholder = new Date()
  const [year, setYear] = useState(datePlaceholder.getFullYear())
  const today = dayjs().set('year', year);
  const [month, setMonth] = useState(datePlaceholder.getMonth())

  const [selMonth, setSelMonth] = useState(datePlaceholder.getMonth())
  const [selYear, setSelYear] = useState(datePlaceholder.getFullYear())
  const [selDay, setSelDay] = useState(datePlaceholder.getDate())

  const [origMonth, setOrigMonth] = useState(datePlaceholder.getMonth())
  const [origYear, setOrigYear] = useState(datePlaceholder.getFullYear())
  const [origDay, setOrigDay] = useState(datePlaceholder.getDate())

  const [nextMonth, setNextMonth] = useState(datePlaceholder.getMonth())
  const [nextYear, setNextYear] = useState(datePlaceholder.getFullYear())
  const [nextDay, setNextDay] = useState(datePlaceholder.getDate())
  const [nextExists, toggleNextExists] = useState(false)

  const [setOrig, toggleSetOrig] = useState(false)

  const [yourDate, setYourDate] = useState(datePlaceholder)
  const [partnerDate, setPartnerDate] = useState(datePlaceholder)
  const [newDate, setNewDate] = useState(datePlaceholder)

  useEffect( () => {
    if (props.deadline !== undefined) {
      let yD = props.deadline.currentDate
      let pD = props.deadline.currentDate

      if (props.role === BUYER_TYPE) {
        yD = props.deadline.buyerDate
        pD = props.deadline.workerDate
      } else {
        yD = props.deadline.workerDate
        pD = props.deadline.buyerDate
      }
      setPartnerDate(pD)
      setYourDate(yD)

      setOrigMonth(props.deadline.currentDate.getMonth())
      setOrigYear(props.deadline.currentDate.getFullYear())
      setOrigDay(props.deadline.currentDate.getDate())

      let takeNext = false
      for (let i = 0; i < props.deadlines.length; i++) {
        if (takeNext === true) {
          setNextMonth(props.deadlines[i].currentDate.getMonth())
          setNextYear(props.deadlines[i].currentDate.getFullYear())
          setNextDay(props.deadlines[i].currentDate.getDate())
          toggleNextExists(true)
        }
        if (props.deadlines[i].id == props.deadline.id && i !== (props.deadlines.length-1)) {
          takeNext = true
        }
      }
      if (takeNext) {
        toggleNextExists(false)
      }
  
    }
  }, [props.deadline, props.reloadFlag, props.calRefresh])

  useEffect( () => {
    if (yourDate.getTime() === props.deadline.currentDate.getTime() && props.dateLock) {
      setYourDate(partnerDate)
    } 
  }, [props.dateLock])

  useEffect( () => {
    if (yourDate !== undefined) {
      setYear(yourDate.getFullYear())
      setMonth(yourDate.getMonth())
      
      setSelMonth(yourDate.getMonth())
      setSelYear(yourDate.getFullYear())
      setSelDay(yourDate.getDate())
    }
    
  }, [yourDate, props.calRefresh])

  useEffect( () => {
    if (yourDate !== undefined) {
      const oldDate = yourDate
      if (selMonth !== oldDate.getMonth() ||
        selYear !== oldDate.getFullYear() ||
        selDay !== oldDate.getDate()) {
        
        const newDate = new Date(selYear, selMonth, selDay, oldDate.getHours(), oldDate.getMinutes())
        const newDeadline = structuredClone(props.deadline)
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
      } 
    }
    
  }, [selMonth, selYear, selDay])

  const handleDateChange = (e) => {
    if (props.dateLock) {
      return
    }
    const newDate = new Date(year, month, parseInt(e.target.innerHTML), yourDate.getHours(), yourDate.getMinutes())
    const now = new Date()
    if (newDate < now) {
      props.setErrorMsg("You can't set a deadline in the past")
      return
    }
    if (props.deadline.idx > 0) {
      let prev = props.deadlines[props.deadline.idx - 1]
      if (props.role === WORKER_TYPE) {
        if (prev.workerDate > newDate) {
          props.setErrorMsg(("You can't make this deadline due before Deadline " + (prev.idx+1)))
          return
        }
      } else if (props.role === BUYER_TYPE) {
        if (prev.buyerDate > newDate) {
          props.setErrorMsg(("You can't make this deadline due before Deadline " + (prev.idx+1)))
          return
        }
      }
    }

    if (props.deadline.idx < props.deadlines.length-1) {
      let next = props.deadlines[props.deadline.idx + 1]
      if (props.role === WORKER_TYPE) {
        if (next.workerDate < newDate) {
          props.setErrorMsg(("You can't make this deadline due after Deadline " + (next.idx+1)))
          return
        }
      } else if (props.role === BUYER_TYPE) {
        if (next.buyerDate < newDate) {
          props.setErrorMsg(("You can't make this deadline due after Deadline " + (next.idx+1)))
          return
        }
      }
    }
    props.setErrorMsg("")
    setSelMonth(month)
    setSelYear(year)
    setSelDay(parseInt(e.target.innerHTML))
  }
  
  
  const startWeek = today.startOf("isoWeek");
  const weekDays = Array.from(new Array(7).keys()).map((index) => {
    return startWeek.add(index, "day");
  });

  const startOfMonth = today.set("month", month).startOf("month");
  const startOfFirstWeek = startOfMonth.startOf("isoWeek");
  const daysToFirstDay = startOfMonth.diff(startOfFirstWeek, "day");
  const daysToPrepend = Array.from(new Array(daysToFirstDay).keys());
  const daysInMonth = Array.from(new Array(startOfMonth.daysInMonth()).keys());

  const increaseMonth = (e) => {
    if (month === 11) {
      setMonth(0)
      setYear(year+1)
    } else {
      setMonth(month+1)
    }
  }
  
  const decreaseMonth = (e) => {
    if (month === 0) {
      setMonth(11)
      setYear(year-1)
    } else {
      setMonth(month-1)
    }
  }

  const isDay = (day) => {
    if (month === dayjs().month()) {
      if (day === dayjs().date()) {
        return true
      }
    }
    return false
  }

  const isSel = (day) => {
    if (month === selMonth) {
      if (day === selDay) {
        return true
      }
    }
    return false
  }

  const isOrig = (day) => {
    if (props.decisionMode === true || props.dateLock) {
      if (month === origMonth) {
        if (day === origDay) {
          return true
        }
      }
    }
    return false
  }

  const isNext = (day) => {
    if (nextExists) {
      if (month === nextMonth) {
        if (day === nextDay) {
          return true
        }
      }
    }
    return false
  }

  const genTooltip = (day) => {
    if (isSel(day) && props.decisionMode === false && props.dateLock === false) {
      return ("Deadline " + (props.deadline.idx+1))
    } else if (isSel(day) && props.dateLock) {
      return ("Proposed Deadline " + (props.deadline.idx+1))
    } else if (isSel(day) && props.decisionMode) {
      return ("New Deadline " + (props.deadline.idx+1))
    }
    if (isOrig(day) && !isSel(day)) {
      return ("Old Deadline " + (props.deadline.idx+1))
    }
    if (isNext(day)) {
      return ("Deadline " + (props.deadline.idx+2))
    }
  }

  return (
    <div>
      <div className="flex items-center mt-5">
        <div className="w-full flex justify-start ml-1 items-center">
            <h2 className="font-semibold text-gray-900">{today.set("month", month).format("MMMM")} {year}</h2>
            <span className="ml-1 text-gray-900 sm:text-sm" id="price-currency">
              {props.dateLock && (
                <LockClosedIcon className="w-5 h-5"/>
              )}
              {!props.dateLock && (
                <LockOpenIcon className="w-5 h-5"/>
              )}
            </span>
        </div>
        <button
          type="button"
          className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon onClick={decreaseMonth} className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon onClick={increaseMonth} className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-4 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
        {weekDays.map((weekDay, index) => (
          <div className="text-center" key={`weekday_${index}`}>
            {weekDay.format("ddd")}
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 text-sm">
        {daysToPrepend.map((day, dayIdx) => (
          <div key={-1*day} className={classNames(dayIdx > 6 && 'border-t border-gray-200', 'py-2')}>
          </div>
        ))}
        {daysInMonth.map((day, dayIdx) => {
          return (
          <div key={day} className={classNames(dayIdx > 6 && 'border-t border-gray-200', 'py-2')}>
            {(isSel(day+1) || isOrig(day+1) || isNext(day+1)) ? (
              <div className="w-full flex justify-center">
              <Tooltip 
                style="light" 
                content={genTooltip(day+1)}
              >
                <button
                  type="button"
                  className={classNames(
                    isSel(day+1) && 'text-white',
                    isSel(day+1) && isDay(day+1) && 'bg-indigo-600',

                    isSel(day+1) && !isDay(day+1) && (!props.decisionMode && !props.dateLock) && 'bg-gray-500',
                    isSel(day+1) && !isDay(day+1) && (props.decisionMode || (props.dateLock && !props.universalLock)) && 'bg-green',
                    isSel(day+1) && !isDay(day+1) && (props.universalLock) && 'bg-indigo-600',

                    !isSel(day+1) && isOrig(day+1) && 'text-white',
                    !isSel(day+1) && isOrig(day+1) && 'bg-gray-400',

                    !isSel(day+1) && isNext(day+1) && 'text-white',
                    !isSel(day+1) && isNext(day+1) && 'bg-indigo-600 hover:bg-indigo-800',


                    !isSel(day+1) && isDay(day+1) && 'text-indigo-600',
                    !isSel(day+1) && !isDay(day+1) && 'text-gray-900',   

                    !isSel(day+1) && !isNext(day+1) && 'hover:bg-gray-200',

                    (isSel(day+1) || isDay(day+1)) && 'font-semibold',
                    'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                  )}
                  onClick={handleDateChange}
                >
                  {day + 1}
                </button>
              </Tooltip>
              </div>
            ) : (
              <button
                  type="button"
                  className={classNames( 
                    isDay(day+1) && 'text-indigo-600',
                    !isDay(day+1) && 'text-gray-900',   
                    (isDay(day+1)) && 'font-semibold',
                    'hover:bg-gray-200 mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                  )}
                  onClick={handleDateChange}
                >
                  {day + 1}
              </button>
            )}
            
          </div>
        )}
        )}
      </div>
    </div>
  )
}

export default Calendar