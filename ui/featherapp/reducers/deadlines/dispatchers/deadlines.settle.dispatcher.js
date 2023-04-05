import DeadlineService from "../../../services/deadline.service";
import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service";

import {resolTypes} from "../../../services/chat.service";
import * as helpers from "../../helpers"
import * as deadlineActions from "../deadlines.actions";

export const finishDeadline = (contract_id, deadline_id) => {
    return dispatch => {
        return helpers.authCheck().then(
            (creds) => {
                return DeadlineService.finishDeadline(creds.access_token, creds.user_id, contract_id, deadline_id).then(
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
