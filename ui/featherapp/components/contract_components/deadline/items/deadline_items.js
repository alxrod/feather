import {useEffect, useState, useRef, useContext} from 'react'
import {changeDeadlineItems, reactDeadlineItems} from "../../../../reducers/deadlines/dispatchers/deadlines.items.dispatcher"
import { addItem } from "../../../../reducers/items/dispatchers/items.add.dispatcher"

import ContractItem from "../../contract_item"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DecideButton from '../../decide_button'

import DeadlineItemsBar from "./deadline_items_bar"

const DeadlineItems = (props) => {

  const [selectedId, setSelectedId] = useState("")

  const [addItemMode, setAddItemMode] = useState(false)

  const [newItemName, setNewItemName] = useState("")
  const [newItemBody, setNewItemBody] = useState("")

  const [confirmItem, setConfirmItem] = useState(false)
  const [deleteSuggestedItem, setDeleteSuggestedItem] = useState(false)
  const [createdItem, setCreatedItem] = useState({})

  const addButton = useRef(null)
  const addNewItem = () => {
    props.addItem(props.curContract?.id, newItemName, newItemBody).then(
      (item) => {
        setCreatedItem(item)
        setConfirmItem(true)
      }
    )
  } 
  const cancelNewItem = () => {
    setAddItemMode(false)
    setDeleteSuggestedItem(true)
    setSelectedId("")
  }

  return (
  <div className="bg-white grow flex ml-1 mt-2 w-full">
    <div className="flex items-center flex-col w-full pr-0 sm:pr-10">
      <DeadlineItemsBar
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        addItemMode={addItemMode}
        setNewItemName={setNewItemName}
        setNewItemBody={setNewItemBody}
        setAddItemMode={setAddItemMode}

        createMode={props.createMode}
        confirmItem={confirmItem}
        setConfirmItem={setConfirmItem}
        createdItem={createdItem}

        deleteSuggestedItem={deleteSuggestedItem}
        setDeleteSuggestedItem={setDeleteSuggestedItem}
        addButton={addButton}
        universalLock={props.universalLock}
      />
      <div className="flex grow w-full">
        {addItemMode ? (
          <div className="flex w-full grow relative">
            <textarea
                name="intro_msg"
                id="intro_msg"
                className="flex w-full justify-center items-center cursor-pointer px-4 pt-4 pb-8 border border-2 border-gray-400 hover:border-gray-500 focus:border-primary6 focus:ring-0 rounded-md"
                placeholder="Add the description for this contract item..."
                value={newItemBody}
                onChange={(e) => setNewItemBody(e.target.value)}
            />
            <div className="absolute z-10 bottom-5 right-5">
              <div className="flex items-center">
                <h3 className="text-gray-400 pl-4 mr-2 text-md">Save your new item and commit changes</h3>
                <DecideButton approve={addNewItem} reject={cancelNewItem}/>
              </div>
            </div>
          </div>
        ) : selectedId !== "" ? ( 
          <ContractItem 
            embedded={true}
            createMode={props.createMode}
            id={selectedId}
            disabled={props.universalLock}
          />
        ) : (props.universalLock) ? ( 
          <div 
            className="flex w-full justify-center items-center cursor-pointer p-8 border border-2 border-gray-400 border-dashed rounded-md text-gray-400"
          >
            <h1 className="grow text-center text-xl  font-medium">You need to approve creating this deadline to add items</h1>
          </div>
        ) : (
          <div 
            className="flex w-full justify-center items-center cursor-pointer p-8 border border-2 border-gray-400 hover:border-gray-500 border-dashed rounded-md text-gray-400 hover:text-gray-500"
            onClick={() => {
              addButton.current?.click();
            }}
          >
            <h1 className="grow text-center text-2xl  font-medium">Add an Item</h1>
          </div>
        )}
      </div>
    </div>
  </div>
  )
}

const mapStateToProps = ({ contract, items, deadlines, user, chat}) => ({
  curContract: contract.curContract,
  reloadDeadlines: deadlines.deadlinesChanged,
  contractItems: items.items,
  contractItemsChanged: items.itemsChanged,
  messages: chat.messages,
  user: user.user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  changeDeadlineItems,
  reactDeadlineItems,
  addItem,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeadlineItems) 
