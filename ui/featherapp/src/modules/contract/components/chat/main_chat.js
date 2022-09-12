import React, {useEffect, useState} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { joinChat, pullRecord } from '../../../../reducers/chat/dispatchers/chat.dispatcher';

import Timeline from "./main_timeline_summary"
import ChatBox from "./chat_box"
import {WORKER_TYPE, BUYER_TYPE} from "../../../../services/user.service"


const MainChat = (props) => {
    let localRoomId = ""
    const [role, setRole] = useState(WORKER_TYPE)
    useEffect( () => {
        if (props.roomId === undefined || props.user === undefined || props.curContract.id === undefined) {
            return
        }
        if (props.roomId !== undefined && props.roomId !== localRoomId) {
            setRole(props.curContract.role)
            props.joinChat(props.roomId, props.curContract.role)
            props.pullRecord(props.roomId)
        }
    }, [props.user, props.curContract])
    
    return (
        <div className="flex flex-col grow">
            <Timeline yourRole={role}/>
            <ChatBox roomId={props.roomId}/>
        </div>
    )
}
   

const mapStateToProps = ({ user, contract }) => ({
  curContract: contract.curContract,
  user: user.user,
})
  
const mapDispatchToProps = (dispatch) => bindActionCreators({
  joinChat,
  pullRecord,
}, dispatch)
  
export default connect(
        mapStateToProps,
        mapDispatchToProps
)(MainChat)