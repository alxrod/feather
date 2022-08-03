import React, {useState} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContractItem from "../components/contract_item/contract_item";
import CombinedCriteria from "../components/criteria/combined_criteria";
import MainChat from "../components/chat/main_chat";
import PartnerCard from "../components/summary/partner_profile_card";
import LinkProof from "../components/draft/link_proof";
import DraftUpload from "../components/draft/draft_upload.js";

import { ITEM_AGREED, ITEM_DISAGREED, ITEM_NEG, ITEM_POS, ITEM_WAITING_OTHER, UNEDITED } from "../../../custom_encodings"

const profile_info = {
	image:
  	'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	username: "NutraWorks",
	email: "business.dev@nutraworks.com",
	descript: "Nutraworks makes their very own vegan preworkout that only uses organic and healthy ingredients to help you have not just your best workout, but your best diet."
}
const contract_details = {
	deadline_str: "10:00am June 10, 2022",
	price_str: "250.00",
	deadline_state: ITEM_AGREED,
	deadline_assess: ITEM_NEG,
	price_state: ITEM_WAITING_OTHER,
	price_assess: ITEM_POS,
}

const ContractView = (props) => {
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
				<div className="min-w-[50vw] p-4 sm:p-6 lg:p-8 m-auto">
					<div className="flex flex-row justify-between">
						<div className="flex flex-col grow min-w-[45vw] mr-10">
                            <div className="mb-5"> 
								<CombinedCriteria 
									deadline_str={contract_details.deadline_str} 
									price_str={contract_details.price_str}
									deadline_assess={contract_details.deadline_assess}
									price_assess={contract_details.price_assess}
									deadline_state={contract_details.deadline_state}
									price_state={contract_details.price_state} 
								/>
							</div>
                            <div>
                                <LinkProof/>
                            </div>
                            <div>
                                <DraftUpload/>
                            </div>
						</div>
						<div className="flex flex-col min-w-[45vw]">
                            <div className="mb-5">
								<PartnerCard excludePlatform={true}/>
							</div>
							
							<MainChat/>
						</div>
					</div>
					<div className="mt-5">
						{Object.entries(contractItems).map((contract_and_key) => (
							<div className="min-h-[100px]" key={contract_and_key[0]}>
								<ContractItem contract_info={contract_and_key[1]} disabled={true} set_contract_info={setContractInfo}/>
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
)(ContractView)