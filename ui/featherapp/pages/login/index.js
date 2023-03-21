import React, {useState, useRef, useEffect} from "react";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import Link from 'next/link'
import LoginCard from "../../components/auth/login_card";

import feather_logo from "../../public/feather_logo.svg";
import Image from 'next/image'

const Login = (props) => {

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          className="mx-auto h-12 w-auto"
          src={feather_logo}
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href="/register" className="font-medium text-primary5 hover:text-primary4">
            Join us completely for free!
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginCard redirectLink={"/contracts"}/>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
    isLoggedIn: user.isLoggedIn,
    message: user.message,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
