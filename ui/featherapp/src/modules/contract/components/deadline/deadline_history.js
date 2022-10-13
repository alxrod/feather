import { CheckCircleIcon } from '@heroicons/react/solid'

const DeadlineHistory = (props) => {

  const genDateString = (date) => {
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric' }) 
  }

  return (
    <div className="md:px-1 lg: px-2 grow">
      <div className="flex flex-col h-full items-center justify-between">
        <nav className="flex justify-center" aria-label="Progress">
          <ol role="list" className="space-y-6">
            {props.deadlines.map((deadline, idx) => (
              <li key={deadline.id} onClick={() => {props.changeSelection(idx)}}>
                {deadline.complete === true ? (
                  <div className="group">
                    <span className="flex items-start">
                      <span className="flex-shrink-0 h-5 w-5 relative flex items-center justify-center" aria-hidden="true">
                        {(idx === props.selectedIdx) && (
                          <span className="absolute h-7 w-7 rounded-full bg-indigo-200" />
                        )}
                        <span className="flex-shrink-0 relative h-5 w-5 flex items-center justify-center">
                          <CheckCircleIcon
                            className="h-full w-full text-indigo-600 group-hover:text-indigo-800"
                            aria-hidden="true"
                          />
                        </span>
                      </span>
                      <span className="hidden md:flex ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                        {genDateString(deadline.currentDate)}
                      </span>
                    </span>
                  </div>
                ) : (
                  <div className="group">
                    <div className="flex items-start">
                      {(idx === props.selectedIdx) ? (
                        <span className="flex-shrink-0 h-5 w-5 relative flex items-center justify-center" aria-hidden="true">
                          <span className="absolute h-4 w-4 rounded-full bg-indigo-200" />
                          <span className="relative block w-2 h-2 bg-indigo-600 rounded-full" />
                        </span>
                      ) : (
                        <span className="flex-shrink-0 h-5 w-5 relative flex items-center justify-center" aria-hidden="true">
                          <span className="relative block w-2 h-2 bg-gray-300 rounded-full" />
                        </span>
                      )}
                      <span className="hidden md:flex">
                        <p className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">{genDateString(deadline.currentDate)}</p>
                      </span>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <button
              type="button"
              onClick={props.openModal}
              className="hidden md:inline-flex mt-2 ml-3 items-center px-4 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-800 bg-indigo-100 hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Edit
        </button>
      </div>
    </div>
  )
}

export default DeadlineHistory


{/* <div className="flex items-start" aria-current="step">
    <span className="flex-shrink-0 h-5 w-5 relative flex items-center justify-center" aria-hidden="true">
      <span className="absolute h-4 w-4 rounded-full bg-indigo-200" />
      <span className="relative block w-2 h-2 bg-indigo-600 rounded-full" />
    </span>
    <span className="ml-3 text-sm font-medium text-indigo-600">{genDateString(deadline.currentDate)}</span>
  </div> */}