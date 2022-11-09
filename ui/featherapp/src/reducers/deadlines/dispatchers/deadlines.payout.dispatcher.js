import ContractService from "../../../services/contract.service";
import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service";

import {resolTypes} from "../../../services/chat.service";
import * as helpers from "../../helpers"
import * as deadlineActions from "../deadlines.actions";


export const suggestPayout = (contract_id, deadline_id, new_payout) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then((creds) => {
            return ContractService.suggestPayout(creds.access_token, creds.user_id, contract_id, deadline_id, new_payout).then(
                () => {
                    return Promise.resolve();
                },
                (error) => {
                    return helpers.parseError(error, dispatch);
                }
            );
        });
    }
};

export const reactPayout = (contract_id, message_id, deadline_id, status) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then((creds) => {
            return ContractService.reactPayout(creds.access_token, creds.user_id, contract_id, deadline_id, message_id, status).then(
                () => {
                    return Promise.resolve();
                },
                (error) => {
                    return helpers.parseError(error, dispatch);
                }
            );
        });
    }
}

export const updateLocalPayout = (msg) => {
    return dispatch => {
        const newPayout = {
            proposerId: msg.user.id,
            deadlineId: msg.body.deadlineId,
            current: msg.body.oldVersion,
            awaitingApproval: !msg.body.resolved,
            buyer: msg.body.oldVersion,
            worker: msg.body.oldVersion,
        }

        if (msg.body.resolStatus === resolTypes.APPROVED) {
            newPayout.current = msg.body.newVersion
            newPayout.buyer = msg.body.newVersion
            newPayout.worker = msg.body.newVersion
        }
        dispatch({
            type: deadlineActions.CONTRACT_UPDATE_PAYOUT,
            payload: newPayout,
        });
    }
}