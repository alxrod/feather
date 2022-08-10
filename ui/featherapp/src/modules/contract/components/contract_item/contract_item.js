import React, {Fragment, useState, useEffect} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ItemTextArea from "./contract_item_textarea"
import { editContractItem } from "../../../../reducers/contract.reducer"


const SAVE_TIME = 350

const ContractItem = (props) => {  
  const [contract_info, setContractInfo] = useState({
    id: "",
    name: "",
    bodyList: [{type: 0, text: "", author: ""}],
    default: true,
  })

  const [saveFlag, setSaveFlag] = useState(false)
  const [saveTimeoutId, setSaveTimeoutId] = useState(-1)

  
  useEffect(() => {
    // console.log("Refreshing contract item")
    if (props.id && props.curItems && props.curItems.length > 0) {
      for (let i = 0; i < props.curItems.length; i++) {
        if (props.curItems[i].id === props.id) {
          // console.log(props.curItems[i])
          setContractInfo(props.curItems[i])
        }
      }
    }
  }, [props.curItems, props.id, props.contractItemsChanged])


  const setContractText = (new_text) => {
    let new_contract_info = JSON.parse(JSON.stringify(contract_info));
    new_contract_info.bodyList = new_text
    setContractInfo(new_contract_info);

    if (saveTimeoutId !== -1) {
      clearTimeout(saveTimeoutId);
    }
    const id = setTimeout(function() {
      // console.log("Saving the contract item...")
      props.editContractItem(new_contract_info);
      setSaveTimeoutId(-1)
    },SAVE_TIME)
    setSaveTimeoutId(id)
  }
  

  if (props.embedded === true) {
    return (
        <ItemTextArea embedded={props.embedded} override={props.override} text_body={contract_info.bodyList} disabled={props.disabled} set_text={setContractText}/>
    )
  }
  return (
    <div className="bg-white shadow sm:rounded-lg">
        <div className="px-2 py-5 sm:p-6">
            <a
              href="#"
              className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-lg"
            >
              <span className="absolute flex-shrink-0 flex items-center justify-center">
              <span
                  className='bg-indigo-500 h-1.5 w-1.5 rounded-full'
                  aria-hidden="true"
              />
              </span>
              <span className="ml-3.5 font-medium text-gray-900">{contract_info.name}</span>
            </a>

          <div className="mt-2 mr-2 text-sm text-gray-500">
            <ItemTextArea override={props.override} text_body={contract_info.bodyList} disabled={props.disabled} set_text={setContractText}/>
          </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ contract }) => ({
  curItems: contract.curConItems,
  contractItemsChanged: contract.contractItemsChanged
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  editContractItem,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractItem)

