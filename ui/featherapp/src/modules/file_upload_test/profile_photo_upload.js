/* This example requires Tailwind CSS v2.0+ */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Redirect } from "react-router-dom"
import {uploadProfilePhoto } from "../../reducers/file/dispatchers/file.upload.js"
import Dropzone from "react-dropzone-uploader";

import CustomPhotoInputView from "./custom_uploader_input_view";
import CustomPhotoPreview from "./custom_uploader_preview_view";
import CustomUploaderSubmit from "./custom_uploader_submit_view";

const CustomLayout = (props) => {
  return (
    <div className="" {...props.dropzoneProps}>
      {/* {props.previews} */}
      <div className="flex flex-col items-center">

        <div className="h-[200px] w-[200px] flex justify-center">
          {props.files.length > 0 ? (
            props.previews
          ) : (
            props.input
          )}
        </div>
        <div className="mt-2 w-full">
          {props.files.length > 0 && props.submitButton}
        </div>
      </div>
    </div>
  )
}

const ProfilePhotoUpload = (props) => {
  const handleChangeStatus = ({ meta, remove }, status) => {
    console.log(status, meta);
  };

  const handleUpload = async (files) => {
    const file = files[0];
    console.log("UPLOADING ", file.meta.name)
    props.uploadProfilePhoto(file, file.meta.name)
  }

  return (
    <Dropzone
      onChangeStatus={handleChangeStatus}
      onSubmit={handleUpload}
      maxFiles={1}
      accept="image/*"
      multiple={false}
      canCancel={false}

      LayoutComponent={props => <CustomLayout {...props}/>}
      InputComponent={props => <CustomPhotoInputView {...props} />}
      PreviewComponent={props => <CustomPhotoPreview {...props} />}
      SubmitButtonComponent= {props => <CustomUploaderSubmit {...props} />}
    />
    // 
  )
}

const mapStateToProps = ({ contract, user }) => ({
  user: user.user,
  isLoggedIn: user.isLoggedIn,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  uploadProfilePhoto
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(ProfilePhotoUpload)