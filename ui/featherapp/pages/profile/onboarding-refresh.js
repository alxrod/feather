import React, {useState, useRef, useEffect} from "react";
import feather_logo from "../../public/feather_logo.svg";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { 
    getAccountOnboardLink
} from "../../reducers/stripe/dispatchers/stripe.setup.dispatcher";
import Image from "next/image"

const AccountOnboardingRefresh = (props) => {

  useEffect(() => {
    props.getAccountOnboardLink().then(
      (url) => {
        window.location.replace(url);
      },
      (error) => {
        console.log("Acquiring link failed because ", error)
      }
    )
  }, [])

  return (
      <>
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Image
              className="mx-auto h-12 w-auto"
              src={feather_logo}
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Give us a second...</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              We're having trouble communicating with our payment provider
            </p>
          </div>
        </div>
      </>
  )
}

const mapStateToProps = ({ }) => ({
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getAccountOnboardLink
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountOnboardingRefresh)
