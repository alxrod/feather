import React, {useEffect, useState} from "react";

import { UserIcon, LibraryIcon, CreditCardIcon } from '@heroicons/react/outline'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const ProfileSidebar = (props) => {
  const [navigation, setNavigation] = useState([
    { code: 0, name: 'Account', icon: UserIcon, href: '#', current: true },
    { code: 1, name: 'Payments', icon: CreditCardIcon, href: '#', current: false },
    { code: 2, name: 'Taxes', icon: LibraryIcon, href: '#', current: false },
  ])
  
  useEffect(() => {
    for (let i = 0; i < navigation.length; i++) {
      if (navigation[i].code === props.selectedTab) {
        navigation[i].current = true
      } else {
        navigation[i].current = false
      }
    }
    setNavigation(navigation)
  }, [props.selectedTab])

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
                  ? 'bg-indigo-50 border-primary5 text-primary5'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center px-3 py-2 text-sm font-medium border-l-4'
              )}
              onClick={() => {props.setSelectedTab(item.code)}}
            >
              <item.icon
                className={classNames(
                  item.current ? 'text-primary4' : 'text-gray-400 group-hover:text-gray-500',
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