import {Oval} from 'react-loading-icons'

const CustomPhotoInputView = (props) => {
  return (
    <label
      htmlFor="file-upload"
      className={`relative cursor-pointer rounded-md 
                  mt-1 sm:col-span-2 sm:mt-0 w-full h-full
                  text-gray-400 hover:text-primary5 font-semibold`}
    >
      <div className={`h-full flex flex-col items-center 
                       justify-center rounded-md border-2 border-dashed 
                       border-gray-300 hover:border-primary5 px-6 pt-5 pb-6`}>

        {props.srcLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Oval className="w-20 h-20" stroke={"#7993A0"} fill={"#7993A0"} strokeWidth={2}/>
          </div>
        ) : (
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
            <div className="flex flex-wrap items-center justify-center">
                <span className="text-xl">Choose Your Picture</span>
                <input 
                  id="file-upload" 
                  name="file-upload" 
                  type="file" 
                  className="sr-only" 
                  type="file"
                  accept={"image/* image/heic"}
                  multiple={false}
                  onChange={props.onChange}
                />
            </div>
          </div>
        )}
      </div>
    </label>
  )
}

export default CustomPhotoInputView