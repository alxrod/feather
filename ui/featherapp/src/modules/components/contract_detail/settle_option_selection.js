import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { XIcon, ClockIcon } from '@heroicons/react/outline'

import { ITEM_APPROVED, ITEM_REJECTED, ITEM_PENDING } from '../../../custom_encodings'
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
          <div className="mt-1 relative">
            <Listbox.Button className={classNames("relative w-full rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-0 sm:text-sm text-white",
                                                 (selected.action == ITEM_APPROVED) ? 'bg-green' : "",
                                                 (selected.action == ITEM_PENDING) ? 'bg-yellow': "",
                                                 (selected.action == ITEM_REJECTED) ? 'bg-red' : "")}>
              <span className="flex items-center">
              {(selected.action == ITEM_APPROVED) && (
                <CheckIcon className="flex-shrink-0 inline-block h-4 w-4"/>
              )}
              {(selected.action == ITEM_PENDING) && (
                <ClockIcon className="flex-shrink-0 inline-block h-4 w-4"/>
              )}
              {(selected.action == ITEM_REJECTED) && (
                <XIcon className=" flex-shrink-0 inline-block h-4 w-4"/>
              )}

                
                <span className="ml-3 block truncate">{selected.name}</span>
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-white" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
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
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {person.name}
                            <span className="sr-only"> is {person.online ? 'online' : 'offline'}</span>
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
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