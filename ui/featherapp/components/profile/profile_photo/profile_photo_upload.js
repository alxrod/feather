/* This example requires Tailwind CSS v2.0+ */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { uploadProfilePhoto } from "../../../reducers/file/dispatchers/file.upload.js"
import { useState, useEffect } from "react"

import CustomPhotoInputView from "./custom_uploader_input_view";
import dynamic from "next/dynamic";

import ReactCrop, {makeAspectCrop, centerCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { XIcon } from '@heroicons/react/solid'
import {Oval} from 'react-loading-icons'

const heic2any = dynamic(() => import("heic2any"), {
  ssr: false
});

const ProfilePhotoUpload = (props) => {

  const [photoInTransit, setPhotoInTransit] = useState(false)
  const [success, SetSuccess] = useState(false)

  const handleUpload = async (blob) => {
    console.log("Working w blob: ", blob)
    setPhotoInTransit(true)

    const converted_image = new File(
      [blob], 
      blob.name, 
      {type: blob.type}
    );
    props.uploadProfilePhoto(converted_image, converted_image.name).then(
      (success) => {
        setPhotoInTransit(false)
        if (props.setShowProfPic) {
          props.setShowProfPic(true)
        }
        if (props.onSave) {
          props.onSave()
        }   
      },
      (err) => {
        console.log("FAILED PUT")
      }
    )
  
  }

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setSrc(reader.result)
      });
      if (e.target.files[0].type === "image/heic") {
        convertHeic(reader, e.target.files[0])
      } else {
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  };

  const convertHeic = async (reader, orig_file) => {
    setSrcLoading(true)
    heic2any({ blob: orig_file }).then((converted_blob) => {
      const converted_image = new File(
        [converted_blob], 
        orig_file.name.split(".heic")[0]+".png", 
        {type: "image/png"}
      );
      reader.readAsDataURL(converted_image);
      setSrcLoading(false)
    })
  }

  // If you setState the crop in here you should return false.
  const onImageLoaded = e => {
    setImageRef(e.currentTarget)
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;

    const crop = centerCrop(
      makeAspectCrop(
        {
          // You don't need to pass a complete crop into
          // makeAspectCrop or centerCrop.
          unit: 'px',
          width: 150,
        },
        1,
        200,
        200,
      ),
      200,
      200
    )
    setCrop(crop)
    console.log("Initial crop is: ", crop)
    getCroppedImg(
      e.currentTarget,
      crop,
      "newFile.jpeg"
    ).then(
      (croppedBlob) => {
        setCroppedBlob(croppedBlob);
      }
    )
  };

  const onCropComplete = crop => {
    makeClientCrop(crop);
  };

  const onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    console.log("Setting crop to: ", crop);
    setCrop(crop);
  };

  const makeClientCrop = async (crop) => {
    if (imageRef && crop.width && crop.height) {
      const croppedBlob = await getCroppedImg(
        imageRef,
        crop,
        "newFile.jpeg"
      );
      console.log("Success w blob: ", croppedBlob)
      setCroppedBlob(croppedBlob);
    }
  }

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      throw new Error('No 2d context')
    }

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const pixelRatio = window.devicePixelRatio
    // const pixelRatio = 1

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio)

    ctx.scale(pixelRatio, pixelRatio)
    ctx.imageSmoothingQuality = 'high'

    const cropX = crop.x * scaleX
    const cropY = crop.y * scaleY

    const centerX = image.naturalWidth / 2
    const centerY = image.naturalHeight / 2

    ctx.save()

    // 5) Move the crop origin to the canvas origin (0,0)
    ctx.translate(-cropX, -cropY)
    // 4) Move the origin to the center of the original position
    ctx.translate(centerX, centerY)
    // 3) Rotate around the origin
    // 2) Scale the image
    // 1) Move the center of the image to the origin (0,0)
    ctx.translate(-centerX, -centerY)
    ctx.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
    )

    ctx.restore()

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        resolve(blob);
      }, "image/jpeg");
    });
  }

  const [src, setSrc] = useState(null)
  const [srcLoading, setSrcLoading] = useState(false)
  const [crop, setCrop] = useState({})

  const [croppedBlob, setCroppedBlob] = useState(null)

  const [imageRef, setImageRef] = useState(null)

  const resetImage = () => {
    setSrc(null)
  }

  return (
    <>
    {!src ? (
      <div className="w-[200px] h-[200px]">
        <CustomPhotoInputView onChange={onSelectFile} srcLoading={srcLoading}/>
      </div>
    ) : (
      <>
      <ReactCrop
        src={src}
        crop={crop}
        ruleOfThirds
        onComplete={onCropComplete}
        onChange={onCropChange}
        aspect={1}
      >
        <button 
          className="rounded-full bg-primary5 text-white absolute z-10 right-1 top-1 p-1 drop-shadow"
          onClick={resetImage}
        >
          <XIcon className="w-4 h-4"/>
        </button>
        <Image className="w-[200px]" width={200} src={src} onLoad={onImageLoaded}/>
      </ReactCrop>
      <div className="w-[200px] flex justify-center mt-4">
        <button 
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary5 hover:bg-primary6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary4"
          onClick={() => handleUpload(croppedBlob)}
        >
          Save
        </button>
        {photoInTransit && (
          <Oval className="ml-3 w-6 h-6" stroke={"#7993A0"} fill={"#7993A0"} strokeWidth={4}/>
        )}
      </div>
      </>
    )}
    </>
      /* <Dropzone
        onChangeStatus={handleChangeStatus}
        onSubmit={handleUpload}
        maxFiles={1}
        accept="image/heic, image/*"
        multiple={false}
        canCancel={false}

        LayoutComponent={props => <CustomLayout {...props}/>}
        InputComponent={props => <CustomPhotoInputView {...props} />}
        PreviewComponent={props => <CustomPhotoPreview {...props} setPicUrl={handleChangeUrl} />}
        SubmitButtonComponent= {props => <CustomUploaderSubmit {...props} photoInTransit={photoInTransit}/>}
      /> */
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