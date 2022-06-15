import React, {useState} from "react";
import {ExclamationCircleIcon} from "@heroicons/react/outline"

const DeadlineField = (props) => {

  const [deadline_str, setDeadline] = useState(props.deadline_str)
  const [field_classes, setClasses] = useState("hidden")

  const handle_price_change = (e) => {
    // if (isFloat(e.target.value)) {
    setDeadline(e.target.value)
    //   setClasses("hidden")
    // } else {
    //   setClasses("display")
    // }
  }

  return (
    <>
      <div className="flex">
        <label htmlFor="price" className="mt-3 block text-base font-medium text-gray-400 mr-2">
          Due:
        </label>
        <div className="flex flex-col">
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              name="price"
              id="price"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm border-gray-300 rounded-md"
              value={deadline_str}
              disabled={props.disabled}
              onChange={handle_price_change}
              aria-describedby="price-currency"
            />
          </div>
          <div className={"flex items-center " + field_classes}>
            <ExclamationCircleIcon className="h-4 w-4 text-red" aria-hidden="true" />
            <p className="text-red text-sm">You must enter a valid date</p>
          </div>
        </div>
      </div>
    </>
  )
}


export default DeadlineField