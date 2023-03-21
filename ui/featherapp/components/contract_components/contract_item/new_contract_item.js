import React, {useState, useEffect} from 'react'
import TempContractItem from "./temp_contract_item"

const NewContractItem = (props) => {

    const [tempOpen, setTempOpen] = useState(false)
    const [itemName, setItemName] = useState("")
    const [itemBody, setItemBody] = useState("")

    const handleClick = () => {
      if (props.createMode) {
        props.addItem(itemName, itemBody)
      } else {
        setTempOpen(true)
      }      
    }

    const submitItem = () => {
      props.addItem(itemName, itemBody)
      setItemName("")
      setItemBody("")
      setTempOpen(false)
    }
    const discardItem = () => {
      setItemName("")
      setItemBody("")
      setTempOpen(false)
    }
    if (tempOpen) {
      return (
        <TempContractItem
          name={itemName}
          setName={setItemName}
          body={itemBody}
          setBody={setItemBody}
          submitItem={submitItem}
          discardItem={discardItem}
        />   
      )
    }
    return (
      <button
        type="button"
        className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary4"
        onClick={handleClick}
      >
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg" 
          stroke="currentColor" 
          strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        <span className="mt-2 block text-sm font-medium text-primary5 hover:text-primary4">Create a contract item</span>
      </button>
    )
}

export default NewContractItem