import React, {useState, useRef, useEffect} from "react";
import { Redirect } from 'react-router-dom';
import feather_logo from "../../style/logo/feather_logo.svg";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { 
    getAccountOnboardLink
} from "../../reducers/stripe/dispatchers/stripe.setup.dispatcher";

import { push } from 'connected-react-router'


const AccountOnboardingRefresh = (props) => {
  const [redirectUrl, setRedirectUrl] = useState("")
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
            <img
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

const mapStateToProps = ({ user }) => ({
    user: user.user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    push,
    getAccountOnboardLink
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountOnboardingRefresh)
