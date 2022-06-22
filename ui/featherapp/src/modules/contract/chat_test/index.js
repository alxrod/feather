import React, {useState, useMemo, useEffect } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { joinChat, pullRecord } from '../../../reducers/chat.reducer';
import { testStream } from '../../../services/chat.service';

import MainChat from "../components/chat/main_chat";


const ChatTest = (props) => {
  const { params: { roomId } } = props.match;
  // testStream()
  props.joinChat(roomId)
  props.pullRecord(roomId)

	return (
		<div className="py-4 mx-[15%] sm:p-6 lg:p-8 m-auto">
			<MainChat roomId={roomId}/>
		</div>
	)
}

const mapStateToProps = ({ user, contract }) => ({
  selectedId: contract.selectedId,
  cachedContracts: contract.cachedContracts,
  user: user.user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  joinChat,
  pullRecord,
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(ChatTest)