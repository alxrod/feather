import React, {useState, useRef, useEffect} from "react";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { 
  createContractIntentSecret,

} from "../../../reducers/stripe/dispatchers/stripe.setup.dispatcher";

import { push } from 'connected-react-router'
import {useStripe, useElements} from '@stripe/react-stripe-js';
import MandateModal from "../mandate_modal"

const TestSetupIntent = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [workerId, setWorkerId] = useState("")
  const [buyerId, setBuyerId] = useState("")
  
  const createIntent = () => {
    props.createContractIntentSecret(workerId, buyerId).then(
      (secret) => {
        console.log("Success")
      },
      (error) => {
        console.log("Error: ", error)
      }
    )
  }
  return (
    <div className="p-4">
      <input
        type="text"
        value={workerId}
        onChange={(e) => setWorkerId(e.target.value)}
        placeholder="Worker ID"
        className="appearance-none block w-full px-3 
                  py-2 border border-gray-300 rounded-md shadow-sm 
                  placeholder-gray-400 focus:outline-none 
                  focus:ring-primary4 focus:border-primary4 sm:text-sm mb-2"
      />
      <input
        type="text"
        value={buyerId}
        onChange={(e) => setBuyerId(e.target.value)}
        placeholder="Buyer ID"
        className="appearance-none block w-full px-3 
                  py-2 border border-gray-300 rounded-md shadow-sm 
                  placeholder-gray-400 focus:outline-none 
                  focus:ring-primary4 focus:border-primary4 sm:text-sm mb-2"
      />
      <button 
        className="px-2 py-1 text-sm text-white bg-primary4 rounded-md" 
        onClick={createIntent}
      >
        Create Intent
      </button>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  user: user.user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  push,
  createContractIntentSecret,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestSetupIntent)
