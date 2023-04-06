import ItemService from "../../../services/item.service";
import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service";

import {resolTypes} from "../../../services/chat.service";
import * as helpers from "../../helpers"
import * as itemActions from "../items.actions";
import * as deadlineActions from "../../deadlines/deadlines.actions";

export const addItem = (doc_id, item_name, item_body, existing_item_names=[]) => {
    if (item_name === "") {
        let maxNum = 0
        for (let i = 0; i < existing_item_names.length; i++) {
            const name = existing_item_names[i].name
            const split = name.split(" ")
            const num = parseInt(split[split.length - 1])
            if (num > maxNum) {
                maxNum = num
            }
        }
        const newName = (maxNum + 1)
        item_name="Item "+newName
    }
    
    return dispatch => {
        return helpers.authCheck(dispatch).then(
            (creds) => {
                return ItemService.addItem(creds.access_token, creds.user_id, doc_id, item_name, item_body).then(
                    (newItem) => {
                        dispatch({
                            type: itemActions.ITEM_ADD,
                            payload: newItem,
                        });
                        return Promise.resolve(newItem);
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