import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Timeline from "./main_timeline_summary"
import MessageBox from "./chat_box"

const PartnerCard = (props) => {
    return (
        <div className="flex flex-col grow">
            <Timeline/>
            <MessageBox/>
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
)(PartnerCard)