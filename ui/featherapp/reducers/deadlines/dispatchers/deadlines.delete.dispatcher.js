import DeadlineService from "../../../services/deadline.service";
import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service";

import {resolTypes} from "../../../services/chat.service";
import * as helpers from "../../helpers"
import * as deadlineActions from "../deadlines.actions";

export const deleteDeadline = (contract_id, deadline) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then(
            (creds) => {
                return DeadlineService.deleteDeadline(creds.access_token, creds.user_id, contract_id, deadline).then(
                    () => {
                        dispatch({
                            type: deadlineActions.CONTRACT_DEADLINE_UPDATE
                        })
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
export const deleteLocalDeadline = (deadline) => {
    return dispatch => {
        dispatch({
            type: deadlineActions.CONTRACT_DEADLINE_REMOVE,
            payload: deadline, 
        });
    }
}

export const reactDeleteDeadline = (contract_id, message_id, deadline_id, status) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then(
            (creds) => {
                return DeadlineService.reactDeleteDeadline(creds.access_token, creds.user_id, contract_id, deadline_id, message_id, status).then(
                    () => {
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