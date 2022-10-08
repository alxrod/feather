import ContractService from "../../../services/contract.service"
import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service"


import * as contractActions from "../contract.actions"
import * as itemActions from "../../items/items.actions"
import * as deadlineActions from "../../deadlines/deadlines.actions"
import * as helpers from "../../helpers"

export const toggleLock = (contract_id, lockState) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then((creds) => {
            return ContractService.toggleLock(creds.access_token, creds.user_id, contract_id, lockState).then(
                (resp) => {
                    return Promise.resolve();
                },
                (error) => {
                    return helpers.parseError(error);
                }
            );
        });
    }
};

export const reactLock = (contract_id, message_id, status) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then((creds) => {
            return ContractService.reactLock(creds.access_token, creds.user_id, contract_id, message_id, status).then(
                () => {
                    return Promise.resolve();
                },
                (error) => {
                    return helpers.parseError(error);
                }
            );
        });
    }
}

export const updateLocalLock = (newLockState) => {
    return dispatch => {
        dispatch({
            type: contractActions.CONTRACT_TOGGLE_LOCK,
            payload: {
                lockState: newLockState
            }
        });
        return Promise.resolve();
    }
}