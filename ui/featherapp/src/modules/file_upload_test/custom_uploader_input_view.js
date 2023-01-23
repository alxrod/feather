

const CustomPhotoInputView = (props) => {
  return (
    <div className="mt-1 sm:col-span-2 sm:mt-0 w-full h-full">
      <div className="h-full flex flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex flex-wrap items-center justify-center text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-medium text-primary5 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary4 focus-within:ring-offset-2 hover:text-primary4"
            >
              <span>Upload a file</span>
              <input 
                id="file-upload" 
                name="file-upload" 
                type="file" 
                className="sr-only" 
                type="file"
                accept={props.accept}
                multiple={props.multiple}
                disabled={props.disabled}
                onChange={async e => {
                  const target = e.target
                  const chosenFiles = await props.getFilesFromEvent(e)
                  props.onFiles(chosenFiles)  
                  target.value = null
                }}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PNG or JPG up to 10MB</p>
        </div>
      </div>
    </div>
  )
}

export default CustomPhotoInputView