import React from 'react';
import PartnerProfile from "./partner"
import SummaryCard from "./summary_card"

const PartnerCard = props => (
    <div className="flex flex-col">
        <SummaryCard title={props.title} summary={props.summary}/>
        {!props.excludePlatform && (
            <PartnerProfile/>
        )}
    </div>
)

const mapStateToProps = ({ }) => ({
})

export default PartnerCard 