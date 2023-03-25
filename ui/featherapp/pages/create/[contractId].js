import React, {useState, useRef, useEffect} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createContract, updateContract, clearSelected, queryContract, finishCreation, deleteContractDraft} from "../../reducers/contract/dispatchers/contract.dispatcher";
import { addItem } from "../../reducers/items/dispatchers/items.add.dispatcher";

import ContractItem from "../../components/contract_components/contract_item";
import CombinedCriteria from "../../components/contract_components/criteria/combined_criteria";
import NewContractItem from "../../components/contract_components/contract_item/new_contract_item";

import CreateSummary from "../../components/contract_components/create/create_summary.js"
import InviteField from "../../components/contract_components/create/invite_field"
import RoleField from "../../components/contract_components/create/role_field"
import ErrorBanner from "../../components/contract_components/create/error_banner.js"

import SavingNotification from '../../components/contract_components/create/saving_notification';

import { loadLocalDeadlines } from "../../reducers/deadlines/dispatchers/deadlines.add.dispatcher"
import { useRouter } from "next/router"


export async function getStaticPaths() {
  return {
      paths: [], //indicates that no page needs be created at build time
      fallback: 'blocking' //indicates the type of fallback
  }
}

export async function getStaticProps({ params }) {
  return {
    props: {
      contractId: params.contractId,
    },
  };
}

const ContractCreate = (props) => {
  const router = useRouter()
  useEffect(() => {
    if (props.contractId === "new" || "") {
      setNewContractMode(true)
    } else {
      if (isFirstLoad) {
        props.queryContract(props.contractId).then(
          (contract) => {
            setIsFirstLoad(false)
            setConTitle(contract.title)
            setConDescript(contract.summary)
            changeInvitedEmail(contract.invitedEmail)
            changeRole(contract.role)
            changePrice(contract.price.current)
          },
          () => {
            router.push("/unknown")
          })
      }
    }
  }, [props.contractId, props.user])

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
    setConRole(role)
  }
        
  const [conTitle, setConTitle] = useState("")
  const [conDescript, setConDescript] = useState("")
  const [invitedEmail, setInvitedEmail] = useState("")
  const [linkShare, toggleLinkShare] = useState(false)
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
        router.push("/negotiate/"+props.curContract.id)
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
        router.push("/contracts")
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
    console.log("CHANING CON TO : ", props)
  }, [props.curContract])
  useEffect(() => {
    if (!isFirstLoad && !emptyContract(conTitle, conDescript, invitedEmail, conRole, price, props.deadlines, props.contractItems)) {
      if (updateTimeoutId !== -1) {
        clearTimeout(updateTimeoutId)
      }
      setShowSavingNotif(true)
      const updateID = setTimeout(
      () => {
        props.updateContract(props.contractId, conTitle, conDescript, priceObj, props.deadlines, props.contractItems, invitedEmail, linkShare, conRole).then(
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

  }, [conTitle, conDescript, conRole, invitedEmail, price, props.deadlinesChanged, props.itemsChanged, linkShare])

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
    
    if (!linkShare && invitedEmail === "") {
      errors += "You need to include an email or share via link. "
    } else if (!validateEmail(invitedEmail) && invitedEmail !== "") {
      errors += "If you include an email, it must be valid. "
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
              linkShare={linkShare}
              toggleLinkShare={toggleLinkShare}
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
  user: user.user,
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
  deleteContractDraft,
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(ContractCreate)