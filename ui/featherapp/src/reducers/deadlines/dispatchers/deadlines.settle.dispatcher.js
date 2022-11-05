import ContractService from "../../../services/contract.service";
import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service";

import {resolTypes} from "../../../services/chat.service";
import * as helpers from "../../helpers"
import * as deadlineActions from "../deadlines.actions";

export const finishDeadline = (contract_id, deadline_id) => {
    return dispatch => {
        return helpers.authCheck().then((creds) => {
            return ContractService.finishDeadline(creds.access_token, creds.user_id, contract_id, deadline_id).then(
                () => {
                    return Promise.resolve();
                },
                (error) => {
                    return helpers.parseError(error);
                }
            );
        });
    }
};

export const confirmDeadline = (contract_id, deadline_id) => {
    return dispatch => {
        return helpers.authCheck().then((creds) => {
            return ContractService.confirmDeadline(creds.access_token, creds.user_id, contract_id, deadline_id).then(
                () => {
                    return Promise.resolve();
                },
                (error) => {
                    return helpers.parseError(error);
                }
            );
        });
    }
};

export const undoDeadline = (contract_id, deadline_id) => {
    return dispatch => {
        return helpers.authCheck().then((creds) => {
            return ContractService.undoDeadline(creds.access_token, creds.user_id, contract_id, deadline_id).then(
                () => {
                    return Promise.resolve();
                },
                (error) => {
                    return helpers.parseError(error);
                }
            );
        });
    }
};
