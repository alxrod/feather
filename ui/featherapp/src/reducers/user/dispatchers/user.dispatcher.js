import UserService from "../../../services/user.service";
import FileService from "../../../services/file.service";

import * as userActions from "../user.actions";
import * as helpers from "../../helpers"

export const register = (username, first_name, last_name, email, password, phone, date, user_type) => {
    return dispatch => {
        return UserService.register(username, first_name, last_name, email, password, phone, date, user_type).then(
            (response) => {
                dispatch({
                    type: userActions.REGISTER_SUCCESS,
                    payload: {
                        user: response.user,
                        creds: response.creds,
                    }
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

export const login = (username, password, remember) => {
    return dispatch => {
        return UserService.login(username, password, remember).then(
            (data) => {
                dispatch({
                    type: userActions.LOGIN_SUCCESS,
                    payload: {
                        user: data.user,
                        creds: data.creds,
                    },
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
        return helpers.authCheck(dispatch).then(
            (creds) => {
                UserService.logout(creds.access_token);
                dispatch({
                    type: userActions.LOGOUT,
                });
            },
            () => {
                helpers.bailAuth(dispatch)
            }
        )
    }
}

export const setRedirect = (link) => {
    console.log("setting redirect to ", link)
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

export const pullUser = () => {
    return dispatch => {
        return helpers.authCheck(dispatch).then(
            (creds) => {
                return UserService.pull_user(creds.access_token, creds.user_id).then(
                    (data) => {
                        dispatch({
                            type: userActions.USER_PULL_SUCCESS,
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
                            type: userActions.USER_PULL_FAIL,
                        });
                        return Promise.reject(message);
                    }
                );
            },
            () => {
                helpers.bailAuth(dispatch)
            }
        )
    }
};

export const forgotPassword = (email) => {
    return dispatch => {
        return UserService.forgotPassword(email).then(
            (resp) => {
                return Promise.resolve();
            },
            (error) => {
                const message = 
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.messsage ||
                    error.toString();
                return Promise.reject(message);
            }
        )
    }
}

export const confirmResetId = (reset_id) => {
    return dispatch => {
        return UserService.confirmResetId(reset_id).then(
            (resp) => {
                return Promise.resolve(resp.validId);
            },
            (error) => {
                const message = 
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.messsage ||
                    error.toString();
                return Promise.reject(message);
            }
        )
    }
}

export const changePassword = (reset_id, new_password) => {
    return dispatch => {
        return UserService.changePassword(reset_id, new_password).then(
            (data) => {
                dispatch({
                    type: userActions.LOGIN_SUCCESS,
                    payload: {
                        user: data.user,
                        creds: data.creds,
                    },
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
                return Promise.reject(message);
            }
        );
    }
};