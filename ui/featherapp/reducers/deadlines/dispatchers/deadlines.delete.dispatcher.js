import DeadlineService from "../../../services/deadline.service";
import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service";

import {resolTypes} from "../../../services/chat.service";
import * as helpers from "../../helpers"
import * as deadlineActions from "../deadlines.actions";

export const deleteDeadline = (doc_id, deadline) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then(
            (creds) => {
                return DeadlineService.deleteDeadline(creds.access_token, creds.user_id, doc_id, deadline).then(
                    () => {
                        dispatch({
                            type: deadlineActions.DEADLINE_DELETE,
                            payload: deadline,
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
