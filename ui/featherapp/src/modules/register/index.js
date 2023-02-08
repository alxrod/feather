import React, {useState, useRef, useEffect} from "react";
import { Redirect } from 'react-router-dom';
import feather_logo from "../../style/logo/feather_logo.svg";

import { LockClosedIcon } from '@heroicons/react/solid'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { 
    register,
} from "../../reducers/user/dispatchers/user.dispatcher";

import {
  ADMIN_TYPE,
  BUYER_TYPE,
  WORKER_TYPE,
  BOTH_TYPE,
} from "../../services/user.service.js";

import {
    toggleFromRegister
} from "../../reducers/site/site.reducer";

import { push } from 'connected-react-router'

const Register = (props) => {

    const [registerLocked, setRegisterLocked] = useState(true)
    const [devPassword, setDevPassword] = useState("")
    const [devMsg, setDevMsg] = useState("")
    const checkDevPassword = () => {
      if (devPassword === "5f9de249-a2e0-48d8-ba93-cbdda25f1dac") {
        setRegisterLocked(false)
      } else {
        setDevMsg("Feather is in testing right now. If you want to join, come back March 1st. We'd love to have you.")
      }
    }

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    
    const [name, setName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const [dob, setDOB] = useState("")
    const [phone, setPhone] = useState("+1")
    const [userType, setUserType] = useState(WORKER_TYPE)

    const [phoneError, setPhoneError] = useState("")
    const [dobError, setDobError] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [nameError, setNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [generalError, setGenError] = useState("")
    const [errorExists, setErrorExists] = useState(false)

    

    const handleUsername = (e) => {
        const newUsername = e.target.value
        setUsername(newUsername)
        if (newUsername.length === 0) {
            setUsernameError("You must provide a username")
        } else {
            setUsernameError("")
        }
    }

    const handleName = (e) => {
        const newName = e.target.value
        setName(newName)
        const seped = newName.split(" ")
        if (seped.length === 0) {
          setNameError("You must provide a name")
        } else if (seped.length === 1) {
          setNameError("You must provide a first and last name")
        } else {
          setFirstName(seped[0])
          setLastName(seped[seped.length - 1])
          setNameError("")
        }
    }

    const handlePassword = (e) => {
        const newPassword = e.target.value
        setPassword(newPassword)
        if (newPassword.length < 5) {
            setPasswordError("Your password must be at least 5 characters")
        } else {
            setPasswordError("")
        }
    }

    const handleEmail = (e) => {
        const newEmail = e.target.value
        setEmail(newEmail)
        if (!newEmail.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            setEmailError("You haven't entered a real email")
        } else {
            setEmailError("")
        }
    }

    const handleDOB = (e) => {
      const date_info = e.target.value.split("-")
      setDOB(e.target.value)
      if (date_info.length !== 3) {
        setDobError("Please enter your birthday")
      }
    }
    

    const handlePhone = (e) => {
      const num = e.target.value
      setPhone(num)
      if (!num.match(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g)) {
        setPhoneError("Please provide a real number")
      } else if(num.length < 10 || num.length > 13) {
        setPhoneError("Please provide a full number")
      } else {
        setPhoneError("")
      }
    }

    const handleType = (e) => {
      setUserType(e.target.value)
    }
    useEffect( () => {
      console.log("Switching defalt val to ", props.defaultRegisterRole)
      setUserType(props.defaultRegisterRole)
    }, [props.defaultRegisterRole])

    useEffect(()=> {
        if (
            email === "" ||
            username === "" ||
            password === "" ||
            name === "" ||
            phone === "" ||
            dob === "") {
            setGenError("Please fill out all fields")
            setErrorExists(true)
        } else if (errorExists && 
            emailError === "" &&
            passwordError === "" &&
            usernameError === "" &&
            nameError === "" &&
            dobError === "" &&
            phoneError === "") {
            setErrorExists(false)
        } else {
            setGenError("")
            setErrorExists(true)
        }
    }, [emailError, nameError, usernameError, passwordError, phoneError, dobError])

    const handleRegister = (e) => {
        e.preventDefault()
        const inf = dob.split("-")
        const date = {
          day: inf[2],
          month: inf[1],
          year: inf[0]
        }
        props.register(username, firstName, lastName, email, password, phone, date, userType).then( () => {

            props.toggleFromRegister(true)
            props.push("/profile")
        }, err => {
            setGenError(err)
            setErrorExists(true)
        })
    
    }

    return (
        <>
          <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <img
                className="mx-auto h-12 w-auto"
                src={feather_logo}
                alt="Workflow"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome Aboard!</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                We're so excited to have you
              </p>
              <p className="mt-2 text-center text-sm text-red-400">
                {generalError}
              </p>

            </div>
    
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                {registerLocked ? (
                  <div className="h-200 flex flex-col justify-center items-center">
                    <LockClosedIcon className="text-gray-500 w-16 h-16"/>
                    <br/>
                    <input
                      id="dev_password"
                      name="dev_password"
                      type="text"
                      autoComplete="dev_password"
                      value={devPassword}
                      onChange={(e) => setDevPassword(e.target.value)}
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
                ) : (
                  <form className="space-y-6" onSubmit={handleRegister}>
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                      </label>
                      <div className="mt-1">
                        <input
                          id="username"
                          name="username"
                          type="text"
                          autoComplete="username"
                          value={username}
                          onChange={handleUsername}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary4 focus:border-primary4 sm:text-sm"
                        />
                        {(usernameError !== "") && (
                          <p className="text-red-400 text-sm">{usernameError}</p>
                        )}
                      </div>
                    </div>   
                    
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <div className="mt-1">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={name}
                          onChange={handleName}
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary4 focus:border-primary4 sm:text-sm"
                        />
                        {(nameError !== "") && (
                          <p className="text-red-400 text-sm">{nameError}</p>
                        )}
                      </div>
                    </div>   
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 mb-1">
                        Role
                      </label>
                      <div className="mt-1 sm:col-span-2 sm:mt-0">
                        <select
                          id="type"
                          name="type"
                          autoComplete="user-type"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary4 focus:ring-primary4 sm:text-sm"
                          onChange={handleType}
                          value={userType}
                        >
                          <option value={WORKER_TYPE} >Worker</option>
                          <option value={BUYER_TYPE} >Buyer</option>
                          <option value={BOTH_TYPE} >Both</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 flex items-center">
                          <label htmlFor="country" className="sr-only">
                            Country
                          </label>
                          <select
                            id="country"
                            name="country"
                            autoComplete="country"
                            disabled
                            className="h-full rounded-md border-transparent bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:border-primary4 focus:ring-primary4 sm:text-sm"
                          >
                            <option>US</option>
                          </select>
                        </div>
                        <input
                          type="text"
                          name="phone-number"
                          id="phone-number"
                          className="block w-full rounded-md border-gray-300 pl-16 focus:border-primary4 focus:ring-primary4 sm:text-sm"
                          value={phone}
                          onChange={handlePhone}
                        />
                        
                      </div>
                      {(phoneError !== "") && (
                        <p className="text-red-400 text-sm">{phoneError}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="account-number" className="block text-sm font-medium text-gray-700">
                        Date of Birth
                      </label>
                      <div className="relative mt-1 rounded-md shadow-sm">
                        <input 
                          type="date" 
                          className="
                            mt-1
                            block
                            w-full
                            rounded-md
                            border-gray-300
                            shadow-sm
                            focus:border-primary3 focus:ring focus:ring-primary2 focus:ring-opacity-50
                            text-gray-500
                          "
                          value={dob}
                          onChange={handleDOB}/>
                      </div>
                      {(dobError !== "") && (
                        <p className="text-red-400 text-sm">{dobError}</p>
                      )}
                    </div>
                  
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={email}
                          onChange={handleEmail}
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary4 focus:border-primary4 sm:text-sm"
                        />
                        {(emailError !== "") && (
                          <p className="text-red-400 text-sm">{emailError}</p>
                        )}
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
                          onChange={handlePassword}
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary4 focus:border-primary4 sm:text-sm"
                        />
                        {(passwordError !== "") && (
                          <p className="text-red-400 text-sm">{passwordError}</p>
                        )}
                      </div>
                    </div>

      
                    <div>
                      <button
                        type="submit"
                        disabled={errorExists}
                        className={"w-full flex justify-center py-2 px-4 "+
                                  "border border-transparent rounded-md "+
                                  "shadow-sm text-sm font-medium text-white "+
                                  "bg-primary5 hover:bg-primary6 focus:outline-none "+
                                  "focus:ring-2 focus:ring-offset-2 focus:ring-primary4 "+
                                  "disabled:bg-primary3"}
                      >
                        Create Your Account
                      </button>
                    </div>
                  </form>
                )}
                <br/>
              </div>
              
            </div>
          </div>
        </>
    )

   
}

const mapStateToProps = ({ user }) => ({
    user: user.user,
    defaultRegisterRole: user.defaultRegisterRole,
    redirectLink: user.redirectLink
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    register,
    push,
    toggleFromRegister,

}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)
