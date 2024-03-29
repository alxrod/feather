import { ExclamationIcon, XIcon } from '@heroicons/react/outline'
import { useEffect } from "react"

const ErrorBanner = (props) => {
  return (
    <div className="bg-red-100">
      <div className="max-w-7xl mx-auto py-2 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span className="flex p-2 rounded-lg">
              <ExclamationIcon className="h-6 w-6 text-red-800" aria-hidden="true" />
            </span>
            <div className="ml-3  text-red-800 flex truncate">
              <h3 className="font-medium">Contract Creation Error: </h3>
              <p className="ml-2">{props.error}</p>
            </div>
          </div>
          <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
          </div>
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              onClick={props.closeBanner}
              className="-mr-1 flex p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800 sm:-mr-2"
            >
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-6 w-6 text-red-800" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorBanner