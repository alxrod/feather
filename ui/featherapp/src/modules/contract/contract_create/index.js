import React, {useState, useRef, useEffect} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { createContract, clearSelected, addContractItem } from "../../../reducers/contract.reducer";

import { ownership_format, WORKER_TYPE, BUYER_TYPE } from "../../../services/user.service";

import ContractItem from "../components/contract_item/contract_item";
import CombinedCriteria from "../components/criteria/combined_criteria";
import NewContractItem from "../components/contract_item/new_contract_item";

import CreateSummary from "./components/create_summary.js"
import IntroMessage from "./components/intro_message.js"
import PasswordField from "./components/password_field"
import RoleField from "./components/role_field"
import ErrorBanner from "./components/error_banner.js"

import { ITEM_AGREED } from "../../../custom_encodings"

import { genEmptyDeadline } from '../../../services/contract.service';

const ContractCreate = (props) => {
  const [price, setPrice] = useState(0.0)
  const [priceObj, setPriceObj] = useState({
    current: 0.0,
    worker: 0.0,
    buyer: 0.0,
  })
  const [contractItemIds, setContractItemIds] = useState([])
  useEffect( () => {
    if (props.contractItems.length > 0) {
      let ids = []
      for (let i = 0; i < props.contractItems.length; i++) {
        ids.push(props.contractItems[i].id)
      }
      setContractItemIds(ids)
    }
  }, [props.contractItems.length])

  useEffect( () => {
    console.log("New Change:")
    console.log(props.contractItems)
  }, [props.contractItemsChanged])
  const [error, setError] = useState("")
  const [openBanner, setOpenBanner] = useState(false)
  
  const now = new Date()
  const [deadlines, setDeadlines] = useState([
    genEmptyDeadline(new Date(now.getTime() + 1*86400000)),
    genEmptyDeadline(new Date(now.getTime() + 8*86400000))
  ])

  const changePrice = (new_price) => {
    const fl = parseFloat(new_price)
    const newPriceObj = priceObj
    newPriceObj.current = fl
    newPriceObj.worker = fl
    newPriceObj.buyer = fl
    setPriceObj(newPriceObj)
    setPrice(new_price)
  }
  const changeDeadlines = (new_deadlines) => {
    // console.log("changing deadline to " + new_date)
    setDeadlines(new_deadlines)
  }

  const changePassword = (new_password) => {
    setConPassword(new_password)
  }

  const changeRole = () => {
    if (conRole === WORKER_TYPE) {
      setConRole(BUYER_TYPE)
    } else {
      setConRole(WORKER_TYPE)
    }

  }
        
  const [conTitle, setConTitle] = useState("")
  const [conDescript, setConDescript] = useState("")
  const [conMessage, setConMessage] = useState("")
  const [conPassword, setConPassword] = useState("")
  const [conRole, setConRole] = useState(WORKER_TYPE)

  const [nextId, setNextId] = useState(1)

  const handleCreateContract = (e) => {
    const errors = checkErrors()
    if (errors.length !== 0) {
      setOpenBanner(true)
      setError(errors)
      return
    }
    console.log("Made it to contract creation")
    console.log(conTitle)
    console.log(conDescript)
    console.log(conMessage)
    console.log(priceObj)
    console.log(deadlines)
    console.log(props.contractItems)
    console.log(conPassword)
    console.log(conRole)
    const conItems = JSON.parse(JSON.stringify(props.contractItems))
    props.createContract(conTitle, conDescript, conMessage, priceObj, deadlines, conItems, conPassword, conRole).then(
      () => {
        props.push("/contracts")
      }, (error) => {
        setOpenBanner(true)
        console.log(error)
        setError(error)
      }
    )
  }

  const checkErrors = () => {
    let errors = ""
    if (deadlines.length < 2) {
      errors += "You must choose 2 future deadlines for start and end"
      console.log("deadlines:")
      console.log(deadlines)
    }
    if (price.you <= 0) {
      console.log("Price issue:");
      console.log(price)
      errors += "You must choose a price greater than $0. "
    }
    if (conTitle === "") {
      errors += "You need a title. "
    }
    if (conDescript === "") {
      errors += "You need a description. "
    }
    if (conMessage === "") {
      errors += "You need a introduction message. "
    }
    if (conPassword.length < 5) {
      errors += "You need at least a 5 character password for your contract"
    }
    return errors
  } 

  const addContractItem = () => {
    
    // console.log("Adding item with value " + nextId)
    // console.log(contractItems)
    let new_id = nextId.toString()
    setNextId(nextId+1)
    return props.addContractItem(true, new_id)
  }



	return (
    <>
      {(openBanner) && (
        <ErrorBanner error={error} closeBanner={() => setOpenBanner(false)}/>
      )}
      <div className="min-w-[50vw] p-4 sm:p-6 lg:p-8 m-auto">
        <div className="flex flex-row justify-between items-stretch">
          <div className="flex flex-col grow min-w-[45vw] mr-10">
            <div className="mb-5"> 
              <CombinedCriteria 
                deadlines={deadlines}
                price={price}

                contractItemIds={contractItemIds}
                addContractItem={addContractItem}


                createMode={true}
                changePrice={changePrice}
                changeDeadlines={changeDeadlines}
                

                active={true}
              />
            </div>
            <div>
              <CreateSummary
                title={conTitle}
                setTitle={setConTitle}
                descript={conDescript}
                setDescript={setConDescript}
              />
            </div>

          </div>

          <div className="flex flex-col min-w-[45vw]">
            <IntroMessage
              message={conMessage}
              setMessage={setConMessage}
            />
            <PasswordField
              password={conPassword}
              setPassword={setConPassword}
            />
            <RoleField
              role={conRole}
              changeRole={changeRole}
            />
          </div>
        </div>
        <div className="mt-5 flex flex-col justify-start items-center">
          {contractItemIds.map((item_id) => (
            <div className="min-h-[100px] w-full mb-5" key={item_id}>
              <ContractItem override={true} id={item_id} disabled={false} />
            </div>
          ))}
          <NewContractItem addContractItem={addContractItem}/>
          <button
            type="button"
            onClick={handleCreateContract}
            className="inline-flex items-center mt-5 px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send Contract
          </button>
        </div>
      </div>  
    </>
	)
}

const mapStateToProps = ({ user, contract }) => ({
  user: user,
  contractItems: contract.curConItems,
  contractItemsChanged: contract.contractItemsChanged,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  createContract,
  clearSelected,
  addContractItem,
  push,
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(ContractCreate)