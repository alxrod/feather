import DeadlineService from "../../../services/deadline.service";
import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service";

import {resolTypes} from "../../../services/chat.service";
import * as helpers from "../../helpers"
import * as deadlineActions from "../deadlines.actions";


export const renameDeadlines = (new_deadlines) => {
    return dispatch => {
        dispatch({
            type: deadlineActions.DEADLINE_NAMES_UPDATE,
            payload: new_deadlines,
        })
        return Promise.resolve()
    }
}


export const loadLocalDeadlines = (new_deadlines) => {
    return dispatch => {
        dispatch({
            type: deadlineActions.DEADLINE_LOAD,
            payload: new_deadlines,
        })
    }
}

export const editDeadline = (deadline) => {
    return dispatch => {
        dispatch({
            type: deadlineActions.DEADLINE_REPLACE,
            payload: deadline,
        });
    }
}


export const addDeadline = (doc_id, deadline) => {
    return dispatch => {
        return helpers.authCheck().then(
            (creds) => {
                return DeadlineService.addDeadline(creds.access_token, creds.user_id, doc_id, deadline).then(
                    (deadline) => {
                        dispatch({
                            type: deadlineActions.DEADLINE_ADD,
                            payload: deadline,
                        })
                        return Promise.resolve(deadline);
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