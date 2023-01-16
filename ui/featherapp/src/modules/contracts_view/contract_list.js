import NoContracts from "./no_contracts_view"
import { Link } from 'react-router-dom';
import React, {useState, useEffect} from 'react';

import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import StageTag from './stage_tag'
import { getProfilePicUrls } from '../../reducers/file/dispatchers/file.profile_query.dispatcher';
import { UserIcon } from '@heroicons/react/outline'


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
            if (user_ids[j] !== props.contracts[i].buyerId) {
              buyer_in = true
            }
          }

          if (!worker_in && props.contracts[i].workerId) {
            user_ids.push(props.contracts[i].workerId)
          }
          if (!buyer_in && props.contracts[i].buyerId) {
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
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                {!no_contracts && (
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          Contract
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Deadline
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Stage
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Price
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">View</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      { props.allFilters[props.selected](props.contracts.reverse()).map((contract) => (
                        <tr key={contract.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <ProfileImg cachedUrls={props.cachedUrls} contract={contract} user={props.user}/>
                              </div>
                              <div className="ml-4">
                                <Link to={"/contract/"+contract.id}>
                                  <div className="font-medium text-gray-900">{contract.title}</div>
                                </Link>
                                {/* <div className="text-gray-500">{contract.email}</div> */}
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="text-gray-900">{formatDate(contract.deadline)}</div>
                            {/* <div className="text-gray-500">{contract.department}</div> */}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <StageTag stage={contract.stage}/>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${contract.price}</td> 
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <Link to={"/contract/"+contract.id} className="text-indigo-700">
                              View<span className="sr-only">, {contract.name}</span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                

                {no_contracts && (
                  
                  <div className="flex justify-center min-h-[50vh] flex-col">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            Contract
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Deadline
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Stage
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Price
                          </th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">View</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                      </tbody>
                    </table>
                    <div className="m-auto text-4xl text-gray-300 font-light pb-5">
                        <NoContracts/>
                    </div>
                  </div>
                )}
                
              
            </div>
          </div>
        </div>
      </div>
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