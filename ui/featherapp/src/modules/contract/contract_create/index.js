import React, {useState, useRef, useEffect} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { createContract } from "../../../reducers/contract.reducer";

import { ownership_format } from "../../../services/user.service";

import ContractItem from "../components/contract_item/contract_item";
import CombinedCriteria from "../components/criteria/combined_criteria";
import NewContractItem from "../components/contract_item/new_contract_item";

import CreateSummary from "./components/create_summary.js"
import IntroMessage from "./components/intro_message.js"
import ErrorBanner from "./components/error_banner.js"

import { ITEM_AGREED } from "../../../custom_encodings"

const ContractCreate= (props) => {
  const [price, setPrice] = useState({
    current: 0.0,
    you: 0.0,
    partner: 0.0,
  })

  const [contractItems, setContractItems] = useState({})

  const [error, setError] = useState("")
  const [openBanner, setOpenBanner] = useState(false)

  const updateContractItem = (newInfo) => {
		var new_contracts = {...contractItems}
		new_contracts[newInfo.id] = newInfo
		setContractItems(new_contracts)
	}
  
  const [deadline, setDeadline] = useState({
    current: new Date(),
    you: new Date(),
    partner: new Date(),
  })

  const changePrice = (new_price) => {
    let oldPrices = price
    price.you = new_price

    // Specific for create because first version
    price.current = new_price
    price.partner = new_price
    setPrice(oldPrices)
  }
  const changeDeadline = (new_date) => {
    // console.log("changing deadline to " + new_date)
    let oldDeadlines = deadline
    oldDeadlines.you = new_date

    // Specific for create first version
    oldDeadlines.current = new_date
    oldDeadlines.partner = new_date
    
    setDeadline(oldDeadlines)
  }
        
  const [conTitle, setConTitle] = useState("")
  const [conDescript, setConDescript] = useState("")
  const [conMessage, setConMessage] = useState("")

  const [nextId, setNextId] = useState(1)

  const handleCreateContract = (e) => {
    const errors = checkErrors()
    if (errors.length !== 0) {
      setOpenBanner(true)
      setError(errors)
      return
    }
    
    const price_set = ownership_format(price)
    const deadline_set = ownership_format(deadline)
    // console.log(contractItems)
    props.createContract(conTitle, conDescript, conMessage, price_set, deadline_set, contractItems).then(
      () => {
        props.push("/contracts")
      }, (error) => {
        setOpenBanner(true)
        setError(error)
      }
    )
  }

  const checkErrors = () => {
    let errors = ""
    if (!deadline.current) {
      errors += "You must choose a deadline. "
    }
    if (price.you <= 0) {
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
    return errors
  } 

  const addContractItem = () => {
    setNextId(nextId+1)
    // console.log("Adding item with value " + nextId)
    // console.log(contractItems)
    let old_cons = contractItems
    old_cons[nextId.toString()] = {
      name: "Item " + nextId.toString(),
      id: nextId.toString(),
			text: [],
			recip_status: ITEM_AGREED,
			sender_status: ITEM_AGREED,
			chats: [],
    }
    setContractItems(old_cons)
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
                deadline={deadline}
                price={price}
                  
                changePrice={changePrice}
                changeDeadline={changeDeadline}

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
          </div>
        </div>
        <div className="mt-5 flex flex-col justify-start items-center">
          {Object.entries(contractItems).map((contract_and_key) => (
            <div className="min-h-[100px] w-full" key={contract_and_key[0]}>
              <ContractItem override={true} contract_info={contract_and_key[1]} changeItem={updateContractItem} disabled={false} />
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

const mapStateToProps = ({ user }) => ({
  user: user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  createContract,
  push,
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(ContractCreate)