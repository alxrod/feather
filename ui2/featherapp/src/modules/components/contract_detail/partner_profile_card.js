import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PlatformProfile from "./platform_profile"
import BrandProfile from "./brand_profile"

const PartnerCard = props => (
    <div className="flex flex-col">
        <BrandProfile/>
        {!props.excludePlatform && (
            <PlatformProfile/>
        )}
    </div>
)

const mapStateToProps = ({ }) => ({
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PartnerCard)