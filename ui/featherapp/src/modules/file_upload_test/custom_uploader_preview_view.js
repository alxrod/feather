import React from 'react'
import { XIcon } from '@heroicons/react/solid'

const CustomPhotoPreview = (props) => {
  return (
    <div className="rounded-md h-[200px] w-[200px] relative" style={{overflow: "hidden"}}>
      <button 
        className="rounded-full bg-indigo-600 text-white absolute z-10 right-1 top-1 p-1 drop-shadow"
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