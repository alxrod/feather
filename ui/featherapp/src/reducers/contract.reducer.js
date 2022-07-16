import ContractService from "../services/contract.service";
import {AUTH_FAILED} from "./user.reducer";
import {WORKER_TYPE, BUYER_TYPE, authChecker} from "../services/user.service";

export const CONTRACT_CREATE = "contract/contract/CREATE"
export const CONTRACT_CLEAR_SELECTED = "contract/contract/CLEAR"
export const CONTRACT_NUB_PULL_ALL = "contract/contract_nub/PULL_ALL"

export const CONTRACT_START_PULL = "contract/contract/START_PULL"
export const CONTRACT_PULL_CURRENT = "contract/contract/PULL_CURRENT"

export const CONTRACT_SUGGEST_PRICE = "contract/price/SUGGEST"
export const CONTRACT_UPDATE_PRICE = "contract/price/SET_AWAITING"


let initialNubs = JSON.parse(localStorage.getItem("contractNubs"));
if (initialNubs) {
    for (let i = 0; i < initialNubs.length; i++) {
        initialNubs[i].deadline = new Date(initialNubs[i].deadline)
    }
} else {
    initialNubs = []
}

const initialState = {
    contractNubs: initialNubs,
    selectedId: "",
    awaitingEdit: false,
    loadingContract: false,
    
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CONTRACT_CREATE:
            return {
                ...state,
                contractNubs: {
                    ...state.contractNubs,
                    [action.payload.id]: {
                        id: action.payload.id,
                        title: action.payload.title,
                        deadline: action.payload.deadline.current,
                        price: action.payload.price.current,
                        stage: action.payload.stage,
                        user_type: action.payload.user_type,
                    }
                },
                cachedContracts: {
                    ...state.cachedContracts,
                    [action.payload.id]: action.payload
                }
            }
        case CONTRACT_START_PULL:
            console.log("STARTING CONTRACT PULL")
            return {
                ...state,
                loadingContract: true,
            }
        case CONTRACT_NUB_PULL_ALL:
            return {
                ...state,
                contractNubs: action.payload,
            }
        case CONTRACT_CLEAR_SELECTED:
            return {
                ...state,
                selectedId: "",
            }

        case CONTRACT_PULL_CURRENT:
            console.log("PULL FINISHED")
            return {
                ...state,
                loadingContract: false,
                selectedId: action.payload.id,
                contractNubs: {
                    ...state.contractNubs,
                    [action.payload.id]: {
                        id: action.payload.id,
                        title: action.payload.title,
                        deadline: action.payload.deadline.current,
                        price: action.payload.price.current,
                        stage: action.payload.stage,
                        user_type: action.payload.user_type,
                    }
                },
                cachedContracts: {
                    ...state.cachedContracts,
                    [action.payload.id]: action.payload
                }
            }
        
        case CONTRACT_SUGGEST_PRICE:
            return {
                ...state,
                awaitingEdit: true,
            }

        case CONTRACT_UPDATE_PRICE:
            return {
                ...state,
                awaitingEdit: false,
                cachedContracts: editContract(
                                    state.cachedContracts, 
                                    editPrice(
                                        state.cachedContracts[state.selectedId], 
                                        action.payload
                                    )
                                )
            }
        default:
            return state
    }

}

const editContract = (contracts, new_contract) => {
    contracts[new_contract.id] = new_contract
    return contracts
}
const editPrice = (contract, price) =>{
    contract.price = price
    return contract
}

export const clearSelected = () => {
    return dispatch => {
        dispatch({
            type: CONTRACT_CLEAR_SELECTED,
        });
    }
}

export const queryContract = (contract_id) => {
    return dispatch => {
        return authChecker(true).then(creds => {
            if (creds === undefined) {
                dispatch({ type: AUTH_FAILED})
                return Promise.reject("You must be logged in")
            }
            return Promise.resolve(creds)
        }).then((creds) => {

            dispatch({
                type: CONTRACT_START_PULL
            })
            return ContractService.query_contract(creds.access_token, creds.user_id, contract_id).then(
                (data) => {
                    dispatch({
                        type: CONTRACT_PULL_CURRENT,
                        payload: data.contract,
                    });
                    console.log("Finished Contract Pull by Id")
                    console.log(data)
                    return Promise.resolve();
                },
                (error) => {
                    const message = 
                        (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();
                    // console.log("Failed Contract Pull by Id")
                    // console.log(error)
                    return Promise.reject(message);
                }
            );
        });
    }
};


export const queryContractNubs = () => {
    return dispatch => {
        return authChecker(true).then(creds => {
            if (creds === undefined) {
                dispatch({ type: AUTH_FAILED})
                return Promise.reject("You must be logged in")
            }
            return Promise.resolve(creds)
        }).then((creds) => {
            return ContractService.query_contract_nubs(creds.access_token, creds.user_id).then(
                (data) => {

                    dispatch({
                        type: CONTRACT_NUB_PULL_ALL,
                        payload: data.contractNubsList,
                    });
                    // console.log("Finished Contract Pull")
                    // console.log(data)
                    return Promise.resolve();
                },
                (error) => {
                    const message = 
                        (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();
                    // console.log("Failed Contract Pull")
                    // console.log(error)
                    return Promise.reject(message);
                }
            );
        })
    }
};

export const createContract = (title, summary, intro_message, price_set, deadline_set, items, password) => {
    return dispatch => {
        return authChecker(true).then(creds => {
            if (creds === undefined) {
                dispatch({ type: AUTH_FAILED})
                return Promise.reject("You must be logged in")
            }
            return Promise.resolve(creds)
        }).then((creds) => {
            return ContractService.create_contract(creds.access_token, creds.user_id, title, summary, intro_message, price_set, deadline_set, items, password).then(
                (data) => {
                    if (data.contract.worker.id == creds.user_id) {
                        data.contract.user_type = WORKER_TYPE
                    } else {
                        data.contract.user_type = BUYER_TYPE
                    }
                    dispatch({
                        type: CONTRACT_CREATE,
                        payload: data.contract
                    });
                    // console.log("Finished Contract Creation")
                    // console.log(data)
                    return Promise.resolve();
                },
                (error) => {
                    const message = 
                        (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();
                    // console.log("Failed Contract Creation")
                    // console.log(error)
                    return Promise.reject(message);
                }
            );
        });
    }
};

export const suggestPrice = (contract_id, new_price) => {
    return dispatch => {
        return authChecker(true).then(creds => {
            if (creds === undefined) {
                dispatch({ type: AUTH_FAILED})
                return Promise.reject("You must be logged in")
            }
            return Promise.resolve(creds)
        }).then((creds) => {

            return ContractService.suggestPrice(creds.access_token, creds.user_id, contract_id, new_price).then(
                () => {
                    console.log("Approval received")
                    dispatch({
                        type: CONTRACT_SUGGEST_PRICE,
                    });
                    return Promise.resolve();
                },
                (error) => {
                    console.log("Error:")
                    const message = 
                        (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();
                    console.log(message)
                    return Promise.reject(message);
                }
            );
        });
    }
};