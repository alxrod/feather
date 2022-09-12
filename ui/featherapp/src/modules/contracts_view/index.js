import React, {useState, useEffect} from 'react';
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { queryContractNubs } from "../../reducers/contract/dispatchers/contract.dispatcher";

import ContractList from './contract_list'
import ContractTableHeader from './contracts_header'

const ContractsList = (props) => {
    useEffect(() => {
        props.queryContractNubs()
    })
    return (
        <div>
            <br/>
            <div className="px-4 sm:px-6 lg:px-8">
            <ContractTableHeader/>
            <ContractList/>
            </div>
        </div>
    )
}

const mapStateToProps = ({ user, contract }) => ({
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    queryContractNubs
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractsList)