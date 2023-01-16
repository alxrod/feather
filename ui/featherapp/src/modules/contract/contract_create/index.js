import React, {useState, useRef, useEffect} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { createContract, clearSelected } from "../../../reducers/contract/dispatchers/contract.dispatcher";
import { addContractItem } from "../../../reducers/items/dispatchers/items.add.dispatcher";

import { ownership_format, WORKER_TYPE, BUYER_TYPE } from "../../../services/user.service";

import ContractItem from "../components/contract_item/contract_item";
import CombinedCriteria from "../components/criteria/combined_criteria";
import NewContractItem from "../components/contract_item/new_contract_item";

import CreateSummary from "./components/create_summary.js"
import PasswordField from "./components/password_field"
import RoleField from "./components/role_field"
import ErrorBanner from "./components/error_banner.js"

import { ITEM_AGREED } from "../../../custom_encodings"

import { genEmptyDeadline } from '../../../services/contract.service';
import { loadLocalDeadlines } from "../../../reducers/deadlines/dispatchers/deadlines.add.dispatcher"

const ContractCreate = (props) => {
  const [price, setPrice] = useState(0.0)
  const [priceObj, setPriceObj] = useState({
    current: 0.0,
    worker: 0.0,
    buyer: 0.0,
  })
  const [contractItemIds, setContractItemIds] = useState([])
  const [nextContractName, setNextContractName] = useState("")
  useEffect( () => {
    let ids = []
    let max = 0
    for (let i = 0; i < props.contractItems.length; i++) {
      const num = parseInt(props.contractItems[i].name.split(" ")[1])
      if (num > max) {
        max = num
      }
      ids.push(props.contractItems[i].id)
    }
    setNextContractName((max+1).toString())
    setContractItemIds(ids)
  }, [props.contractItems.length, props.contractItemsChanged])

  const [error, setError] = useState("")
  const [openBanner, setOpenBanner] = useState(false)
  
  const now = new Date()
  useEffect( () => {
    if (props.deadlines.length === 0) {
      let d1 = genEmptyDeadline(new Date(now.getTime() + 1*86400000))
      let d2 = genEmptyDeadline(new Date(now.getTime() + 8*86400000))
      d1.id = "1"
      d2.id = "2"
      let new_deadlines = [d1, d2]
      props.loadLocalDeadlines(new_deadlines)
    }
  })

  const changePrice = (new_price) => {
    const fl = parseFloat(new_price)
    const newPriceObj = priceObj
    newPriceObj.current = fl
    newPriceObj.worker = fl
    newPriceObj.buyer = fl
    setPriceObj(newPriceObj)
    setPrice(new_price)
  }

  const changePassword = (new_password) => {
    setConPassword(new_password)
  }

  const changeRole = (role) => {
    console.log("CHANGING ROLE to ", role)
    setConRole(role)
  }
        
  const [conTitle, setConTitle] = useState("")
  const [conDescript, setConDescript] = useState("")
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

    props.createContract(conTitle, conDescript, priceObj, props.deadlines, props.contractItems, conPassword, conRole).then(
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
    if (props.deadlines.length < 2) {
      errors += "You must choose 2 future deadlines for start and end"
      console.log("deadlines:")
      console.log(props.deadlines)
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
    return props.addContractItem(true, new_id, nextContractName)
  }



	return (
    <>
      {(openBanner) && (
        <ErrorBanner error={error} closeBanner={() => setOpenBanner(false)}/>
      )}
      <div className="min-w-[50vw] p-4 sm:p-6 lg:p-8 m-auto">
        <div className="flex flex-row justify-between items-stretch">
          <div className="flex flex-col grow min-w-[45vw] mr-10">
            <CreateSummary
              title={conTitle}
              setTitle={setConTitle}
              descript={conDescript}
              setDescript={setConDescript}
            />
          </div>

          <div className="flex flex-col min-w-[45vw]">
            <div className="mb-5"> 
              <CombinedCriteria 
                price={price}

                contractItemIds={contractItemIds}
                addContractItem={addContractItem}

                createMode={true}
                changePrice={changePrice}                

                active={true}
              />
            </div>
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

const mapStateToProps = ({ user, items, deadlines }) => ({
  user: user,
  contractItems: items.items,
  deadlines: deadlines.deadlines,
  contractItemsChanged: items.itemsChanged,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  createContract,
  clearSelected,
  addContractItem,
  loadLocalDeadlines,
  push,
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(ContractCreate)