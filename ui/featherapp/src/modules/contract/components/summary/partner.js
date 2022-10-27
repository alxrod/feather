import React, {useState, useEffect} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import { UserIcon, ClipboardIcon } from '@heroicons/react/outline'
import { WORKER_TYPE, BUYER_TYPE } from "../../../../services/user.service"
const CriticalCriteria = (props) => {
  const [partnerName, setPartnerName] = useState("...")
  const [havePartner, setHavePartner] = useState(false)
  const [partnerRole, setPartnerRole] = useState(BUYER_TYPE)
  const [roleString, setRoleString] = useState("")
  
  const [workerName, setWorkerName] = useState("undecided")
  const [buyerName, setBuyerName] = useState("undecided")

  const [partnerMsg, setPartnerMsg] = useState("")
  useEffect( () => {
    if (props.curContract.id) {
      const contract = props.curContract
      if (contract.worker.username) {
        setWorkerName(contract.worker.username)
      }
      if (contract.buyer.username) {
        setBuyerName(contract.buyer.username)
      }
      
      
      if (contract.role === WORKER_TYPE) {
        setPartnerRole(BUYER_TYPE)
        if (contract.buyer.id === "") {
          setPartnerName("...")
          setPartnerMsg("The buyer has not accepted the invite yet.")
        } else {
          setPartnerName(contract.buyer.username)
          setHavePartner(true)
          setPartnerMsg("")
        }
      } else if (contract.role === BUYER_TYPE) {
        setPartnerRole(WORKER_TYPE)
        if (contract.worker.id === "") {
          setPartnerName("...")
          setPartnerMsg("The worker has not accepted the invite yet.")
        } else {
          setPartnerName(contract.worker.username)
          setHavePartner(true)
          setPartnerMsg("")
        }
      }
    }
  }, [props.curContract])

  useEffect(() => {
    console.log("New user is: ", props.user)
  }, [props.user])

  useEffect( () => {
    if (partnerRole === WORKER_TYPE) {
      setRoleString("Worker")
    } else {
      setRoleString("Buyer")
    }
    
  }, [partnerRole])

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md mt-5">
      <ul role="list" className="divide-y divide-gray-200">
          <li key="price">
            <div className="block hover:bg-gray-50">
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="min-w-0 flex-1 flex items-center">
                  <div className="flex-shrink-0">
                    <UserIcon className="mr-1.5 h-9 w-9 flex-shrink-0 text-gray-400"/>
                  </div>
                  {props.user.admin_status ? (
                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2">
                        <p className="text-base font-medium text-gray-700 truncate mr-2">{"Worker: "+workerName}</p>
                        <p className="text-base font-medium text-gray-700 truncate">{"Buyer: "+buyerName}</p>
                    </div>
                  ) : (
                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-1">
              
                        <p className="text-base font-medium text-gray-700 truncate">{roleString+": "+partnerName}</p>
                        <p className="text-base font-medium text-gray-500">
                          {partnerMsg}
                          { !havePartner && (
                            <>
                              {" "}<Link className="text-indigo-500" to={"/invite/"+props.curContract.id}>click to view invite</Link>{" "}
                            </>
                          ) }
                        </p>
                    </div>
                  )}
                </div>
                
                <div>
                  <ClipboardIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
              </div>
              
            </div>
          </li>
      </ul>
    </div>
  )
}

const mapStateToProps = ({ contract, user }) => ({
  curContract: contract.curContract,
  user: user.user
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CriticalCriteria)