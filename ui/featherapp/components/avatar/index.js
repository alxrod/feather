/* This example requires Tailwind CSS v2.0+ */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {uploadProfilePhoto } from "../../reducers/file/dispatchers/file.upload.js"
import { useState, useEffect } from "react"
import { UserIcon } from '@heroicons/react/outline'
import Image from "next/image"

const Avatar = (props) => {

  const [haveProfImg, setHaveProfImg] = useState(false)
  const [cacheUrl, setCacheUrl] = useState("")

  const [imageHash, setImageHash] = useState(Date.now())

  useEffect( () => {
    if (props.cachedUrls) {
    
      for (let i = 0; i < props.cachedUrls.length; i++) {
        if (props.cachedUrls[i][1] !== "" && props.cachedUrls[i][0] === props.user_id) {
          setHaveProfImg(true)
          setCacheUrl(props.cachedUrls[i][1])
        }
      }

    }
  },[props.cachedUrls])

  return (
    <>
      {haveProfImg ? (
        <Image 
          className={"rounded-full object-cover"}
          width={props.height*0.25*16}
          height={props.width*0.25*16}
          // src={`${cacheUrl}?${imageHash}`}
          src={cacheUrl}
          alt="profile_pic"
        />
      ) : (
        <UserIcon className={"h-"+props.height+" w-"+props.width+" rounded-full border-2 bg-white border-gray-300 p-1 font-thin text-gray-300"}/>
      )}
    </>
  )
}

const mapStateToProps = ({ file }) => ({
  cachedUrls: file.cachedProfileUrls,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  uploadProfilePhoto
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(Avatar)