import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import React, {useState, useEffect} from 'react'
import {WORKER_TYPE, BUYER_TYPE} from '../../../../services/user.service'

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
  const [yourDate, setYourDate] = useState(datePlaceholder)
  const [partnerDate, setPartnerDate] = useState(datePlaceholder)

  useEffect( () => {
    if (props.deadline !== undefined) {
      if (props.role == BUYER_TYPE) {
        setYourDate(props.deadline.buyer.date)
        setPartnerDate(props.deadline.worker.date)
      } else {
        setYourDate(props.deadline.worker.date)
        setPartnerDate(props.deadline.buyer.date)
      }
    }
  }, [props.deadline, props.reloadFlag])

  useEffect( () => {
    if (yourDate !== undefined) {
      setYear(yourDate.getFullYear())
      setMonth(yourDate.getMonth())
      
      setSelMonth(yourDate.getMonth())
      setSelYear(yourDate.getFullYear())
      setSelDay(yourDate.getDate())
    }
    
  }, [yourDate])

  useEffect( () => {
    if (yourDate !== undefined) {
      const oldDate = yourDate
      if (selMonth !== oldDate.getMonth() ||
        selYear !== oldDate.getFullYear() ||
        selDay !== oldDate.getDate()) {
        
        const newDate = new Date(selYear, selMonth, selDay, oldDate.getHours(), oldDate.getMinutes())
        const newDeadline = props.deadline
        if (props.createMode === true) {
          newDeadline.worker.date = newDate
          newDeadline.current.date = newDate
          newDeadline.buyer.date = newDate
        } else if (props.role === WORKER_TYPE) {
          newDeadline.worker.date = newDate
        } else if (props.role === BUYER_TYPE) {
          newDeadline.buyer.date = newDate
        }
        props.editDeadline(newDeadline)
        props.saveDeadlines()
      } 
    }
    
  }, [selMonth, selYear, selDay])

  const handleDateChange = (e) => {
    const newDate = new Date(year, month, parseInt(e.target.innerHTML), yourDate.getHours(), yourDate.getMinutes())
    const now = new Date()
    if (newDate < now) {
      props.setErrorMsg("You can't set a deadline in the past")
      return
    }
    if (props.deadline.idx > 0) {
      let prev = props.deadlines[props.deadline.idx - 1]
      if (props.role === WORKER_TYPE) {
        if (prev.worker.date > newDate) {
          props.setErrorMsg(("You can't make this deadline due before Deadline " + prev.id))
          return
        }
      } else if (props.role === BUYER_TYPE) {
        if (prev.buyer.date > newDate) {
          props.setErrorMsg(("You can't make this deadline due before Deadline " + prev.id))
          return
        }
      }
    }

    if (props.deadline.idx < props.deadlines.length-1) {
      let next = props.deadlines[props.deadline.idx + 1]
      if (props.role === WORKER_TYPE) {
        if (next.worker.date < newDate) {
          props.setErrorMsg(("You can't make this deadline due after Deadline " + next.id))
          return
        }
      } else if (props.role === BUYER_TYPE) {
        if (next.buyer.date < newDate) {
          props.setErrorMsg(("You can't make this deadline due after Deadline " + next.id))
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

  return (
    <div>
      <div className="flex items-center mt-5">
        <div className="w-full flex justify-start ml-1">
            <h2 className="font-semibold text-gray-900">{today.set("month", month).format("MMMM")} {year}</h2>
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
            <button
              type="button"
              className={classNames(
                isSel(day+1) && 'text-white',
                !isSel(day+1) && isDay(day+1) && 'text-indigo-600',
                !isSel(day+1) && !isDay(day+1) && 'text-gray-900',
                isSel(day+1) && isDay(day+1) && 'bg-indigo-600',
                isSel(day+1) && !isDay(day+1) && 'bg-gray-500',
                !isSel(day+1) && 'hover:bg-gray-200',
                (isSel(day+1) || isDay(day+1)) && 'font-semibold',
                'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
              )}
              onClick={handleDateChange}
            >
              {day + 1}
            </button>
          </div>
        )}
        )}
      </div>
    </div>
  )
}

export default Calendar