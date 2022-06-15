import React, {useState} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContractItem from "../components/contract_detail/contract_item";
import CombinedCriteria from "../components/contract_detail/combined_criteria";
import MainChat from "../components/contract_detail/main_chat";
import PartnerCard from "../components/contract_detail/partner_profile_card";
import LinkProof from "../components/contract_detail/link_proof";
import DraftView from "../components/contract_detail/draft_view.js";
import CompactSummary from "../components/contract_detail/compact_summary"
import SettleHub from "../components/contract_detail/settle_hub"

import { ITEM_AGREED, ITEM_DISAGREED, ITEM_NEG, ITEM_POS, ITEM_WAITING_OTHER, UNEDITED } from "../../custom_encodings"

const contract_details = {
	deadline_str: "10:00am June 10, 2022",
	price_str: "250.00",
	deadline_state: ITEM_AGREED,
	deadline_assess: ITEM_NEG,
	price_state: ITEM_WAITING_OTHER,
	price_assess: ITEM_POS,
}

const ContractSettle = (props) => {
		const [contractItems, setContractItems] = useState({
			1: {
				id: "1",
				text: [
					{type: UNEDITED, text: "The video must contain the product for at least 15 seconds"}
				],
				recip_status: ITEM_DISAGREED,
				sender_status: ITEM_AGREED,
				chats: [
					{"user_id": 1, msg: "@Item1 I think that the video should be a minute long, not just 30 seconds"},
					{"user_id": 2, msg: "@Item2 Yeah but I make all of my videos 30 seconds so it would be unauthetic"},
				],
			},
			2: {
				id: "2",
				text: [
					{type: UNEDITED, text: "You cannot reference or use any other preworkouts in the video"}
				],
				recip_status: ITEM_DISAGREED,
				sender_status: ITEM_AGREED,
				chats: [
					{"user_id": 1, msg: "@Item1 I think that the video should be a minute long, not just 30 seconds"},
					{"user_id": 2, msg: "@Item2 Yeah but I make all of my videos 30 seconds so it would be unauthetic"},
				],
			},
			
		})

		const setContractInfo = (newInfo) => {
			var new_contracts = {...contractItems}
			new_contracts[newInfo.id] = newInfo
			setContractItems(new_contracts)
		}

		return (
				<div className="p-4 sm:p-6 lg:p-8 m-auto">
					<div className="flex flex-row justify-between">
						<div className="flex flex-col grow min-w-[45vw] mr-10">
                            <div className="mb-5"> 
								<SettleHub/>
							</div>
                            <div>
                                <DraftView/>
                            </div>
						</div>
						<div className="flex flex-col min-w-[45vw]">
                            <div className="mb-5 flex grow">
                                <MainChat/>
                            </div>
						
                            <div>
								<CompactSummary
                                    deadline_str={contract_details.deadline_str} 
									price_str={contract_details.price_str}
									deadline_assess={contract_details.deadline_assess}
									price_assess={contract_details.price_assess}
									deadline_state={contract_details.deadline_state}
									price_state={contract_details.price_state} 
                                />
							</div>
						</div>
					</div>
					<div className="mt-5">
						{Object.entries(contractItems).map((contract_and_key) => (
							<div className="min-h-[100px]">
								<ContractItem key={contract_and_key[0]} contract_info={contract_and_key[1]} disabled={true} set_contract_info={setContractInfo}/>
							</div>
						))}
					</div>
				</div>
		)
		
}

const mapStateToProps = ({ }) => ({
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(ContractSettle)