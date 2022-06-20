import React from 'react';
import PlatformProfile from "./platform_profile"
import BrandProfile from "./brand_profile"

const PartnerCard = props => (
    <div className="flex flex-col">
        <BrandProfile title={props.title} summary={props.summary}/>
        {!props.excludePlatform && (
            <PlatformProfile/>
        )}
    </div>
)

const mapStateToProps = ({ }) => ({
})

export default PartnerCard