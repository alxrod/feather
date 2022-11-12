import React from 'react'

const CustomeUploaderSubmit = (props) => {

  const _disabled =
    props.files.some(f => ['preparing', 'getting_upload_params', 'uploading'].includes(f.meta.status)) ||
    !props.files.some(f => ['headers_received', 'done'].includes(f.meta.status))

  const handleSubmit = () => {
    props.onSubmit(props.files.filter(f => ['headers_received', 'done'].includes(f.meta.status)))
  }

  return (
    <div className="w-full flex justify-center">
      <button 
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={handleSubmit} disabled={props.disabled || _disabled}>
        Upload
      </button>
    </div>
  )
}
export default CustomeUploaderSubmit