import ContractService from "../../../services/contract.service";
import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service";
import {deadlineItemTypes} from "../../../services/chat.service";

import {resolTypes} from "../../../services/chat.service";
import * as helpers from "../../helpers"
import * as deadlineActions from "../deadlines.actions";


export const changeDeadlineItems = (contract_id, deadline_id, item_ids) => {
    return dispatch => {
        return helpers.authCheck().then(
            (creds) => {
                return ContractService.changeDeadlineItems(creds.access_token, creds.user_id, contract_id, deadline_id, item_ids).then(
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

export const reactDeadlineItems = (contract_id, deadline_id, message_id, status) => {
    return dispatch => {
        return helpers.authCheck().then(
            (creds) => {
                return ContractService.reactDeadlineItems(creds.access_token, creds.user_id, contract_id, deadline_id, message_id, status).then(
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

export const updateLocalDeadlineItems = (msg) => {
    return dispatch => {
        if (msg.body.resolStatus == resolTypes.APPROVED) {
            msg.body.deadline.itemsAwaitingApproval = false
            let new_items = []
            for(let i=0; i< msg.body.deadline.itemsList.length; i++) {
                if (msg.body.deadline.itemStatesList[i] === deadlineItemTypes.ITEM_RESOLVED || 
                    msg.body.deadline.itemStatesList[i] === deadlineItemTypes.ITEM_ADDED) {
                    new_items.push(msg.body.deadline.itemsList[i])
                }
            }
            msg.body.deadline.itemsList = new_items
            msg.body.deadline.itemStatesList = new Array(msg.body.deadline.itemsList.length).fill(deadlineItemTypes.ITEM_RESOLVED);
            dispatch({
                type: deadlineActions.CONTRACT_DEADLINE_REPLACE,
                payload: msg.body.deadline,
            });
        } else if (msg.body.resolStatus == resolTypes.REJECTED) {
            msg.body.deadline.itemsAwaitingApproval = false
            let old_items = []
            for(let i=0; i< msg.body.deadline.itemsList.length; i++) {
                if (msg.body.deadline.itemStatesList[i] === deadlineItemTypes.ITEM_RESOLVED) {
                    old_items.push(msg.body.deadline.itemsList[i])
                }
            }
            msg.body.deadline.itemStatesList = old_items
            dispatch({
                type: deadlineActions.CONTRACT_DEADLINE_REPLACE,
                payload: msg.body.deadline,
            });
        }
    }
}
