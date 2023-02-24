import React, {useState, useRef, useEffect} from "react";
import { Redirect } from 'react-router-dom';
import feather_logo from "../../../style/logo/feather_logo.svg";

import RegisterLock from "./register_lock"

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { 
    register,
} from "../../../reducers/user/dispatchers/user.dispatcher";

import {
  ADMIN_TYPE,
  BUYER_TYPE,
  WORKER_TYPE,
  BOTH_TYPE,
} from "../../../services/user.service.js";

import {
    toggleFromRegister
} from "../../../reducers/site/site.reducer";

import { push } from 'connected-react-router'

import { Formik } from 'formik';
import * as Yup from 'yup';

import parse from "date-fns/parse";

const Register = (props) => {

    const [registerLocked, setRegisterLocked] = useState(false)

    const inputClassNames = `appearance-none mt-1 block w-full px-3 py-2 
                            border border-gray-300 rounded-md shadow-sm 
                            placeholder-gray-400 focus:outline-none focus:ring-primary4 
                            focus:border-primary4 sm:text-sm`
    const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    const fullNameRegExp = /^([a-zA-Zà-úÀ-Ú]{2,})+\s+([a-zA-Zà-úÀ-Ú\s]{2,})+$/im

    const [serverError, setServerError] = useState("")
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
                  <Formik
                    initialValues={{
                      username: "",
                      password: "",
                      fullName: "",
                      email: "",
                      phone: "",
                      dob: ""
                    }}
                    validationSchema={Yup.object({
                      username: Yup.string()
                        .required('Required'),
                      password: Yup.string()
                        .min(5, 'Must be 5 characters or more')
                        .required('Required'),
                      fullName: Yup.string()
                        .matches(fullNameRegExp, "Please provide your full name")
                        .required('Required'),
                      email: Yup.string().email('Invalid email address').required('Required'),
                      phone: Yup.string()
                        .matches(phoneRegExp, 'Phone number is not valid')
                        .required('Required'),
                      dob: Yup.date()
                        .transform(function (value, originalValue) {
                          if (this.isType(value)) {
                            return value;
                          }
                          const result = parse(originalValue, "yyyy-MM-dd", new Date());
                          return result;
                        })
                        .typeError("please enter a valid date")
                        .required("Required")
                        .max("2005-01-01", "You are too young for feather")
                    })}
                    onSubmit={(values) => {
                      const inf = values.dob.split("-")
                      const date = {
                        day: inf[2],
                        month: inf[1],
                        year: inf[0]
                      }
                      const splitNames = values.fullName.split(" ")
                      const firstName = splitNames[0]
                      const lastName = splitNames[splitNames.length - 1]
                      props.register(values.username, firstName, lastName, values.email, values.password, values.phone, date).then( () => {
                          props.toggleFromRegister(true)
                          props.push("/setup-profile-pic")
                      }, err => {
                          setServerError(err)
                      })
                    }}
                  >
                    {formik => (
                      <form onSubmit={formik.handleSubmit}>
                        {serverError !== "" && <p className="text-red-400 text-sm text-center">{serverError}</p> }
                        <div className="mb-2">
                          <div className="flex flex-wrap justify-between mb-1">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            {formik.touched.username ? <p className="text-red-400 text-sm">{formik.errors.username}</p> : null}
                          </div>
                          <input
                            id="username"
                            name="username"
                            type="text"
                            {...formik.getFieldProps('username')}
                            className={inputClassNames}
                          />
                        </div>

                        <div className="mb-4">
                          <div className="flex flex-wrap justify-between mb-1">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            {formik.touched.email ? <p className="text-red-400 text-sm">{formik.errors.email}</p> : null}
                          </div>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            {...formik.getFieldProps('email')}
                            className={inputClassNames}
                          />
                        </div>

                        <div className="mb-4">
                          <div className="flex flex-wrap justify-between mb-1">
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                            {formik.touched.fullName ? <p className="text-red-400 text-sm">{formik.errors.fullName}</p> : null}
                          </div>
                          <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            {...formik.getFieldProps('fullName')}
                            className={inputClassNames}
                          />
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex flex-wrap justify-between mb-1">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            {formik.touched.password ? <p className="text-red-400 text-sm">{formik.errors.password}</p> : null}
                          </div>
                            <input
                            id="password"
                            name="password"
                            type="password"
                            {...formik.getFieldProps('password')}
                            className={inputClassNames}
                          />
                        </div>
                        

                        <div className="mb-4">
                          <div className="flex flex-wrap justify-between mb-1">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            {formik.touched.phone ? <p className="text-red-400 text-sm">{formik.errors.phone}</p> : null}
                          </div>
                            <input
                            id="phone"
                            name="phone"
                            type="phone"
                            {...formik.getFieldProps('phone')}
                            className={inputClassNames}
                          />
                        </div>

                        <div className="mb-4">
                          <div className="flex flex-wrap justify-between mb-1">
                            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                            {formik.touched.dob ? <p className="text-red-400 text-sm">{formik.errors.dob}</p> : null}
                          </div>
                            <input
                            id="dob"
                            name="dob"
                            type="date"
                            {...formik.getFieldProps('dob')}
                            className={inputClassNames}
                          />
                        </div>

                        <br/>
                        <button
                          type="submit"
                          className={"w-full flex justify-center py-2 px-4 "+
                                    "border border-transparent rounded-md "+
                                    "shadow-sm text-sm font-medium text-white "+
                                    "bg-primary5 hover:bg-primary6 focus:outline-none "+
                                    "focus:ring-2 focus:ring-offset-2 focus:ring-primary4 "+
                                    "disabled:bg-primary3 " 
                                    }
                        >
                          Create Your Account
                        </button>
                      </form>
                    )}
                  </Formik>
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
