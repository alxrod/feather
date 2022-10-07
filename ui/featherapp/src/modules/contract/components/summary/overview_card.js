import React, {useState, useEffect} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import { UserIcon, ClipboardIcon } from '@heroicons/react/outline'
import { WORKER_TYPE, BUYER_TYPE } from "../../../../services/user.service"
import PriceField from "../price/price_field";

const OverviewCard = (props) => {
  const [partnerName, setPartnerName] = useState("...")
  const [havePartner, setHavePartner] = useState(false)
  const [partnerRole, setPartnerRole] = useState(BUYER_TYPE)
  const [roleString, setRoleString] = useState("")

  const [partnerMsg, setPartnerMsg] = useState("")
  useEffect( () => {
    if (props.curContract.id) {
      const contract = props.curContract
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

  useEffect( () => {
    if (partnerRole === WORKER_TYPE) {
      setRoleString("Worker")
    } else {
      setRoleString("Buyer")
    }
    
  }, [partnerRole])

  return (
    <div className="flex flex-col">
        <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex">
            <div className="mr-4 flex-shrink-0">
              <img
                className="inline-block h-16 w-16 rounded-md"
                src="https://images.prismic.io/athletic-greens-new/5394a6dc-0a11-4ea5-80ac-95be8893dd98_structured-data-pouch.png?auto=compress,format&rect=0,0,1000,1000&w=1000&h=1000"
                alt=""
              />
            </div>
            <div className="grid grid-cols-2 w-full">
              <div>
                <h4 className="text-base font-bold">{props.title}</h4>
                <PriceField/>        
              </div>
              <div>
                <p className="mt-1 text-sm">
                  <b className="font-semibold text-gray-900">Contract Summary:</b> {props.summary}
                </p>
              </div>
            </div>
          </div>
        </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6 flex justify-start">
            {havePartner && (
              <div className="flex items-center">  
                <UserIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-700" aria-hidden="true" />
                <p className="m-0, p-0 text-gray-700">Partner: <b>{partnerName}</b> </p>
              </div>
            )}
          </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ contract }) => ({
  curContract: contract.curContract,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OverviewCard)