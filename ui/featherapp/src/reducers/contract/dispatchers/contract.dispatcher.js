import ContractService from "../../../services/contract.service"
import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service"


import * as contractActions from "../contract.actions"
import * as itemActions from "../../items/items.actions"
import * as deadlineActions from "../../deadlines/deadlines.actions"
import * as helpers from "../../helpers"


export const clearSelected = () => {
    return dispatch => {
        dispatch({
            type: contractActions.CONTRACT_CLEAR_SELECTED,
        });
        dispatch({
            type: itemActions.CONTRACT_ITEM_LOAD,
            payload: [],
        });
        dispatch({
            type: deadlineActions.CONTRACT_DEADLINE_LOAD,
            payload: [],
        });
    }
}

export const queryContract = (contract_id) => {
    return dispatch => {
        return  helpers.authCheck(dispatch).then((creds) => {
            return ContractService.query_contract(creds.access_token, creds.user_id, contract_id).then(
                (data) => {
                    dispatch({
                        type: contractActions.CONTRACT_PULL_CURRENT,
                        payload: data,
                    });
                    dispatch({
                        type: itemActions.CONTRACT_ITEM_LOAD,
                        payload: data.itemsList,
                    })
                    dispatch({
                        type: deadlineActions.CONTRACT_DEADLINE_LOAD,
                        payload: data.deadlinesList,
                    });
                    return Promise.resolve();
                },
                (error) => {
                    return helpers.parseError(error);
                }
            );
        });
    }
};

export const queryContractNubs = () => {
    return dispatch => {
        return helpers.authCheck(dispatch).then((creds) => {
            return ContractService.query_contract_nubs(creds.access_token, creds.user_id).then(
                (data) => {
                    dispatch({
                        type: contractActions.CONTRACT_NUB_PULL_ALL,
                        payload: data.contractNubsList,
                    });
                    return Promise.resolve();
                },
                (error) => {
                    return helpers.parseError(error);
                }
            );
        })
    }
};

export const createContract = (title, summary, intro_message, price_set, deadlines, items, password, role) => {
    return dispatch => {
        return  helpers.authCheck(dispatch).then((creds) => {
            return ContractService.create_contract(creds.access_token, creds.user_id, title, summary, intro_message, price_set, deadlines, items, password, role).then(
                (data) => {
                    if (data.contract.worker.id == creds.user_id) {
                        data.contract.user_type = WORKER_TYPE
                    } else {
                        data.contract.user_type = BUYER_TYPE
                    }
                    dispatch({
                        type: contractActions.CONTRACT_CREATE,
                        payload: data.contract
                    });
                    // console.log("Finished Contract Creation")
                    // console.log(data)
                    return Promise.resolve();
                },
                (error) => {
                    return helpers.parseError(error);
                }
            );
        });
    }
};

export const claimContract = (contract_id, password) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then((creds) => {
            return ContractService.claimContract(creds.access_token, creds.user_id, contract_id, password).then(
                () => {
                    console.log("Approval received")
                    dispatch({
                        type: contractActions.CONTRACT_CLAIM,
                    });
                    return Promise.resolve();
                },
                (error) => {
                    return helpers.parseError(error);
                }
            );
        });
    }
};