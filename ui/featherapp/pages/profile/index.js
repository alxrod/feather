import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'


import AccountInfo from "../../components/profile/account_page/account_info";
import PaymentInfo from "../../components/profile/account_page/payment_info";

import ProfilePhotoUpload from "../../components/profile/profile_photo/profile_photo_upload.js"

import { setFigmaParams } from "../../reducers/site/site.reducer"

import Image from "next/image"

const Profile = (props) => {
  const [showProfPic, setShowProfPic] = useState(false)
  const [profNoExist, setProfNoExist] = useState(false)
  const [picUrl, setPicUrl] = useState("")

  const [state, setState] = useState((Math.random() + 1).toString(36).substring(2));
  useEffect(() => {
    setState((Math.random() + 1).toString(36).substring(2))
  },[])

  const figmaLink = "https://www.figma.com/oauth?"+
    "client_id="+process.env.NEXT_PUBLIC_FIGMA_ID+"&"+
    "redirect_uri="+(process.env.NEXT_PUBLIC_DEBUG == "true" ? "http://localhost:3000" : process.env.NEXT_PUBLIC_SITE_BASE)+"/figma/oauth-callback&"+
    "scope=file_read&"+
    "state="+state+"&"+
    "response_type=code"

  useEffect( () => {
    if (props.user && props.user.profilePhoto?.cacheUrl) {
      setPicUrl(props.user.profilePhoto.cacheUrl)
      setShowProfPic(true)
    } else {
      setProfNoExist(true)
    }
  }, [props.user, props.user?.profilePhoto?.cacheUrl])

  return (
    <div>
      <br/>
      <div className="flex">
        <div className="p-5 w-full flex flex-col items-center">
          {showProfPic ? (
            <>
              <Image 
                className={"h-[200px] w-[200px] rounded-md object-cover"}
                src={picUrl}
              />
              
              <button 
                className={
                  `inline-flex items-center px-4 
                  py-2 border border-transparent 
                  text-sm font-medium rounded-md 
                  shadow-sm text-white bg-primary5 
                  hover:bg-primary6 focus:outline-none 
                  focus:ring-2 focus:ring-offset-2 
                  focus:ring-primary4 mt-2`
                }
                onClick={() => {setShowProfPic(false)}}>
                Change
              </button>

            </>
          ) : (
            <>
              {profNoExist && (
                <h1 className="text-gray-400 font-md text-md mb-1">(choose a profile picture)</h1>
              )}
              <ProfilePhotoUpload setShowProfPic={setShowProfPic} setPicUrl={setPicUrl}/> 
            </>
          )}
          {props.user && (
            <>
              <br/>
              <AccountInfo user={props.user}/>
              <br/>
              <PaymentInfo/>

              <div className="overflow-hidden bg-white shadow sm:rounded-lg w-full max-w-2xl mt-10">
                <div className="p-4 sm:p-6 flex items-center justify-between w-full">
                  <h1 className="text-4xl font-bold leading-6 text-gray-700">Figma Settings</h1>
                  {props.user.workerModeEnabled && (
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 text-base rounded-md shadow-sm font-medium leading-4 bg-red-100 text-red-800"
                    >
                      Disconnect Account
                    </button>
                  )}
                </div>
                <div className="px-8 pb-8 pt-2 border-gray-200 flex justify-center items-center ">
                  <a href={figmaLink} onClick={() => {
                    props.setFigmaParams(state, "/profile")
                  }}>
                    <button 
                      className="px-4 py-1.5 text-white bg-primary4 rounded-md shadow-sm text-xl font-semibold"
                    >
                      Connect to Figma 
                    </button>
                  </a>
                </div>
              </div>
            </>
          )}
            
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
    user: user.user,
    
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setFigmaParams,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)