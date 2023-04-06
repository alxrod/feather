import NoContracts from "./no_contracts_view"
import React, {useState, useEffect, Fragment } from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import StageTag from './stage_tag'
import { getProfilePicUrls } from '../../reducers/file/dispatchers/file.profile_query.dispatcher';
import { UserIcon } from '@heroicons/react/outline'
import ContractNub from "./contract_nub"

const ContractList = (props) => {
  const [no_contracts, setNoContracts] = useState(true)
  const [newMsgs, setNewMsgs] = useState({})

  useEffect( () => {
    if (props.contracts !== undefined && props.contracts.length > 0) {
      // Made so only called once
      if (no_contracts) {
        let user_ids = []
        for (let i = 0; i < props.contracts.length; i++) {
          let worker_in = false;
          let buyer_in = false;

          for (let j = 0; j < user_ids.length; j++) {
            if (user_ids[j] === props.contracts[i].workerId) {
              worker_in = true
            }
            if (user_ids[j] === props.contracts[i].buyerId) {
              buyer_in = true
            }
          }

          if (!worker_in && props.contracts[i].workerId && props.user?.id != props.contracts[i].workerId) {
            user_ids.push(props.contracts[i].workerId)
          }
          if (!buyer_in && props.contracts[i].buyerId && props.user?.id != props.contracts[i].buyerId) {
            user_ids.push(props.contracts[i].buyerId)
          }
        }
        props.getProfilePicUrls(user_ids)
      }
      setNoContracts(false)
    }
  }, [props.contracts])

  useEffect(() =>  {
    const newSet = {}
    for (let j = 0; j < props.contracts.length; j++) {
      newSet[props.contracts[j].id] = 0
      for (let i = 0; i < props.newMessages.length; i++) {
        if (props.newMessages[i].contractInfo.id === props.contracts[j].id) {
          newSet[props.contracts[j].id]++
        }
      }
    }
    setNewMsgs(newSet)
  }, [props.newMessages.length, props.contracts.length])

  const formatDate = (date) => {
    if (date) {
      return date.toLocaleTimeString('en-US', {timeStyle: "short"}) + " " + date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
    } else {
      return ""
    }
    
  }

  return (
    <>
    {!no_contracts ? (
      <div className="mt-8 flex flex-col">
        <div>
          <div className="inline-block min-w-full py-2 align-middle md:px-12 lg:px-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
              { props.allFilters[props.selected](props.contracts).sort((a, b) => (newMsgs[b.id] > 0) - (newMsgs[a.id] > 0)).map((contract) => (
                <Fragment key={contract.id}>
                  <ContractNub contract={contract} newMsgs={newMsgs[contract.id] ? newMsgs[contract.id] : 0}/>
                </Fragment>
              ))}      
            </div>
          </div>
        </div>
      </div>
    ) : ( 
      <div className="flex justify-center mt-10 flex-col">
        <NoContracts/>
      </div>
    )}
    </>   
  )
}

const mapStateToProps = ({ contract, file, user, chat }) => ({
  contracts: contract.contractNubs,
  cachedUrls: file.cachedProfileUrls,
  newMessages: chat.newMessages,
  user: user.user,
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getProfilePicUrls,
}, dispatch)
export default connect(
  mapStateToProps,
  mapDispatchToProps,

)(ContractList)