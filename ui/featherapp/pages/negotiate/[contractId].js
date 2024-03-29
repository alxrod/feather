import React, {useState, useMemo, useEffect } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {queryContract } from "../../reducers/contract/dispatchers/contract.dispatcher"
import { addItem } from "../../reducers/items/dispatchers/items.add.dispatcher"
import { genEmptyContract } from '../../services/contract.service';
import { contractStages } from '../../services/contract.service';

import ContractItem from "../../components/contract_components/contract_item";
import NewContractItem from "../../components/contract_components/contract_item/new_contract_item";
import CriticalCriteria from "../../components/contract_components/criteria/critical_criteria";
import MainChat from "../../components/contract_components/chat/main_chat";
import PartnerCard from "../../components/contract_components/summary/partner_profile_card";
import SignContract from "../../components/contract_components/advance_cards/sign_contract";

import FigmaLinkField from '../../components/contract_components/figma_link';
import { useRouter } from 'next/router';
import RejoinMonitor from "../../components/contract_components/rejoin_monitor"

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

const ContractNegotiate = (props) => {
  let [reload, setReload] = useState(true)
  const router = useRouter()

  const contract = useMemo(() => {
    if (props.curContract.id) {
      return props.curContract
    } else {
      return genEmptyContract()
    }
  }, [props.curContract])

  useEffect( () => {
    if (props.curContract.id) {
      if (props.curContract.stage > contractStages.NEGOTIATE) {
        router.push("/contract/"+props.curContract.id)
      }
    }
  }, [props.curContract, props.contractChanged])

  useEffect(() => {
    if (reload) {
      props.queryContract(props.contractId).then(
        () => {},
        () => {
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
  }, [contract, props.contractItemsChanged, props.curConItems.length])


  const addItem = (name, body) => {
    props.addItem(props.curContract.id, name, body, props.curConItems)
    toggleAddItemMode(true)
  }

	return (
    <>
      <RejoinMonitor/>
      <div className="p-4 sm:p-6 lg:p-12 m-auto">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col grow order-2 md:order-1">
            <div className="mb-5">
              <PartnerCard title={contract.title} summary={contract.summary}/>
            </div>
            <div className="mb-5">
              <FigmaLinkField/>
            </div>
            <div> 
              <CriticalCriteria
                  contractItemIds={contractItemIds}
                  createMode={false}
                  active={true}
              />
            </div>
          </div>
          <div className="flex flex-row order-1 md:order-2">
            <MainChat roomId={contract.roomId}/>
          </div>
        </div>
        <div className="mt-5">
          <SignContract/>
        </div>
        <div className="mt-5">
          {contractItemIds.map((item_id) => (
            <div className="min-h-[100px] w-full mb-5" key={item_id}>
              <ContractItem createMode={false} id={item_id} suggestMode={item_id === "new_negotiate"} createCallback={() => {toggleAddItemMode(false)}}/>
            </div>
          ))}
        </div>
        <NewContractItem addItem={addItem} createMode={false}/>
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
  addItem,
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(ContractNegotiate)