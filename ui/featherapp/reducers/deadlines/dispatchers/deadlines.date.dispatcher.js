import DeadlineService from "../../../services/deadline.service";
import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service";

import {resolTypes} from "../../../services/chat.service";
import * as helpers from "../../helpers"
import * as deadlineActions from "../deadlines.actions";

export const suggestDate = (contract_id, deadline_id, new_date) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then(
            (creds) => {
                return DeadlineService.suggestDate(creds.access_token, creds.user_id, contract_id, deadline_id, new_date).then(
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
};

export const reactDate = (contract_id, message_id, deadline_id, status) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then(
            (creds) => {
                return DeadlineService.reactDate(creds.access_token, creds.user_id, contract_id, deadline_id, message_id, status).then(
                    () => {
                        return Promise.resolve();
                    },
                    (error) => {
                        return helpers.parseError(error, dispatch);
                    }
                );
            }
        );
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
        dispatch({
            type: deadlineActions.CONTRACT_UPDATE_DATE,
            payload: newDate,
        });
    }
}