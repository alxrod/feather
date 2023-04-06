import ItemService from "../../../services/item.service";
import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service";

import {resolTypes} from "../../../services/chat.service";
import * as helpers from "../../helpers"
import * as itemActions from "../items.actions";
import * as deadlineActions from "../../deadlines/deadlines.actions";


export const deleteItem = (doc_id, item_id, item_name, item_body) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then(
            (creds) => {
                return ItemService.deleteItem(creds.access_token, creds.user_id, doc_id, item_id, item_name, item_body).then(
                    () => {
                        dispatch({
                            type: itemActions.ITEM_DELETE,
                            payload: item_id,
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