import React, {Fragment, useState, useEffect, useMemo} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ItemTextArea from "./contract_item_textarea"
import { editContractItem } from "../../../../reducers/contract.reducer"
import {WORKER_TYPE, BUYER_TYPE} from "../../../../services/user.service"


const SAVE_TIME = 350

const ContractItem = (props) => {  
  const [contract_info, setContractInfo] = useState({
    id: "",
    name: "",

    current_body: "",
    worker_body: "",
    buyer_body: "",

    default: true,
  })


  const [role, setRole] = useState(-1)
  const [saveTimeoutId, setSaveTimeoutId] = useState(-1)

  const item_text = useMemo(() => {
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
    console.log("Item text changed in contract_item")
  }, [item_text])

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
    console.log("Refreshing contract item")
    console.log(props.curItems)
    if (props.id && props.curItems && props.curItems.length > 0) {
      for (let i = 0; i < props.curItems.length; i++) {
        if (props.curItems[i].id === props.id) {
          setContractInfo(props.curItems[i])
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
  

  if (props.embedded === true) {
    return (
        <ItemTextArea item_id={props.id} embedded={props.embedded} override={props.override} text_body={item_text} disabled={props.disabled} set_text={setContractText}/>
    )
  }
  return (
    <div className="bg-white shadow sm:rounded-lg">
        <div className="px-2 py-5 sm:p-6">
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

          <div className="mt-2 mr-2 text-sm text-gray-500">
            <ItemTextArea item_id={props.id} override={props.override} text_body={item_text} disabled={props.disabled} set_text={setContractText}/>
          </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ user, contract }) => ({
  curItems: contract.curConItems,
  contractItemsChanged: contract.contractItemsChanged,
  user: user.user,
  selectedId: contract.selectedId, 
  cachedContracts: contract.cachedContracts,

})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  editContractItem,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractItem)

