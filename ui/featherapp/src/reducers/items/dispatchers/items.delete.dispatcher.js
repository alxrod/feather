import ContractService from "../../../services/contract.service";
import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service";

import {resolTypes} from "../../../services/chat.service";
import * as helpers from "../../helpers"
import * as itemActions from "../items.actions";

export const deleteSuggestContractItem = (id) => {
    return dispatch => {
        dispatch({
            type: itemActions.CONTRACT_SUGGEST_ITEM_REMOVE,
            payload: id,
        })
    }
}

export const deleteItem = (contract_id, item_id, item_name, item_body) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then((creds) => {
            return ContractService.deleteItem(creds.access_token, creds.user_id, contract_id, item_id, item_name, item_body).then(
                (data) => {
                    return Promise.resolve();
                },
                (error) => {
                    return helpers.parseError(error);
                }
            );
        });
    }
};

export const reactDeleteItem = (contract_id, message_id, item_id, status) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then((creds) => {
            return ContractService.reactDeleteItem(creds.access_token, creds.user_id, contract_id, item_id, message_id, status).then(
                () => {
                    return Promise.resolve();
                },
                (error) => {
                    return helpers.parseError(error);
                }
            );
        });
    }
}

export const updateLocalItemDelete = (msg) => {
    return dispatch => {
        if (msg.body.resolStatus == resolTypes.APPROVED) {
            dispatch({
                type: itemActions.CONTRACT_ITEM_REMOVE,
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