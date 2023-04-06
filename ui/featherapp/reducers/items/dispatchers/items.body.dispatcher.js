import ItemService from "../../../services/item.service";
import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service";

import {resolTypes} from "../../../services/chat.service";
import * as helpers from "../../helpers"
import * as itemActions from "../items.actions";

export const editContractItem = (item) => {
    return dispatch => {
        dispatch({
            type: itemActions.CONTRACT_ITEM_EDIT,
            payload: item,
        })
    }
}


export const changeBody = (doc_id, item_id, new_body) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then(
            (creds) => {
                return ItemService.changeBody(creds.access_token, creds.user_id, doc_id, item_id, new_body).then(
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