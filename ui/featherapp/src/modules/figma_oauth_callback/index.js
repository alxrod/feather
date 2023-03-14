import React, {useState, useRef, useEffect} from "react";
import { Redirect } from 'react-router-dom';
import CheckButton from "react-validation/build/button";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { forgotPassword } from "../../reducers/user/dispatchers/user.dispatcher";
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom'
import feather_logo from "../../style/logo/feather_logo.svg";
import queryString from 'query-string';

import { useLocation } from 'react-router-dom';

const FigmaOAuthCallback = (props) => {
  const loc = useLocation()
  useEffect( () => {
    const { code, state } = queryString.parse(loc.search)
    console.log("Code: ", code, " State: ", state)
  }, [loc])

  return (
      <>
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-12 w-auto"
              src={feather_logo}
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Figma Oath Callback</h2>
      
          </div>
        </div>
      </>
    )
}

const mapStateToProps = ({ user }) => ({
    isLoggedIn: user.isLoggedIn,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  forgotPassword,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FigmaOAuthCallback)
