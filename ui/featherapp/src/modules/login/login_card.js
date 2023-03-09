import React, {useState, useRef, useEffect} from "react";

import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import { login } from "../../reducers/user/dispatchers/user.dispatcher";
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom'


import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

const required = (value) => {
  if (!value) {
      return (
          <div className="alert alert-danger" role="alert">
              This field is required!
          </div>
      )
  }
}

const LoginCard = (props) => {

  const [usernameOrEmail, setUsernameOrEmail] = useState(props.defaultEmail ? props.defaultEmail : "")
  const [password, setPassword] = useState("")
  const [genError, setGenError] = useState("")
  const [remember, toggleRemember] = useState(true)

  const form = useRef(null)
  
  const onChangeUsernameOrEmail = (e) => {
    setUsernameOrEmail(e.target.value)
  }
  const onChangePassword = (e) => {
      setPassword(e.target.value)
  }

  const handleLogin = (e) => {
      e.preventDefault()
      form.current.validateAll();
      if (usernameOrEmail !== "" && password !== "") {
          props.login(usernameOrEmail, password, remember)
          .then(() => {
            props.push(props.redirectLink)
          })
          .catch((error) => {
            console.log("Caught error")
            setGenError(error)
          })
      }
  }

  return (
    <Form ref={form}>
      {!(genError === "") && (
        <p className="text-red-400">{genError}</p>
      )}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username / Email
        </label>
        <div className="mt-1">
          <Input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            value={usernameOrEmail}
            disabled={props.defaultEmail ? true : false}
            onChange={onChangeUsernameOrEmail}
            required
            className={
              `appearance-none block w-full px-3 py-2 border border-gray-300 
              rounded-md shadow-sm placeholder-gray-400 focus:outline-none
              focus:ring-primary4 focus:border-primary4 sm:text-sm ` + (props.defaultEmail ? " text-gray-400" : "")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1">
          <Input
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

      <div className="flex items-center justify-between my-4">
        <div className="flex items-center">
          <Input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            value={remember}
            checked={remember}
            onChange={(e) => {
              console.log("test: ", e.target)
              toggleRemember(!remember)
            }}
            className="h-4 w-4 text-primary5 focus:ring-primary4 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <Link to="/forgot-password" className="font-medium text-primary5 hover:text-primary4">
            Forgot your password?
          </Link>
        </div>
      </div>

      <div>
        <button
          type="submit"
          onClick={handleLogin}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary5 hover:bg-primary6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary4"
        >
          Sign in
        </button>
      </div>
    </Form>
  )
}

const mapStateToProps = ({ user, router }) => ({
  isLoggedIn: user.isLoggedIn,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login,
  push,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginCard)
