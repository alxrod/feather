import ContractService from "../../../services/contract.service"
import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service"


import * as contractActions from "../contract.actions"
import * as itemActions from "../../items/items.actions"
import * as deadlineActions from "../../deadlines/deadlines.actions"
import * as chatActions from "../../chat/chat.actions"
import * as helpers from "../../helpers"


export const clearSelected = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: contractActions.CONTRACT_CLEAR_SELECTED,
            });
            dispatch({
                type: itemActions.CONTRACT_ITEM_LOAD,
                payload: [],
            });
            dispatch({
                type: deadlineActions.CONTRACT_DEADLINE_LOAD,
                payload: [],
            });
            dispatch({
                type: chatActions.CHAT_CLEAR_REJOIN,
            })
            resolve()
        })
    }
}

export const queryContract = (contract_id) => {
    return dispatch => {
        return  helpers.authCheck(dispatch).then(
            (creds) => {
                return ContractService.query_contract(creds.access_token, creds.user_id, contract_id).then(
                    (data) => {
                        dispatch({
                            type: chatActions.CHAT_CLEAR_REJOIN,
                        })
                        dispatch({
                            type: contractActions.CONTRACT_PULL_CURRENT,
                            payload: data,
                        });
                        dispatch({
                            type: itemActions.CONTRACT_ITEM_LOAD,
                            payload: data.itemsList,
                        })
                        dispatch({
                            type: deadlineActions.CONTRACT_DEADLINE_LOAD,
                            payload: data.deadlinesList,
                        });
                        
                        return Promise.resolve(data);
                    },
                    (error) => {
                        return Promise.reject(error)
                    }
                );
            },
            () => {
            }
        );
    }
};

export const queryInvite = (contract_id, contract_secret) => {
    return dispatch => {
        return ContractService.queryInvite(contract_id, contract_secret).then(
            (data) => {
                return Promise.resolve(data);
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }
};

export const queryContractNubs = () => {
    return dispatch => {
        return helpers.authCheck(dispatch).then(
            (creds) => {
                return ContractService.query_contract_nubs(creds.access_token, creds.user_id, creds.admin_status).then(
                    (data) => {
                        let list = data.contractNubsList
                        if (list === undefined) {
                            list = []
                        } 
                        dispatch({
                            type: contractActions.CONTRACT_NUB_PULL_ALL,
                            payload: list,
                        });
                        return Promise.resolve(list);
                    },
                    (error) => {
                        return helpers.parseError(error, dispatch);
                    }
                );
            },
            () => {
            }
        )
    }
};

export const createContract = (title, summary, price_set, deadlines, items, invited_email, role) => {
    return dispatch => {
        dispatch({
            type: itemActions.CONTRACT_ITEM_LOAD,
            payload: [],
        })
        dispatch({
            type: deadlineActions.CONTRACT_DEADLINE_LOAD,
            payload: [],
        })
        return  helpers.authCheck(dispatch).then(
            (creds) => {
                return ContractService.createContract(creds.access_token, creds.user_id, title, summary, price_set, deadlines, items, invited_email, role).then(
                    (data) => {
                        // if (data.contract.worker.id == creds.user_id) {
                        //     data.contract.user_type = WORKER_TYPE
                        // } else {
                        //     data.contract.user_type = BUYER_TYPE
                        // }
                        // dispatch({
                        //     type: contractActions.CONTRACT_CREATE,
                        //     payload: data.contract
                        // });
                        // const nextURL = document.URL.split("/new")[0]+"/"+data.contract.id
                        // const nextTitle = 'Feather';
                        // const nextState = {};
    
                        // This will replace the current entry in the browser's history, without reloading
                        // window.history.replaceState(nextState, nextTitle, nextURL);
                        return Promise.resolve(data.contract.id);
                    },
                    (error) => {
                        return Promise.reject(error);
                    }
                );
            },
            () => {
            }
        );
    }
};

export const updateContract = (contract_id, title, summary, price_set, deadlines, items, invite_email, link_share, role) => {
    return dispatch => {
        return  helpers.authCheck(dispatch).then(
            (creds) => {
                return ContractService.updateContract(creds.access_token, creds.user_id, contract_id, title, summary, price_set, deadlines, items, invite_email, link_share, role).then(
                    (data) => {
                        if (data.contract.worker.id == creds.user_id) {
                            data.contract.user_type = WORKER_TYPE
                        } else {
                            data.contract.user_type = BUYER_TYPE
                        }
                        dispatch({
                            type: contractActions.CONTRACT_DRAFT_UPDATE,
                            payload: data.contract
                        });
                        return Promise.resolve();
                    },
                    (error) => {
                        return Promise.reject(error);
                    }
                );
            },
            () => {
            }
        );
    }
};

export const deleteContractDraft = (contract_id) => {
    return dispatch => {
        return  helpers.authCheck(dispatch).then(
            (creds) => {
                return ContractService.deleteContractDraft(creds.access_token, creds.user_id, contract_id).then(
                    () => {
                        return Promise.resolve();
                    },
                    (error) => {
                        return Promise.reject(error);
                    }
                );
            },
            () => {
            }
        );
    }
};

export const finishCreation = (contract_id) => {
    return dispatch => {
        return  helpers.authCheck(dispatch).then(
            (creds) => {
                return ContractService.finishCreation(creds.access_token, creds.user_id, contract_id).then(
                    (data) => {
                        if (data.contract.worker.id == creds.user_id) {
                            data.contract.user_type = WORKER_TYPE
                        } else {
                            data.contract.user_type = BUYER_TYPE
                        }
                        dispatch({
                            type: contractActions.CONTRACT_DRAFT_UPDATE,
                            payload: data.contract
                        });
                        return Promise.resolve();
                    },
                    (error) => {
                        return Promise.reject(error.message);
                    }
                );
            },
            () => {
            }
        );
    }
};

export const changeInviteEmail = (contract_id, new_email) => {
    return dispatch => {
        return  helpers.authCheck(dispatch).then(
            (creds) => {
                return ContractService.changeInviteEmail(creds.access_token, creds.user_id, contract_id, new_email).then(
                    (secret) => {
                        dispatch({
                            type: contractActions.CONTRACT_CHANGE_SECRET,
                            payload: secret
                        });
                        return Promise.resolve();
                    },
                    (error) => {
                        return Promise.reject(error.message);
                    }
                );
            },
            () => {
            }
        );
    }
};

export const resendInviteEmail = (contract_id) => {
    return dispatch => {
        return  helpers.authCheck(dispatch).then(
            (creds) => {
                return ContractService.resendInviteEmail(creds.access_token, creds.user_id, contract_id).then(
                    () => {
                        return Promise.resolve();
                    },
                    (error) => {
                        return Promise.reject(error.message);
                    }
                );
            },
            () => {
            }
        );
    }
};

export const claimContract = (contract_id, password) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then(
            (creds) => {
                return ContractService.claimContract(creds.access_token, creds.user_id, contract_id, password).then(
                    () => {
                        dispatch({
                            type: contractActions.CONTRACT_CLAIM,
                        });
                        return Promise.resolve();
                    },
                    (error) => {
                        return Promise.reject(error);
                    }
                );
            }, () => {
            }
        );
    }
};

export const signContract = (contract_id) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then(
            (creds) => {
                return ContractService.signContract(creds.access_token, creds.user_id, contract_id).then(
                    (resp) => {
                        dispatch({
                            type: contractActions.CONTRACT_STAGE_UPDATE,
                            payload: {
                                role: resp.role,
                                workerApproved: resp.contract.workerApproved,
                                buyerApproved: resp.contract.buyerApproved,
                                stage: resp.contract.stage,
                                id: resp.contract.id,
                            }
                        });
                        return Promise.resolve();
                    },
                    (error) => {
                        return Promise.reject(error.message);
                    }
                );
            }, () => {
            });
    }
};

export const settleContract = (contract_id) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then(
            (creds) => {
                return ContractService.settleContract(creds.access_token, creds.user_id, contract_id).then(
                    (resp) => {
                        dispatch({
                            type: contractActions.CONTRACT_STAGE_UPDATE,
                            payload: {
                                role: resp.role,
                                workerApproved: resp.contract.workerApproved,
                                buyerApproved: resp.contract.buyerApproved,
                                stage: resp.contract.stage,
                                id: resp.contract.id,
                            }
                        });
                        return Promise.resolve();
                    },
                    (error) => {
                        return helpers.parseError(error, dispatch);
                    }
                );
            }, () => {
            }
        );
    }
};
