import React, {useEffect, useState} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { joinChat, pullRecord } from '../../../reducers/chat/dispatchers/chat.dispatcher';
import { getProfilePicUrls } from '../../../reducers/file/dispatchers/file.profile_query.dispatcher';

import Timeline from "./main_timeline_summary"
import ChatBox from "./chat_box"
import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service"


const MainChat = (props) => {
    const [userIds, setUserIds] = useState([])

    useEffect( () => {
        const new_ids = [...userIds]
        const orig_length = new_ids.length
        for (let i = 0; i < props.messages.length; i++) {
            let not_in = true
            for (let j = 0; j < new_ids.length; j++) {
                if (props.messages[i].user && new_ids[j] === props.messages[i].user.id) {
                    not_in = false
                }
            }
            if (not_in && props.messages[i].user) {
                new_ids.push(props.messages[i].user.id)
            }
        }
        const new_length = new_ids.length
        if (new_length !== orig_length) {

        }
        setUserIds(new_ids)
        props.getProfilePicUrls(new_ids)
    }, [props.messages.length])

    let localRoomId = ""
    const [role, setRole] = useState(WORKER_TYPE)
    
    useEffect( () => {
        if (props.roomId === undefined || props.user === undefined ) {
            return
        }
        if (props.roomId !== undefined && props.roomId !== localRoomId) {
            props.joinChat(props.roomId)
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
   

const mapStateToProps = ({ user, contract, chat }) => ({
  user: user.user,
  messages: chat.messages,
})
  
const mapDispatchToProps = (dispatch) => bindActionCreators({
  joinChat,
  pullRecord,
  getProfilePicUrls,
}, dispatch)
  
export default connect(
        mapStateToProps,
        mapDispatchToProps
)(MainChat)