import StripeService from "../../../services/stripe.service";
import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service";

import {resolTypes} from "../../../services/chat.service";
import * as helpers from "../../helpers"
import * as stripeActions from "../stripe.actions";


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
                helpers.bailAuth(dispatch)
            }
        );
    }
}

export const getAccountOnboardLink = () => {
    return dispatch => {
        return helpers.authCheck().then(
            (creds) => {
                return StripeService.getAccountOnboardLink(creds.access_token, creds.user_id).then(
                    (url) => {
                        console.log("Succesfuly created session ")
                        return Promise.resolve(url);
                    },
                    (error) => {
                        console.log("Error w session: ", error)
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

export const getInitialSetupSecret = () => {
    return dispatch => {
        return helpers.authCheck().then(
            (creds) => {
                return StripeService.getInitialSetupSecret(creds.access_token, creds.user_id).then(
                    (secret) => {
                        return Promise.resolve(secret);
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
                helpers.bailAuth(dispatch)
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
                helpers.bailAuth(dispatch)
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
                helpers.bailAuth(dispatch)
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
                        return Promise.resolve(methods);
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
    
export const testCharge = () => {
    return dispatch => {
        return helpers.authCheck().then(
            (creds) => {
                return StripeService.testCharge(creds.access_token, creds.user_id).then(
                    (secret) => {
                        return Promise.resolve(secret);
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
                helpers.bailAuth(dispatch)
            }
        );
    }
}
    // export const renewIntentSecret = () => {
    //     return dispatch => {
    //         return helpers.authCheck().then(
    //             (creds) => {
    //                 return StripeService.renewIntentSecret(creds.access_token, creds.user_id).then(
    //                     (secret) => {
    //                         return Promise.resolve(secret);
    //                     },
    //                     (error) => {
    //                         return helpers.parseError(error, dispatch);
    //                     }
    //                 );
    //             },
    //             () => {
    //                 helpers.bailAuth(dispatch)
    //             }
    //         );
    //     }
    // }

// export const addFCAccounts = (account_ids) => {
//     return dispatch => {
//         return helpers.authCheck().then(
//             (creds) => {
//                 return StripeService.addFCAccounts(creds.access_token, creds.user_id, account_ids).then(
//                     () => {
//                         return Promise.resolve();
//                     },
//                     (error) => {
//                         return helpers.parseError(error, dispatch);
//                     }
//                 );
//             },
//             () => {
//                 helpers.bailAuth(dispatch)
//             }
//         );
//     } 
// }
