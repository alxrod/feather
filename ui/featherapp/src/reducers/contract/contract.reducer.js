import * as actions from "./contract.actions";
import * as helpers from "./contract.helpers";


const initialState = {
    contractNubs: [],

    curContract: {id: ""},
    contractChanged: false,
    contractClaimed: false,   
    contractForceReload: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.CONTRACT_FIGMA_LINK_CHANGE:
            return {
                ...state,
                curContract: {
                    ...state.curContract,
                    figmaLink: action.payload.link,
                }
            }
        case actions.CONTRACT_PURGE_SIGNING:
            console.log("Purging signing")
            return {
                ...state,
                curContract: {
                    ...state.curContract,
                    workerApproved: false,
                    buyerApproved: false,
                }
            }
        case actions.CONTRACT_CREATE:
            return {
                ...state,
                curContract: action.payload
            }
        case actions.CONTRACT_DRAFT_UPDATE:
            return {
                ...state,
                curContract: action.payload
            }
            
        case actions.CONTRACT_CLAIM:
            return {
                ...state,
                contractClaimed: true
            }
        case actions.CONTRACT_STAGE_UPDATE:
            return {
                curContract: {
                    ...state.curContract,
                    workerApproved: state.curContract.workerApproved || action.payload.workerApproved,
                    buyerApproved: state.curContract.buyerApproved || action.payload.buyerApproved,
                    stage: action.payload.stage,
                },
                contractChanged: !state.contractChanged
            }
        
        case actions.CONTRACT_TOGGLE_LOCK:
            return {
                curContract: {
                    ...state.curContract,
                    universalLock: action.payload.lockState,
                    contractChanged: !state.contractChanged,
                },
            }
        
        case actions.CONTRACT_NUB_PULL_ALL:
            return {
                ...state,
                contractNubs: action.payload,
            }

        case actions.CONTRACT_CLEAR_SELECTED:
            return {
                ...state,
                curContract: {},
                contractChanged: !state.contractChanged,
                contractClaimed: false,
            }

        case actions.CONTRACT_PULL_CURRENT:
            return {
                ...state,
                loadingContract: false,
                selectedId: action.payload.id,
                curContract: action.payload
            }

        case actions.CONTRACT_UPDATE_PRICE:
            return {
                ...state,
                contractChanged: !state.contractChanged,
                curContract: helpers.editPrice(
                                state.curContract, 
                                action.payload
                            )
            }
        
        case actions.CONTRACT_ADMIN_REQUEST_CHANGED:
            return {
                ...state,
                contractChanged: !state.contractChanged,
                curContract: helpers.editAdminRequested(
                                state.curContract, 
                                action.payload
                            )
            }

        default:
            return state
    }

}
