import ItemService from "../../../services/contract.service";
import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service";

import {resolTypes} from "../../../services/chat.service";
import * as helpers from "../../helpers"
import * as itemActions from "../items.actions";



export const settleItem = (contract_id, deadline_id, item_id, new_state) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then(
            (creds) => {
                return ItemService.settleItem(creds.access_token, creds.user_id, contract_id, deadline_id, item_id, new_state).then(
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
