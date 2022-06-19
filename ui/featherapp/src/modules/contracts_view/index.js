import React from 'react';
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContractTable from './contract_table'
import ContractTableHeader from './contracts_header'

const Home = props => (
    <div>
        <br/>
        <div className="px-4 sm:px-6 lg:px-8">
        <ContractTableHeader/>
        <ContractTable/>
        </div>
    </div>
)

const mapStateToProps = ({ user }) => ({

})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)