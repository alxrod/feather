import UserService from "../services/user.service";

export const REGISTER_SUCCESS = "user/auth/REGISTER_SUCCESS"
export const REGISTER_FAIL = "user/auth/REGISTER_FAIL"
export const LOGIN_SUCCESS = "user/auth/LOGIN_SUCCESS"
export const LOGIN_FAIL = "user/auth/LOGIN_FAIL"
export const LOGOUT = "user/auth/LOGOUT"
export const USER_PULL_SUCCESS = "user/auth/PULL_SUCCESS"
export const USER_PULL_FAIL = "user/auth/PULL_FAIL"

export const SOCIAL_LINK_SUCCESS = "user/social/LINK_SUCCESS"
export const SOCIAL_LINK_FAIL = "user/social/LINK_FAIL"
export const SOCIAL_CREATE_SUCCESS = "user/social/CREATE_SUCCESS"
export const SOCIAL_CREATE_FAIL = "user/social/CREATE_FAIL"

export const PAYMENT_SETUP_SUCCESS = "user/payment/SETUP_SUCCESS"
export const PAYMENT_SETUP_FAIL = "user/payment/SETUP_FAIL"

export const SET_MESSAGE = "user/SET_MESSAGE"
export const CLEAR_MESSAGE = "user/CLEAR_MESSAGE"

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
? { isLoggedIn: true, user }
: { isLoggedIn: false, user: null };

export default (state = initialState, action) => {
    switch (action.type) {
        case PAYMENT_SETUP_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    paymentSetup: true,
                }
            }
        case PAYMENT_SETUP_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    paymentSetup: false,
                }
            }

        case SOCIAL_LINK_SUCCESS:
            if (action.payload.platform === "Instagram") {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        instagram: {
                            ...state.user.instagram,
                            verified: true,
                        }
                    }
                }
            } else {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        tiktok: {
                            ...state.user.tiktok,
                            verified: true,
                        }
                    }
                }
            }
        case SOCIAL_LINK_FAIL:
            if (action.payload.platform === "Tiktok") {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        instagram: {
                            ...state.user.instagram,
                            verified: false,
                        }
                    }
                }
            } else {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        tiktok: {
                            ...state.user.instagram,
                            verified: false,
                        }
                    }
                }
            }

        case SOCIAL_CREATE_SUCCESS:
            if (action.payload.platform === "Instagram") {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        instagram: action.payload
                    }
                }
            } else {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        tiktok: action.payload
                    }
                }
            }

            case SOCIAL_CREATE_FAIL:
                if (action.payload.platform === "Tiktok") {
                    return {
                        ...state,
                        user: {
                            ...state.user,
                            instagram: {account: "", followers: 0, verified: false, platform: "INVALID"}
                        }
                    }
                } else {
                    return {
                        ...state,
                        user: {
                            ...state.user,
                            tiktok: {account: "", followers: 0, verified: false, platform: "INVALID"}
                        }
                    }
                }
        

        case SET_MESSAGE:
            return {
                ...state,
                message: action.payload
            }
        
        case CLEAR_MESSAGE:
            return {
                ...state,
                message: ""
            }
        case USER_PULL_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
            }
        case USER_PULL_FAIL:
            return {
                ...state
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user,
            };
        
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user,
        };
        
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        
        default:
            return state
    }
}

export const register = (username, full_name, email, password) => {
    return dispatch => {
        return UserService.register(username, full_name, email, password).then(
            (response) => {
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: {user: response}
                });
                dispatch({
                    type: SET_MESSAGE,
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
                    type: REGISTER_FAIL,
                });
                dispatch({
                    type: SET_MESSAGE,
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
                    type: LOGIN_SUCCESS,
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
                    type: LOGIN_FAIL,
                });
                dispatch({
                    type: SET_MESSAGE,
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
            type: LOGOUT,
        });
    }
}

export const clearMessage = () => {
    return dispatch => {
        dispatch({
            type: CLEAR_MESSAGE,
        });
    }
}

export const createInstagram = (user_id, account) => {
    return dispatch => {
        const user = JSON.parse(localStorage.getItem("user"))
        let token = ""
        if (user !== null) {
            token = user.access_token
        }
        if (token == "") {
            return Promise.reject("You must log in first.")
        }
        return UserService.add_instagram(token, user_id, account).then(
            (data) => {
                dispatch({
                    type: SOCIAL_CREATE_SUCCESS,
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
                    type: SOCIAL_CREATE_FAIL,
                    payload: {platform: "Tiktok"},
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: message,
                });
                return Promise.reject(message);
            }
        );
    }
};

export const createTiktok = (user_id, account) => {
    return dispatch => {
        const user = JSON.parse(localStorage.getItem("user"))
        let token = ""
        if (user !== null) {
            token = user.access_token
        }
        if (token == "") {
            return Promise.reject("You must log in first.")
        }
        return UserService.add_tiktok(token, user_id, account).then(
            (data) => {
                dispatch({
                    type: SOCIAL_CREATE_SUCCESS,
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
                    type: SOCIAL_CREATE_FAIL,
                    payload: {platform: "Tiktok"},
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: message,
                });
                return Promise.reject(message);
            }
        );
    }
};

export const verifyInstagram = (user_id, code) => {
    return dispatch => {
        const user = JSON.parse(localStorage.getItem("user"))
        let token = ""
        if (user !== null) {
            token = user.access_token
        }
        if (token == "") {
            return Promise.reject("You must log in first.")
        }
        return UserService.verify_instagram(token, user_id, code).then(
            (data) => {
                dispatch({
                    type: SOCIAL_LINK_SUCCESS,
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
                    type: SOCIAL_CREATE_FAIL,
                    payload: {platform: "Instagram"},
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: message,
                });
                return Promise.reject(message);
            }
        );
    }
};

export const verifyTiktok = (user_id, code) => {
    return dispatch => {
        const user = JSON.parse(localStorage.getItem("user"))
        let token = ""
        if (user !== null) {
            token = user.access_token
        }
        if (token == "") {
            return Promise.reject("You must log in first.")
        }
        return UserService.verify_tiktok(token, user_id, code).then(
            (data) => {
                dispatch({
                    type: SOCIAL_LINK_SUCCESS,
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
                    type: SOCIAL_CREATE_FAIL,
                    payload: {platform: "Tiktok"},
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: message,
                });
                return Promise.reject(message);
            }
        );
    }
    // add_payment(user_id, card_number, card_holder, month, year, zip, cvv)
};

export const addPayment = (user_id, card_number, card_holder, month, year, zip, cvv) => {
    return dispatch => {
        const user = JSON.parse(localStorage.getItem("user"))
        let token = ""
        if (user !== null) {
            token = user.access_token
        }
        if (token == "") {
            return Promise.reject("You must log in first.")
        }
        return UserService.add_payment(token, user_id, card_number, card_holder, month, year, zip, cvv).then(
            (data) => {
                if (data.valid == true) {
                    dispatch({
                        type: PAYMENT_SETUP_SUCCESS,
                    });
                    return Promise.resolve();
                } else {
                    dispatch({
                        type: PAYMENT_SETUP_FAIL,
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
                    type: PAYMENT_SETUP_FAIL,
                });
                return Promise.reject(message);
            }
        );
    }
};

export const pullUser = (user_id) => {
    return dispatch => {
        const user = JSON.parse(localStorage.getItem("user"))
        let token = ""
        if (user !== null) {
            token = user.access_token
        }
        if (token == "") {
            return Promise.reject("You must log in first.")
        }
        return UserService.pull_user(token, user_id).then(
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
                    type: USER_PULL_SUCCESS,
                    payload: {user: user},
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
                    type: USER_PULL_FAIL,
                });
                return Promise.reject(message);
            }
        );
    }
};