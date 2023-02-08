import React, {useState, useRef, useEffect} from "react";
import { Redirect } from 'react-router-dom';
import CheckButton from "react-validation/build/button";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { forgotPassword } from "../../reducers/user/dispatchers/user.dispatcher";
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom'
import feather_logo from "../../style/logo/feather_logo.svg";

const ForgotPassword = (props) => {

    const [email, setEmail] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    
    const isValidEmail = (email) =>{
      return /\S+@\S+\.\S+/.test(email);
    }

    const onEmailChange = (e) => {
      let input = e.target.value
      if (isValidEmail(input)) {
        setErrorMsg("")
      }
      setEmail(input)
    }

    const handleReset = (e) => {
        e.preventDefault()
        if (isValidEmail(email)) {
          props.forgotPassword(email).then(
            () => {
              console.log("Successful sending email")
            },
            (error) => {
              setErrorMsg(error)
            }
          )
        } else {
          setErrorMsg("please provide a valid email")
        }
    }
    
    if (props.isLoggedIn) {
      return (
        <Redirect to={"/contracts"}/>
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
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot your password?</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Just enter your account's email and we will send a reset link
              </p>
            </div>
    
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                  <div>

                    {errorMsg !== "" ? (
                      <p className="text-center mb-2 text-red-400 text-xs">{errorMsg}</p>
                    ) : (
                      <div className="h-4 mb-2"></div>
                    )}
                    
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="text"
                        placeholder="email@gmail.com"
                        autoComplete="email"
                        value={email}
                        onChange={onEmailChange}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary4 focus:border-primary4 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="h-8"></div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      onClick={handleReset}
                      className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary5 hover:bg-primary6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary4"
                    >
                      Send Reset Link
                    </button>
                  </div>
    
              </div>
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
)(ForgotPassword)
