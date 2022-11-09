import React, {useState, useMemo, useEffect } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {queryContract } from "../../../reducers/contract/dispatchers/contract.dispatcher"
import { toggleLock } from "../../../reducers/contract/dispatchers/contract.lock.dispatcher"
import { addContractItem } from "../../../reducers/items/dispatchers/items.add.dispatcher"
import { contractStages } from '../../../services/contract.service';

import ContractItem from "../components/contract_item/contract_item";
import NewContractItem from "../components/contract_item/new_contract_item";
import MainChat from "../components/chat/main_chat";
import DeadlineField from "../components/deadline/deadline_field";
import { push } from 'connected-react-router';
import UniversalLockCard from "../components/universal_lock/universal_lock_card";
import CompactSummary from "../components/criteria/compact_summary"
import SettleHub from "../components/settle/settle_hub"
import CompleteDeadlineButton from "../components/advance_cards/complete_deadline"
import RejoinMonitor from "../components/rejoin_monitor"

const ContractDraft = (props) => {
  const [universalLock, setUniversalLock] = useState(true)
  const [reload, setReload] = useState(true)

  const { params: { contractId } } = props.match;
  useEffect( () => {
    if (props.curContract.id) {
      if (props.curContract.universalLock) {
        setUniversalLock(true)
      } else {
        setUniversalLock(false)
      }
      if (props.curContract.stage !== contractStages.SETTLE) {
        props.push("/contract/"+props.curContract.id)
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
      setContractItemIds(ids)
    }
  }, [props.curContract, props.contractItemsChanged, props.curConItems.length])

	return (
    <>
      <RejoinMonitor/>
      <div className="p-4 sm:p-6 lg:p-8 m-auto">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col min-w-[45vw] grow mr-10">
            <div> 
				<SettleHub/>
			</div>
            <DeadlineField
              createMode={false} 
              universalLock={true}
              contractItemIds={contractItemIds}
            />
          </div>
          <div className="flex flex-row min-w-[45vw]">
            <MainChat roomId={props.curContract.roomId}/>
          </div>
        </div>
        <div className="mt-4">
          <CompleteDeadlineButton/>
        </div>
        <div className="mt-5">
          {contractItemIds.map((item_id) => (
            <div className="min-h-[100px] w-full mb-5" key={item_id}>
              <ContractItem universalLock={universalLock} override={false} id={item_id} suggestMode={item_id === "new_negotiate"} createCallback={() => {toggleAddItemMode(false)}}/>
            </div>
          ))}
        </div>
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
  addContractItem,
  push,
  toggleLock,
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(ContractDraft)