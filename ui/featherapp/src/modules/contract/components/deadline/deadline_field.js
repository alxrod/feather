import React, {useState, useMemo} from "react";
import {ExclamationCircleIcon} from "@heroicons/react/outline"
import CalendarModal from "../deadline/calendar_modal";

const DeadlineField = (props) => {

  const [field_classes, setClasses] = useState("hidden")

  const date_str = useMemo(() => {
    if (props.deadline_str) {
      return props.deadline_str
    } else {
      return props.deadline.you.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
    }
  })

  const [openModal, setOpenModal] = useState(false)

  const handleOpenCalendar = (e) => {
    if (props.disabled == false || props.disabled == undefined) {
      // console.log("Opening")
      setOpenModal(true)
    }
  }


  return (
    <>
      <div className="flex">
        <label htmlFor="price" className="mt-3 block text-base font-medium text-gray-400 mr-2">
          Due:
        </label>
        <div className="flex flex-col">
          <div className="mt-1 relative rounded-md shadow-sm" onClick={handleOpenCalendar}>
            <input
              type="text"
              name="price"
              id="price"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm border-gray-300 rounded-md"
              value={date_str}
              disabled={props.disabled}
              onChange={() => {}}
              aria-describedby="price-currency"
            />
          </div>
          <div className={"flex items-center " + field_classes}>
            <ExclamationCircleIcon className="h-4 w-4 text-red" aria-hidden="true" />
            <p className="text-red text-sm">You must enter a valid date</p>
          </div>
        </div>
      </div>
      <CalendarModal open={openModal} setOpen={setOpenModal} deadline={props.deadline} changeDeadline={props.changeDeadline}/>
    </>
  )
}


export default DeadlineField