import ContractService from "../../../services/contract.service";
import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service";

import {resolTypes} from "../../../services/chat.service";
import * as helpers from "../../helpers"
import * as deadlineActions from "../deadlines.actions";

export const deleteDeadline = (contract_id, deadline) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then(
            (creds) => {
                return ContractService.deleteDeadline(creds.access_token, creds.user_id, contract_id, deadline).then(
                    (data) => {
                        return Promise.resolve();
                    },
                    (error) => {
                        return helpers.parseError(error, dispatch);
                    }
                );
            },
            () => {
                helpers.bailAuth(dispatch)
            }
        );
    }
};

export const deleteLocalDeadline = (del_deadline) => {
    return dispatch => {
        dispatch({
            type: deadlineActions.CONTRACT_DEADLINE_REMOVE,
            payload: del_deadline,
        })
        return Promise.resolve(del_deadline)
    }
}

export const reactDeleteDeadline = (contract_id, message_id, deadline_id, status) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then(
            (creds) => {
                return ContractService.reactDeleteDeadline(creds.access_token, creds.user_id, contract_id, deadline_id, message_id, status).then(
                    () => {
                        return Promise.resolve();
                    },
                    (error) => {
                        return helpers.parseError(error, dispatch);
                    }
                );
            },
            () => {
                helpers.bailAuth(dispatch)
            }
        );
    }
}

export const updateLocalDeadlineDelete = (msg) => {
    return dispatch => {
        msg.body.deadline.awaitingDeletion = false
        if (msg.body.resolStatus == resolTypes.APPROVED) {
            dispatch({
                type: deadlineActions.CONTRACT_DEADLINE_REMOVE,
                payload: msg.body.deadline, 
            });
        } else {
            dispatch({
                type: deadlineActions.CONTRACT_DEADLINE_REPLACE,
                payload: msg.body.deadline,
            });
        }
    }
}