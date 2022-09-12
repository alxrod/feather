import {useEffect, useState, useMemo, Fragment } from 'react'
import {WORKER_TYPE, BUYER_TYPE} from '../../../../services/user.service'
import {addContractItem} from '../../../../reducers/items/dispatchers/items.add.dispatcher'
import {Tooltip, Button} from "flowbite-react"
import DeadlineItemBadge from  "./deadline_item_badge"
import { Listbox, Transition } from '@headlessui/react'
import ContractItem from "../contract_item/contract_item"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DeadlineItems = (props) => {
    const [deadlineItemIds, setDeadlineItemIds] = useState([])
    const [deadlineItemNubs, setDeadlineItemNubs] = useState([])
    const [contractItemIds, setContractItemIds] = useState([])
    const [showAdd, toggleShowAdd] = useState(true)

    const updateNubs = (new_nubs) => {
      setDeadlineItemNubs(new_nubs)
      if (props.editDeadline) {
        const newDeadline = props.deadline
        newDeadline.itemsList = new_nubs
        props.editDeadline(newDeadline)
      }
    }

    const [selectedId, setSelectedId] = useState("")
    const [selectedNub, setSelectedNub] = useState({
      id: "",
      name: "",
      default: true,
    })

    useEffect( () => {
      if (props.contractItems && Object.keys(props.contractItems).length > 0) {
        const contractItemIds = []
        const deadlineItemIds = []

        let i = 0
        let contained = 0 
        for (const [_, item] of Object.entries(props.contractItems)) {
          contractItemIds.push(item.id)
          if (item.id === selectedId) {
            setSelectedId(item.id)
            setSelectedNub({
              id: item.id,
              name: item.name,
              default: false,
            })
          }
          i++;
          for (let i = 0; i < deadlineItemNubs.length; i++) {
            if (item.id === deadlineItemNubs[i].id) {
              deadlineItemIds.push(item.id)
              contained += 1
            }
          }
        }
        setContractItemIds(contractItemIds)
        setDeadlineItemIds(deadlineItemIds)
        if (contained === Object.keys(props.contractItems).length || props.contractItems === undefined) {
          toggleShowAdd(false)
        } else {
          toggleShowAdd(true)
        }
      }
    }, [Object.keys(props.contractItems).length, props.contractItemsChanged, deadlineItemNubs.length])

    useEffect(() => {
      if (props.deadline) {
        const newDeadlineNubs = []
        for (let i = 0; i < props.deadline.itemsList.length; i++) {
          newDeadlineNubs.push(props.deadline.itemsList[i])
        }
        setDeadlineItemNubs(newDeadlineNubs)
        if (props.deadline.itemsList.length === 0) {
          setSelectedNub({
            id: "",
            name: "",
            default: true,
          })
          setSelectedId("")
        }
      }
    }, [props.deadline])


    const createItem = () => {
      if (props.createMode === true) {
        const new_id = (contractItemIds.length + 1).toString()
        props.addContractItem(props.createMode, new_id).then((item) => {
          console.log("Contract item added with id " + item.id)
          updateNubs([...deadlineItemNubs, item])
          setSelectedId(item.id)    
          setSelectedNub({
            id: item.id, name: item.name, default: false,
          })  
        })
      }
    }

    useEffect( () => {
      const newDeadlineItemIds = []
      for (let i = 0; i < deadlineItemNubs.length; i++) {
        const nub = deadlineItemNubs[i]
        for (let i = 0; i < props.contractItems.length; i++) {
          if (props.contractItems[i].id === nub.id) {
            newDeadlineItemIds.push(props.contractItems[i].id)
          }
        }
      }
      setDeadlineItemIds(newDeadlineItemIds)
      
    }, [deadlineItemNubs.length])

    const addItem = (nub) => {
      for (let i = 0; i < deadlineItemNubs.length; i++) {
        if (deadlineItemNubs[i] === nub.id) {
          return
        }
      }
      updateNubs([...deadlineItemNubs, nub])
      for (let i = 0; i < contractItemIds.length; i++) {
        if (contractItemIds[i] === nub.id) {
          setDeadlineItemIds([...deadlineItemIds, contractItemIds[i]])
          setSelectedId(nub.id)
          setSelectedNub(nub)
        }
      }
    }

    const containsNub = (item, list) => {
      for (let i = 0; i < list.length; i++) {
          if (list[i].id === item.id) {
              return true;
          }
      }
  
      return false;
    } 


    const selectItem = (id) => {
      setSelectedId(id)
      for (let i = 0; i < props.contractItems.length; i++) {
        if (props.contractItems[i].id === id) {
          setSelectedNub({
            id:props.contractItems[i].id, name:props.contractItems[i].id,
          })
        }
      }
    }
    return (
    <div className="bg-white grow flex ml-1 mt-2 w-full">
      <div className="flex items-center flex-col">
        <div className="p-0 mt-2 pb-2 w-full">
          <h3 className="text-base leading-6 font-medium text-gray-900">Required Items:</h3>
          <p className="mt-1 text-xs text-gray-500">
            Click one to edit, <b className="text-indigo-500">add</b> to add from existing or <b className="text-indigo-500">create</b> to make a new one.
          </p>
          <div className="flex flex-wrap">
            {deadlineItemNubs.map((item) => (
              <DeadlineItemBadge item={item} key={item.name} selected={(item.id === selectedId)} selectItem={selectItem}/>
            ))}
            {(showAdd && !props.newDeadlineMode) && (
              <Listbox onChange={addItem}>
                {({ open }) => (
                  <>
                      <Listbox.Button className="relative inline-flex items-center rounded-full bg-indigo-300 hover:bg-indigo-400 px-2 py-0.5 mt-1 mx-1 text-sm">
                        <span className="text-xs font-medium text-white">add</span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                          {props.contractItems.map((item) => (
                            <Fragment key={item.id}>
                            {!containsNub({id: item.id, name: item.name}, deadlineItemNubs) && (
                              <Listbox.Option
                                
                                className={({ active }) =>
                                  classNames(
                                    active ? 'text-indigo-600' : 'text-gray-900',
                                    'cursor-default select-none relative p-0 px-4 text-xs',
                                    (props.contractItems.length > 1) ? "py-2 border-b-1 border-gray-700" : ""
                                  )
                                }
                                value={{id: item.id, name: item.name}}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                      {item.name}
                                    </span>

                                  </>
                                )}
                              </Listbox.Option>
                            )}
                            </Fragment>
                          ))}
                        </Listbox.Options>
                      </Transition>
                  </>
                )}
              </Listbox>
            )}
            {!props.newDeadlineMode && (
              <button
                key="create"
                className="relative inline-flex items-center rounded-full bg-indigo-400 hover:bg-indigo-500 px-2 py-0.5 mt-1 mx-1 text-sm"
                onClick={createItem}
              >
                  <span className="text-xs font-medium text-white">create</span>
              </button>
            )}
          </div>
        </div>
        <div className="flex grow w-full">
          
          {selectedNub.default !== true ? ( 
            <ContractItem 
              embedded={true}
              override={props.createMode}
              disabled={false}
              id={selectedId}
            />
          ) : (
            <div className="flex justify-center items-center">
              <h1 className="text-gray-400 w-[60%] text-center">First <b>click</b> on an item, <b>add</b> one, or <b>create</b> a new one to edit</h1>
            </div>
          )}
        </div>
      </div>

    </div>
    )
}

const genTestSet = () => {
  return [
    {
      id: "1",
      name: "Item 1",
    },
    {
      id: "2",
      name: "Item 2",
    },
    {
      id: "3",
      name: "Item 3",
    },
    {
      id: "4",
      name: "Item 4",
    },
    {
      id: "5",
      name: "Item 5",
    }
  ]
}
const mapStateToProps = ({ user, contract, chat }) => ({
  selectedId: contract.selectedId,
  cachedContracts: contract.cachedContracts,
  reloadDeadlines: contract.reloadDeadlinesFlag,
  contractItems: contract.curConItems,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addContractItem
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeadlineItems) 
