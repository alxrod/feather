import DeadlineService from "../../../services/deadline.service";
import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service";

import {resolTypes} from "../../../services/chat.service";
import * as helpers from "../../helpers"
import * as deadlineActions from "../deadlines.actions";

export const changeDate = (doc_id, deadline_id, new_date) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then(
            (creds) => {
                return DeadlineService.changeDate(creds.access_token, creds.user_id, doc_id, deadline_id, new_date).then(
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