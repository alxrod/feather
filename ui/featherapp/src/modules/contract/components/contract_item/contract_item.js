import React, {Fragment, useState, useEffect, useMemo} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ItemTextArea from "./contract_item_textarea"
import { editContractItem, suggestItem } from "../../../../reducers/contract.reducer"
import {WORKER_TYPE, BUYER_TYPE} from "../../../../services/user.service"
import { LockOpenIcon } from "@heroicons/react/outline"
import { LockClosedIcon } from '@heroicons/react/solid'
import DecideButton from "../decide_button";

import { reactItem } from '../../../../reducers/contract.reducer'
import { msgMethods, decisionTypes } from "../../../../services/chat.service"


const SAVE_TIME = 350

const ContractItem = (props) => {  
  const [contract_info, setContractInfo] = useState({
    id: "",
    name: "",

    currentBody: "",
    workerBody: "",
    buyerBody: "",

    default: true,
  })


  const [role, setRole] = useState(-1)
  const [saveTimeoutId, setSaveTimeoutId] = useState(-1)

  const [lock, setLock] = useState(false)
  const [decideMode, toggleDecideMode] = useState(false)

  const item_text = useMemo(() => {
    let i = 0
    if (props.contractItemsChanged) {
      i += 1
    }
    if (props.override) {
      return contract_info.currentBody
    } else if (role === WORKER_TYPE) {
      return contract_info.workerBody
    } else if (role === BUYER_TYPE) {
      return contract_info.buyerBody
    } else {
      return contract_info.currentBody
    }
  })

  useEffect( () => {
    if (item_text !== contract_info.currentBody && !lock) {
      toggleDecideMode(true)
    } else {
      toggleDecideMode(false)
    }
  }, [item_text, props.contractItemsChanged])

  const [proposedByPartner, setProposedByPartner] = useState(false)
  const [itemMsgId, setItemMsgId] = useState("")
  
  useEffect(() => {
    let final_item_id = ""
    for (let i = 0; i < props.messages.length; i++) {
      if (props.messages[i].method === msgMethods.ITEM) {
        if (props.messages[i].itemBody.itemId === props.id) {
          final_item_id = props.messages[i].id
          if (props.messages[i].user.id === props.user.user_id) {
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
    if (props.override) {
      return
    }
    if (props.user !== null && props.selectedId !== "") {
      let contract = props.cachedContracts[props.selectedId]
      if (props.user.user_id === contract.worker.id) {
        setRole(WORKER_TYPE)
      } else if (props.user.user_id === contract.buyer.id) {
        setRole(BUYER_TYPE)
      }
    }
  }, [props.selectedId, props.cachedContracts, props.user])
  
  useEffect(() => {
    if (props.id && props.curItems && props.curItems.length > 0) {
      for (let i = 0; i < props.curItems.length; i++) {
        if (props.curItems[i].id === props.id) {
          setContractInfo(props.curItems[i])
          if (props.curItems[i].awaitingApproval) {
            setLock(true)
          } else {
            setLock(false)
          }
        }
      }
    }
  }, [props.curItems, props.id, props.contractItemsChanged])


  const setContractText = (new_text) => {
    let new_contract_info = JSON.parse(JSON.stringify(contract_info));
    if (props.override === true) {
      new_contract_info.currentBody = new_text;
      new_contract_info.workerBody = new_text;
      new_contract_info.buyerBody = new_text;
    } else if (role === WORKER_TYPE) {
      new_contract_info.workerBody = new_text;
    } else if (role === BUYER_TYPE) {
      new_contract_info.buyerBody = new_text;
    }
    setContractInfo(new_contract_info);

    if (props.override) {
      if (saveTimeoutId !== -1) {
        clearTimeout(saveTimeoutId);
      }
      const id = setTimeout(function() {
        // console.log("Saving the contract item...")
        props.editContractItem(new_contract_info);
        setSaveTimeoutId(-1)
      },SAVE_TIME)
      setSaveTimeoutId(id)
    }
  }

  const submitBodyEdit = () => {
    if (!props.override) {
      props.suggestItem(props.selectedId, props.id, item_text)
    }
    
  }

  const rejectBodyEdit = () => {
    setContractText(contract_info.currentBody)
  }
  
  const approveChange = () => {
    props.reactItem(props.selectedId, itemMsgId, props.id, decisionTypes.YES)
  }
  const denyChange = () => {
    props.reactItem(props.selectedId, itemMsgId, props.id, decisionTypes.NO)
  }

  if (props.embedded === true) {
    return (
        <ItemTextArea item_id={props.id} embedded={props.embedded} role={role} contract_info={contract_info} override={props.override} text_body={item_text} disabled={props.disabled} set_text={setContractText}/>
    )
  }
  return (
    <div className="bg-white shadow sm:rounded-lg">
        <div className="px-2 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-lg"
                >
                  <span className="absolute flex-shrink-0 flex items-center justify-center">
                  <span
                      className='bg-indigo-500 h-1.5 w-1.5 rounded-full'
                      aria-hidden="true"
                  />
                  </span>
                  <span className="ml-3.5 font-medium text-gray-900">{contract_info.name}</span>
                </a>
                {(!props.override && lock) && (
                  <LockClosedIcon className="ml-1 w-6 h-6 text-gray-500"/>
                )}
                {(!props.override && !lock)  && (
                  <LockOpenIcon className="ml-1 w-6 h-6 text-gray-500"/>
                )}
              </div>
                {(!props.override && decideMode) && (
                  <div className="flex items-center">
                    <h3 className="text-gray-400 mr-2 text-md">Save your changes</h3>
                    <DecideButton approve={submitBodyEdit} reject={rejectBodyEdit}/>
                  </div>
                )}
                {(lock && proposedByPartner) && (
                  <div className="flex items-center">
                    <h3 className="text-gray-400 mr-2 text-md">Approve your partner's changes</h3>
                    <DecideButton approve={approveChange} reject={denyChange}/>
                  </div>
                )}
            </div>

          <div className="mt-2 mr-2 text-sm text-gray-500">
            <ItemTextArea item_id={props.id} lock={lock} override={props.override} role={role} contract_info={contract_info} text_body={item_text} disabled={props.disabled} set_text={setContractText}/>
          </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ user, contract, chat }) => ({
  curItems: contract.curConItems,
  contractItemsChanged: contract.contractItemsChanged,
  user: user.user,
  selectedId: contract.selectedId, 
  cachedContracts: contract.cachedContracts,
  messages: chat.messages,

})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  editContractItem,
  suggestItem,
  reactItem,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractItem)

