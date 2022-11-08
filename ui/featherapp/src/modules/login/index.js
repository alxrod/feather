import React, {useState, useRef, useEffect} from "react";
import { Redirect } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { login } from "../../reducers/user/user.reducer";
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom'

import feather_logo from "../../style/logo/feather_logo.svg";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}

const Login = (props) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [genError, setGenError] = useState("")

    const form = useRef(null)
    
    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        form.current.validateAll();
        if (username !== "" && password !== "") {
            props.login(username, password)
            .then(() => {
            })
            .catch((error) => {
              console.log("Caught error")
              setGenError(error)
            })
        }
    }
    
    useEffect( () => {
      console.log(props.router)
    }, [props.router])
    
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
                <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Join us completely for free!
                </Link>
              </p>
            </div>
    
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <Form ref={form}>
                  {!(genError === "") && (
                    <p className="text-red">{genError}</p>
                  )}
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <div className="mt-1">
                      <Input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        value={username}
                        onChange={onChangeUsername}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
    
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1">
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={onChangePassword}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
    
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                      </label>
                    </div>
    
                    <div className="text-sm">
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Forgot your password?
                      </a>
                    </div>
                  </div>
    
                  <div>
                    <button
                      type="submit"
                      onClick={handleLogin}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign in
                    </button>
                  </div>
                </Form>
    
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
    login,
    push,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
