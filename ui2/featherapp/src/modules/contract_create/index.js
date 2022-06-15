import React from 'react';
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const Home = props => (
    <div>
    </div>
)

const mapStateToProps = ({ counter }) => ({
    count: counter.count,
    isIncrementing: counter.isIncrementing,
    isDecrementing: counter.isDecrementing,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    createContract: () => push('/create-contract'),
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)