import React, {useState, useRef, useEffect} from "react";
import { Redirect } from 'react-router-dom';
import CheckButton from "react-validation/build/button";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { connectFigma } from "../../reducers/user/dispatchers/user.dispatcher";
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom'
import feather_logo from "../../style/logo/feather_logo.svg";
import queryString from 'query-string';

import { useLocation } from 'react-router-dom';

const FigmaOAuthCallback = (props) => {
  const loc = useLocation()
  useEffect( () => {
    const { code, state } = queryString.parse(loc.search)
    if (props.figmaState !== "") {
      if (state !== props.state) {
        console.log("ERROR: returned state ", state, " does not match initial state ", props.figmaState)
        props.push(props.figmaRedirect)
        return
      }
      console.log("Code: ", code, " State: ", state)
      props.connectFigma(code).then(
        () => {
          props.push(props.figmaRedirect)
        },
        (error) => {
          console.log("ERROR WAS: ", error)
          props.push(props.figmaRedirect)
        }
      )
    }
    
  }, [loc, props.figmaState])

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

const mapStateToProps = ({ user, site }) => ({
    isLoggedIn: user.isLoggedIn,
    figmaState: site.figmaState,
    figmaRedirect: site.figmaRedirect
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  connectFigma,
  push,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FigmaOAuthCallback)
