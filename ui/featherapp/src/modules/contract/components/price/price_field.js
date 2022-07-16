import React, {useState, useEffect} from "react";
import {LockOpenIcon, ExclamationCircleIcon} from "@heroicons/react/outline"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { suggestPrice } from '../../../../reducers/contract.reducer'
import DecideButton from "../decide_button";
import {WORKER_TYPE, BUYER_TYPE} from "../../../../services/user.service"
import EditLock from "../../../general_components/edit_lock"
import { LockClosedIcon } from '@heroicons/react/solid'
import { useLocation } from 'react-router-dom'


function isFloat(n) {
  return (n === "") || parseFloat(n.match(/^-?\d*(\.\d+)?$/))>0 || parseFloat((n+"0").match(/^-?\d*(\.\d+)?$/))>0;
}


const PriceField = (props) => {

  let cur_contract = {id: ""}
  const [origPrice, setOrigPrice] = useState("")
  const [field_classes, setClasses] = useState("hidden")
  const [fieldValue, setFieldValue] = useState("")

  const [textColor, setTextColor] = useState("text-gray-500")
  const [proposing, toggleProposing] = useState(false)
  const [lock, toggleLock] = useState(false)

  let user_type = WORKER_TYPE

  useEffect( () => {
    if (props.createMode !== true && props.selectedId !== "" && props.selectedId != cur_contract.id) {   
      cur_contract = props.cachedContracts[props.selectedId]
      let price = cur_contract.price
      console.log("Updating with price:")
      console.log(price)
      if (cur_contract.worker && cur_contract.worker.id === props.user.user_id) {
        user_type = WORKER_TYPE
      } else {
        user_type = BUYER_TYPE
      } 
      let newPrice = 0
  
      if (price.awaitingApproval == true) {
        toggleLock(true)
        setTextColor("text-green")
        if (price.proposerId === props.user.user_id) {
          if (user_type === WORKER_TYPE) {
            newPrice = price.worker
          } else {
            newPrice = price.buyer
          }
        } else {
          if (user_type === WORKER_TYPE) {
            newPrice = price.buyer
          } else {
            newPrice = price.worker
          }
        }
      } else {
        newPrice = price.current
        toggleLock(false)
      }
      setOrigPrice(newPrice)
      setFieldValue(newPrice)
    }
  }, [props.selectedId, props.cachedContracts])

  useEffect( () => {
    if (props.selectedId !== "" && props.cachedContracts !== undefined) {
      if (props.cachedContracts[props.selectedId].price.awaitingApproval === true) {
        console.log("Lock is active")
        toggleLock(true)
      } else {
        console.log(props.cachedContracts[props.selectedId].price)
      }
    }

  }, [props.selectedId, props.cachedContracts, props.awaitingEdit])


  

  const handlePriceChange = (e) => {
    if (isFloat(e.target.value)) {
      if (e.target.value !== origPrice && props.createMode !== true) {
        toggleProposing(true)
      } else {
        toggleProposing(false)
      }
      setFieldValue(e.target.value)
      if (props.changePrice) {
        props.changePrice(e.target.value)
      }
      setClasses("hidden")
    } else {
      setClasses("display")
    }
  }

  const submitChange = () => {
    console.log("Approving change")
    props.suggestPrice(props.selectedId, parseFloat(fieldValue)).then(() => {
      toggleProposing(false)
      setTextColor("text-green")
    })

  }

  const rejectChange = () => {
    toggleProposing(false)
    setFieldValue(origPrice)
  }
  

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center">
        <div className="flex flex-col">
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              name="price"
              id="price"
              className={textColor + " focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"}
              value={fieldValue}
              disabled={props.disabled || lock}
              onChange={handlePriceChange}
              aria-describedby="price-currency"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-400 sm:text-sm" id="price-currency">
                {lock && (
                  <LockClosedIcon className="w-4 h-4"/>
                )}
                {!lock && (
                  <LockOpenIcon className="w-4 h-4"/>
                )}
              </span>
            </div>
          </div>
          <div className={"flex items-center " + field_classes}>
            <ExclamationCircleIcon className="h-4 w-4 text-red" aria-hidden="true" />
            <p className="text-red text-sm">You can only enter a dollar amount</p>
          </div>
        </div>
        {proposing && (
          <div className="ml-1 pt-1 my-auto">
            <DecideButton approve={submitChange} reject={rejectChange}/>
          </div>
        )}
      </div>
    </>
  )
}

const mapStateToProps = ({ user, contract }) => ({
  selectedId: contract.selectedId,
  awaitingEdit: contract.awaitingEdit,
  cachedContracts: contract.cachedContracts,
  user: user.user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  suggestPrice,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PriceField)