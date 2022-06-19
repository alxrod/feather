import { CheckIcon, XIcon } from '@heroicons/react/solid'

const DecideButton = (props) => {
  return (
    <span className="relative z-0 inline-flex shadow-sm rounded-md">
      <button
        type="button"
        className="relative inline-flex items-center px-1 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <span className="sr-only">Previous</span>
        <CheckIcon onClick={props.approve} className="h-3 w-3 text-green" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="-ml-px relative inline-flex items-center px-1 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <span className="sr-only">Next</span>
        <XIcon onClick={props.reject} className="h-3 w-3 text-red" aria-hidden="true" />
      </button>
    </span>
  )
}
export default (DecideButton)