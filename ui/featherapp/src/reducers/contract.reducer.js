import ContractService from "../services/contract.service";
import {AUTH_FAILED} from "./user.reducer";
import {WORKER_TYPE, BUYER_TYPE, authChecker} from "../services/user.service";
import { ITEM_AGREED } from "../custom_encodings";

import {resolTypes} from "../services/chat.service";

export const CONTRACT_CREATE = "contract/contract/CREATE"
export const CONTRACT_CLEAR_SELECTED = "contract/contract/CLEAR"
export const CONTRACT_NUB_PULL_ALL = "contract/contract_nub/PULL_ALL"
export const CONTRACT_CLAIM = "contract/contract/CLAIM"

export const CONTRACT_START_PULL = "contract/contract/START_PULL"
export const CONTRACT_PULL_CURRENT = "contract/contract/PULL_CURRENT"

export const CONTRACT_SEND_EDIT = "contract/contract/SEND_EDIT"
export const CONTRACT_UPDATE_PRICE = "contract/price/UPDATE_PRICE"
export const CONTRACT_UPDATE_PAYOUT = "contract/deadline/UPDATE_PAYOUT"
export const CONTRACT_UPDATE_DATE = "contract/deadline/UPDATE_DATE"
export const CONTRACT_DEADLINE_RELOAD = "contract/deadline/RELOAD"

export const CONTRACT_ITEM_ADD = "contract/item/ADD"
export const CONTRACT_ITEM_EDIT = "contract/item/EDIT"
export const CONTRACT_ITEM_LOAD = "contract/item/LOAD"
export const CONTRACT_ITEM_UPDATE_BODY = "contract/item/UPDATE_BODY"
export const CONTRACT_ITEM_RELOAD = "contract/item/RELOAD"

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
    contractClaimed: false,

    reloadDeadlinesFlag: false,

    curConItems: [],
    contractItemsChanged: false,
    
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
                        deadline: action.payload.deadlinesList[0],
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
        case CONTRACT_CLAIM:
            return {
                ...state,
                contractClaimed: true
            }
        case CONTRACT_START_PULL:
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
                contractClaimed: false,
            }

        case CONTRACT_PULL_CURRENT:
            console.log("FINISHED PULLING CONTRACT:")
            console.log(action.payload)
            return {
                ...state,
                loadingContract: false,
                selectedId: action.payload.id,
                contractNubs: {
                    ...state.contractNubs,
                    [action.payload.id]: {
                        id: action.payload.id,
                        title: action.payload.title,
                        deadline: action.payload.deadlinesList[0],
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
        
        case CONTRACT_SEND_EDIT:
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

        case CONTRACT_UPDATE_PAYOUT:
            return {
                ...state,
                awaitingEdit: false,
                cachedContracts: editContract(
                                    state.cachedContracts, 
                                    editDeadlinePayout(
                                        state.cachedContracts[state.selectedId], 
                                        action.payload
                                    )
                                )
            }
        
        case CONTRACT_UPDATE_DATE:
            return {
                ...state,
                awaitingEdit: false,
                cachedContracts: editContract(
                                    state.cachedContracts, 
                                    editDeadlineDate(
                                        state.cachedContracts[state.selectedId], 
                                        action.payload
                                    )
                                )
            }
        
        case CONTRACT_DEADLINE_RELOAD:
            console.log("TRIGGERING A RELOAD IN THE REDUCER")
            return {
                ...state,
                reloadDeadlinesFlag: !state.reloadDeadlinesFlag,
            }

        case CONTRACT_ITEM_ADD:
            return {
                ...state,
                contractItemsChanged: !state.contractItemsChanged,
                curConItems: [...state.curConItems, action.payload]
            }
        
        case CONTRACT_ITEM_EDIT:
            return {
                ...state,
                contractItemsChanged: !state.contractItemsChanged,
                curConItems: replaceContractItem(state.curConItems, action.payload)
            }
        
        case CONTRACT_ITEM_LOAD:
            return {
                ...state,
                contractItemsChanged: !state.contractItemsChanged,
                curConItems: [...action.payload],
            }
        case CONTRACT_ITEM_RELOAD:
            return {
                ...state,
                contractItemsChanged: !state.contractItemsChanged,
            }
        case CONTRACT_ITEM_UPDATE_BODY:
            const newItem = contractItemUpdateBody(getContractItem(state.curConItems, action.payload.itemId), action.payload)
            const newItemsList = replaceContractItem(state.curConItems, newItem)
            return {
                ...state,
                curConItems: newItemsList,
                cachedContracts: editContract(
                    state.cachedContracts, 
                    updateContractItems(
                        state.cachedContracts[state.selectedId], 
                        newItemsList
                    )
                )

            }
        default:
            return state
    }

}

const getContractItem = (items, id) => {
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) {
            return items[i]
        }
    }
}
const contractItemUpdateBody = (item, newBody) => {
    item.currentBody = newBody.current
    item.workerBody = newBody.worker
    item.buyerBody = newBody.buyer
    item.awaitingApproval = newBody.awaitingApproval      
    return item
}

const updateContractItems = (contract, newItemsList) => {
    contract.itemsList = newItemsList
    return contract
}

const replaceContractItem = (items, new_item) => {
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === new_item.id) {
            items[i] = new_item
        }
    }
    return items
}
const editContract = (contracts, new_contract) => {
    contracts[new_contract.id] = new_contract
    return contracts
}
const editPrice = (contract, price) =>{
    contract.price = price
    return contract
}

const editDeadlinePayout = (contract, payout_info) => {
    let deadline = {}
    let i=0;
    while (i<contract.deadlinesList.length) {
        if (contract.deadlinesList[i].id === payout_info.deadlineId) {
            deadline = contract.deadlinesList[i]
            break
        }
        i++
    }

    deadline.payoutAwaitingApproval = payout_info.awaitingApproval
    deadline.workerPayout = payout_info.worker
    deadline.buyerPayout = payout_info.buyer
    deadline.currentPayout = payout_info.current
    deadline.payoutProposerId = payout_info.proposerId

    contract.deadlinesList[i] = deadline
    return contract   
}

const editDeadlineDate = (contract, date_info) => {
    console.log("Date edit info is")
    console.log(date_info)
    let deadline = {}
    let i=0;
    while (i<contract.deadlinesList.length) {
        if (contract.deadlinesList[i].id === date_info.deadlineId) {
            deadline = contract.deadlinesList[i]
            break
        }
        i++
    }

    deadline.dateAwaitingApproval = date_info.awaitingApproval
    deadline.workerDate = date_info.worker
    deadline.buyerDate = date_info.buyer
    deadline.currentDate = date_info.current
    deadline.dateProposerId = date_info.proposerId

    contract.deadlinesList[i] = deadline
    console.log("New deadline is")
    console.log(deadline)
    return contract
    
}

export const addContractItem = (create_mode, new_id) => {
    return dispatch => {
        if (create_mode) {
            const new_item = {
                name: "Item " + new_id,
                id: new_id,
                currentBody: "",
                workerBody: "",
                buyerBody: "",
            }
            dispatch({
                type: CONTRACT_ITEM_ADD,
                payload: new_item,
            })
            return Promise.resolve(new_item)
        }
    }
}

export const editContractItem = (item) => {
    return dispatch => {
        dispatch({
            type: CONTRACT_ITEM_EDIT,
            payload: item,
        })
    }
}

export const clearSelected = () => {
    return dispatch => {
        dispatch({
            type: CONTRACT_CLEAR_SELECTED,
        });
        dispatch({
            type: CONTRACT_ITEM_LOAD,
            payload: [],
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
                        payload: data,
                    });
                    dispatch({
                        type: CONTRACT_ITEM_LOAD,
                        payload: data.itemsList,
                    })
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

export const createContract = (title, summary, intro_message, price_set, deadlines, items, password, role) => {
    return dispatch => {
        return authChecker(true).then(creds => {
            if (creds === undefined) {
                dispatch({ type: AUTH_FAILED})
                return Promise.reject("You must be logged in")
            }
            return Promise.resolve(creds)
        }).then((creds) => {
            return ContractService.create_contract(creds.access_token, creds.user_id, title, summary, intro_message, price_set, deadlines, items, password, role).then(
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
                        type: CONTRACT_SEND_EDIT,
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

export const reactPrice = (contract_id, message_id, status) => {
    return dispatch => {
        return authChecker(true).then(creds => {
            if (creds === undefined) {
                dispatch({ type: AUTH_FAILED})
                return Promise.reject("You must be logged in")
            }
            return Promise.resolve(creds)
        }).then((creds) => {

            return ContractService.reactPrice(creds.access_token, creds.user_id, contract_id, message_id, status).then(
                () => {
                    dispatch({
                        type: CONTRACT_SEND_EDIT,
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
}

export const suggestPayout = (contract_id, deadline_id, new_payout) => {
    return dispatch => {
        return authChecker(true).then(creds => {
            if (creds === undefined) {
                dispatch({ type: AUTH_FAILED})
                return Promise.reject("You must be logged in")
            }
            return Promise.resolve(creds)
        }).then((creds) => {

            return ContractService.suggestPayout(creds.access_token, creds.user_id, contract_id, deadline_id, new_payout).then(
                () => {
                    dispatch({
                        type: CONTRACT_SEND_EDIT,
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

export const reactPayout = (contract_id, message_id, deadline_id, status) => {
    return dispatch => {
        return authChecker(true).then(creds => {
            if (creds === undefined) {
                dispatch({ type: AUTH_FAILED})
                return Promise.reject("You must be logged in")
            }
            return Promise.resolve(creds)
        }).then((creds) => {

            return ContractService.reactPayout(creds.access_token, creds.user_id, contract_id, deadline_id, message_id, status).then(
                () => {
                    dispatch({
                        type: CONTRACT_SEND_EDIT,
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
}

export const suggestDate = (contract_id, deadline_id, new_date) => {
    return dispatch => {
        return authChecker(true).then(creds => {
            if (creds === undefined) {
                dispatch({ type: AUTH_FAILED})
                return Promise.reject("You must be logged in")
            }
            return Promise.resolve(creds)
        }).then((creds) => {

            return ContractService.suggestDate(creds.access_token, creds.user_id, contract_id, deadline_id, new_date).then(
                () => {
                    dispatch({
                        type: CONTRACT_SEND_EDIT,
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

export const reactDate = (contract_id, message_id, deadline_id, status) => {
    return dispatch => {
        return authChecker(true).then(creds => {
            if (creds === undefined) {
                dispatch({ type: AUTH_FAILED})
                return Promise.reject("You must be logged in")
            }
            return Promise.resolve(creds)
        }).then((creds) => {

            return ContractService.reactDate(creds.access_token, creds.user_id, contract_id, deadline_id, message_id, status).then(
                () => {
                    dispatch({
                        type: CONTRACT_SEND_EDIT,
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
}

export const suggestItem = (contract_id, item_id, new_body) => {
    return dispatch => {
        return authChecker(true).then(creds => {
            if (creds === undefined) {
                dispatch({ type: AUTH_FAILED})
                return Promise.reject("You must be logged in")
            }
            return Promise.resolve(creds)
        }).then((creds) => {

            return ContractService.suggestItem(creds.access_token, creds.user_id, contract_id, item_id, new_body).then(
                () => {
                    dispatch({
                        type: CONTRACT_SEND_EDIT,
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

export const reactItem = (contract_id, message_id, item_id, status) => {
    return dispatch => {
        return authChecker(true).then(creds => {
            if (creds === undefined) {
                dispatch({ type: AUTH_FAILED})
                return Promise.reject("You must be logged in")
            }
            return Promise.resolve(creds)
        }).then((creds) => {

            return ContractService.reactItem(creds.access_token, creds.user_id, contract_id, item_id, message_id, status).then(
                () => {
                    dispatch({
                        type: CONTRACT_SEND_EDIT,
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
}

export const claimContract = (contract_id, password) => {
    return dispatch => {
        return authChecker(true).then(creds => {
            if (creds === undefined) {
                dispatch({ type: AUTH_FAILED})
                return Promise.reject("You must be logged in")
            }
            return Promise.resolve(creds)
        }).then((creds) => {

            return ContractService.claimContract(creds.access_token, creds.user_id, contract_id, password).then(
                () => {
                    console.log("Approval received")
                    dispatch({
                        type: CONTRACT_CLAIM,
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

export const updateLocalPrice = (msg) => {
    return dispatch => {
        const newPrice = {
            proposerId: msg.user.id,
            current: msg.body.oldVersion,
            awaitingApproval: !msg.body.resolved,
            buyer: msg.body.oldVersion,
            worker: msg.body.oldVersion,
            
        }
        if (msg.body.resolStatus === resolTypes.APPROVED) {
            newPrice.current = msg.body.newVersion
            newPrice.buyer = msg.body.newVersion
            newPrice.worker = msg.body.newVersion
        }

        console.log("New price:")
        console.log(newPrice)
        dispatch({
            type: CONTRACT_UPDATE_PRICE,
            payload: newPrice,
        });
        dispatch({
            type: CONTRACT_DEADLINE_RELOAD,
        });
    }
}

export const updateLocalPayout = (msg) => {
    return dispatch => {
        const newPayout = {
            proposerId: msg.user.id,
            deadlineId: msg.body.deadlineId,
            current: msg.body.oldVersion,
            awaitingApproval: !msg.body.resolved,
            buyer: msg.body.oldVersion,
            worker: msg.body.oldVersion,
        }

        if (msg.body.resolStatus === resolTypes.APPROVED) {
            newPayout.current = msg.body.newVersion
            newPayout.buyer = msg.body.newVersion
            newPayout.worker = msg.body.newVersion
        }

        console.log("New payout:")
        console.log(newPayout)
        dispatch({
            type: CONTRACT_UPDATE_PAYOUT,
            payload: newPayout,
        });
        dispatch({
            type: CONTRACT_DEADLINE_RELOAD,
        });
    }
}

export const updateLocalDate = (msg) => {
    return dispatch => {
        const newDate = {
            proposerId: msg.user.id,
            deadlineId: msg.body.deadlineId,
            current: new Date(msg.body.oldVersion.seconds*1000),
            awaitingApproval: !msg.body.resolved,
            buyer: new Date(msg.body.oldVersion.seconds*1000),
            worker: new Date(msg.body.oldVersion.seconds*1000),
        }
    
        if (msg.body.resolStatus === resolTypes.APPROVED) {
            newDate.current = new Date(msg.body.newVersion.seconds*1000)
            newDate.buyer = new Date(msg.body.newVersion.seconds*1000)
            newDate.worker = new Date(msg.body.newVersion.seconds*1000)
        }
    
        console.log("New date:")
        console.log(msg)
        console.log(newDate)
        dispatch({
            type: CONTRACT_UPDATE_DATE,
            payload: newDate,
        });
        dispatch({
            type: CONTRACT_DEADLINE_RELOAD,
        });
    }
}

export const updateLocalItemBody = (msg) => {
    return dispatch => {
        const newBody = {
            proposerId: msg.user.id,
            itemId: msg.body.itemId,
            current: msg.body.oldVersion,
            awaitingApproval: !msg.body.resolved,
            buyer: msg.body.oldVersion,
            worker: msg.body.oldVersion,
        }
    
        if (msg.body.resolStatus === resolTypes.APPROVED) {
            newBody.current = msg.body.newVersion
            newBody.buyer = msg.body.newVersion
            newBody.worker = msg.body.newVersion
        }

        console.log("New body:")
        console.log(msg)
        console.log(newBody)
        dispatch({
            type: CONTRACT_ITEM_UPDATE_BODY,
            payload: newBody,
        });
        dispatch({
            type: CONTRACT_ITEM_RELOAD,
        });
    }
}