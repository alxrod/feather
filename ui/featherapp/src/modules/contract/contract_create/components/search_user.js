import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function () {

  return (
    <div>
        <div className="flex flex-row items-center">
          <h1 className="text-lg font-medium text-primary6 mr-3">Invite to Contract: </h1> 
        </div>
    </div>
  )
}