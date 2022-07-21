import React, {useState} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {ExclamationCircleIcon} from "@heroicons/react/outline"

function isNumeric(num){
  return !isNaN(num)
}

const CalendarTime = (props) => {

  const [hour, setHour] = useState("12")
  const [minute, setMinute] = useState("00")
  const [period, setPeriod] = useState("AM")
  const [field_classes, setClasses] = useState("hidden")

  const handle_minute_change = (e) => {
    if (isNumeric(e.target.value) && 
        parseInt(e.target.value) >= 0 &&
        parseInt(e.target.value) < 60) {
      setMinute(e.target.value)
      setClasses("hidden")
    } else {
      setClasses("display")
    }
  }

  const handleCloseModal = (e) => {
    e.preventDefault()
    // let oldDate = props.deadline.you
    // let hour_24 = parseInt(hour)
    // if (period === "PM") {
    //   hour_24 += 12
    // }
    // let minute_int = parseInt(minute)
    // const newDate = new Date(oldDate.getFullYear(), oldDate.getMonth(), oldDate.getDate(), hour_24, minute_int)
    
    // props.changeDeadline(newDate)
    // props.setOpen(false)
  }

  return (
    <>
      <div className="flex items-center flex-row justify-end">
        <div>
            <p className="text-gray-500 text mt-6 mr-2">Time: </p>
        </div>
        <div className="mr-10">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Hour
            </label>
            <select
                id="location"
                name="location"
                className="mt-1 block w-full pl-3 pr-10 mr-10py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                defaultValue={hour}
                onChange={(e) => setHour(e.target.value)}
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
                type="text"
                name="minutes"
                id="minutes"
                className="focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md w-12"
                value={minute}
                onChange={handle_minute_change}
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
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                defaultValue={period}
                onChange={(e) => setPeriod(e.target.value)}
            >
                <option>AM</option>
                <option>PM</option>
            </select>
        </div>
      </div> 
      <div className={"flex items-center " + field_classes}>
        <ExclamationCircleIcon className="h-4 w-4 text-red" aria-hidden="true" />
        <p className="text-red text-sm">You must enter a minute between 0 and 59</p>
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