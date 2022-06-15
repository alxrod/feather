import React, {useState} from "react";
import {ExclamationCircleIcon} from "@heroicons/react/outline"


function isFloat(n) {
  return (n === "") || parseFloat(n.match(/^-?\d*(\.\d+)?$/))>0 || parseFloat((n+"0").match(/^-?\d*(\.\d+)?$/))>0;
}


const PriceField = (props) => {

  const [price_str, setPrice] = useState(props.price_str)
  const [field_classes, setClasses] = useState("hidden")

  const handle_price_change = (e) => {
    if (isFloat(e.target.value)) {
      setPrice(e.target.value)
      setClasses("hidden")
    } else {
      setClasses("display")
    }
  }

  return (
    <>
      <div className="flex">
        <label htmlFor="price" className="mt-3 block text-base font-medium text-gray-400 mr-2">
          Price:
        </label>
        <div className="flex flex-col">
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              name="price"
              id="price"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
              value={price_str}
              disabled={props.disabled}
              onChange={handle_price_change}
              aria-describedby="price-currency"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm" id="price-currency">
                USD
              </span>
            </div>
          </div>
          <div className={"flex items-center " + field_classes}>
            <ExclamationCircleIcon className="h-4 w-4 text-red" aria-hidden="true" />
            <p className="text-red text-sm">You can only enter a dollar amount</p>
          </div>
        </div>
      </div>
    </>
  )
}


export default PriceField