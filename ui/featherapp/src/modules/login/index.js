import React, {useState, useRef, useEffect} from "react";
import { Redirect } from 'react-router-dom';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom'
import LoginCard  from "./login_card";
import feather_logo from "../../style/logo/feather_logo.svg";

const Login = (props) => {
    
    const onLogin = () => {
      props.push(props.redirectLink)
    }

    if (props.isLoggedIn) {
      console.log("Redirect link")
      console.log(props.redirectLink)
      return (
        <Redirect to={props.redirectLink}/>
      )
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
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{' '}
                <Link to="/register" className="font-medium text-primary5 hover:text-primary4">
                  Join us completely for free!
                </Link>
              </p>
            </div>
    
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <LoginCard onLogin={onLogin}/>
              </div>
            </div>
          </div>
        </>
      )
}

const mapStateToProps = ({ user, router }) => ({
    isLoggedIn: user.isLoggedIn,
    message: user.message,
    redirectLink: user.redirectLink,
    router: router
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    push,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
