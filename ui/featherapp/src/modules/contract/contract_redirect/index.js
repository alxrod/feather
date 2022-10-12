import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {contractStages} from "../../../services/contract.service"
import { push } from 'connected-react-router'
import { queryContractNubs } from "../../../reducers/contract/dispatchers/contract.dispatcher";

const ContractRedirect = (props) => {
    const { params: { contractId } } = props.match;
    useEffect( () => {
        props.queryContractNubs().then((newContracts) => {
          let path="/contracts"
          for (let i = 0; i < newContracts.length; i++) {
            if (newContracts[i].id === contractId) {
              console.log("FOUDN THE CORRECT TO REDIRECT AND IS", newContracts[i])
              if (newContracts[i].stage == contractStages.INVITE) {
                path="/negotiate/"+contractId
              } else if (newContracts[i].stage == contractStages.NEGOTIATE) {
                path="/negotiate/"+contractId
              } else if (newContracts[i].stage == contractStages.SIGNED) {
                path="/view/"+contractId
              } else if (newContracts[i].stage == contractStages.ACTIVE) {
                path="/view/"+contractId
              } else if (newContracts[i].stage == contractStages.SETTLE) {
                path="/settle/"+contractId
              } else if (newContracts[i].stage == contractStages.COMPLETE) {
                path="/view/"+contractId
              }
            }
          }
          props.push(path)
        })
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
    queryContractNubs,
  }, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ContractRedirect)