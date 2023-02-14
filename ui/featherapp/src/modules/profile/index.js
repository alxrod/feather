import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import ProfileSidebar from "./sidebar";
import AccountInfo from "./account_info";
import PaymentInfo from "./payment_info";
import { CheckIcon } from '@heroicons/react/outline'
import ProfilePhotoUpload from "../file_upload_test/profile_photo_upload.js"
import ProfilePhoto from "../general_components/profile_photo.js"
const Profile = (props) => {
  const [showProfPic, setShowProfPic] = useState(false)
  const [profNoExist, setProfNoExist] = useState(false)
  const [picUrl, setPicUrl] = useState("")

  
  useEffect( () => {
    if (props.user && props.user.profilePhoto?.cacheUrl) {
      setPicUrl(props.user.profilePhoto.cacheUrl)
      setShowProfPic(true)
    } else {
      setProfNoExist(true)
    }
  }, [props.user, props.user?.profilePhoto.cacheUrl])
  return (
    <div>
      <br/>
      <div className="flex">
        <div className="p-5 w-full flex flex-col items-center">
          {showProfPic ? (
            <>
              <img 
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
            </>
          )}
            
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
    user: user.user
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)