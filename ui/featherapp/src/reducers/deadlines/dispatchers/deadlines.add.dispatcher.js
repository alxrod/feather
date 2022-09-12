import ContractService from "../../../services/contract.service";
import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service";

import {resolTypes} from "../../../services/chat.service";
import * as helpers from "../../helpers"
import * as deadlineActions from "../deadlines.actions";


export const renameDeadlines = (new_deadlines) => {
    return dispatch => {
        dispatch({
            type: deadlineActions.CONTRACT_DEADLINE_NAMES_UPDATE,
            payload: new_deadlines,
        })
        return Promise.resolve()
    }
}

export const addLocalDeadline = (new_deadline) => {
    return dispatch => {
        dispatch({
            type: deadlineActions.CONTRACT_DEADLINE_ADD,
            payload: new_deadline,
        })
        return Promise.resolve(new_deadline)
    }
    
}
export const deleteLocalDeadline = () => {
    return dispatch => {
        dispatch({
            type: deadlineActions.CONTRACT_DEADLINE_REMOVE,
            payload: {id: "TEMPORARY"},
        })
    }
}


export const addDeadline = (contract_id, deadline) => {
    return dispatch => {
        return helpers.authCheck().then((creds) => {
            return ContractService.addDeadline(creds.access_token, creds.user_id, contract_id, deadline).then(
                () => {
                    return Promise.resolve();
                },
                (error) => {
                    return helpers.parseError(error);
                }
            );
        });
    }
};

export const reactAddDeadline = (contract_id, message_id, deadline_id, status) => {
    return dispatch => {
        return helpers.authCheck().then((creds) => {
            return ContractService.reactAddDeadline(creds.access_token, creds.user_id, contract_id, deadline_id, message_id, status).then(
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

export const updateLocalDeadline = (msg) => {
    return dispatch => {
        if (msg.body.resolStatus == resolTypes.APPROVED) {
            msg.body.deadline.awaitingCreation = false
            dispatch({
                type: deadlineActions.CONTRACT_DEADLINE_REPLACE,
                payload: msg.body.deadline,
            });
        } else {
            dispatch({
                type: deadlineActions.CONTRACT_DEADLINE_REMOVE,
                payload: msg.body.deadline, 
            });
        }
    }
}
