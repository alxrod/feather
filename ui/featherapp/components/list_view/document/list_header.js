import CreateDocument from "./create_button"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
  
const DocumentTableHeader = (props) => {
  function capWord(string) {
    string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  return (
    <div className="relative pb-5 border-b border-gray-200 sm:pb-0">
      <div className="flex items-center justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Documents</h3>
        <div className="mt-3 flex mt-0 absolute top-3 right-0">
          <CreateDocument/>
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
                    ? 'border-primary3 text-primary3'
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

export default DocumentTableHeader