import React from 'react';
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContractTable from './message_table'

const Home = props => (
    <div>
        <br/>
        <ContractTable/>
    </div>
)

const mapStateToProps = ({ user }) => ({
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    createContract: () => push('/create-contract'),
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)