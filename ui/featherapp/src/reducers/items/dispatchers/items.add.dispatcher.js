import ContractService from "../../../services/contract.service";
import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service";

import {resolTypes} from "../../../services/chat.service";
import * as helpers from "../../helpers"
import * as itemActions from "../items.actions";
import * as deadlineActions from "../../deadlines/deadlines.actions";

export const addItem = (contract_id, item_name, item_body, existing_item_names=[]) => {
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
                return ContractService.addItem(creds.access_token, creds.user_id, contract_id, item_name, item_body).then(
                    (newItem) => {
                        dispatch({
                            type: itemActions.CONTRACT_ITEM_ADD,
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
                helpers.bailAuth(dispatch)
            }
        );
    }
};

export const reactAddItem = (contract_id, message_id, item_id, status) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then(
            (creds) => {
                return ContractService.reactAddItem(creds.access_token, creds.user_id, contract_id, item_id, message_id, status).then(
                    () => {
                        return Promise.resolve();
                    },
                    (error) => {
                        return helpers.parseError(error, dispatch);
                    }
                );
            },
            () => {
                helpers.bailAuth(dispatch)
            }
        );
    }
}

export const updateLocalItemAdd = (msg) => {
    return dispatch => {
        if (msg.body.resolStatus == resolTypes.APPROVED) {
            msg.body.item.awaitingApproval = false
            msg.body.item.awaitingCreation = false
            dispatch({
                type: itemActions.CONTRACT_ITEM_REPLACE,
                payload: msg.body.item,
            });
        } else {
            dispatch({
                type: itemActions.CONTRACT_ITEM_REMOVE,
                payload: msg.body.item,
            });
            dispatch({
                type: deadlineActions.CONTRACT_DEADLINE_ITEM_PURGE,
                payload: msg.body.item.id
            })
        }

        
        dispatch({
            type: itemActions.CONTRACT_ITEM_RELOAD,
        });
    }
}