/* This example requires Tailwind CSS v2.0+ */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Redirect } from "react-router-dom"

import ProfilePhotoUpload from "./profile_photo_upload.js"

const FileUploadTest = (props) => {

  return (
    <div className="p-4">
      
      <div className="py-24 px-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center lg:justify-center">
            <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-700 w-full text-center">
              Testing File Upload
            </p>
            <div className="h-4"></div>
            <ProfilePhotoUpload/>
          </div> 
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ contract, user }) => ({
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(FileUploadTest)