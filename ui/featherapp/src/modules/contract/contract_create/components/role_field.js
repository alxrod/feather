import { useMemo } from 'react'
import { Switch } from '@headlessui/react'
import { WORKER_TYPE, BUYER_TYPE} from "../../../../services/user.service"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const RoleField = (props) => {
    const roleSwitch = useMemo(() => {
      return (props.role == WORKER_TYPE) ? true : false
    })

    return (
      <form action="#" className="relative flex flex-col mt-5">
        <div className="flex flex-col border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
          <div className="flex flex-row items-center justify-between pr-8">
            <h1 className="text-lg text-indigo-700 font-medium pl-3 mr-1 py-3">Your Role:</h1>
            <div className="relative">
              <Switch.Group as="div" className="flex items-center">
                <Switch
                    checked={roleSwitch}
                    onChange={props.changeRole}
                    className={classNames(
                      roleSwitch ? 'bg-indigo-600' : 'bg-gray-200',
                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    )}
                >
                    <span
                    aria-hidden="true"
                    className={classNames(
                        roleSwitch ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                    )}
                    />
                </Switch>
                <Switch.Label as="span" className="ml-3 w-20">
                    <span className="text-sm font-medium text-gray-900 ">
                      {roleSwitch ? ("Worker") : "Buyer"}
                    </span>
                </Switch.Label>
              </Switch.Group>
            </div>

          </div>
        </div>
      </form>
    )
  }
  
  export default RoleField