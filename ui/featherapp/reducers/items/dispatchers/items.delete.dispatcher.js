import ContractService from "../../../services/contract.service";
import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service";

import {resolTypes} from "../../../services/chat.service";
import * as helpers from "../../helpers"
import * as itemActions from "../items.actions";
import * as deadlineActions from "../../deadlines/deadlines.actions";


export const deleteItem = (contract_id, item_id, item_name, item_body, createMode=false) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then(
            (creds) => {
                return ContractService.deleteItem(creds.access_token, creds.user_id, contract_id, item_id, item_name, item_body).then(
                    (data) => {
                        dispatch({
                            type: itemActions.CONTRACT_SUGGEST_ITEM_REMOVE,
                            payload: item_id,
                        })
                        if (createMode) {
                            dispatch({
                                type: deadlineActions.CONTRACT_DEADLINE_ITEM_PURGE,
                                payload: item_id,
                            })
                        }
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

export const reactDeleteItem = (contract_id, message_id, item_id, status) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then(
            (creds) => {
                return ContractService.reactDeleteItem(creds.access_token, creds.user_id, contract_id, item_id, message_id, status).then(
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
}

export const updateLocalItemDelete = (msg) => {
    return dispatch => {
        if (msg.body.resolStatus == resolTypes.APPROVED) {
            dispatch({
                type: deadlineActions.CONTRACT_DEADLINE_ITEM_PURGE,
                payload: msg.body.item.id
            })
            dispatch({
                type: itemActions.CONTRACT_ITEM_REMOVE,
                payload: msg.body.item,
            });
        } else if (msg.body.resolStatus == resolTypes.UNDECIDED) {
            msg.body.item.awaitingApproval = true
            msg.body.item.awaitingDeletion = true
            dispatch({
                type: itemActions.CONTRACT_ITEM_REPLACE,
                payload: msg.body.item,
            });
        } else {
            msg.body.item.awaitingApproval = false
            msg.body.item.awaitingDeletion = false
            dispatch({
                type: itemActions.CONTRACT_ITEM_REPLACE,
                payload: msg.body.item,
            });
        }
        dispatch({
            type: itemActions.CONTRACT_ITEM_RELOAD,
        });
    }
}