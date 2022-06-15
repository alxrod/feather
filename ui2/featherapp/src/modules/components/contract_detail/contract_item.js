import React, {Fragment} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ItemTextArea from "./contract_item_textarea"



const ContractItem = (props) => {

  const setContractText = (new_text) => {

    if (new_text !== props.contract_info.text) {
      var new_contract_info = {...props.contract_info}
      new_contract_info.text = new_text
      props.set_contract_info(new_contract_info);
    }
    
  }

  return (
    <div className="bg-white shadow sm:rounded-lg mb-5">
        <div className="px-2 py-5 sm:p-6">
          <Fragment key="1">
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
              <span className="ml-3.5 font-medium text-gray-900">Item 1</span>
              </a>{' '}
          </Fragment>
          <div className="mt-2 mr-2 text-sm text-gray-500">
            <ItemTextArea text_body={props.contract_info.text} disabled={props.disabled} set_text={setContractText}/>
          </div>
          <div className="mt-3 text-sm">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              {' '}
              View messages specific to this item <span aria-hidden="true">&rarr;</span>
            </a>
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