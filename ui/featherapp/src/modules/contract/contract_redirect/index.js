import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {contractStages} from "../../../services/contract.service"
import { push } from 'connected-react-router'

const ContractRedirect = (props) => {
    const { params: { contractId } } = props.match;
    useEffect( () => {
        let path="/contracts"
        console.log("ID is: ", contractId)
        console.log("contracts are ", props.contracts)
        for (let i = 0; i < props.contracts.length; i++) {
            if (props.contracts[i].id === contractId) {
                console.log("FOUDN THE CORRECT TO REDIRECT AND IS", props.contracts[i])
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
        props.push(path)
    },[])
    return (
       <></>
    )
}

const mapStateToProps = ({ contract, user }) => ({
    contracts: contract.contractNubs,
    isLoggedIn: user.isLoggedIn,

})
const mapDispatchToProps = (dispatch) => bindActionCreators({
    push,
  }, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ContractRedirect)