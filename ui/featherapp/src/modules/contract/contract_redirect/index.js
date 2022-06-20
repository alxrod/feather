import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {contractStages} from "../../../services/contract.service"

const ContractRedirect = (props) => {
    const { params: { contractId } } = props.match;

    let path="/contracts"
    for (let i = 0; i < props.contracts.length; i++) {
        if (props.contracts[i].id === contractId) {
            if (props.contracts[i].stage == contractStages.INVITE) {
                path="/negotiate/"+contractId
            } else if (props.contracts[i].stage == contractStages.NEGOTIATE) {
                path="/negotiate/"+contractId
            } else if (props.contracts[i].stage == contractStages.SIGNED) {
                path="/view/"+contractId
            } else if (props.contracts[i].stage == contractStages.ACTIVE) {
                path="/view/"+contractId
            } else if (props.contracts[i].stage == contractStages.SETTLING) {
                path="/settling/"+contractId
            } else if (props.contracts[i].stage == contractStages.COMPLETE) {
                path="/view/"+contractId
            }
        }
    }
    return (
       <Redirect to={path}/>
    )
}

const mapStateToProps = ({ contract }) => ({
    contracts: contract.contractNubs
  })


export default connect(
    mapStateToProps,
)(ContractRedirect)