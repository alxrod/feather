import UserService from "../services/user.service";

export const REGISTER_SUCCESS = "user/auth/REGISTER_SUCCESS"
export const REGISTER_FAIL = "user/auth/REGISTER_FAIL"
export const LOGIN_SUCCESS = "user/auth/LOGIN_SUCCESS"
export const LOGIN_FAIL = "user/auth/LOGIN_FAIL"
export const LOGOUT = "user/auth/LOGOUT"

export const SOCIAL_LINK_SUCCESS = "user/social/LINK_SUCCESS"
export const SOCIAL_LINK_FAIL = "user/social/LINK_FAIL"
export const SOCIAL_CREATE_SUCCESS = "user/social/CREATE_SUCCESS"
export const SOCIAL_CREATE_FAIL = "user/social/CREATE_FAIL"


export const SET_MESSAGE = "user/SET_MESSAGE"
export const CLEAR_MESSAGE = "user/CLEAR_MESSAGE"

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
? { isLoggedIn: true, user }
: { isLoggedIn: false, user: null };

export default (state = initialState, action) => {
    switch (action.type) {
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

        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
            };
        
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
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
                return Promise.reject();
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
                return Promise.reject();
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
        return UserService.add_instagram(user_id, account).then(
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
                return Promise.reject();
            }
        );
    }
};

export const createTiktok = (user_id, account) => {
    return dispatch => {
        return UserService.add_tiktok(user_id, account).then(
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
                return Promise.reject();
            }
        );
    }
};

export const verifyInstagram = (user_id) => {
    return dispatch => {
        return UserService.verify_instagram(user_id).then(
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
                return Promise.reject();
            }
        );
    }
};

export const verifyTiktok = (user_id) => {
    return dispatch => {
        return UserService.verify_tiktok(user_id).then(
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
                return Promise.reject();
            }
        );
    }


};

