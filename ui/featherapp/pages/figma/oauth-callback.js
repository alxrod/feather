import React, {useState, useRef, useEffect} from "react";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { connectFigma } from "../../reducers/user/dispatchers/user.dispatcher";

import feather_logo from "../../public/feather_logo.svg";
import queryString from 'query-string';

import { useRouter } from "next/router"
import Image from "next/image"

const FigmaOAuthCallback = (props) => {
  const router = useRouter()

  useEffect( () => {
    const { code, state } = router.query
    const old_state = sessionStorage.getItem("figmaState")
    if (old_state !== "") {
      if (state !== old_state) {
        router.push(props.figmaRedirect)
        return
      }
      props.connectFigma(code).then(
        () => {
          router.push(props.figmaRedirect)
        },
        (error) => {
          router.push(props.figmaRedirect)
        }
      )
    }
    
  }, [router.pathname])

  return (
      <>
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Image
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
    figmaRedirect: site.figmaRedirect
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  connectFigma,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FigmaOAuthCallback)
