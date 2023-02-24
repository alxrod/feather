import { LockClosedIcon } from '@heroicons/react/solid'
import React, {useState, useRef, useEffect} from "react";

const RegisterLock = (props) => {
  const [devPassword, setDevPassword] = useState("")
  const [devMsg, setDevMsg] = useState("")
  const checkDevPassword = () => {
    if (devPassword === "5f9de249-a2e0-48d8-ba93-cbdda25f1dac") {
      props.setRegisterLocked(false)
    } else {
      setDevMsg("Feather is in testing right now. If you want to join, come back March 1st. We'd love to have you.")
    }
  }

  return (
    <div className="h-200 flex flex-col justify-center items-center">
      <LockClosedIcon className="text-gray-500 w-16 h-16"/>
      <br/>
      <input
        id="dev_password"
        name="dev_password"
        type="text"
        autoComplete="dev_password"
        value={devPassword}
        onChange={setDevPassword}
        className="appearance-none block w-full px-3 py-2 border border-red-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
      />
      <br/>
      <p className="text-xs text-gray-400 text-center">{devMsg}</p>
      <br/>
      <div>
        <button
          type="submit"
          className={"w-full flex justify-center py-2 px-4 "+
                    "border border-transparent rounded-md "+
                    "shadow-sm text-sm font-medium text-white "+
                    "bg-red-500 hover:bg-red-600 focus:outline-none "+
                    "focus:ring-2 focus:ring-offset-2 focus:ring-red-500 "+
                    "disabled:bg-red-400"}
          onClick={checkDevPassword}
        >
          Unlock Registration
        </button>
      </div>
    </div>
  )
}

export default RegisterLock