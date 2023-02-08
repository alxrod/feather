import React, {useState, useRef, useEffect} from "react";
import { Redirect } from 'react-router-dom';
import CheckButton from "react-validation/build/button";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { confirmResetId, changePassword} from "../../reducers/user/dispatchers/user.dispatcher";
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom'
import feather_logo from "../../style/logo/feather_logo.svg";

const ResetPassword = (props) => {

    const { params: { resetId } } = props.match;
    const [newPassword1, setNewPassword1] = useState("")
    const [newPassword2, setNewPassword2] = useState("")

    const [errorMsg, setErrorMsg] = useState("")

    useEffect(() => {
      if (resetId === "") {
        props.push("/unknown")
      } else {
        props.confirmResetId(resetId).then(
          (valid) => {
            if (!valid) {
              props.push("/unknown")
            }
          }, 
          (err) => {
            props.push("/unknown")
          }
        )
      }
    }, [resetId])
    
    const onPassword1Change = (e) => {
      setNewPassword1(e.target.value)
    }

    const onPassword2Change = (e) => {
      setNewPassword2(e.target.value)
    }

    const handleChangePassword = (e) => {
        e.preventDefault()
        if (newPassword1 === newPassword2) {
          setErrorMsg("")
          props.changePassword(resetId, newPassword1)
          .then(() => {
          })
          .catch((error) => {
            setErrorMsg(error)
          })
        } else {
          setErrorMsg("make sure your passwords match")
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
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset your password</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Just enter in your new one
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
                        id="password1"
                        name="password1"
                        type="password"
                        placeholder="new password"
                        value={newPassword1}
                        onChange={onPassword1Change}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary4 focus:border-primary4 sm:text-sm"
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        id="password2"
                        name="password2"
                        type="password"
                        placeholder="confirm password"
                        value={newPassword2}
                        onChange={onPassword2Change}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary4 focus:border-primary4 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="h-8"></div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      onClick={handleChangePassword}
                      className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary5 hover:bg-primary6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary4"
                    >
                      Reset Password
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
  confirmResetId,
  changePassword,
  push,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPassword)
