import React, {useState, useRef, useEffect} from "react";
import { Redirect } from 'react-router-dom';
import feather_logo from "../../style/logo/feather_logo.svg";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { 
        register,
        addPayment,
} from "../../reducers/user/dispatchers/user.dispatcher";
import { push } from 'connected-react-router'

// const handleRegister = (e) => {
//     return new Promise((resolve, reject) => {
//         console.log("Registering: ")
//         props.register(username, name, email, password).then( () => {
//             console.log("Success")
//             resolve()
//         }, err => {
//             console.log("Error: " + err)
//             reject(err)
//         })
//     })
// }

// const handleAddPayment = (e) => {
//     return new Promise((resolve, reject) => {
//         if (props.user.id === "") {
//             reject("You must log in before trying to setup a payment method")
//         }
//         console.log("Setting up payment")
//         props.addPayment(props.user.id, cardNumber, cardHolder, month, year, zip, cvv).then( () => {
//             // console.log("Successfully setup Payment")
//             resolve()
//         }, err => {
//             // console.log("Payment Setup Error: " + err)
//             reject(err)
//         })
//     })
// }

const Register = (props) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")

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
        if (newName.length === 0) {
            setNameError("You must provide a name")
        } else {
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

    useEffect(()=> {
        if (
            email === "" ||
            username === "" ||
            password === "" ||
            name === "") {
            setGenError("Please fill out all fields")
            setErrorExists(true)
        } else if (errorExists && 
            emailError === "" &&
            passwordError === "" &&
            usernameError === "" &&
            nameError === "") {
            setErrorExists(false)
        } else {
            setGenError("")
            setErrorExists(true)
        }
    }, [emailError, nameError, usernameError, passwordError])

    const handleRegister = (e) => {
        e.preventDefault()
        props.register(username, name, email, password).then( () => {
            props.push("/")
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
              <p className="mt-2 text-center text-sm text-red">
                {generalError}
              </p>

            </div>
    
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
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
                        value={name}
                        onChange={handleName}
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
                        value={email}
                        onChange={handleEmail}
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
                        value={password}
                        onChange={handlePassword}
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
                      disabled={errorExists}
                      className={"w-full flex justify-center py-2 px-4 "+
                                "border border-transparent rounded-md "+
                                "shadow-sm text-sm font-medium text-white "+
                                "bg-indigo-600 hover:bg-indigo-700 focus:outline-none "+
                                "focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "+
                                "disabled:bg-indigo-400"}
                    >
                      Create Your Account
                    </button>
                  </div>
                </form>
                <br/>
              </div>
              
            </div>
          </div>
        </>
    )

   
}

const mapStateToProps = ({ user }) => ({
    message: user.message,
    user: user.user,
    redirectLink: user.redirectLink
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    register,
    push,
    addPayment,

}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)
