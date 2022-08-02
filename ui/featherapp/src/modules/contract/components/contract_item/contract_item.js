import React, {Fragment, useState, useEffect} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ItemTextArea from "./contract_item_textarea"



const ContractItem = (props) => {
  
  const [contract_info, setContractInfo] = useState({
    id: "",
    name: "",
    text: "",
    default: true,
  })
  useEffect(() => {
    if (props.contract_info.default !== true) {
      const new_info = props.contract_info
      
      // Conversion:
      if (new_info.bodyList) {
        new_info.text = new_info.bodyList
      }
      
      setContractInfo(props.contract_info)
    }
  }, [props.contract_info.text])


  const setContractText = (new_text) => {
    if (new_text !== contract_info.text) {
      var new_contract_info = {...contract_info}
      new_contract_info.text = new_text
      props.changeItem(new_contract_info);
    }
  }
  

  if (props.embedded === true) {
    return (
        <ItemTextArea embedded={props.embedded} override={props.override} text_body={contract_info.text} disabled={props.disabled} set_text={setContractText}/>
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
            <ItemTextArea override={props.override} text_body={contract_info.text} disabled={props.disabled} set_text={setContractText}/>
          </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ }) => ({
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractItem)