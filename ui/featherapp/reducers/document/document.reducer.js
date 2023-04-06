import * as actions from "./document.actions";
import * as helpers from "./document.helpers";


const initialState = {
    documentNubs: [],

    curDocument: {id: ""},
    documentChanged: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.DOCUMENT_CREATE:
            console.log("CREATING NUB")
            return {
                ...state,
                curDocument: action.payload
            }
        case actions.DOCUMENT_NUB_PULL_ALL:
            console.log("SETTING PULLED DOC NUBS")
            return {
                ...state,
                documentNubs: action.payload,
            }
        case actions.DOCUMENT_CLEAR_SELECTED:
            console.log("CLEAR SELECTION for DOC")
            return {
                ...state,
                curDocument: {},
                documentChanged: !state.contractChanged,
            }

        case actions.DOCUMENT_PULL_CURRENT:
            console.log("PULLIN CURRENT DOC")
            return {
                ...state,
                curDocument: action.payload
            }
        
        case actions.DOCUMENT_FIGMA_LINK_CHANGE:
            return {
                ...state,
                curDocument: {
                    ...state.curDocument,
                    figmaLink: action.payload.link,
                    figmaFileKey: helpers.parseKeyFromLink(action.payload.link)
                }
            }

        default:
            return state
    }

}
