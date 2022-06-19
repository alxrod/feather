import VersionHistory from "./version_history"

export default function DraftUpload() {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg w-full mt-5 flex flex-row">
      <div className="bg-gray-50 px-4 py-5 sm:p-6">
        <div className="pb-5">
          <h3 className="text-lg leading-6 font-medium text-indigo-400">Versions</h3>
        </div>
        <VersionHistory/>
      </div>
      <div className="px-4 py-5 sm:p-6 grow">
        <form className="space-y-8 divide-y divide-gray-200">
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div>
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Draft Upload</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  View previous versions of your post or upload a new version.
                </p>
              </div>
      
              <div className="flex flex-row flex-start">   
                <div className="mt-3 grow pr-6">
                  <div className="sm:grid">
                    <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-0">
                      Your content
                    </label>
                    <div className="mt-1 sm:mt-0">
                      <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
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
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="sm:grid sm:pt-5">
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                      Submission Notes
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                        defaultValue={''}
                        placeholder={"If there are any issues or things to adjust, comment here."}
                      />
                      <p className="mt-2 text-sm text-gray-500"></p>
                    </div>
                  </div>
                  <div className="mt-6 w-full flex flex-col items-center">
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                      Upload a New Version
                    </button>
                  </div>
                </div> 
              </div>
              
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}