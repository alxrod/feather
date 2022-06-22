import ContractService from "../services/contract.service";
import {WORKER_TYPE, BUYER_TYPE} from "../services/user.service";

export const CONTRACT_CREATE = "contract/contract/CREATE"
export const CONTRACT_NUB_PULL_ALL = "contract/contract_nub/PULL_ALL"
export const CONTRACT_PULL_CURRENT = "contract/contract/PULL_CURRENT"

let initialNubs = JSON.parse(localStorage.getItem("contractNubs"));
if (initialNubs) {
    for (let i = 0; i < initialNubs.length; i++) {
        initialNubs[i].deadline = new Date(initialNubs[i].deadline)
    }
} else {
    initialNubs = []
}

const initialState = {contractNubs: initialNubs}

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
        case CONTRACT_NUB_PULL_ALL:
            return {
                ...state,
                contractNubs: action.payload,
            }

        case CONTRACT_PULL_CURRENT:
            return {
                ...state,
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
        default:
            return state
    }

}
export const queryContract = (contract_id) => {
    return dispatch => {
        const {token, id} = getTokenId()
        if (token === false) {
            return Promise.reject("You must be logged in")
        }

        return ContractService.query_contract(token, id, contract_id).then(
            (data) => {
                dispatch({
                    type: CONTRACT_PULL_CURRENT,
                    payload: data.contract,
                });
                // console.log("Finished Contract Pull by Id")
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
                // console.log("Failed Contract Pull by Id")
                // console.log(error)
                return Promise.reject(message);
            }
        );
    }
};


export const queryContractNubs = () => {
    return dispatch => {
        const {token, id} = getTokenId()
        if (token === false) {
            return Promise.reject("You must be logged in")
        }

        return ContractService.query_contract_nubs(token, id).then(
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
    }
};

export const createContract = (title, summary, intro_message, price_set, deadline_set, items) => {
    return dispatch => {
        const {token, id} = getTokenId()
        if (token === false) {
            return Promise.reject("You must be logged in")
        }

        return ContractService.create_contract(token, id, title, summary, intro_message, price_set, deadline_set, items).then(
            (data) => {
                if (data.contract.worker.id == id) {
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
    }
};

const getTokenId = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    let token = ""
    let id = ""
    const err = false
    if (user !== null) {
        token = user.access_token
        id = user.user_id
    }
    if (token === "") {
        return {err, err}
    }
    return {token, id}
}
