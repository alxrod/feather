import React, {} from "react";

import { UserIcon, LibraryIcon, CreditCardIcon } from '@heroicons/react/outline'

const navigation = [
  { name: 'Account', icon: UserIcon, href: '#', current: true },
  { name: 'Payments', icon: CreditCardIcon, href: '#', current: false },
  { name: 'Taxes', icon: LibraryIcon, href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const ProfileSidebar = (props) => {

    return (
    <div className="flex flex-col flex-grow pt-0 pb-4 bg-white overflow-y-auto">

      <div className="mt-0 flex-grow flex flex-col">
        <nav className="flex-1 bg-white space-y-1" aria-label="Sidebar">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
                  ? 'bg-indigo-50 border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center px-3 py-2 text-sm font-medium border-l-4'
              )}
            >
              <item.icon
                className={classNames(
                  item.current ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 flex-shrink-0 h-6 w-6'
                )}
                aria-hidden="true"
              />
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default ProfileSidebar