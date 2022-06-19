/* This example requires Tailwind CSS v2.0+ */
import { useState } from 'react';
import feather_logo from "../../style/logo/feather_logo.svg";
import Form from "react-validation/build/form";
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const AccountConnect = (props) => {
    const [instaError, setInstaError] = useState("")
    const [tiktokError, setTiktokError] = useState("")
    const [instaMsg, setInstaMsg] = useState("")
    const [tiktokMsg, setTiktokMsg] = useState("")

    const [instaBtnMode, setInstaBtn] = useState(false)
    const [tiktokBtnMode, setTiktokBtn] = useState(false)

    const [showInsta, setShowInsta] = useState(false)
    const [showTiktok, setShowTiktok] = useState(false)

    const handleAddInstagram = (e) => {
      e.preventDefault()
      if (props.instaName !== "") {
        props.handleAddInstagram(e).then(() => {
          setShowInsta(true)
          setInstaMsg("That is a valid account, we should have just DMed you the code")
          setInstaError("")
          setInstaBtn(true)

        }, (error) => {
          setInstaError(error)
          setInstaMsg("")
          setShowInsta(false)
          setInstaBtn(false)
        })
      }
    }

    const handleAddTiktok = (e) => {
      e.preventDefault()
      if (props.tiktokName !== "") {
        props.handleAddTiktok(e).then(() => {
          setShowTiktok(true)
          setTiktokMsg("That is a valid account, we should have just DMed you the code")
          setTiktokError("")
          setTiktokBtn(true)
        }, (error) => {
          setTiktokError(error)
          setTiktokMsg("")
          setShowTiktok(false)
          setTiktokBtn(false)
        })
      }
    }

    const handleVerifyInstagram = (e) => {
      e.preventDefault()
      if (props.instaCode.length === 6) {
        props.handleVerifyInstagram(e).then(() => {
          setShowInsta(false)
          setInstaError("")
          setInstaMsg("Congrats! Your Instagram is now linked to Feather")
        }, (error) => {
          setInstaError(error)
          setInstaMsg("")
          setInstaBtn(true)
        })
      }
    }

    const handleVerifyTiktok = (e) => {
      e.preventDefault()
      if (props.tiktokCode.length === 6) {
        props.handleVerifyTiktok(e).then(() => {
          setShowTiktok(false)
          setTiktokError("")
          setTiktokMsg("Congrats! Your Tiktok is now linked to Feather")
        }, (error) => {
          setTiktokError(error)
          setTiktokMsg("")
          setTiktokBtn(true)
        })
      }
    }

    const handleInstaClick = (e) => {
      if (instaBtnMode === false) {
        handleAddInstagram(e)
      } else {
        handleVerifyInstagram(e)
      }
    }

    const handleTiktokClick = (e) => {
      if (tiktokBtnMode === false) {
        console.log("Search click")
        handleAddTiktok(e)
      } else {
        handleVerifyTiktok(e)
        console.log("CHeck click")
      }
    }


    const handleContinue = (e) => {
      e.preventDefault()
      props.push("/contracts")
    }

    const isInt = (n) => {
      return (n === "") || parseInt(n.match(/^-?\d*(\.\d+)?$/))>0 || parseInt((n+"0").match(/^-?\d*(\.\d+)?$/))>0;
    }

    const handleInstaNameChange = (e) => {
      const val = e.target.value;
      setInstaBtn(false)
      props.setInstaName(val)
    }

    const handleTiktokNameChange = (e) => {
      const val = e.target.value;
      setTiktokBtn(false)
      props.setTiktokName(val)
    }

    const handleInstaCodeChange = (e) => {
      const val = e.target.value;
      if (isInt(val) === false) {
        setInstaError("That is not a valid verification code")
        return
      } else {
        props.setInstaCode(val)
      }
      if (val.length !== 6) {
        setInstaError("The code is 6 digits")
      } else {
        setInstaError("")
      }
    }

    const handleTiktokCodeChange = (e) => {
      const val = e.target.value;
      if (isInt(val) === false) {
        setTiktokError("That is not a valid verification code")
        return
      } else {
        props.setTiktokCode(val)
      }
      if (val.length !== 6) {
        setTiktokError("The code is 6 digits")
      } else {
        setTiktokError("")
      }
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
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Connect Your Social Accounts</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                So we can verify your identity and keep everyone safe.
              </p>
            </div>
    
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <Form className="space-y-6" action="#" method="POST">
                  <div>
                  <label htmlFor="tiktok" className="block text-sm font-medium text-gray-700">
                      Instagram Username
                    </label>
                    <div className="mt-1">
                      <div className="flex">
                        <input
                            id="insta"
                            name="insta_username"
                            value={props.instaName}
                            onChange={handleInstaNameChange}
                            type="text"
                            className="appearance-none block w-full mr-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <button
                        className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleInstaClick}
                        >{instaBtnMode ? "Check" : "Search"}</button>
                      </div>
                      <div className="mt-1">
                        {(instaError !== "") && (
                          <p className="text-sm text-red">{instaError}</p>
                        )}
                        {(instaMsg !== "") && (
                          <p className="text-sm text-green">{instaMsg}</p>
                        )}
                      </div>
                      
                        {showInsta && (
                            <div>
                                <div className="flex mt-3 justify-center">
                                    <div className="flex">
                                        <input
                                                id="insta_code"
                                                name="instaCode"
                                                value={props.instaCode}
                                                onChange={handleInstaCodeChange}
                                                type="text"
                                                required
                                                className="appearance-none block mr-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                  </div>    
                </Form>
                <Form>

                  <div className="mt-3">
                    <label htmlFor="tiktok" className="block text-sm font-medium text-gray-700">
                      Tiktok Username
                    </label>
                    <div className="mt-1">
                      <div className="flex">
                        <input
                            id="tiktok"
                            name="tiktok_username"
                            value={props.tiktokName}
                            onChange={handleTiktokNameChange}
                            type="text"
                            required
                            className="appearance-none block w-full mr-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <button
                        className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleTiktokClick}
                        >{tiktokBtnMode ? "Check" : "Search"}</button>
                      </div>
                      <div className="mt-1">
                        {(tiktokError !== "") && (
                          <p className="text-sm text-red">{tiktokError}</p>
                        )}
                        {(tiktokMsg !== "") && (
                          <p className="text-sm text-green">{tiktokMsg}</p>
                        )}
                      </div>

                        {showTiktok && (
                            <div>
                                <div className="flex mt-3 justify-center">
                                    <div className="flex">
                                        <input
                                                id="tiktokCode"
                                                name="tiktokCode"
                                                value={props.tiktokCode}
                                                onChange={handleTiktokCodeChange}
                                                type="text"
                                                required
                                                className="appearance-none block mr-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                  </div>
                  <br/>
    
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={handleContinue}
                    >
                      Finish Set up later
                    </button>
                  </div>
                </Form>
                <br/>
              </div>
              
            </div>
          </div>
        </>
    )
}

const mapStateToProps = ({  }) => ({
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  push
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountConnect)