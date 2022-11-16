import UserService from "../../services/user.service";
import FileService from "../../services/file.service";
import * as userActions from "./user.actions";
const user = JSON.parse(localStorage.getItem("user"));
const creds = JSON.parse(localStorage.getItem("creds"));
const initialState = {
    redirectLink: "/contracts"
    
} 
if (user) {
    initialState.isLoggedIn =true
    initialState.user = user
} else {
    initialState.isLoggedIn = false
    initialState.user = null
}

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
                        instaVerified: true,
                    }
                }
            } else {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        tiktokVerified: true,
                    }
                }
            }
        case userActions.SOCIAL_LINK_FAIL:
            if (action.payload.platform === "Tiktok") {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        instaVerified: false,
                    }
                }
            } else {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        tiktokVerified: false,
                    }
                }
            }

        case userActions.SOCIAL_CREATE_SUCCESS:
            if (action.payload.platform === "Instagram") {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        instaVerified: action.payload.verified,
                        instaAccount: action.payload.account,
                        instaFollowers: action.payload.followers
                    }
                }
            } else {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        tiktokVerified: action.payload.verified,
                        tiktokAccount: action.payload.account,
                        tiktokFollowers: action.payload.followers
                    }
                }
            }

        case userActions.SOCIAL_CREATE_FAIL:
            if (action.payload.platform === "Tiktok") {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        tiktokAccount: "",
                        tiktokFollowers: 0,
                        tiktokVerified: false,
                    }
                }
            } else {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        instaAccount: "",
                        instaFollowers: 0,
                        instaVerified: false,
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
                creds: action.payload.creds,
                credsInCookies: true,
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