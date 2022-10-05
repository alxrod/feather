import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { useState, useEffect} from "react"
import {WORKER_TYPE, BUYER_TYPE} from "../../../../services/user.service"
import DeltaBody from "../delta/delta_textarea"

const ContractTextArea = (props) => {
  const [oldText, setOldText] = useState("")
  const [newText, setNewText] = useState("")
  useEffect( () => {
    if (props.lock) {
      setOldText(props.contract_info.currentBody)
      if (props.contract_info.workerBody === props.contract_info.currentBody) {
        setNewText(props.contract_info.buyerBody)
      } else {
        setNewText(props.contract_info.workerBody)
      }
    }
  }, [props.lock, props.contractItemsChanged])
  
  const handleChange = (e) => {
    props.set_text(e.target.value)
  };  

  return (
    <div className={"flex flex-col items-start space-x-4" + (props.embedded && " grow")}>
      <div className="grow w-full">
          <div 
            className={"h-full focus-within:border-indigo-600" + (props.embedded ? " rounded-lg border border-gray-200 p-4" : " border-b")}
            onClick={(e) => e.preventDefault()}
          >
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            {props.lock ? (
              <DeltaBody old_text={oldText} new_text={newText}/>
            ) : (
              <textarea
                  name="intro_msg"
                  id="intro_msg"
                  className="grow w-full text-gray-700 inline-block focus:border-0 focus:ring-0 focus:outline-none w-full border-0 border-b border-transparent p-0 pb-2 resize-none sm:text-sm"
                  placeholder="Add the description for this contract item..."
                  value={props.text_body}
                  onChange={handleChange}
                  disabled={props.disabled}
              />
            )}
          </div>
      </div>
     
    </div>
  )
}

const mapStateToProps = ({ user, items }) => ({
  cur_id: (user.user !== null) ? user.user.user_id : "",
  contractItemsChanged: items.itemsChanged,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(ContractTextArea)