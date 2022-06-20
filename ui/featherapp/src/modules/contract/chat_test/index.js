import React, {useState, useMemo, useEffect } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {queryContract} from "../../../reducers/contract.reducer"
import { genEmptyContract } from '../../../services/contract.service';

import MainChat from "../components/chat/main_chat";


const ChatTest = (props) => {
  const { params: { chatId } } = props.match;


	return (
		<div className="p-4 sm:p-6 lg:p-8 m-auto">
			<MainChat/>
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
)(ChatTest)