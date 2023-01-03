import React, {useState, useRef, useEffect} from "react";
import { Redirect } from 'react-router-dom';
import feather_logo from "../../style/logo/feather_logo.svg";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { 
        register,
        addPayment,
} from "../../reducers/user/dispatchers/user.dispatcher";
import { push } from 'connected-react-router'
import {
  toggleFromRegister
} from "../../reducers/site/site.reducer";


const SetupPayment = (props) => {

  const [number, setNumber] = useState("")
  const [holder, setHolder] = useState("")
  const [zip, setZip] = useState("")
  const [cvv, setCvv] = useState("")

  const [exp, setExp] = useState("")
  const [expMonth, setExpMonth] = useState("")
  const [expYear, setExpYear] = useState("")
  
  const [numberError, setNumberError] = useState("")
  const [holderError, setHolderError] = useState("")
  const [zipError, setZipError] = useState("")
  const [cvvError, setCvvError] = useState("")
  const [expError, setExpError] = useState("")

  const [genError, setGenError] = useState("")
  const [errorExists, setErrorExists] = useState(false)
  
  useEffect(()=> {
    if (
        number === "" ||
        holder === "" ||
        zip === "" ||
        cvv === "" ||
        exp === "") {
        setErrorExists(true)
    } else if (errorExists && 
        numberError === "" &&
        holderError === "" &&
        zipError === "" &&
        cvvError === "" &&
        expError === "") {
        setErrorExists(false)
    } else {
        setGenError("")
        setErrorExists(true)
    }
}, [numberError, holderError, zipError, cvvError, expError,
    number, holder, zip, cvv, exp])

  const handleHolderChange = (e) => {
    if (e.target.value === "") {
      setHolderError("A card holder is requred")
    } else {
      setHolderError("")
    }
    setHolder(e.target.value)
  }

  const isInt = (n) => {
    const numCheck = /^[0-9]+$/;
    for (let i=0; i<n.length; i++) {
      if (!numCheck.test(n[i])) {
        return false
      }
    }
    return true
  }

  const handleNumberChange = (e) => {
    const val = e.target.value
    if (!isInt(val)) {
      setNumberError("The card number must be a number")
      return
    }
    if (val.length == 0 || val.length !== 16) {
      setNumberError("Card number must be a 16 digit number")
    } else {
      setNumberError("")
    }
    setNumber(e.target.value)
  }

  const handleZipChange = (e) => {
    const val = e.target.value
    if (!isInt(val)) {
      setZipError("The zip code must be a number")
      return
    }
    setZipError("")
    setZip(val)
  }

  const handleExpChange = (e) => {
    const val = e.target.value
    const ar = val.split("/")
    if (ar.length != 2) {
      setExpError("You need a month and a year for expiration date")
      setExp(val)
      return
    }
    if (!isInt(ar[0]) || !isInt(ar[1])) {
      setExpError("Both month and year must be numbers")
      return
    }
    if (ar[0].length !== 2) {
      setExpError("You must make the month two digits")
      setExp(val)
      return
    }
    if (ar[1].length !== 2) {
      setExpError("You must make the year two digits")
      setExp(val)
      return
    }
    setExpError("")
    setExp(val)
    
    setExpMonth(ar[0])
    setExpYear(ar[1])
  }

  const handleCvvChange = (e) => {
    const val = e.target.value
    if (!isInt(val)) {
      setCvvError("The Cvv must be a number")
      return
    }

    if (val.length !== 3) {
      setCvvError("The Cvv must be 3 digits")   
    } else {
      setCvvError("")
    }
    setCvv(val)

  }

  const handleAddPayment = (e) => {
    e.preventDefault()
    // console.log("Made it through validation")
    if (numberError === "" &&
        holderError === "" &&
        expError === "" &&
        cvvError === "" &&
        zipError === ""
      ) {
        props.addPayment(props.user.id, number, holder, expMonth, expYear, zip, cvv).then( () => {
          props.paymentSuccess()
          
        }, err => {
          setGenError(err)
        })
    }
  }

  return (

    
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        {(genError !== "") && (
            <p className="text-red text-sm">{genError}</p>
        )}
        <form className="space-y-6" action="#" method="POST">
            <div>
            <div className="w-full mr-2">
                <label htmlFor="holder" className="block text-sm font-medium text-gray-700">
                Card Holder
                </label>
                <div className="mt-1">
                <input
                    id="holder"
                    name="holder"
                    type="text"
                    autoComplete="holder"
                    value={holder}
                    onChange={handleHolderChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {(holderError !== "") && (
                    <p className="text-red text-sm">{holderError}</p>
                )}
                </div>
            </div>

            <div className="w-30">
                <div>
                <fieldset>
                    <legend className="block text-sm font-medium text-gray-700">Card Details</legend>
                    <div className="mt-1 bg-white rounded-md shadow-sm -space-y-px">
                    <div>
                        <label htmlFor="card-number" className="sr-only">
                        Card number
                        </label>
                        <input
                        type="text"
                        name="card-number"
                        id="card-number"
                        autoComplete="card-number"
                        className="focus:ring-indigo-500 focus:border-indigo-500 relative block w-full rounded-none rounded-t-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                        placeholder="Card number"
                        value={number}
                        onChange={handleNumberChange}
                        />
                    </div>
                    <div className="flex -space-x-px">
                        <div className="w-1/2 flex-1 min-w-0">
                        <label htmlFor="card-expiration-date" className="sr-only">
                            Expiration date
                        </label>
                        <input
                            type="text"
                            name="card-expiration-date"
                            autoComplete="card-expiration-date"
                            id="card-expiration-date"
                            className="focus:ring-indigo-500 focus:border-indigo-500 relative block w-full rounded-none rounded-bl-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                            placeholder="MM / YY"
                            value = {exp}
                            onChange={handleExpChange}
                        />
                        </div>
                        <div className="flex-1 min-w-0">
                        <label htmlFor="card-cvc" className="sr-only">
                            CVC
                        </label>
                        <input
                            type="password"
                            name="card-cvc"
                            id="card-cvc"
                            autoComplete="card-cvc"
                            className="focus:ring-indigo-500 focus:border-indigo-500 relative block w-full rounded-none rounded-br-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                            placeholder="CVC"
                            value = {cvv}
                            onChange={handleCvvChange}

                        />
                        </div>
                    </div>
                    </div>
                    {(numberError !== "") && (
                    <p className="text-red text-sm">{numberError}</p>
                    )}
                    {(expError !== "") && (
                    <p className="text-red text-sm">{expError}</p>
                    )}
                    {(cvvError !== "") && (
                    <p className="text-red text-sm">{cvvError}</p>
                    )}
                </fieldset>
                <fieldset className="mt-6 bg-white">
                    <legend className="block text-sm font-medium text-gray-700">Billing address</legend>
                    <div className="mt-1 rounded-md shadow-sm -space-y-px">
                    <div>
                        <label htmlFor="country" className="sr-only">
                        Country
                        </label>
                        <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="focus:ring-indigo-500 focus:border-indigo-500 relative block w-full rounded-none rounded-t-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                        >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="postal-code" className="sr-only">
                        ZIP / Postal code
                        </label>
                        <input
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        className="focus:ring-indigo-500 focus:border-indigo-500 relative block w-full rounded-none rounded-b-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                        placeholder="ZIP / Postal code"
                        value={props.zip}
                        onChange={handleZipChange}
                        />
                        {(zipError !== "") && (
                        <p className="text-red text-sm">{zipError}</p>
                        )}
                    </div>
                    </div>
                </fieldset>
                </div>
            </div>
            </div>


            <div>
            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleAddPayment}
            >
                Add Payment Method
            </button>
            {props.fromRegister && (
                <div className="w-full mt-3 flex justify-center">
                <a className="text-gray-600 text-sm" href="" onClick={() => props.push("/contracts")}>
                    or set up later
                </a>
                </div>
            )}
            </div>
        </form>
        <br/>
        </div>
        
    </div>
  )
}

const mapStateToProps = ({ user, site }) => ({
    user: user.user,
    fromRegister: site.fromRegister
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    register,
    push,
    addPayment,
    toggleFromRegister,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SetupPayment)
