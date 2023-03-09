import React, {useState, useRef, useEffect} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { createContract, updateContract, clearSelected, queryContract, finishCreation, deleteContractDraft} from "../../../reducers/contract/dispatchers/contract.dispatcher";
import { addItem } from "../../../reducers/items/dispatchers/items.add.dispatcher";

import { WORKER_TYPE, BUYER_TYPE } from "../../../services/user.service";

import ContractItem from "../components/contract_item/contract_item";
import CombinedCriteria from "../components/criteria/combined_criteria";
import NewContractItem from "../components/contract_item/new_contract_item";

import CreateSummary from "./components/create_summary.js"
import InviteField from "./components/invite_field"
import RoleField from "./components/role_field"
import ErrorBanner from "./components/error_banner.js"

import SavingNotification from './components/saving_notification';

import { ITEM_AGREED } from "../../../custom_encodings"

import { genEmptyDeadline } from '../../../services/contract.service';
import { loadLocalDeadlines } from "../../../reducers/deadlines/dispatchers/deadlines.add.dispatcher"

const ContractCreate = (props) => {
  const { params: { contractId } } = props.match;
  useEffect(() => {
    if (contractId === "new" || "") {
      setNewContractMode(true)
    } else {
      if (isFirstLoad) {
        props.queryContract(contractId).then((contract) => {
          setIsFirstLoad(false)
          setConTitle(contract.title)
          setConDescript(contract.summary)
          changeInvitedEmail(contract.invitedEmail)
          changeRole(contract.role)
          changePrice(contract.price.current)
        })
      }
    }
  }, [contractId])

  useEffect(() => {
    console.log("ID: ", props.curContract.id)
  }, [props.curContract.id])
  
  const [price, setPrice] = useState(0.0)
  const [priceObj, setPriceObj] = useState({
    current: 0.0,
    worker: 0.0,
    buyer: 0.0,
  })

  const [contractItemIds, setContractItemIds] = useState([])
  const [nextContractName, setNextContractName] = useState("")
  const [newContractMode, setNewContractMode] = useState(false)

  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [updateTimeoutId, setUpdateTimeoutId] = useState(-1)
  const [showSavingNotif, setShowSavingNotif] = useState(false)

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
  }, [props.contractItems.length, props.itemsChanged])

  const [error, setError] = useState("")
  const [openBanner, setOpenBanner] = useState(false)
  

  const changePrice = (new_price) => {
    const fl = parseFloat(new_price)
    const newPriceObj = priceObj
    newPriceObj.current = fl
    newPriceObj.worker = fl
    newPriceObj.buyer = fl
    setPriceObj(newPriceObj)
    setPrice(new_price)
  }

  const changeInvitedEmail = (new_email) => {
    setInvitedEmail(new_email)
  }

  const changeRole = (role) => {
    console.log("CHANGING ROLE to ", role)
    setConRole(role)
  }
        
  const [conTitle, setConTitle] = useState("")
  const [conDescript, setConDescript] = useState("")
  const [invitedEmail, setInvitedEmail] = useState("")
  const [conRole, setConRole] = useState(-1)

  const [nextId, setNextId] = useState(1)

  const handleFinishCreateContract = (e) => {
    const errors = checkErrors()
    if (errors.length !== 0) {
      setOpenBanner(true)
      setError(errors)
      return
    }

    props.finishCreation(props.curContract.id).then(
      () => {
        props.push("/negotiate/"+props.curContract.id)
      }, (error) => {
        setOpenBanner(true)
        console.log(error)
        setError(error)
      }
    )
  }
  const handleDeleteContract = (e) => {

    props.deleteContractDraft(props.curContract.id).then(
      () => {
        props.push("/contracts")
      }, (error) => {
        setOpenBanner(true)
        console.log(error)
        setError(error)
      }
    )
  }

  const emptyContract = (conTitle, conDescript, invitedEmail, conRole, price, deadlines, items) => {
    if (conTitle === "" &&
        conDescript === "" &&
        invitedEmail === "" &&
        price === 0.0 &&
        deadlines.length === 2 &&
        items.length === 0) {
      return true 
    } else {
      return false
    }

  }
  useEffect(() => {
    if (!isFirstLoad && !emptyContract(conTitle, conDescript, invitedEmail, conRole, price, props.deadlines, props.contractItems)) {
      if (updateTimeoutId !== -1) {
        clearTimeout(updateTimeoutId)
      }
      setShowSavingNotif(true)
      const updateID = setTimeout(
      () => {
        props.updateContract(props.curContract.id, conTitle, conDescript, priceObj, props.deadlines, props.contractItems, invitedEmail, conRole).then(
          () => {
            setNewContractMode(false)
            setUpdateTimeoutId(-1)
            setShowSavingNotif(false)
          }, (error) => {
            setOpenBanner(true)
            console.log(error)
            setError(error)
          }
        )
      }, 500)
      setUpdateTimeoutId(updateID)
    } else {
      if (isFirstLoad) {
        setIsFirstLoad(false)
      }
    }

  }, [conTitle, conDescript, conRole, invitedEmail, price, props.deadlinesChanged, props.itemsChanged])

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

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
    
    if (!validateEmail(invitedEmail)) {
      errors += "You need to invite with your partner's real email"
    }
    return errors
  } 

  const addItem = () => {
    if (props.curContract.id === null) {
      // TODO: handle error
      return
    }
    return props.addItem(props.curContract.id, "", "", props.contractItems)
  }

	return (
    <>
      {(openBanner) && (
        <ErrorBanner error={error} closeBanner={() => setOpenBanner(false)}/>
      )}

      {(showSavingNotif && updateTimeoutId !== -1) && (
        <SavingNotification/>
      )}
      <div className="w-full p-4 sm:p-6 lg:p-8">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="w-full">
            <CreateSummary
              title={conTitle}
              setTitle={setConTitle}
              descript={conDescript}
              setDescript={setConDescript}
            />
          </div>

          <div className="w-full]">
            <div className="mb-5"> 
              <CombinedCriteria 
                price={price}

                contractItemIds={contractItemIds}
                addItem={addItem}

                createMode={true}
                changePrice={changePrice}                

                active={true}
              />
            </div>
            <RoleField
              role={conRole}
              changeRole={changeRole}
            />
            <div className="h-5"></div>
            <InviteField
              invitedEmail={invitedEmail}
              setInvitedEmail={setInvitedEmail}
            />
          </div>
        </div>
        <div className="mt-5 flex flex-col justify-start items-center">
          {contractItemIds.map((item_id) => (
            <div className="min-h-[100px] w-full mb-5" key={item_id}>
              <ContractItem 
                createMode={true} 
                id={item_id} 
                disabled={false} 
              />
            </div>
          ))}
          <NewContractItem addItem={addItem} createMode={true}/>
          <div className="flex gap-x-4">
            <button
              type="button"
              onClick={handleFinishCreateContract}
              className="inline-flex items-center mt-5 px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary6 bg-primary1 hover:bg-primary2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary4"
            >
              Send Contract
            </button>
            {(props.curContract.id !== null && props.curContract.id !== undefined) && ( 
              <button
                type="button"
                onClick={handleDeleteContract}
                className="inline-flex items-center mt-5 px-6 py-3 border border-transparent text-base font-medium rounded-md text-red-800 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-200"
              >
                Delete Draft
              </button>
            )}
          </div>
        </div>
      </div>  
    </>
	)
}

const mapStateToProps = ({ user, items, deadlines, contract }) => ({
  curContract: contract.curContract,
  user: user,
  contractItems: items.items,
  deadlines: deadlines.deadlines,
  itemsChanged: items.itemsChanged,
  deadlinesChanged: deadlines.deadlinesChanged,
  
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateContract,
  queryContract,
  clearSelected,
  addItem,
  loadLocalDeadlines,
  finishCreation,
  push,
  deleteContractDraft,
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(ContractCreate)