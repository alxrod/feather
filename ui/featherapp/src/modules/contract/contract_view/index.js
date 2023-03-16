import React, {useState, useMemo, useEffect } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {queryContract } from "../../../reducers/contract/dispatchers/contract.dispatcher"
import { toggleLock } from "../../../reducers/contract/dispatchers/contract.lock.dispatcher"
import { addItem } from "../../../reducers/items/dispatchers/items.add.dispatcher"
import { genEmptyContract } from '../../../services/contract.service';
import { contractStages } from '../../../services/contract.service';

import ContractItem from "../components/contract_item/contract_item";
import NewContractItem from "../components/contract_item/new_contract_item";
import CriticalCriteria from "../components/criteria/critical_criteria";
import MainChat from "../components/chat/main_chat";
import OverviewCard from "../components/summary/overview_card";
import SettleContract from "../components/advance_cards/settle_contract";
import DeadlineField from "../components/deadline/deadline_field";
import { push } from 'connected-react-router';
import UniversalLockCard from "../components/universal_lock/universal_lock_card";
import RejoinMonitor from "../components/rejoin_monitor"
import FigmaLinkField from '../components/figma_link';
const ContractDraft = (props) => {
  const [universalLock, setUniversalLock] = useState(true)
  const [completeMode, setCompleteMode] = useState(false)

  const [reload, setReload] = useState(true)

  const [nextItemName, setNextItemName] = useState("")

  const { params: { contractId } } = props.match;
  useEffect( () => {
    if (props.curContract.id) {
      if (props.curContract.universalLock) {
        setUniversalLock(true)
      } else {
        setUniversalLock(false)
      }
      if (props.curContract.stage > contractStages.ACTIVE && props.curContract.stage !== contractStages.COMPLETE) {
        props.push("/contract/"+props.curContract.id)
      } else if (props.curContract.stage === contractStages.COMPLETE) {
        setCompleteMode(true)
        setUniversalLock(true)
      }
    }
  }, [props.curContract])

  useEffect(() => {
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
      setNextItemName((max+1).toString())
      setContractItemIds(ids)
    }
  }, [props.curContract, props.contractItemsChanged, props.curConItems.length])

  const addItem = (name, body) => {
    props.addItem(props.curContract.id, name, body, props.curConItems)
    toggleAddItemMode(true)
  }

  const requestLockChange = () => {
    props.toggleLock(props.curContract.id, !universalLock)
  }

	return (
    <>
      <RejoinMonitor/>
      <div className="p-4 sm:p-6 lg:p-12 m-auto">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col grow order-2 md:order-1">
            {!completeMode && (
              <div className="mb-2">
                <UniversalLockCard 
                  universalLock={universalLock}
                  requestLockChange={requestLockChange}
                />
              </div>
            )}
            <OverviewCard title={props.curContract.title} summary={props.curContract.summary} universalLock={universalLock}/>
            <div className="mt-5">
              <FigmaLinkField lock={universalLock}/>
            </div>
            <DeadlineField
              createMode={false} 
              universalLock={universalLock}
              contractItemIds={contractItemIds}
            />
          </div>
          <div className="flex flex-row order-1 md:order-2">
            <MainChat roomId={props.curContract.roomId}/>
          </div>
        </div>
        {!completeMode && (
          <div className="mt-5">
            <SettleContract/>
          </div>
        )}
        <div className="mt-5">
          {contractItemIds.map((item_id) => (
            <div className="min-h-[100px] w-full mb-5" key={item_id}>
              <ContractItem universalLock={universalLock} createMode={false} id={item_id} suggestMode={item_id === "new_negotiate"} createCallback={() => {toggleAddItemMode(false)}}/>
            </div>
          ))}
        </div>
        {(!addItemMode && !universalLock) && (
          <NewContractItem addItem={addItem} createMode={false}/>
        )}  
      </div>
    </>
	)
}

const mapStateToProps = ({ user, contract, items}) => ({
  curContract: contract.curContract,
  contractItemsChanged: items.itemsChanged,
  curConItems: items.items,
  user: user.user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  queryContract,
  addItem,
  push,
  toggleLock,
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(ContractDraft)