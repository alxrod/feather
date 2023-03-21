import { Fragment, useState, useEffect, useMemo} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Listbox, Transition } from '@headlessui/react'
import { TagIcon } from '@heroicons/react/solid'

import { sendMessage } from '../../../reducers/chat/dispatchers/chat.dispatcher';
import { requestAdmin, resolveAdmin } from '../../../reducers/contract/dispatchers/contract.admin.dispatcher';
import { labelTypes } from '../../../services/chat.service';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ChatBox = (props) => {

  const [labels, setLabels] = useState([
    { name: 'Unlabelled', id:"", type: labelTypes.UNLABELED },
    { name: 'Deadline', id:"", type: labelTypes.DEADLINE },
    { name: 'Price', id:"", type: labelTypes.PRICE },
  ])
  const [labelled, setLabelled] = useState(labels[0])
  
  const [showAdminButton, toggleAdminButton] = useState(true)
  const [showResolveButton, toggleResolveButton] = useState(false)
  const [message, setMessage] = useState("")

  useEffect( () => {
    toggleAdminButton(!props.curContract.adminRequested && !props.user?.adminStatus)
    toggleResolveButton(props.curContract.adminRequested && props.user?.adminStatus)
  }, [props.curContract, props.contractChanged])

  useEffect( () => {
    if (props.curContract.id) {
      let items = [...labels]
      for (let i = 0; i<props.curContract.itemsList.length; i++) {
        const item = props.curContract.itemsList[i]
        items.push({name: item.name, id: item.id, type: labelTypes.ITEM})
      }
      setLabels(items)
    }
  }, [props.selectedId])

  const handleSend = (e) => {
    e.preventDefault()
    console.log("Sending message?")
    if (message !== "" && props.roomId !== undefined) {
      props.sendMessage(props.roomId, message, labelled).then(
        setMessage("")
      )
    }
  }

  const onEnterPress = (e) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      handleSend(e)
    }
  }

  const handleRequestAdmin = () => {
    props.requestAdmin(props.curContract.id)
  }
  const handleResolveAdmin = () => {
    props.resolveAdmin(props.curContract.id)
  }
  return (
    <div className="relative">
      <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-primary4 focus-within:ring-1 focus-within:ring-primary4">
        <textarea
          rows={2}
          name="description"
          id="description"
          className="block w-full border-0 py-3 h-20 resize-none placeholder-gray-500 focus:ring-0 sm:text-sm"
          placeholder="Write a chat message, feel free to label it with the item you're talking about..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={onEnterPress}
        />

        {/* Spacer element to match the height of the toolbar */}
        <div aria-hidden="true">
          <div className="h-px" />
          <div className="py-2">
            <div className="py-px">
              <div className="h-9" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-px">
        {/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}
        <div className="border-t border-gray-200 px-2 py-2 flex justify-between items-center space-x-3 sm:px-3">
          <div className="flex space-x-1">
            {showAdminButton && (
              <button
                onClick={handleRequestAdmin}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-primary7 bg-primary1 hover:bg-primary2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary3"
              >
                <p className="m-0 p-0 flex"><b className="font-medium hidden md:flex mr-1">Get</b> Admin</p>
              </button>
            )}
            {showResolveButton && (
              <button
                onClick={handleResolveAdmin}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-primary7 bg-primary1 hover:bg-primary2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary3"
              >
                Resolve Dispute
              </button>
            )}
            <div className="flex">
              <Listbox as="div" value={labelled} onChange={setLabelled} className="flex-shrink-0">
                {({ open }) => (
                  <>
                    <Listbox.Label className="sr-only">Add a label</Listbox.Label>
                    <div className="relative">
                      <Listbox.Button className="relative inline-flex items-center rounded-full py-2 px-2 bg-gray-50 text-sm font-medium text-gray-500 whitespace-nowrap hover:bg-gray-100 sm:px-3">
                        <TagIcon
                          className={classNames(
                            labelled.value === null ? 'text-gray-300' : 'text-gray-500',
                            'flex-shrink-0 h-5 w-5 sm:-ml-1'
                          )}
                          aria-hidden="true"
                        />
                        <span
                          className={classNames(
                            labelled.value === null ? '' : 'text-gray-900',
                            'hidden truncate sm:ml-2 sm:block'
                          )}
                        >
                          {labelled.value === null ? 'Label' : labelled.name}
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute right-0 z-10 mt-1 w-52 bg-white shadow max-h-56 rounded-lg py-3 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                          {labels.map((label, idx) => (
                            <Listbox.Option
                              key={idx}
                              className={({ active }) =>
                                classNames(
                                  active ? 'bg-gray-100' : 'bg-white',
                                  'cursor-default select-none relative py-2 px-3'
                                )
                              }
                              value={label}
                            >
                              <div className="flex items-center">
                                <span className="block font-medium truncate">{label.name}</span>
                              </div>
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={handleSend}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary5 hover:bg-primary6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary4"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = ({ user, contract }) => ({
  curContract: contract.curContract,
  contractChanged: contract.contractChanged,
  user: user.user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  sendMessage,
  requestAdmin,
  resolveAdmin,
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(ChatBox)