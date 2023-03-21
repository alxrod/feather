/* This example requires Tailwind CSS v2.0+ */
import { UserIcon } from '@heroicons/react/outline'

const AccountInfo = (props) => {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg max-w-2xl w-full">
      <div className="pl-3 pr-4 py-2 sm:pr-6 flex items-center">
        <UserIcon className="m-2 w-6 h-6 text-primary5"/>
        <h3 className="text-lg font-medium leading-6 text-gray-700">Personal Information</h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900">{props.user.firstName + " " + props.user.lastName}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Email Address</dt>
            <dd className="mt-1 text-sm text-gray-900">{props.user.email}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default AccountInfo