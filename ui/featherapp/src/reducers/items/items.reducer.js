import * as actions from "./items.actions";
import * as helpers from "./items.helpers";


const initialState = {
    items: [],
    itemsChanged: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.CONTRACT_ITEM_ADD:
            return {
                ...state,
                itemsChanged: !state.itemsChanged,
                items: [...state.items, action.payload]
            }
        
        case actions.CONTRACT_ITEM_EDIT:
            return {
                ...state,
                itemsChanged: !state.itemsChanged,
                items: helpers.replaceContractItem(state.items, action.payload)
            }
        
        case actions.CONTRACT_ITEM_LOAD:
            return {
                ...state,
                itemsChanged: !state.itemsChanged,
                items: [...action.payload],
            }
        case actions.CONTRACT_ITEM_RELOAD:
            return {
                ...state,
                itemsChanged: !state.itemsChanged,
            }

        case actions.CONTRACT_ITEM_UPDATE_BODY:
            const newItem = helpers.contractItemUpdateBody(helpers.getContractItem(state.items, action.payload.itemId), action.payload)
            const newItemsList = helpers.replaceContractItem(state.items, newItem)
            return {
                ...state,
                itemsChanged: !state.itemsChanged,
                items: newItemsList,
            }
        case actions.CONTRACT_SUGGEST_ITEM_REMOVE:
            return {
                ...state,
                itemsChanged: !state.itemsChanged,
                items: helpers.deleteContractItem(state.items, action.payload)
            }
        
        case actions.CONTRACT_ITEM_REPLACE_SUGGEST:
            const replacementList = helpers.replaceSuggestItemCurCon(state.items, action.payload)
            return {
                ...state,
                itemsChanged: !state.itemsChanged,
                items: replacementList,
            }

        case actions.CONTRACT_ITEM_REPLACE:
            const addReplacementList = helpers.replaceItemCurCon(state.items, action.payload)
            return {
                ...state,
                itemsChanged: !state.itemsChanged,
                items: addReplacementList,
            }
            
        case actions.CONTRACT_ITEM_REMOVE:
            const removeReplacementList = helpers.removeItemCurCon(state.items, action.payload)
            return {
                ...state,
                itemsChanged: !state.itemsChanged,
                items: removeReplacementList,
            }
        
        case actions.CONTRACT_ITEM_SUGGEST_DELETE:
            const deletedItemInList = helpers.activateDeletionOfItem(state.items, action.payload)
            return {
                ...state,
                itemsChanged: !state.itemsChanged,
                items: deletedItemInList,
            }

        default:
            return state
    }

}