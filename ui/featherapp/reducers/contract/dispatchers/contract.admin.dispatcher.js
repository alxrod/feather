import ContractService from "../../../services/contract.service"
import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service"


import * as contractActions from "../contract.actions"
import * as itemActions from "../../items/items.actions"
import * as deadlineActions from "../../deadlines/deadlines.actions"
import * as helpers from "../../helpers"

export const requestAdmin = (contract_id) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then(
            (creds) => {
                return ContractService.requestAdmin(creds.access_token, creds.user_id, contract_id).then(
                    (resp) => {
                        return Promise.resolve();
                    },
                    (error) => {
                        return helpers.parseError(error, dispatch);
                    }
                );
            },
            () => {
            }
        );
    }
};

export const resolveAdmin = (contract_id) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then(
            (creds) => {
                return ContractService.resolveAdmin(creds.access_token, creds.user_id, contract_id).then(
                    (resp) => {
                        return Promise.resolve();
                    },
                    (error) => {
                        return helpers.parseError(error, dispatch);
                    }
                );
            },
            () => {
            }
        );
    }
};


export const updateAdminRequested = (newRequestState) => {
    return dispatch => {
        dispatch({
            type: contractActions.CONTRACT_ADMIN_REQUEST_CHANGED,
            payload: {
                lockState: newRequestState
            }
        });
        return Promise.resolve();
    }
}