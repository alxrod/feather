import StripeService from "../../../services/stripe.service";
import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service";

import {resolTypes} from "../../../services/chat.service";
import * as helpers from "../../helpers"
import * as stripeActions from "../stripe.actions";
import * as userActions from "../../user/user.actions";

export const getCustomerFCSecret = () => {
    return dispatch => {
        return helpers.authCheck().then(
            (creds) => {
                return StripeService.getCustomerFCSecret(creds.access_token, creds.user_id).then(
                    (secret) => {
                        return Promise.resolve(secret);
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

export const getAccountOnboardLink = (return_route) => {
    return dispatch => {
        return helpers.authCheck().then(
            (creds) => {
                return StripeService.getAccountOnboardLink(creds.access_token, creds.user_id, return_route).then(
                    (url) => {
                        return Promise.resolve(url);
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

export const getInitialSetupSecret = () => {
    return dispatch => {
        return helpers.authCheck().then(
            (creds) => {
                return StripeService.getInitialSetupSecret(creds.access_token, creds.user_id).then(
                    (secret) => {
                        return Promise.resolve(secret);
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
}

export const listExBAs = () => {
    return dispatch => {
        return helpers.authCheck().then(
            (creds) => {
                return StripeService.listExBAs(creds.access_token, creds.user_id).then(
                    (methods) => {
                        return Promise.resolve(methods);
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

export const listFcas = () => {
    return dispatch => {
        return helpers.authCheck().then(
            (creds) => {
                return StripeService.listFcas(creds.access_token, creds.user_id).then(
                    (methods) => {
                        return Promise.resolve(methods);
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

export const disconnectFca = (fca_id) => {
    return dispatch => {
        return helpers.authCheck().then(
            (creds) => {
                return StripeService.disconnectFca(creds.access_token, creds.user_id, fca_id).then(
                    (methods) => {
                        return Promise.resolve(methods);
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
}

export const deleteConnectedAccount = () => {
    return dispatch => {
        return helpers.authCheck().then(
            (creds) => {
                return StripeService.deleteConnectedAccount(creds.access_token, creds.user_id).then(
                    (methods) => {
                        return Promise.resolve(methods);
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
}

export const disconnectExBa = (ba_id) => {
    return dispatch => {
        return helpers.authCheck().then(
            (creds) => {
                return StripeService.disconnectExBa(creds.access_token, creds.user_id, ba_id).then(
                    (methods) => {
                        return Promise.resolve(methods);
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

export const setDefaultFca = (fca_id) => {
    return dispatch => {
        return helpers.authCheck().then(
            (creds) => {
                return StripeService.setDefaultFca(creds.access_token, creds.user_id, fca_id).then(
                    (methods) => {
                        return Promise.resolve(methods);
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

export const confirmPaymentConnected = (pm_id) => {
    return dispatch => {
        return helpers.authCheck().then(
            (creds) => {
                return StripeService.confirmPaymentConnected(creds.access_token, creds.user_id, pm_id).then(
                    (methods) => {
                        dispatch({
                            type: userActions.USER_ENABLE_BUYER,
                            payload: true,
                        })
                        return Promise.resolve(methods);
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
    
export const createContractIntentSecret = (worker_id, buyer_id) => {
    return dispatch => {
        return helpers.authCheck().then(
            (creds) => {
                return StripeService.createContractIntentSecret(creds.access_token, worker_id, buyer_id).then(
                    (secret) => {
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

export const getInternalCharges = () => {
    return dispatch => {
        return helpers.authCheck().then(
            (creds) => {
                return StripeService.getInternalCharges(creds.access_token, creds.user_id).then(
                    (charges) => {
                        dispatch({
                            type: stripeActions.SET_INTERNAL_CHARGES,
                            payload: charges,
                        })
                        return Promise.resolve(charges);
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