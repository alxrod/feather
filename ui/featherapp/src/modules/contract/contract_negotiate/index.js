import React, {useState, useMemo, useEffect } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {queryContract} from "../../../reducers/contract.reducer"
import { genEmptyContract } from '../../../services/contract.service';

import ContractItem from "../components/contract_item/contract_item";
import NewContractItem from "../components/contract_item/new_contract_item";
import CriticalCriteria from "../components/criteria/critical_criteria";
import MainChat from "../components/chat/main_chat";
import PartnerCard from "../components/summary/partner_profile_card";
import SignContract from "../components/sign_contract"


const ContractNegotiate = (props) => {
  let [reload, setReload] = useState(true)

  const contract = useMemo(() => {
    if (props.selectedId !== "") {
      return props.cachedContracts[props.selectedId]
    } else {
      return genEmptyContract()
    }
  }, [props.selectedId])

  const { params: { contractId } } = props.match;

  useEffect(() => {
    // console.log("Calling the reload effect")
    if (reload) {
      props.queryContract(contractId)
      setReload(false)
    } 
  }, [reload])
  
  const [contractItems, setContractItems] = useState({})
  const [deadlines, setDeadlines] = useState({})


  const [contractItemsChanged, toggleItemsChanged] = useState(false)

  useEffect(() => {
    if (contractItems !== undefined) {
      console.log("UPDATING CONTRACT")
      setContractItems(contract.itemsList)
      setDeadlines(contract.deadlinesList)
    }
    
  }, [contract])


  const updateContractItem = (newInfo) => {
    console.log("Calling update contract")
		var new_contracts = {...contractItems}
		new_contracts[newInfo.id] = newInfo
		setContractItems(new_contracts)
    toggleItemsChanged(!contractItemsChanged)
	}

  const addContractItem = () => {
    console.log("CALL BACK FOR NEW CONTRACT ITEM")
  }
  
  const changeDeadlines = () => {
    console.log("CALL BACK FOR CHANGE DEADLINES")
  }

  const changeItem = () => {
    console.log("CALL BACK FOR CHANGE ITEM")
  }

	return (
		<div className="p-4 sm:p-6 lg:p-8 m-auto">
			<div className="flex flex-row justify-between">
				<div className="flex flex-col min-w-[45vw] grow mr-10">
					<div className="mb-5">
						<PartnerCard title={contract.title} summary={contract.summary}/>
					</div>
					<div> 
						<CriticalCriteria
               deadlines={deadlines}

               contractItems={contractItems}
               addContractItem={addContractItem}
               contractItemsChanged={contractItemsChanged}

               createMode={false}
               changeDeadlines={changeDeadlines}
               changeItem={updateContractItem}
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
        {Object.entries(contractItems).map((contract_and_key) => (
          <div className="min-h-[100px] w-full mb-5" key={contract_and_key[0]}>
            <ContractItem override={false} contract_info={contract_and_key[1]} changeItem={updateContractItem} />
          </div>
        ))}
			</div>
			<NewContractItem/>
		</div>
	)
}

const mapStateToProps = ({ user, contract }) => ({
  selectedId: contract.selectedId,
  cachedContracts: contract.cachedContracts,
  user: user.user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  queryContract
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(ContractNegotiate)