import { Link } from 'react-router-dom';
  
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
  
const ContractTableHeader = (props) => {
  function capWord(string) {
    string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  
  return (
    <div className="relative pb-5 border-b border-gray-200 sm:pb-0">
      <div className="md:flex md:items-center md:justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Contracts</h3>
        <div className="mt-3 flex md:mt-0 md:absolute md:top-3 md:right-0">
          <button
            type="button"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Link to="/create">
              Create
            </Link>
          </button>
        </div>
      </div>
      <div className="mt-4">
        <div className="hidden sm:block">
          <nav className="-mb-px flex space-x-8">
            {Object.keys(props.allFilters).map((filter) => (
              <h3
                key={filter}
                className={classNames(
                  filter == props.selected
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'cursor-pointer whitrespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm'
                )}
                aria-current={filter == props.selected ? 'page' : undefined}
                onClick={() => props.setSelected(filter)}
              >
                {capWord(filter)}
              </h3>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default ContractTableHeader