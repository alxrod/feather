import React, {Fragment, useState, useEffect, useMemo, useRef} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import DecideButton from "../decide_button";

import ItemNameInput from "./item_name_input"
import autosize from 'autosize';

const TempContractItem = (props) => {  

  const textarea = useRef(null)
  const [setDefault,toggleSetDefault] = useState(false)

  useEffect(() => {
    if (props.name === "" && !setDefault) {
      toggleSetDefault(true)
      let maxNum = 0
      for (let i = 0; i < props.contractItems.length; i++) {
        const name = props.contractItems[i].name
        const split = name.split(" ")
        const num = parseInt(split[split.length - 1])
        if (num > maxNum) {
          maxNum = num
        }
      }
      const newNum = (maxNum + 1)

      props.setName("Item "+newNum)

    }
  }, [props.name])

  useEffect(() => {
    autosize(textarea.current);
    autosize.update(textarea.current);
  }, [textarea.current])

  return (
    <div className={"bg-white shadow sm:rounded-lg "}>
      <div className="px-2 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ItemNameInput
                value={props.name}
                setValue={props.setName}
                disabled={true}
              />
            </div>
              <div>

                  <div className="flex items-center">
                    <h3 className="text-gray-400 mr-2 text-md">Save your new item</h3>
                    <DecideButton approve={props.submitItem} reject={props.discardItem}/>
                  </div>
              </div>
          </div>
        <div className="mt-2 mr-2 text-sm text-gray-500">
          <div className={"flex flex-col items-start space-x-4"}>
            <div className="grow w-full">
                <div 
                  className={"h-full focus-within:border-primary5 border-b"}
                  onClick={(e) => e.preventDefault()}
                >
                  <label htmlFor="comment" className="sr-only">
                    Add your comment
                  </label>
                  <textarea
                      name="intro_msg"
                      id="intro_msg"
                      className="grow w-full text-gray-700 inline-block focus:border-0 focus:ring-0 focus:outline-none border-0 border-b border-transparent p-0 pb-2 sm:text-sm"
                      placeholder="Add the description for this contract item..."
                      ref={textarea}
                      value={props.body}
                      onChange={(e) => props.setBody(e.target.value)}
                  />
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ items }) => ({
  contractItems: items.items,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TempContractItem)

