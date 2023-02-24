import React, {useState, useRef, useEffect} from "react";
import { Redirect } from 'react-router-dom';
import feather_logo from "../../../style/logo/feather_logo.svg";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { push } from 'connected-react-router'

import parse from "date-fns/parse";
import ProfilePhotoUpload from "../../profile_photo_upload/profile_photo_upload.js"
const SetupProfilePicture = (props) => {
    return (
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white pt-8 px-4 shadow sm:rounded-lg sm:pt-10 pb-6">
          <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <img
                className="mx-auto h-12 w-auto"
                src={feather_logo}
                alt="Workflow"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Choose a profile picture</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Add a picture so people can know who you are
              </p>
              {/* <p className="mt-2 text-center text-sm text-red-400">
                {mainMessage}
              </p> */}


            </div>
          
            <div className="flex flex-col items-center py-8">
              <ProfilePhotoUpload onSave={() => {
                props.push("/setup-choice")
              }}/> 
              <br/>
              <a onClick={() => props.push("/setup-choice")} className="text-secondary5 text-lg font-bold hover:text-secondary4 cursor-pointer">
                Set up later
              </a>
            </div>

            
  
          </div>
        </div>
      </div>
    )
}

const mapStateToProps = ({ user }) => ({
    user: user.user,
    defaultRegisterRole: user.defaultRegisterRole,
    redirectLink: user.redirectLink
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    push,

}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SetupProfilePicture)
