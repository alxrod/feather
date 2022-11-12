import UserService from "../../../services/user.service";
import FileService from "../../../services/file.service";

import * as userActions from "../user.actions";
import * as helpers from "../../helpers"

export const register = (username, full_name, email, password) => {
    return dispatch => {
        return UserService.register(username, full_name, email, password).then(
            (response) => {
                dispatch({
                    type: userActions.REGISTER_SUCCESS,
                    payload: {user: response}
                });
                dispatch({
                    type: userActions.SET_MESSAGE,
                    payload: "You have successfuly registered!"
                });
                return Promise.resolve();
            },
            (error) => {
                const message = 
                    (error.response &&
                     error.response.data &&
                     error.response.data.message) ||
                    error.message ||
                    error.toString();
                dispatch({
                    type: userActions.REGISTER_FAIL,
                });
                dispatch({
                    type: userActions.SET_MESSAGE,
                    payload: message,
                });
                return Promise.reject(message);
            }
        );
    }
};

export const login = (username, password) => {
    return dispatch => {
        return UserService.login(username, password).then(
            (data) => {
                dispatch({
                    type: userActions.LOGIN_SUCCESS,
                    payload: {user: data},
                });
                return Promise.resolve();
            },
            (error) => {
                const message = 
                    (error.response &&
                     error.response.data &&
                     error.response.data.message) ||
                    error.messsage ||
                    error.toString();
                dispatch({
                    type: userActions.LOGIN_FAIL,
                });
                dispatch({
                    type: userActions.SET_MESSAGE,
                    payload: message,
                });
                return Promise.reject(message);
            }
        );
    }
};

export const logout = () => {
    return dispatch => {
        UserService.logout();
        dispatch({
            type: userActions.LOGOUT,
        });
    }
}

export const setRedirect = (link) => {
    return dispatch => {
        dispatch({
            type: userActions.SET_REDIRECT_LINK,
            payload: link,
        })
    }
}

export const clearMessage = () => {
    return dispatch => {
        dispatch({
            type: userActions.CLEAR_MESSAGE,
        });
    }
}

export const createInstagram = (user_id, account) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then((creds) => {
            return UserService.add_instagram(creds.access_token, creds.user_id, account).then(
                (data) => {
                    dispatch({
                        type: userActions.SOCIAL_CREATE_SUCCESS,
                        payload: data,
                    });
                    return Promise.resolve();
                },
                (error) => {
                    const message = 
                        (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.messsage ||
                        error.toString();
                    dispatch({
                        type: userActions.SOCIAL_CREATE_FAIL,
                        payload: {platform: "Tiktok"},
                    });
                    dispatch({
                        type: userActions.SET_MESSAGE,
                        payload: message,
                    });
                    return Promise.reject(message);
                }
            );
        })
    }
};

export const createTiktok = (user_id, account) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then((creds) => {
            return UserService.add_tiktok(creds.access_token, creds.user_id, account).then(
                (data) => {
                    dispatch({
                        type: userActions.SOCIAL_CREATE_SUCCESS,
                        payload: data,
                    });
                    return Promise.resolve();
                },
                (error) => {
                    const message = 
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.messsage ||
                        error.toString();
                    dispatch({
                        type: userActions.SOCIAL_CREATE_FAIL,
                        payload: {platform: "Tiktok"},
                    });
                    dispatch({
                        type: userActions.SET_MESSAGE,
                        payload: message,
                    });
                    return Promise.reject(message);
                }
            );
        })
    }
};

export const verifyInstagram = (user_id, code) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then((creds) => {
            return UserService.verify_instagram(creds.access_token, creds.user_id, code).then(
                (data) => {
                    dispatch({
                        type: userActions.SOCIAL_LINK_SUCCESS,
                        payload: data,
                    });
                    return Promise.resolve();
                },
                (error) => {
                    const message = 
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                            error.messsage ||
                            error.toString();
                    dispatch({
                        type: userActions.SOCIAL_CREATE_FAIL,
                        payload: {platform: "Instagram"},
                    });
                    dispatch({
                        type: userActions.SET_MESSAGE,
                        payload: message,
                    });
                    return Promise.reject(message);
                }
            );
        })
    }
};

export const verifyTiktok = (user_id, code) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then((creds) => {
            return UserService.verify_tiktok(creds.access_token, creds.user_id, code).then(
                (data) => {
                    dispatch({
                        type: userActions.SOCIAL_LINK_SUCCESS,
                        payload: data,
                    });
                    return Promise.resolve();
                },
                (error) => {
                    const message = 
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.messsage ||
                        error.toString();
                    dispatch({
                        type: userActions.SOCIAL_CREATE_FAIL,
                        payload: {platform: "Tiktok"},
                    });
                    dispatch({
                        type: userActions.SET_MESSAGE,
                        payload: message,
                    });
                    return Promise.reject(message);
                }
            );
        })
    }
    // add_payment(user_id, card_number, card_holder, month, year, zip, cvv)
};

export const addPayment = (user_id, card_number, card_holder, month, year, zip, cvv) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then((creds) => {
            return UserService.add_payment(creds.access_token, creds.user_id, card_number, card_holder, month, year, zip, cvv).then(
                (data) => {
                    if (data.valid == true) {
                        dispatch({
                            type: userActions.PAYMENT_SETUP_SUCCESS,
                        });
                        return Promise.resolve();
                    } else {
                        dispatch({
                            type: userActions.PAYMENT_SETUP_FAIL,
                        });
                        return Promise.reject("Our services did not find your card information to be correct")
                    }
                },
                (error) => {
                    const message = 
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.messsage ||
                        error.toString();
                    dispatch({
                        type: userActions.PAYMENT_SETUP_FAIL,
                    });
                    return Promise.reject(message);
                }
            );
        })
    }
};

export const pullUser = (user_id) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then((creds) => {
            return UserService.pull_user(creds.access_token, creds.user_id).then(
                (data) => {
                    let user = {
                        username: data.username,
                        email: data.email,
                        type: data.userType,
                        full_name: data.fullName,
                        user_id: data.userId,
                        contract_ids: data.contractIdsList,
                        payment_setup: data.paymentSetup,
                        role: data.role,

                        admin_status: data.adminStatus,
                        profilePhotoUploaded: data.profilePhotoUploaded,

                        instagram: {
                            account: data.instaAccount, 
                            followers: data.instaFollowers, 
                            verified: data.instaVerified, 
                            platform: "Instagram"
                        },
                        tiktok: {
                            account: data.tiktokAccount, 
                            followers: data.tiktokFollowers, 
                            verified: data.tiktokVerified, 
                            platform: "Tiktok"
                        }
                    }
                    dispatch({
                        type: userActions.USER_PULL_SUCCESS,
                        payload: {user: user},
                    });
                    console.log("HERE WE ARE")
                    console.log(data)
                    console.log(user)
                    if (user.profilePhotoUploaded) {
                        FileService.getProfilePicUrl(creds.access_token, creds.user_id).then(
                            (url) => {
                                console.log("Received the url")
                                dispatch({
                                    type: userActions.USER_SET_PROFILE,
                                    payload: url,
                                })
                            },
                            (error) => {
                                console.log("Failed to query User Profile Pic URL")
                            }
                        )
                    }
                    return Promise.resolve();
                },
                (error) => {
                    const message = 
                        (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.messsage ||
                        error.toString();
                    dispatch({
                        type: userActions.USER_PULL_FAIL,
                    });
                    return Promise.reject(message);
                }
            );
        })
    }
};