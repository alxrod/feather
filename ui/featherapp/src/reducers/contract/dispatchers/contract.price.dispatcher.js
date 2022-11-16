import ContractService from "../../../services/contract.service";
import { ITEM_AGREED } from "../../../custom_encodings";
import {resolTypes} from "../../../services/chat.service";

import * as contractActions from "../contract.actions";
import * as itemActions from "../../items/items.actions";
import * as deadlineActions from "../../items/items.actions";
import * as helpers from "../../helpers"

export const suggestPrice = (contract_id, new_price) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then(
            (creds) => {
                return ContractService.suggestPrice(creds.access_token, creds.user_id, contract_id, new_price).then(
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
};

export const reactPrice = (contract_id, message_id, status) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then(
            (creds) => {
                return ContractService.reactPrice(creds.access_token, creds.user_id, contract_id, message_id, status).then(
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

export const updateLocalPrice = (msg) => {
    return dispatch => {
        const newPrice = {
            proposerId: msg.user.id,
            current: msg.body.oldVersion,
            awaitingApproval: !msg.body.resolved,
            buyer: msg.body.oldVersion,
            worker: msg.body.oldVersion,
            
        }
        if (msg.body.resolStatus === resolTypes.APPROVED) {
            newPrice.current = msg.body.newVersion
            newPrice.buyer = msg.body.newVersion
            newPrice.worker = msg.body.newVersion
        }
        dispatch({
            type: contractActions.CONTRACT_UPDATE_PRICE,
            payload: newPrice,
        });
    }
}