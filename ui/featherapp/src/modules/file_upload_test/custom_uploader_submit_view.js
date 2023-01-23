import React, {useEffect} from 'react'
import {Oval} from 'react-loading-icons'

const CustomeUploaderSubmit = (props) => {

  useEffect(() => {
    console.log("TRANSIT: ", props.photoInTransit)
  }, [props.photoInTransit])

  const _disabled =
    props.files.some(f => ['preparing', 'getting_upload_params', 'uploading'].includes(f.meta.status)) ||
    !props.files.some(f => ['headers_received', 'done'].includes(f.meta.status))

  const handleSubmit = () => {
    props.onSubmit(props.files.filter(f => ['headers_received', 'done'].includes(f.meta.status)))
  }

  return (
    <div className="w-full flex justify-center items-center">
      <button 
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary5 hover:bg-primary6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary4"
        onClick={handleSubmit} disabled={props.disabled || _disabled}>
        Upload
      </button>
      {props.photoInTransit && (
        <Oval className="ml-3 w-6 h-6" stroke={"#7993A0"} fill={"#7993A0"} strokeWidth={4}/>
      )}
    </div>
  )
}
export default CustomeUploaderSubmit