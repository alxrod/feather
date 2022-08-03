import React, {useEffect, useState} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { joinChat, pullRecord } from '../../../../reducers/chat.reducer';

import Timeline from "./main_timeline_summary"
import ChatBox from "./chat_box"
import {WORKER_TYPE, BUYER_TYPE} from "../../../../services/user.service"


const MainChat = (props) => {
    let localRoomId = ""
    const [role, setRole] = useState(WORKER_TYPE)
    useEffect( () => {
        if (props.roomId === undefined || props.user === undefined || props.selectedId === undefined) {
            return
        }
        if (props.loadingContract === false) {
            if (props.roomId !== undefined && props.roomId !== localRoomId) {
                const contract = props.cachedContracts[props.selectedId]
                setRole(contract.role)
                props.joinChat(props.roomId, contract.role)
                props.pullRecord(props.roomId)
            }
        }
    }, [props.user, props.selectedId])
    
    return (
        <div className="flex flex-col grow">
            <Timeline yourRole={role}/>
            <ChatBox roomId={props.roomId}/>
        </div>
    )
}
   

const mapStateToProps = ({ user, contract }) => ({
  selectedId: contract.selectedId,
  cachedContracts: contract.cachedContracts,
  user: user.user,
  loadingContract: contract.loadingContract,
})
  
const mapDispatchToProps = (dispatch) => bindActionCreators({
  joinChat,
  pullRecord,
}, dispatch)
  
export default connect(
        mapStateToProps,
        mapDispatchToProps
)(MainChat)