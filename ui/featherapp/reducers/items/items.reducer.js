import * as actions from "./items.actions";
import * as helpers from "./items.helpers";


const initialState = {
    items: [],
    itemsChanged: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.ITEM_ADD:
            return {
                ...state,
                itemsChanged: !state.itemsChanged,
                items: [...state.items, action.payload]
            }
        
        case actions.ITEM_EDIT:
            return {
                ...state,
                itemsChanged: !state.itemsChanged,
                items: helpers.replaceContractItem(state.items, action.payload)
            }
        
        case actions.ITEM_LOAD:
            return {
                ...state,
                itemsChanged: !state.itemsChanged,
                items: [...action.payload],
            }
        case actions.ITEM_RELOAD:
            return {
                ...state,
                itemsChanged: !state.itemsChanged,
            }

        case actions.ITEM_UPDATE_BODY:
            const newItem = helpers.contractItemUpdateBody(helpers.getContractItem(state.items, action.payload.itemId), action.payload)
            const newItemsList = helpers.replaceContractItem(state.items, newItem)
            return {
                ...state,
                itemsChanged: !state.itemsChanged,
                items: newItemsList,
            }

        case actions.ITEM_CHANGE_FIGMA_COMPONENT:
            const replacedItem = helpers.contractItemUpdateFigmaComponent(helpers.getContractItem(state.items, action.payload.item_id), action.payload.component_id)
            const repItemsList = helpers.replaceContractItem(state.items, replacedItem)
            return {
                ...state,
                itemsChanged: !state.itemsChanged,
                items: repItemsList,
            }

        case actions.ITEM_REPLACE:
            const addReplacementList = helpers.replaceItemCurCon(state.items, action.payload)
            return {
                ...state,
                itemsChanged: !state.itemsChanged,
                items: addReplacementList,
            }
            
        case actions.ITEM_DELETE:
            const removeReplacementList = helpers.removeItemCurCon(state.items, action.payload)
            return {
                ...state,
                itemsChanged: !state.itemsChanged,
                items: removeReplacementList,
            }
        
        default:
            return state
    }

}