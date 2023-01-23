import {useEffect, useState, useMemo, Fragment } from 'react'
import {WORKER_TYPE, BUYER_TYPE} from '../../../../services/user.service'
import {deadlineItemTypes, msgMethods, decisionTypes} from '../../../../services/chat.service'
import {changeDeadlineItems, reactDeadlineItems} from "../../../../reducers/deadlines/dispatchers/deadlines.items.dispatcher"
import {Tooltip, Button} from "flowbite-react"
import DeadlineItemBadge from  "./deadline_item_badge"
import { Listbox, Transition } from '@headlessui/react'
import ContractItem from "../contract_item/contract_item"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DecideButton from '../decide_button'

import { LockOpenIcon } from '@heroicons/react/outline'
import { LockClosedIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DeadlineItems = (props) => {
  
  const [deadlineItemIds, setDeadlineItemIds] = useState([])
  const [deadlineItemNubs, setDeadlineItemNubs] = useState([])

  const [deadlineItemSuggestedIds, setDeadlineItemSuggestedIds] = useState([])
  const [deadlineItemSuggestedNubs, setDeadlineItemSuggestedNubs] = useState([])

  const [deadlineItemDeletedIds, setDeadlineItemDeletedIds] = useState([])
  const [deadlineItemDeletedNubs, setDeadlineItemDeletedNubs] = useState([])

  const [originalNubs, setOriginalNubs] = useState({"normal": [], "added": [], "removed": []})

  const [contractItemIds, setContractItemIds] = useState([])
  const [showAdd, toggleShowAdd] = useState(true)

  const [suggestionMode, setSuggestionMode] = useState(false)

  const [itemLock, setItemLock] = useState(false)

  const [proposedByPartner, setProposedByPartner] = useState(false)

  const [itemsMsgId, setItemsMsgId] = useState("")

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

  useEffect(() => {
    let final_id = ""
    for (let i = 0; i < props.messages.length; i++) {
      if (props.messages[i].method === msgMethods.DEADLINE_ITEMS) {
        if (props.messages[i].body.deadline.id === props.deadline.id) {
          final_id = props.messages[i].id
        }
      }
    }
    setItemsMsgId(final_id)
  }, [props.messages.length, props.deadline])

  useEffect( () => {
    if (props.contractItems && Object.keys(props.contractItems).length > 0) {
      const contractItemIds = []
      const deadlineItemIds = []

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
        for (let i = 0; i < deadlineItemNubs.length; i++) {
          if (item.id === deadlineItemNubs[i].id) {
            contained += 1
          }
        }
      }
      setContractItemIds(contractItemIds)
      if (contained === Object.keys(props.contractItems).length || props.contractItems === undefined) {
        toggleShowAdd(false)
      } else {
        toggleShowAdd(true)
      }
    }
  }, [Object.keys(props.contractItems).length, props.contractItemsChanged, deadlineItemNubs.length])

  useEffect(() => {
    if (props.deadline) {
      console.log("DEADLINE IS:")
      console.log(props.deadline)

      const normalNubs = []
      const normalIds = []

      const addedNubs = []
      const addedIds = []

      const deletedNubs = []
      const deletedIds = []

      for (let i = 0; i < props.deadline.itemsList.length; i++) {
        if (props.deadline.itemStatesList[i] === deadlineItemTypes.ITEM_ADDED) {
          addedNubs.push(props.deadline.itemsList[i])
          addedIds.push(props.deadline.itemsList[i].id)
        } else if (props.deadline.itemStatesList[i] === deadlineItemTypes.ITEM_REMOVED) {
          deletedNubs.push(props.deadline.itemsList[i])
          deletedIds.push(props.deadline.itemsList[i].id)
        } else {
          normalNubs.push(props.deadline.itemsList[i])
          normalIds.push(props.deadline.itemsList[i].id)
        }
      }

      setDeadlineItemNubs(normalNubs)
      setDeadlineItemIds(normalIds)
      setDeadlineItemSuggestedNubs(addedNubs)
      setDeadlineItemSuggestedIds(addedIds)
      setDeadlineItemDeletedNubs(deletedNubs)
      setDeadlineItemDeletedIds(deletedIds)

      const originals = {
        "normal": normalNubs,
        "added": addedNubs,
        "removed": deletedNubs,
      }
      setOriginalNubs(originals)

      if (props.deadline.itemsAwaitingApproval) {
        setItemLock(true)
        if (props.deadline.itemsProposerId !== props.user.id) {
          console.log(props.deadline.itemsProposerId)
          console.log(props.user.id)
          setProposedByPartner(true)
        } else {
          setProposedByPartner(false)
        }
      } else if (props.universalLock) {
        setItemLock(true)
      } else {
        setItemLock(false)
      }
      setSuggestionMode(false)
      if (props.deadline.itemsList.length === 0) {
        setSelectedNub({
          id: "",
          name: "",
          default: true,
        })
        setSelectedId("")
      }
    }
  }, [props.deadline, props.reloadDeadlines, props.universalLock])

  useEffect( () => {
    if (deadlineItemSuggestedIds.length === 0 && deadlineItemDeletedIds.length === 0) {
      setSuggestionMode(false)
    }
  }, [deadlineItemSuggestedIds.length, deadlineItemDeletedIds.length])

  const removeItem = (item) => {
    console.log("Just clicked on ", item)
    if (itemLock) {
      return
    }
    let new_ids = []
    let new_nubs = []
    let new_deleted_ids = [...deadlineItemDeletedIds]
    let new_deleted_nubs = [...deadlineItemDeletedNubs]
    let new_existing_ids = []
    let new_existing_nubs = []
    setSuggestionMode(true)
    
    for (let idx=0; idx<deadlineItemSuggestedIds.length; idx++) {
      if (item.id !== deadlineItemSuggestedIds[idx]) {
        new_ids.push(deadlineItemSuggestedIds[idx])
        new_nubs.push(deadlineItemSuggestedNubs[idx])
      }
    }

    for(let idx=0; idx<deadlineItemIds.length; idx++) {
      if (item.id === deadlineItemIds[idx]) {
        console.log("Found it and the item in question is ", deadlineItemIds[idx])
        new_deleted_ids.push(deadlineItemIds[idx])
        new_deleted_nubs.push(deadlineItemNubs[idx])
      } else {
        new_existing_ids.push(deadlineItemIds[idx])
        new_existing_nubs.push(deadlineItemNubs[idx])
      }
    }
    console.log("Existing ids is ", new_existing_ids, " and  nubs is ", new_existing_nubs)
    setDeadlineItemSuggestedIds(new_ids)
    setDeadlineItemSuggestedNubs(new_nubs)
    setDeadlineItemIds(new_existing_ids)
    setDeadlineItemNubs(new_existing_nubs)
    setDeadlineItemDeletedIds(new_deleted_ids)
    setDeadlineItemDeletedNubs(new_deleted_nubs)
  }

  const addItem = (nub) => {
    const all_added = [...deadlineItemNubs, ...deadlineItemSuggestedNubs]
    for (let i = 0; i < all_added.length; i++) {
      if (all_added[i] === nub.id) {
        return
      }
    }
    if (props.createMode) {
      updateNubs([...deadlineItemNubs, nub])
      for (let i = 0; i < contractItemIds.length; i++) {
        if (contractItemIds[i] === nub.id) {
          setDeadlineItemIds([...deadlineItemIds, contractItemIds[i]])
          setSelectedId(nub.id)
          setSelectedNub(nub)
        }
      }
    } else {
      setSuggestionMode(true)
      let foundInDeleted = false
      let foundInContract = false
      for (let i = 0; i < contractItemIds.length; i++) {
        if (contractItemIds[i] === nub.id) {
          foundInContract = true
          for (let j=0; j < deadlineItemDeletedIds.length; j++) {
            if (deadlineItemDeletedIds[j] === nub.id) {
              foundInDeleted = true
            }
          }
          break
        }
      }
      if (foundInContract) {
        if (foundInDeleted) {
          setDeadlineItemNubs([...deadlineItemNubs, nub])
          setDeadlineItemIds([...deadlineItemIds, nub.id])
        } else {
          setDeadlineItemSuggestedNubs([...deadlineItemSuggestedNubs, nub])
          setDeadlineItemSuggestedIds([...deadlineItemSuggestedIds, nub.id])
        }
        setSelectedId(nub.id)
        setSelectedNub(nub)
      }
      const new_deleted_ids = []
      const new_deleted_nubs = []
      for (let i = 0; i < deadlineItemDeletedIds.length; i++) {
        if (nub.id !== deadlineItemDeletedIds[i]) {
          new_deleted_ids.push(deadlineItemDeletedIds[i])
          new_deleted_nubs.push(deadlineItemDeletedNubs[i])
        }
      }
      setDeadlineItemDeletedIds(new_deleted_ids)
      setDeadlineItemDeletedNubs(new_deleted_nubs)
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

  const confirmItemChange = () => {
    setItemLock(true)
    const newItemsIds = [...deadlineItemSuggestedIds]
    for (let i = 0; i < deadlineItemIds.length; i++) {
      let found = false
      for (let j = 0; j < deadlineItemDeletedIds.length; j++) {
        if (deadlineItemIds[i] === deadlineItemDeletedIds[j]) {
          found = true
        }
      }
      if (!found) {
        newItemsIds.push(deadlineItemIds[i])
      }
    }
    console.log("TESTING")
    console.log(props.curContract)
    props.changeDeadlineItems(props.curContract.id, props.deadline.id, newItemsIds)
  }
  
  const revertItemChange = () => {
    setDeadlineItemNubs(originalNubs["normal"])
    setDeadlineItemSuggestedNubs(originalNubs["added"])
    setDeadlineItemDeletedNubs(originalNubs["removed"])

    const normal_ids = []
    const added_ids = []
    const deleted_ids = []

    for (let i = 0; i < originalNubs["normal"].length; i++) {
      normal_ids.push(originalNubs["normal"][i].id)
    }
    for (let i = 0; i < originalNubs["added"].length; i++) {
      added_ids.push(originalNubs["added"][i].id)
    }
    for (let i = 0; i < originalNubs["removed"].length; i++) {
      deleted_ids.push(originalNubs["removed"][i].id)
    }

    setDeadlineItemIds(normal_ids)
    setDeadlineItemSuggestedIds(added_ids)
    setDeadlineItemDeletedIds(deleted_ids)
    setSuggestionMode(false)
  }

  const acceptNewItemsChange = () => {
    props.reactDeadlineItems(props.curContract.id, props.deadline.id, itemsMsgId, decisionTypes.YES)
  }
  const rejectNewItemsChange = () => {
    props.reactDeadlineItems(props.curContract.id, props.deadline.id, itemsMsgId, decisionTypes.NO)
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
    <div className="flex items-center flex-col w-full pr-0 sm:pr-10">
      <div className="p-0 mt-2 pb-2 w-full">
        <div className="flex w-full justify-between">
          <h3 className="text-base leading-6 font-medium text-gray-900 flex items-center">
            <span className="mr-2">
            Required Items:
            </span>
            <span>
              {(itemLock===true) ? (
                <LockClosedIcon className="w-5 h-5 text-gray-500"/>
              ) : (
                <LockOpenIcon className="w-5 h-5 text-gray-500"/>
              )}
            </span>
          </h3>

          {(suggestionMode && !itemLock && !props.universalLock) && (
            <div className="flex items-center">
              <p className="mr-1 text-sm text-gray-400">Commit your new items</p>
              <DecideButton approve={confirmItemChange} reject={revertItemChange}/>
            </div>
          )}
          {(itemLock && !proposedByPartner && !props.universalLock) && (
            <div className="flex items-center">
              <p className="mr-1 text-sm text-gray-400">Awaiting your partner's approval</p>
            </div>
          )}
          {(itemLock && proposedByPartner && !props.universalLock) && (
            <div className="flex items-center">
              <p className="mr-1 text-sm text-gray-400">Approve your partner's change</p>
              <DecideButton approve={acceptNewItemsChange} reject={rejectNewItemsChange}/>
            </div>
          )}
        </div> 
        {!itemLock && (
        <p className="mt-1 text-xs text-gray-500">
          <span>
            Click one to edit
          </span>
          <span>
            or <b className="text-primary4">add</b> to add from existing
          </span>
        </p>)}
        <div className="flex flex-wrap">
          {deadlineItemNubs.map((item) => (
              <DeadlineItemBadge itemLock={itemLock} removeItem={removeItem} addMode={false} deleteMode={false} item={item} key={item.name} selected={(item.id === selectedId)} selectItem={selectItem}/>
          ))}
          {deadlineItemSuggestedNubs.map((item) => (
              <DeadlineItemBadge itemLock={itemLock} removeItem={removeItem} addMode={true} deleteMode={false} item={item} key={item.name} selected={(item.id === selectedId)} selectItem={selectItem}/>
          ))}
          {deadlineItemDeletedNubs.map((item) => (
              <DeadlineItemBadge itemLock={itemLock} removeItem={removeItem} addMode={false} deleteMode={true} item={item} key={item.name} selected={(item.id === selectedId)} selectItem={selectItem}/>
          ))}
          {(showAdd && !props.newDeadlineMode && !props.deleteDeadlineMode && !itemLock) && (
            <Listbox onChange={addItem}>
              {({ open }) => (
                <>
                    <Listbox.Button className="relative inline-flex items-center rounded-full bg-primary3 hover:bg-primary3 px-2 py-0.5 mt-1 mx-1 text-sm">
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
                          {!containsNub({id: item.id, name: item.name}, [...deadlineItemNubs, ...deadlineItemSuggestedNubs]) && (
                            <Listbox.Option
                              
                              className={({ active }) =>
                                classNames(
                                  active ? 'text-primary5' : 'text-gray-900',
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
        </div>
      </div>
      <div className="flex grow w-full">
        
        {selectedNub.default !== true ? ( 
          <ContractItem 
            embedded={true}
            override={props.createMode}
            disabled={true}
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
const mapStateToProps = ({ contract, items, deadlines, user, chat}) => ({
  curContract: contract.curContract,
  reloadDeadlines: deadlines.deadlinesChanged,
  contractItems: items.items,
  contractItemsChanged: items.itemsChanged,
  messages: chat.messages,
  user: user.user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  changeDeadlineItems,
  reactDeadlineItems,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeadlineItems) 
