import { Fragment, useState, useEffect, useContext } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { DeadlineFieldContext } from '../deadline_field';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



const DeadlineChoice = (props) => {

  const {sortedDeadlines, curDeadline} = useContext(DeadlineFieldContext);

  const changeSelected = (new_deadline) => {
    props.setSelectedID(new_deadline.id)
    props.setErrorMsg("")
  }
  return (
    <Listbox value={curDeadline} onChange={changeSelected}>
      {({ open }) => (
        <>
          <div className="mt-1 relative">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary4 focus:border-primary4 sm:text-sm">
              <span className="block truncate">{(curDeadline.name)}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
                {sortedDeadlines.map((deadline) => (
                  <Listbox.Option
                    key={deadline.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-primary5' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-8 pr-4'
                      )
                    }
                    value={deadline}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {(deadline.name)}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-primary5',
                              'absolute inset-y-0 left-0 flex items-center pl-1.5'
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

const mapStateToProps = ({ deadlines }) => ({
  deadlinesChanged: deadlines.deadlinesChanged,
  deadlines: deadlines.deadlines,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeadlineChoice) 