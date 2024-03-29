import { CheckIcon, XIcon } from '@heroicons/react/solid'

const DecideButton = (props) => {
  return (
    <span className="relative z-0 inline-flex shadow-sm rounded-md">
      <button
        type="button"
        onClick={props.approve}
        className="relative inline-flex items-center px-1 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-primary4 focus:border-primary4"
      >
        <span className="sr-only">Previous</span>
        <CheckIcon className="h-3 w-3 text-green-400" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={props.reject}
        className="-ml-px relative inline-flex items-center px-1 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-primary4 focus:border-primary4"
      >
        <span className="sr-only">Next</span>
        <XIcon  className="h-3 w-3 text-red-400" aria-hidden="true" />
      </button>
    </span>
  )
}
export default (DecideButton)