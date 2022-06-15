export default function NewContractButton() {
    return (
      <button
        type="button"
        className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg" 
          stroke="currentColor" 
          strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        <span className="mt-2 block text-sm font-medium text-indigo-600 hover:text-indigo-500">Create a contract item</span>
      </button>
    )
  }