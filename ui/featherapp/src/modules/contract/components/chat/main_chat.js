import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Timeline from "./main_timeline_summary"
import ChatBox from "./chat_box"

const MainChat = (props) => {
    return (
        <div className="flex flex-col grow">
            <Timeline/>
            <ChatBox roomId={props.roomId}/>
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
)(MainChat)