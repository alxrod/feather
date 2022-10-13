import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { XIcon, ClockIcon } from '@heroicons/react/outline'

import { ITEM_APPROVED, ITEM_REJECTED, ITEM_PENDING } from '../../../../custom_encodings'
const people = [
  { id: 1, name: 'Approve', action: ITEM_APPROVED },
  { id: 2, name: 'Pending', action: ITEM_PENDING },
  { id: 3, name: 'Reject', action: ITEM_REJECTED },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [selected, setSelected] = useState(people[1])

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="w-[50px] lg:w-[125px]">
            <Listbox.Button className={classNames("relative rounded-md shadow-sm pl-2 w-full pr-2 py-1.5 text-left cursor-default focus:outline-none focus:ring-0 sm:text-sm text-gray-900 border border-gray-400",)}>
              <span className="flex items-center">
              {(selected.action == ITEM_APPROVED) && (
                <CheckIcon className="flex-shrink-0 inline-block h-4 w-4 text-green"/>
              )}
              {(selected.action == ITEM_PENDING) && (
                <ClockIcon className="flex-shrink-0 inline-block h-4 w-4"/>
              )}
              {(selected.action == ITEM_REJECTED) && (
                <XIcon className=" flex-shrink-0 inline-block h-4 w-4 text-red"/>
              )}
              <span className="ml-3 hidden truncate lg:block">{selected.name}</span>
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-300" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-50 mt-1 w-[50px] lg:w-[150px] bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {people.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white' : 'text-gray-900',
                        (person.action == ITEM_APPROVED && active) ? 'bg-green' : "",
                        (person.action == ITEM_PENDING && active) ? 'bg-yellow': "",
                        (person.action == ITEM_REJECTED && active) ? 'bg-red' : "",
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          {(person.action == ITEM_APPROVED) && (
                            <CheckIcon className="flex-shrink-0 inline-block h-4 w-4"/>
                          )}
                          {(person.action == ITEM_PENDING) && (
                            <ClockIcon className="flex-shrink-0 inline-block h-4 w-4"/>
                          )}
                          {(person.action == ITEM_REJECTED) && (
                            <XIcon className="flex-shrink-0 inline-block h-4 w-4"/>
                          )}
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', ' ml-3 hidden truncate lg:block')}
                          >
                            {person.name}
                            <span className="sr-only"> is {person.online ? 'online' : 'offline'}</span>
                          </span>
                        </div>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}