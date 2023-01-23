import { Switch } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DraftToggle = (props) => {

    return (
      <form action="#" className="relative flex flex-col mt-2">
        <div className="flex flex-col overflow-hidden p-2 pl-0">
          <div className="flex flex-row items-center">
            <h1 className="text-md text-gray-700 font-medium mr-3">Draft Required:</h1>
            <div className="relative">
              <Switch.Group as="div" className="flex items-center">
                <Switch
                    checked={props.required}
                    onChange={props.changeRequired}
                    className={classNames(
                      props.required ? 'bg-primary5' : 'bg-gray-200',
                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary4'
                    )}
                >
                    <span
                    aria-hidden="true"
                    className={classNames(
                        props.required ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                    )}
                    />
                </Switch>
                <Switch.Label as="span" className="ml-3 w-20">
                    <span className="text-sm font-medium text-gray-900 ">
                      {props.required ? ("Yes") : "No"}
                    </span>
                </Switch.Label>
              </Switch.Group>
            </div>

          </div>
        </div>
      </form>
    )
  }
  
  export default DraftToggle