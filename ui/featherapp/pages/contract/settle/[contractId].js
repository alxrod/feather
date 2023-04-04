import React, {useState, useMemo, useEffect } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {queryContract } from "../../../reducers/contract/dispatchers/contract.dispatcher"
import { toggleLock } from "../../../reducers/contract/dispatchers/contract.lock.dispatcher"
import { addItem } from "../../../reducers/items/dispatchers/items.add.dispatcher"
import { contractStages } from '../../../services/contract.service';

import ContractItem from "../../../components/contract_components/contract_item";
import MainChat from "../../../components/contract_components/chat/main_chat";
import DeadlineField from "../../../components/contract_components/deadline/deadline_field";

import SettleHub from "../../../components/contract_components/settle/settle_hub"
import CompleteDeadlineButton from "../../../components/contract_components/advance_cards/complete_deadline"
import RejoinMonitor from "../../../components/contract_components/rejoin_monitor"
import FigmaLinkField from '../../../components/contract_components/figma_link';

import { useRouter } from "next/router";

export async function getStaticPaths() {
  return {
      paths: [], //indicates that no page needs be created at build time
      fallback: 'blocking' //indicates the type of fallback
  }
}

export async function getStaticProps({ params }) {
  return {
    props: {
      contractId: params.contractId,
    },
  };
}

const ContractDraft = (props) => {
  const [universalLock, setUniversalLock] = useState(true)
  const [reload, setReload] = useState(true)
  const router = useRouter()

  useEffect( () => {
    if (props.curContract.id) {
      if (props.curContract.universalLock) {
        setUniversalLock(true)
      } else {
        setUniversalLock(false)
      }
      if (props.curContract.stage !== contractStages.SETTLE) {
        router.push("/contract/"+props.curContract.id)
      }
    }
  }, [props.curContract])

  useEffect(() => {
    if (reload) {
      props.queryContract(props.contractId).then(
        () => {},
        (err) => {
          router.push("/unknown")
        }
      )
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
      <div className="p-4 sm:p-6 lg:p-12 m-auto">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col grow order-2 md:order-1">
            <div> 
              <SettleHub/>
            </div>
            <div className="mt-5">
              <FigmaLinkField lock={true}/>
            </div>
            <DeadlineField
              createMode={false} 
              universalLock={true}
              contractItemIds={contractItemIds}
            />
          </div>
          <div className="flex flex-row order-1 md:order-2">
            <MainChat roomId={props.curContract.roomId}/>
          </div>
        </div>
        <div className="mt-4">
          <CompleteDeadlineButton/>
        </div>
        <div className="mt-5">
          {contractItemIds.map((item_id) => (
            <div className="min-h-[100px] w-full mb-5" key={item_id}>
              <ContractItem universalLock={universalLock} createMode={false} id={item_id} suggestMode={item_id === "new_negotiate"} createCallback={() => {toggleAddItemMode(false)}}/>
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
  addItem,
  toggleLock,
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(ContractDraft)