import NoContracts from "./no_contracts_view"
import { Link } from 'react-router-dom';
import React, {useState, useEffect, Fragment } from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import StageTag from './stage_tag'
import { getProfilePicUrls } from '../../reducers/file/dispatchers/file.profile_query.dispatcher';
import { UserIcon } from '@heroicons/react/outline'
import ContractNub from "./contract_nub"

const ProfileImg = (props) => {

  const [haveProfImg, setHaveProfImg] = useState(false)
  const [cacheUrl, setCacheUrl] = useState("")

  const [imageHash, setImageHash] = useState(Date.now())

  useEffect( () => {
    if (props.cachedUrls) {
      let other_user_id = ""
      if (props.contract.workerId === props.user.id) {
        other_user_id = props.contract.buyerId
      }
      if (props.contract.buyerId === props.user.id) {
        other_user_id = props.contract.workerId
      }
    
      for (let i = 0; i < props.cachedUrls.length; i++) {
        if (props.cachedUrls[i][1] !== "" && props.cachedUrls[i][0] === other_user_id) {
          setHaveProfImg(true)
          setCacheUrl(props.cachedUrls[i][1])
        }
      }

    }
  },[props.cachedUrls])

  return (
    <>
      {haveProfImg ? (
        <img 
          className={"h-10 w-10 rounded-full object-cover"}
          src={`${cacheUrl}?${imageHash}`}
        />
      ) : (
        <UserIcon className={"h-10 w-10 rounded-full border-2 bg-white border-gray-300 p-1 font-thin text-gray-300"}/>
      )}
    </>
  )
}

const ContractList = (props) => {
  const [no_contracts, setNoContracts] = useState(true)
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
            console.log("Adding ", props.contracts[i].buyerId)
            user_ids.push(props.contracts[i].buyerId)
          }
        }
        console.log("Droppign this: ", user_ids)
        props.getProfilePicUrls(user_ids)
      }
      setNoContracts(false)
    }
  }, [props.contracts])

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
              { props.allFilters[props.selected](props.contracts).map((contract) => (
                <Fragment key={contract.id}>
                  <ContractNub contract={contract}/>
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

const mapStateToProps = ({ contract, file, user }) => ({
  contracts: contract.contractNubs,
  cachedUrls: file.cachedProfileUrls,
  user: user.user,
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getProfilePicUrls,
}, dispatch)
export default connect(
  mapStateToProps,
  mapDispatchToProps,

)(ContractList)