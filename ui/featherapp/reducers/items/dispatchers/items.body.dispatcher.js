import ContractService from "../../../services/contract.service";
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


export const suggestItem = (contract_id, item_id, new_body) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then(
            (creds) => {
                return ContractService.suggestItem(creds.access_token, creds.user_id, contract_id, item_id, new_body).then(
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

export const reactItem = (contract_id, message_id, item_id, status) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then(
            (creds) => {
                return ContractService.reactItem(creds.access_token, creds.user_id, contract_id, item_id, message_id, status).then(
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

export const updateLocalItemBody = (msg) => {
    return dispatch => {
        const newBody = {
            proposerId: msg.user.id,
            itemId: msg.body.itemId,
            current: msg.body.oldVersion,
            awaitingApproval: !msg.body.resolved,
            buyer: msg.body.oldVersion,
            worker: msg.body.oldVersion,
        }
    
        if (msg.body.resolStatus === resolTypes.APPROVED) {
            newBody.current = msg.body.newVersion
            newBody.buyer = msg.body.newVersion
            newBody.worker = msg.body.newVersion
        }

        dispatch({
            type: itemActions.CONTRACT_ITEM_UPDATE_BODY,
            payload: newBody,
        });
    }
}