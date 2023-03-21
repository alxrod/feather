import React, {useState, useRef, useEffect} from "react";
import ApiService from "../api.service"
import { RpcError } from "@protobuf-ts/runtime-rpc"
import { 
  UserSigninResponse
} from "../proto/communication/user";

import {
  Timestamp
} from "../proto/google/protobuf/timestamp"


const LoginCard = (props: any) => {

  const [usernameOrEmail, setUsernameOrEmail] = useState(props.defaultEmail ? props.defaultEmail : "")
  const [password, setPassword] = useState("")
  const [genError, setGenError] = useState("")
  const [remember, toggleRemember] = useState(true)

  const onChangeUsernameOrEmail = (e: any) => {
    setUsernameOrEmail(e.target.value)
  }
  const onChangePassword = (e: any) => {
      setPassword(e.target.value)
  }

  const handleLogin = (e: any) => {
    ApiService.login(
      usernameOrEmail, 
      password
    ).then(
      (resp: UserSigninResponse) => {
        // Somehwere in this message send is a WASM out of bounds error but doesnt seem to change my code
        
        const timeout = Timestamp.toDate(resp.tokenTimeout ? resp.tokenTimeout : Timestamp.now())
        props.signinSuccess(resp.user?.id, resp.token, timeout, usernameOrEmail, password);
      },
      (err: RpcError) => {
        setGenError(err.message)
      }
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Log in to Connect Contract</h1>
      {!(genError === "") && (
        <p className="text-red-400">{genError}</p>
      )}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username / Email
        </label>
        <div className="mt-1">
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            value={usernameOrEmail}
            onChange={onChangeUsernameOrEmail}
            required
            className={
              `appearance-none block w-full px-3 py-2 border border-gray-300 
              rounded-md shadow-sm placeholder-gray-400 focus:outline-none
              focus:ring-primary4 focus:border-primary4 sm:text-sm `}
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={onChangePassword}
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary4 focus:border-primary4 sm:text-sm"
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={handleLogin}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary5 hover:bg-primary6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary4"
        >
          Sign in
        </button>
      </div>
    </div>
  )
}

export default LoginCard