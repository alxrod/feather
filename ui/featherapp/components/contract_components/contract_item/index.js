import React, {Fragment, useState, useEffect, useMemo, useRef} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ItemTextArea from "./contract_item_textarea"

import {WORKER_TYPE, BUYER_TYPE, ADMIN_TYPE} from "../../../services/user.service"
import { LockOpenIcon, TrashIcon} from "@heroicons/react/outline"
import { LockClosedIcon, } from '@heroicons/react/solid'
import DecideButton from "../decide_button";

import { editContractItem, suggestItem, reactItem } from "../../../reducers/items/dispatchers/items.body.dispatcher"
import { addItem, reactAddItem } from "../../../reducers/items/dispatchers/items.add.dispatcher"
import { deleteItem, reactDeleteItem } from "../../../reducers/items/dispatchers/items.delete.dispatcher"

import { msgMethods, decisionTypes } from "../../../services/chat.service"
import { contractStages } from "../../../services/contract.service"

import ItemNameInput from "./item_name_input"
import FigmaDraft from "./figma_draft"

const SAVE_TIME = 350


const ContractItem = (props) => {  
  const [contract_info, setContractInfo] = useState({
    id: "",
    name: "",

    currentBody: "",
    workerBody: "",
    buyerBody: "",
    oldBody: "",
    figmaComponentId: "",
    awaitingApproval: false,
    awaitingCreation: false,
    default: true,
  })


  const [role, setRole] = useState(-1)
  const [saveTimeoutId, setSaveTimeoutId] = useState(-1)

  const [lock, setLock] = useState(false)
  const [decideMode, toggleDecideMode] = useState(false)

  const contractStage = useMemo(() => {
    return props.curContract?.stage
  })
  

  const item_text = useMemo(() => {
    let i = 0
    if (props.contractItemsChanged) {
      i += 1
    }
    if (props.createMode) {
      return contract_info.currentBody
    } else if (role === WORKER_TYPE) {
      return contract_info.workerBody
    } else if (role === BUYER_TYPE) {
      return contract_info.buyerBody
    } else if (role === ADMIN_TYPE) {
      return contract_info.currentBody
    } else {
      return contract_info.currentBody
    }
  })

  useEffect( () => {
    if (item_text !== contract_info.oldBody && !lock && !props.createMode) {
      toggleDecideMode(true)
    } else {
      toggleDecideMode(false)
    }
  }, [item_text, contract_info.currentBody, contract_info.workerBody, contract_info.buyerBody])
  

  const [proposedByPartner, setProposedByPartner] = useState(false)
  const [itemMsgId, setItemMsgId] = useState("")
  const [suggestMode, toggleSuggestMode] = useState(false)
  
  useEffect(() => {
    let final_item_id = ""
    for (let i = 0; i < props.messages.length; i++) {
      if (props.messages[i].method === msgMethods.ITEM) {
        if (props.messages[i].body.itemId === props.id && !props.messages[i].body.resolved) {
          final_item_id = props.messages[i].id
          if (props.messages[i].user.id === props.user.id) {
            setProposedByPartner(false)
          } else {
            setProposedByPartner(true)
          }
        }
      } else if (props.messages[i].method === msgMethods.ITEM_CREATE) {
        if (props.messages[i].body.item.id === props.id && !props.messages[i].body.resolved) {
          final_item_id = props.messages[i].id
          if (props.messages[i].user.id === props.user.id) {
            setProposedByPartner(false)
          } else {
            setProposedByPartner(true)
          }
        }
      } else if (props.messages[i].method === msgMethods.ITEM_DELETE) {
        if (props.messages[i].body.item.id === props.id && !props.messages[i].body.resolved) {
          final_item_id = props.messages[i].id
          if (props.messages[i].user.id === props.user.id) {
            setProposedByPartner(false)
          } else {
            setProposedByPartner(true)
          }
        }
      } 
    }
    setItemMsgId(final_item_id)

  }, [props.messages.length, props.deadline])

  useEffect( () => {
    if (props.createMode) {
      return
    }
    if (props.user !== null && props.curContract.id) {
      if (props.user.id === props.curContract.worker.id) {
        setRole(WORKER_TYPE)
      } else if (props.user.id === props.curContract.buyer.id) {
        setRole(BUYER_TYPE)
      } else if (props.user.adminStatus) {
        setRole(ADMIN_TYPE)
      }
    }
  }, [props.curContract, props.user])
  
  useEffect(() => {
    if (props.id && props.curItems && props.curItems.length > 0) {
      for (let i = 0; i < props.curItems.length; i++) {
        if (props.curItems[i].id === props.id) {
          const new_info = JSON.parse(JSON.stringify(props.curItems[i]));
          new_info.oldBody = new_info.currentBody
          setContractInfo(new_info)
          if (props.curItems[i].awaitingApproval) {
            setLock(true)
          } else if (props.universalLock) {
            setLock(true)
          } else {
            setLock(false)
          }
        }
      }
    }
  }, [props.curItems, props.id, props.contractItemsChanged, props.universalLock])


  const setContractText = (new_text) => {
    let new_contract_info = JSON.parse(JSON.stringify(contract_info));
    if (props.createMode === true) {
      new_contract_info.currentBody = new_text;
      new_contract_info.workerBody = new_text;
      new_contract_info.buyerBody = new_text;
    } else if (role === WORKER_TYPE) {
      new_contract_info.workerBody = new_text;
    } else if (role === BUYER_TYPE) {
      new_contract_info.buyerBody = new_text;
    } else if (role === ADMIN_TYPE) {
      new_contract_info.currentBody = new_text;
      new_contract_info.workerBody = new_text;
      new_contract_info.buyerBody = new_text;
    }
    setContractInfo(new_contract_info);

    if (props.createMode) {
      if (saveTimeoutId !== -1) {
        clearTimeout(saveTimeoutId);
      }
      const id = setTimeout(function() {
        props.editContractItem(new_contract_info);
        setSaveTimeoutId(-1)
      },SAVE_TIME)
      setSaveTimeoutId(id)
    }
  }

  const submitBodyEdit = () => {
    if (!props.createMode) {
      props.suggestItem(props.curContract.id, props.id, item_text)
      toggleDecideMode(false)
    }
  }

  const rejectBodyEdit = () => {
    setContractText(contract_info.currentBody)
  }
  
  const approveChange = () => {
    props.reactItem(props.curContract.id, itemMsgId, props.id, decisionTypes.YES)
  }
  const denyChange = () => {
    props.reactItem(props.curContract.id, itemMsgId, props.id, decisionTypes.NO)
  }

  const approveCreate = () => {
    props.reactAddItem(props.curContract.id, itemMsgId, props.id, decisionTypes.YES)
  }
  const denyCreate = () => {
    props.reactAddItem(props.curContract.id, itemMsgId, props.id, decisionTypes.NO)
  }

  const approveDelete = () => {
    props.reactDeleteItem(props.curContract.id, itemMsgId, props.id, decisionTypes.YES)
  }
  const denyDelete = () => {
    props.reactDeleteItem(props.curContract.id, itemMsgId, props.id, decisionTypes.NO)
  }


  const addItem = () => {
    if (props.suggestMode) {
      props.addItem(props.curContract.id, contract_info.name, item_text).then( () => {
        props.createCallback()
      })
    }
  }


  const suggestDeleteItem = () => {
    props.deleteItem(props.curContract.id, contract_info.id, contract_info.name, contract_info.currentBody, props.createMode)
  }
  
  const inputSpan = useRef()
  const [content, setContent] = useState("Item 1")
  const [inputWidth, setInputWidth] = useState(100)
  if (props.embedded === true) {
    return (
      <div className="w-full h-full grow flex flex-col relative">
        <ItemTextArea 
          item_id={props.id} 
          embedded={props.embedded} 
          role={role} 
          contract_info={contract_info} 
          override={props.createMode} 
          text_body={item_text} 
          disabled={props.disabled || (!props.createMode && lock)} 
          set_text={setContractText}
        />
        <div className="absolute z-10 bottom-5 right-5 flex">
          {(contract_info.awaitingDeletion && !proposedByPartner) && (
            <h3 className="text-gray-400 mr-2 text-md">(awaiting approval to delete)</h3>
          )}
          {(!props.createMode && lock) && (
            <LockClosedIcon className="ml-1 w-6 h-6 text-gray-500"/>
          )}
          {(props.suggestMode) && (
            <div className="flex items-center">
              <h3 className="text-gray-400 mr-2 text-md">Save your new item</h3>
              <DecideButton approve={addItem} reject={suggestDeleteItem}/>
            </div>
          )}
          {(!props.createMode && !lock && decideMode && !props.suggestMode) && (
            <div className="flex items-center">
              <h3 className="text-gray-400 mr-2 text-md">Save your changes</h3>
              <DecideButton approve={submitBodyEdit} reject={rejectBodyEdit}/>
            </div>
          )}
          {(lock && proposedByPartner && !contract_info.awaitingDeletion && !contract_info.awaitingCreation && !(contractStage === contractStages.SETTLE)) && (
            <div className="flex items-center">
              <h3 className="text-gray-400 mr-2 text-md">Approve your partner's changes</h3>
              <DecideButton approve={approveChange} reject={denyChange}/>
            </div>
          )}
          {(lock && contract_info.awaitingCreation && proposedByPartner && !(contractStage === contractStages.SETTLE)) && (
            <div className="flex items-center">
              <h3 className="text-gray-400 mr-2 text-md">Approve your partner's created item</h3>
              <DecideButton approve={approveCreate} reject={denyCreate}/>
            </div>
          )}
          {(lock && contract_info.awaitingDeletion && proposedByPartner && !(contractStage === contractStages.SETTLE)) && (
            <div className="flex items-center">
              <h3 className="text-gray-400 mr-2 text-md">Approve your partner's deleting this item</h3>
              <DecideButton approve={approveDelete} reject={denyDelete}/>
            </div>
          )}
          {(!lock && !props.suggestMode && !decideMode) && (
            <button onClick={suggestDeleteItem}>
              <TrashIcon className="text-primary3 hover:text-primary4 hover:text-primary5 w-6 h-6"/>
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={"bg-white shadow sm:rounded-lg "  + (contract_info.awaitingCreation ? "border-2 border-green-400" : "") + (contract_info.awaitingDeletion ? "border-2 border-red-400" : "")}>
      <div className="px-2 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ItemNameInput
                value={contract_info.name}
                setValue={(name) => {contract_info.name = name}}
                // disabled={!props.createMode}
                disabled={true}
              />
              {(!props.createMode && lock) && (
                <LockClosedIcon className="ml-1 w-6 h-6 text-gray-500"/>
              )}
              {(!props.createMode && !lock)  && (
                <LockOpenIcon className="ml-1 w-6 h-6 text-gray-500"/>
              )}
              {(contract_info.awaitingDeletion && !proposedByPartner) && (
                <h3 className="text-gray-400 mr-2 text-md">(awaiting approval to delete)</h3>
              )}
            </div>
              <div>
                {(!props.createMode && props.suggestMode) && (
                  <div className="flex items-center">
                    <h3 className="text-gray-400 mr-2 text-md">Save your new item</h3>
                    <DecideButton approve={addItem} reject={deleteItem}/>
                  </div>
                )}
                {(!props.createMode && !lock && decideMode && !props.suggestMode) && (
                  <div className="flex items-center">
                    <h3 className="text-gray-400 mr-2 text-md">Save your changes</h3>
                    <DecideButton approve={submitBodyEdit} reject={rejectBodyEdit}/>
                  </div>
                )}
                {(lock && proposedByPartner && !contract_info.awaitingDeletion && !contract_info.awaitingCreation && !(contractStage === contractStages.SETTLE)) && (
                  <div className="flex items-center">
                    <h3 className="text-gray-400 mr-2 text-md">Approve your partner's changes</h3>
                    <DecideButton approve={approveChange} reject={denyChange}/>
                  </div>
                )}
                {(lock && contract_info.awaitingCreation && proposedByPartner && !(contractStage === contractStages.SETTLE)) && (
                  <div className="flex items-center">
                    <h3 className="text-gray-400 mr-2 text-md">Approve your partner's created item</h3>
                    <DecideButton approve={approveCreate} reject={denyCreate}/>
                  </div>
                )}
                {(lock && contract_info.awaitingDeletion && proposedByPartner && !(contractStage === contractStages.SETTLE)) && (
                  <div className="flex items-center">
                    <h3 className="text-gray-400 mr-2 text-md">Approve your partner's deleting this item</h3>
                    <DecideButton approve={approveDelete} reject={denyDelete}/>
                  </div>
                )}
                {(!lock && !props.suggestMode && !decideMode) && (
                  <button onClick={suggestDeleteItem}>
                    <TrashIcon className="text-primary3 hover:text-primary4 hover:text-primary5 w-6 h-6"/>
                  </button>
                )}
              </div>
          </div>

        <div className="mt-2 mr-2 text-sm text-gray-500">
          <h1 className="text-gray-500 text-xl mb-2">Requirements: </h1>
          <ItemTextArea item_id={props.id} lock={lock} override={props.createMode} role={role} contract_info={contract_info} text_body={item_text} disabled={props.disabled} set_text={setContractText}/>
        </div>

        {(!props.createMode && contract_info.figmaComponentId !== "" && props.curContract.figmaLink !== "") && (
          <div className="mt-2">
            <h1 className="text-gray-500 text-xl">Component Draft: </h1>
            <FigmaDraft item_id={props.id} item_info={contract_info}/>
          </div>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = ({ user, contract, items, chat }) => ({
  curItems: items.items,
  contractItemsChanged: items.itemsChanged,
  user: user.user,
  curContract: contract.curContract,
  messages: chat.messages,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  editContractItem,
  suggestItem,
  reactItem,
  reactAddItem,
  reactDeleteItem,
  addItem,
  deleteItem,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractItem)

