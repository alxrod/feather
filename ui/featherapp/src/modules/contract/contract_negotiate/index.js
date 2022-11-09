import React, {useState, useMemo, useEffect } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {queryContract } from "../../../reducers/contract/dispatchers/contract.dispatcher"
import { addContractItem } from "../../../reducers/items/dispatchers/items.add.dispatcher"
import { genEmptyContract } from '../../../services/contract.service';
import { contractStages } from '../../../services/contract.service';

import ContractItem from "../components/contract_item/contract_item";
import NewContractItem from "../components/contract_item/new_contract_item";
import CriticalCriteria from "../components/criteria/critical_criteria";
import MainChat from "../components/chat/main_chat";
import PartnerCard from "../components/summary/partner_profile_card";
import SignContract from "../components/advance_cards/sign_contract"
import { push } from 'connected-react-router'
import RejoinMonitor from "../components/rejoin_monitor"

const ContractNegotiate = (props) => {
  let [reload, setReload] = useState(true)

  const [nextContractName, setNextContractName] = useState("")

  const contract = useMemo(() => {
    if (props.curContract.id) {
      return props.curContract
    } else {
      return genEmptyContract()
    }
  }, [props.curContract])

  const { params: { contractId } } = props.match;
  useEffect( () => {
    if (props.curContract.id) {
      if (props.curContract.stage > contractStages.NEGOTIATE) {
        props.push("/contract/"+props.curContract.id)
      }
    }
  }, [props.curContract, props.contractChanged])

  useEffect(() => {
    // console.log("Calling the reload effect")
    if (reload) {
      props.queryContract(contractId)
      setReload(false)
    } 
  }, [reload])
  
  const [contractItemIds, setContractItemIds] = useState([])
  const [addItemMode, toggleAddItemMode] = useState(false)

  useEffect(() => {
    if (contractItemIds !== undefined) {
      let ids = []
      let max = 0
      for (let i = 0; i < props.curConItems.length; i++) {
        const num = parseInt(props.curConItems[i].name.split(" ")[1])
        if (num > max) {
          max = num
        }
        
        ids.push(props.curConItems[i].id)
      }
      setNextContractName((max+1).toString())
      setContractItemIds(ids)
    }
  }, [contract, props.contractItemsChanged, props.curConItems.length])



  const addContractItem = () => {
    props.addContractItem(false, "new_negotiate", nextContractName)
    toggleAddItemMode(true)
  }

	return (
    <>
      <RejoinMonitor/>
      <div className="p-4 sm:p-6 lg:p-8 m-auto">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col min-w-[45vw] grow mr-10">
            <div className="mb-5">
              <PartnerCard title={contract.title} summary={contract.summary}/>
            </div>
            <div> 
              <CriticalCriteria
                  contractItemIds={contractItemIds}
                  createMode={false}
                  active={true}
              />
            </div>
          </div>
          <div className="flex flex-row min-w-[45vw]">
            <MainChat roomId={contract.roomId}/>
          </div>
        </div>
        <div className="mt-5">
          <SignContract/>
        </div>
        <div className="mt-5">
          {contractItemIds.map((item_id) => (
            <div className="min-h-[100px] w-full mb-5" key={item_id}>
              <ContractItem override={false} id={item_id} suggestMode={item_id === "new_negotiate"} createCallback={() => {toggleAddItemMode(false)}}/>
            </div>
          ))}
        </div>
        {(!addItemMode) && (
          <NewContractItem addContractItem={addContractItem}/>
        )}
        
      </div>
    </>
	)
}

const mapStateToProps = ({ user, contract, items}) => ({
  curContract: contract.curContract,
  contractChanged: contract.contractChanged,
  contractItemsChanged: items.items,
  curConItems: items.items,
  user: user.user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  queryContract,
  addContractItem,
  push,
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(ContractNegotiate)