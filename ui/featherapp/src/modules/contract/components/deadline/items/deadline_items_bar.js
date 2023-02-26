import {useEffect, useState, useMemo, Fragment } from 'react'
import {WORKER_TYPE, BUYER_TYPE} from '../../../../../services/user.service'
import {deadlineItemTypes, msgMethods, decisionTypes} from '../../../../../services/chat.service'
import {changeDeadlineItems, reactDeadlineItems} from "../../../../../reducers/deadlines/dispatchers/deadlines.items.dispatcher"

import {Tooltip, Button} from "flowbite-react"
import DeadlineItemBadge from  "./deadline_item_badge"
import { Listbox, Transition } from '@headlessui/react'
import ContractItem from "../../contract_item/contract_item"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DecideButton from '../../decide_button'

import { LockOpenIcon, PlusIcon } from '@heroicons/react/outline'
import { LockClosedIcon } from '@heroicons/react/solid'
import { update } from 'autosize'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DeadlineItemsBar = (props) => {
  
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

  const saveNubs = (new_nubs, edit=true) => {
    setDeadlineItemNubs(new_nubs)
    if (props.editDeadline && edit) {
      const newDeadline = props.deadline
      newDeadline.itemsList = new_nubs
      props.editDeadline(newDeadline)
      props.saveDeadlines()
    }
  }

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
        if (item.id === props.selectedId) {
          props.setSelectedId(item.id)
        } 
        for (let i = 0; i < deadlineItemNubs.length; i++) {
          if (item.id === deadlineItemNubs[i].id) {
            contained += 1
          }
        }
      }
      
      setContractItemIds(contractItemIds)
      toggleShowAdd(true)

    }
  }, [props.contractItems.length, props.contractItemsChanged, deadlineItemNubs.length])

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
        if (!props.createMode && props.deadline.itemStatesList[i] === deadlineItemTypes.ITEM_ADDED) {
          addedNubs.push(props.deadline.itemsList[i])
          addedIds.push(props.deadline.itemsList[i].id)
        } else if (!props.createMode &&  props.deadline.itemStatesList[i] === deadlineItemTypes.ITEM_REMOVED) {
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
        props.setSelectedId("")
      }
    }
  }, [props.deadline, props.reloadDeadlines, props.universalLock])

  useEffect( () => {
    if (deadlineItemSuggestedIds.length === 0 && deadlineItemDeletedIds.length === 0) {
      setSuggestionMode(false)
    }
  }, [deadlineItemSuggestedIds.length, deadlineItemDeletedIds.length])

  useEffect( () => {
    let found = false
    for (let i = 0; i < props.contractItems.length; i++) {
      if (props.contractItems.id === props.selectedId) {
        found = true
      }
    }
    if (!found) {
      props.setSelectedId("")
    }
  }, [props.deadlinesPurged])

  const removeItem = (item) => {
    if (itemLock) {
      return
    }
    if (item.id === "new_negotiate") {
      props.setAddItemMode(false)
    }

    props.setSelectedId("")


    if (props.createMode) {
      const new_deadline_ids = []
      const new_deadline_nubs = []
      for(let idx=0; idx<deadlineItemIds.length; idx++) {
        if (item.id !== deadlineItemIds[idx]) {
          new_deadline_ids.push(deadlineItemIds[idx])
          new_deadline_nubs.push(deadlineItemNubs[idx])
        }
      }
      setDeadlineItemIds(new_deadline_ids)
      setDeadlineItemNubs(new_deadline_nubs)
      saveNubs(new_deadline_nubs, !(item.id === "new_negotiate"))
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
          new_deleted_ids.push(deadlineItemIds[idx])
          new_deleted_nubs.push(deadlineItemNubs[idx])
      } else {
        new_existing_ids.push(deadlineItemIds[idx])
        new_existing_nubs.push(deadlineItemNubs[idx])
      }
    }
    setDeadlineItemSuggestedIds(new_ids)
    setDeadlineItemSuggestedNubs(new_nubs)
    setDeadlineItemIds(new_existing_ids)
    setDeadlineItemNubs(new_existing_nubs)
    setDeadlineItemDeletedIds(new_deleted_ids)
    setDeadlineItemDeletedNubs(new_deleted_nubs)
    console.log("Setting selected to empty")
    props.setSelectedId("")
  }

  useEffect(() => {
    if (props.confirmItem) {
      const newIds = []
      const newNubs = []

      for (let i = 0; i < deadlineItemSuggestedIds.length; i++) {
        if (deadlineItemSuggestedIds[i] !== "new_negotiate") {
          newIds.push(deadlineItemSuggestedIds[i])
          newNubs.push(deadlineItemSuggestedNubs[i])
        } else {
          if (props.createdItem?.id) {
            newIds.push(props.createdItem?.id)
            newNubs.push(props.createdItem)
          }
        }
      }

      if (props.createMode) {
        saveNubs([...deadlineItemNubs, ...newNubs], true)
        setDeadlineItemSuggestedIds([])
        setDeadlineItemSuggestedNubs([])
      
      } else {
        confirmItemChange(newIds, deadlineItemIds, deadlineItemDeletedIds)
      }

      props.setConfirmItem(false)
      props.setAddItemMode(false)
      toggleShowAdd(true)
      props.setSelectedId(props.createdItem.id)
    }
  }, [props.confirmItem])

  useEffect(() => {
    if (props.deleteSuggestedItem) {
      const newIds = []
      const newNubs = []
      for (let i = 0; i < deadlineItemSuggestedIds.length; i++) {
        if (deadlineItemSuggestedIds[i] !== "new_negotiate") {
          newIds.push(deadlineItemSuggestedIds[i])
          newNubs.push(deadlineItemSuggestedNubs[i])
        }
      }
      setDeadlineItemSuggestedIds(newIds)
      setDeadlineItemSuggestedNubs(newNubs)
    }
    props.setDeleteSuggestedItem(false)
  }, [props.deleteSuggestedItem])

  const addItem = (nub) => {
    if (nub.id === "NEW_ITEM") {
      let maxNum = 0
      for (let i = 0; i < props.contractItems.length; i++) {
        const name = props.contractItems[i].name
        const split = name.split(" ")
        const num = parseInt(split[split.length - 1])
        if (num > maxNum) {
          maxNum = num
        }
      }
      const newName = (maxNum + 1)
      nub.name="Item "+newName

      props.setAddItemMode(true)
      props.setNewItemName(nub.name)
      props.setNewItemBody("")

      nub.id="new_negotiate"
    }
    
    const all_added = [...deadlineItemNubs, ...deadlineItemSuggestedNubs]
    for (let i = 0; i < all_added.length; i++) {
      if (all_added[i] === nub.id) {
        return
      }
    }
    if (props.createMode && !(nub.id === "new_negotiate")) {
      saveNubs([...deadlineItemNubs, nub])
      setDeadlineItemIds([...deadlineItemIds, nub.id])
      props.setSelectedId(nub.id)
    } else {
      if (!props.addItemMode) {
        setSuggestionMode(true)
      }
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
      if (foundInContract || nub.id === "new_negotiate") {
        if (foundInDeleted) {
          setDeadlineItemNubs([...deadlineItemNubs, nub])
          setDeadlineItemIds([...deadlineItemIds, nub.id])
        } else {
          setDeadlineItemSuggestedNubs([...deadlineItemSuggestedNubs, nub])
          setDeadlineItemSuggestedIds([...deadlineItemSuggestedIds, nub.id])
        }
        props.setSelectedId(nub.id)
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

  const confirmItemChange = (suggestedIds, normalIds, deletedIds) => {
    if (!props.addItemMode) {
      setItemLock(true)
    }
    const newItemsIds = [...suggestedIds]
    for (let i = 0; i < normalIds.length; i++) {
      let found = false
      for (let j = 0; j < deletedIds.length; j++) {
        if (normalIds[i] === deletedIds[j]) {
          found = true
        }
      }
      if (!found) {
        newItemsIds.push(normalIds[i])
      }
    }
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
    console.log("props.selecting item")
    props.setSelectedId(id)
  }
  return (
    <div className="p-0 mt-2 pb-2 w-full">
      <div className="flex w-full justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
          <span className="mr-2">
            Required Items:
          </span>
          <span>
            {(itemLock===true) ? (
              <LockClosedIcon className="w-6 h-6 text-gray-500"/>
            ) : (
              <LockOpenIcon className="w-6 h-6 text-gray-500"/>
            )}
          </span>
        </h3>

        {(suggestionMode && !itemLock && !props.universalLock && !props.addItemMode) && (
          <div className="flex items-center">
            <p className="mr-1 text-base text-gray-400">Commit your new items</p>
            <DecideButton approve={() => {
              confirmItemChange(deadlineItemSuggestedIds, deadlineItemIds, deadlineItemDeletedIds)
            }} reject={revertItemChange}/>
          </div>
        )}
        {(itemLock && !proposedByPartner && !props.universalLock) && (
          <div className="flex items-center">
            <p className="mr-1 text-base text-gray-400">Awaiting your partner's approval</p>
          </div>
        )}
        {(itemLock && proposedByPartner && !props.universalLock) && (
          <div className="flex items-center">
            <p className="mr-1 text-base text-gray-400">Approve your partner's change</p>
            <DecideButton approve={acceptNewItemsChange} reject={rejectNewItemsChange}/>
          </div>
        )}
      </div> 
      <div className="flex flex-wrap items-center">
        {deadlineItemNubs.map((item) => (
            <DeadlineItemBadge itemLock={itemLock} removeItem={removeItem} addMode={false} deleteMode={false} item={item} key={item.name} selected={(item.id === props.selectedId)} selectItem={selectItem}/>
        ))}
        {deadlineItemSuggestedNubs.map((item) => (
            <DeadlineItemBadge itemLock={itemLock} removeItem={removeItem} addMode={true} deleteMode={false} item={item} key={item.name} selected={(item.id === props.selectedId)} selectItem={selectItem}/>
        ))}
        {deadlineItemDeletedNubs.map((item) => (
            <DeadlineItemBadge itemLock={itemLock} removeItem={removeItem} addMode={false} deleteMode={true} item={item} key={item.name} selected={(item.id === props.selectedId)} selectItem={selectItem}/>
        ))}
        {(showAdd && !props.newDeadlineMode && !props.deleteDeadlineMode && !itemLock) && (
          <Listbox onChange={addItem}>
            {({ open }) => (
              <>  
                  {!props.addItemMode && (
                    <Listbox.Button ref={props.addButton} className="relative flex items-center rounded-lg bg-primary3 hover:bg-primary3 px-2 py-0.5 mt-1 mx-1 text-sm">
                      <span className="text-sm p-0.5 font-medium text-white">add</span>
                    </Listbox.Button>
                  )}

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="max-w-[300px] absolute z-10 mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none text-lg">
                      {props.contractItems.map((item) => (
                        <Fragment key={item.id}>
                        {!containsNub({id: item.id, name: item.name}, [...deadlineItemNubs, ...deadlineItemSuggestedNubs]) && (
                          <Listbox.Option
                            
                            className={({ active }) =>
                              classNames(
                                active ? 'text-primary5' : 'text-gray-900',
                                'cursor-default select-none relative p-0 px-4 text-lg',
                                (props.contractItems.length > 1) ? "py-1 border-b-1 border-gray-700" : ""
                              )
                            }
                            value={{id: item.id, name: item.name}}
                          >
                            {({ selected, active }) => (
                              <>
                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate flex')}>
                                  <span>{item.name}:</span>{" "}<div className={"w-[15px]"}/><span>{item.currentBody.substring(0,20)}...</span>
                                </span>

                              </>
                            )}
                          </Listbox.Option>
                        )}
                        </Fragment>
                      ))}
                      <Listbox.Option    
                        className={({ active }) =>
                          classNames(
                            active ? 'text-primary5' : 'text-gray-900',
                            'cursor-default select-none relative p-0 px-4 text-lg my-2',
                          )
                        }
                        value={{id: "NEW_ITEM"}}
                      >
                        {({ selected, active }) => (
                          <>
                            <button className={'mx-auto flex justify-center text-primary4 items-center font-semibold hover:text-primary6'}>
                              <div className="flex items-center">
                                <span>New Item</span>{" "}<PlusIcon className={"ml-2 mt-0.5 w-4 h-4"}/>
                              </div>
                            </button>

                          </>
                        )}
                      </Listbox.Option>
                    </Listbox.Options>
                  </Transition>
              </>
            )}
          </Listbox>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = ({ contract, items, deadlines, user, chat}) => ({
  curContract: contract.curContract,
  reloadDeadlines: deadlines.deadlinesChanged,
  deadlinesPurged: deadlines.deadlinesPurged,
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
)(DeadlineItemsBar) 
