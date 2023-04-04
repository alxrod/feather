import React, {useState, useEffect} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {contractStages} from "../../services/contract.service"
import { useRouter } from 'next/router'

import { queryContractNubs } from "../../reducers/contract/dispatchers/contract.dispatcher";

export async function getStaticPaths() {
  return {
      paths: [], //indicates that no page needs be created at build time
      fallback: 'blocking' //indicates the type of fallback
  }
}

export async function getStaticProps({ params }) {
  return {
    props: {
      contractId: params.contractId,
    },
  };
}

const ContractRedirect = (props) => {
    const router = useRouter()
    useEffect( () => {
        props.queryContractNubs().then((newContracts) => {
          let path="/contracts"
          for (let i = 0; i < newContracts.length; i++) {
            if (newContracts[i].id === props.contractId) {
              if (newContracts[i].stage == contractStages.INVITE) {
                path="/contract/negotiate/"+props.contractId
              } else if (newContracts[i].stage == contractStages.NEGOTIATE) {
                path="/contract/negotiate/"+props.contractId
              } else if (newContracts[i].stage == contractStages.SIGNED) {
                path="/contract/view/"+props.contractId
              } else if (newContracts[i].stage == contractStages.ACTIVE) {
                path="/contract/view/"+props.contractId
              } else if (newContracts[i].stage == contractStages.SETTLE) {
                path="/contract/settle/"+props.contractId
              } else if (newContracts[i].stage == contractStages.COMPLETE) {
                path="/contract/view/"+props.contractId
              }
            }
          }
          router.push(path)
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
    queryContractNubs,
  }, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ContractRedirect)