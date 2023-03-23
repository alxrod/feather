import ContractService from "../../../services/contract.service"
import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service"


import * as contractActions from "../contract.actions"
import * as itemActions from "../../items/items.actions"
import * as deadlineActions from "../../deadlines/deadlines.actions"
import * as chatActions from "../../chat/chat.actions"
import * as helpers from "../../helpers"


export const clearSelected = () => {
    return dispatch => {
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
                // console
                return ContractService.query_contract_nubs(creds.access_token, creds.user_id, creds.admin_status).then(
                    (data) => {
                        dispatch({
                            type: contractActions.CONTRACT_NUB_PULL_ALL,
                            payload: data.contractNubsList,
                        });
                        return Promise.resolve(data.contractNubsList);
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

export const updateContract = (contract_id, title, summary, price_set, deadlines, items, password, role) => {
    return dispatch => {
        return  helpers.authCheck(dispatch).then(
            (creds) => {
                return ContractService.updateContract(creds.access_token, creds.user_id, contract_id, title, summary, price_set, deadlines, items, password, role).then(
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
                        // console.log("Finished Contract Creation")
                        // console.log(data)
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
                        // console.log("Finished Contract Creation")
                        // console.log(data)
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
                        console.log("Approval received")
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
