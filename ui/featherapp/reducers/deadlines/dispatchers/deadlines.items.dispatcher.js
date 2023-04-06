import DeadlineService from "../../../services/deadline.service";
import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service";
import {deadlineItemTypes} from "../../../services/chat.service";

import {resolTypes} from "../../../services/chat.service";
import * as helpers from "../../helpers"
import * as deadlineActions from "../deadlines.actions";


export const changeDeadlineItems = (doc_id, deadline_id, item_ids) => {
    return dispatch => {
        return helpers.authCheck().then(
            (creds) => {
                return DeadlineService.changeDeadlineItems(creds.access_token, creds.user_id, doc_id, deadline_id, item_ids).then(
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