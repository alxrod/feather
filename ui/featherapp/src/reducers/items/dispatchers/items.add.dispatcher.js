import ContractService from "../../../services/contract.service";
import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service";

import {resolTypes} from "../../../services/chat.service";
import * as helpers from "../../helpers"
import * as itemActions from "../items.actions";

export const addContractItem = (create_mode, new_id, new_name) => {
    return dispatch => {
        const new_item = {
            name: "Item " + new_name,
            id: new_id,
            currentBody: "",
            workerBody: "",
            buyerBody: "",
        }
        dispatch({
            type: itemActions.CONTRACT_ITEM_ADD,
            payload: new_item,
        })
        return Promise.resolve(new_item)
    }
}

export const addItem = (contract_id, item_name, item_body) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then(
            (creds) => {
                return ContractService.addItem(creds.access_token, creds.user_id, contract_id, item_name, item_body).then(
                    () => {
                        dispatch({
                            type: itemActions.CONTRACT_SUGGEST_ITEM_REMOVE,
                            payload: {
                                id: "new_negotiate"
                            }
                        });
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
        }

        
        dispatch({
            type: itemActions.CONTRACT_ITEM_RELOAD,
        });
    }
}