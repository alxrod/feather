import React, {useState, useRef, useEffect} from "react";

import feather_logo from "../../public/feather_logo.svg";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import ProfilePhotoUpload from "../../components/profile/profile_photo/profile_photo_upload.js"
import Image from 'next/image'

import { useRouter } from "next/router"

const SetupProfilePicture = (props) => {
  
  const router = useRouter()

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white pt-8 px-4 shadow sm:rounded-lg sm:pt-10 pb-6">
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Image
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
              router.push("/setup-choice")
            }}/> 
            <br/>
            <a onClick={() => router.push("/setup-choice")} className="text-secondary5 text-lg font-bold hover:text-secondary4 cursor-pointer">
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
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SetupProfilePicture)
