import React, {useEffect} from 'react'
import { XIcon } from '@heroicons/react/solid'

const CustomPhotoPreview = (props) => {
  useEffect( () => {
    if (props.meta?.previewUrl) {
      if (props.setPicUrl) {
        console.log("Setting preview URL")
        props.setPicUrl(props.meta.previewUrl)
      }
      
    }
    console.log(props)
  }, [props.meta])
  return (
    <div className="rounded-md h-[200px] w-[200px] relative" style={{overflow: "hidden"}}>
      <button 
        className="rounded-full bg-primary5 text-white absolute z-10 right-1 top-1 p-1 drop-shadow"
        onClick={props.fileWithMeta.remove}
      >
        <XIcon className="w-4 h-4"/>
      </button>
      <img
        src={props.meta.previewUrl}
        alt={props.title} 
        title={props.title} 
      />
    </div>
  )
}

export default CustomPhotoPreview