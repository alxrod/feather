/* This example requires Tailwind CSS v2.0+ */
import feather_logo from "../../style/logo/feather_logo.svg";
import React, { useEffect, useState, useRef } from "react";
import { isEmail } from "validator";
import Form from "react-validation/build/form";

export default function PersonalInfo(props) {
    const form = useRef(null)
    const [usernameError, setUsernameError] = useState("")
    const [nameError, setNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const handleRegister = (e) => {
      e.preventDefault()
      form.current.validateAll();
      if (usernameError === "" && nameError === "" && emailError === "" && passwordError === "") {
        props.handleRegister(e)
      }
    }
    const handleUsernameChange = (e) => {
      props.setUsername(e.target.value)
    }
    const handleNameChange = (e) => {
      props.setName(e.target.value)
    }
    const handleEmailChange = (e) => {
      props.setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
      props.setPassword(e.target.value)
    }

    useEffect( () => {
      if (props.username.length == 0) {
        setUsernameError("The username is required")
      } else {
        setUsernameError("")
      }
    }, [props.username])

    useEffect( () => {
      if (props.name.length == 0) {
        setNameError("The full name is requried")
      } else {
        setNameError("")
      }
    }, [props.name])

    useEffect( () => {
      if (props.email.length == 0) {
        setEmailError("The email is requried")
      } else if (isEmail(props.email) == false) {
        setEmailError("This field must be a valid email")
      } else {
        setEmailError("")
      }
    }, [props.email])
    
    useEffect( () => {
      if (props.password.length < 5) {
        setPasswordError("The passsword must be at 5 characters")
      } else {
        setPasswordError("")
      }
    }, [props.password])

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

            </div>
    
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <Form className="space-y-6" ref={form} onSubmit={handleRegister}>
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
                        value={props.username}
                        onChange={handleUsernameChange}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {(usernameError !== "") && (
                        <p className="text-red text-sm">{usernameError}</p>
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
                        value={props.name}
                        onChange={handleNameChange}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {(nameError !== "") && (
                        <p className="text-red text-sm">{nameError}</p>
                      )}
                    </div>
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
                        value={props.email}
                        onChange={handleEmailChange}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {(emailError !== "") && (
                        <p className="text-red text-sm">{emailError}</p>
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
                        value={props.password}
                        onChange={handlePasswordChange}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {(passwordError !== "") && (
                        <p className="text-red text-sm">{passwordError}</p>
                      )}
                    </div>
                  </div>

    
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Create Your Account
                    </button>
                  </div>
                </Form>
                <br/>
              </div>
              
            </div>
          </div>
        </>
    )
}