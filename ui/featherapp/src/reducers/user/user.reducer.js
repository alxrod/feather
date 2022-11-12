import UserService from "../../services/user.service";
import FileService from "../../services/file.service";
import * as userActions from "./user.actions";
const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
? { isLoggedIn: true, user, redirectLink: "/contracts" }
: { isLoggedIn: false, user: null, redirectLink: "/contracts"};

export default (state = initialState, action) => {
    switch (action.type) {
        case userActions.SET_REDIRECT_LINK:
            return {
                ...state,
                redirectLink: action.payload
            }
        case userActions.AUTH_FAILED: 
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            }
        case userActions.PAYMENT_SETUP_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    paymentSetup: true,
                }
            }
        case userActions.PAYMENT_SETUP_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    paymentSetup: false,
                }
            }

        case userActions.SOCIAL_LINK_SUCCESS:
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
        case userActions.SOCIAL_LINK_FAIL:
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

        case userActions.SOCIAL_CREATE_SUCCESS:
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

        case userActions.SOCIAL_CREATE_FAIL:
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
        

        case userActions.SET_MESSAGE:
            return {
                ...state,
                message: action.payload
            }
        
        case userActions.CLEAR_MESSAGE:
            return {
                ...state,
                message: ""
            }
        case userActions.USER_PULL_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
            }
        case userActions.USER_PULL_FAIL:
            return {
                ...state
            }
        case userActions.REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user,
            };
        
        case userActions.REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        
        case userActions.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user,
        };
        
        case userActions.LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        
        case userActions.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        
        case userActions.USER_SET_PROFILE:
            return {
                ...state,
                user: {
                    ...state.user,
                    profileUrl: action.payload,
                }
            }
        
        default:
            return state
    }
}