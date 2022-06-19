import { Link } from 'react-router-dom'

export default function SignButton() {
    return (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Sign the Contract</h3>
          <div className="mt-2 sm:flex sm:items-start sm:justify-between">
            <div className="max-w-4xl text-sm text-gray-500">
              <p>
                By pressing this button you are aggreeing to uphold the contract and all of the current criteria or else you will access to the payment for the service. Make sure you approve of the conditions.
              </p>
            </div>
            <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
              <Link 
                to="/view"
              >
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-lg"
                >
                  I approve
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }