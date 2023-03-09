import React, {useState, useRef, useEffect} from "react";
import feather_logo from "../../../style/logo/feather_logo.svg";

import RegisterLock from "./register_lock"

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { 
    register,
} from "../../../reducers/user/dispatchers/user.dispatcher";

import {
    toggleFromRegister
} from "../../../reducers/site/site.reducer";

import { push } from 'connected-react-router'
import RegisterCard from "./register_card";

const Register = (props) => {

    const [registerLocked, setRegisterLocked] = useState(false)

    const [serverError, setServerError] = useState("")

    const onSubmit = (values) => {
      const splitNames = values.fullName.split(" ")
      const firstName = splitNames[0]
      const lastName = splitNames[splitNames.length - 1]
      props.register(values.username, firstName, lastName, values.email, values.password).then( () => {
          props.toggleFromRegister(true)
          props.push("/setup-profile-pic")
      }, err => {
          setServerError(err)
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
                or <a className="text-primary4 font-semibold" href="#" onClick={() => props.push("/login")}>log in here</a>
              </p>
              {/* <p className="mt-2 text-center text-sm text-red-400">
                {mainMessage}
              </p> */}

            </div>
    
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                {registerLocked ? (
                  <RegisterLock
                    setRegisterLocked={setRegisterLocked}
                  />
                ) : (
                  <RegisterCard onSubmit={onSubmit} serverError={serverError}/>
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
