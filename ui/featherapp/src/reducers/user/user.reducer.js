import UserService, {WORKER_TYPE, BUYER_TYPE} from "../../services/user.service";
import FileService from "../../services/file.service";
import * as userActions from "./user.actions";


let user = JSON.parse(localStorage.getItem("user"));
if (!user) {
    user = JSON.parse(sessionStorage.getItem("user"));
}
const initialState = {
    redirectLink: "/contracts",
    defaultRegisterRole: WORKER_TYPE,
    
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
        case userActions.USER_ENABLE_BUYER:
            return {
                ...state,
                user: {
                    ...state.user,
                    buyerModeRequested: true,
                    buyerModeEnabled: action.payload
                }
            }
        case userActions.USER_CHANGE_WORKER_STATUS:
            return {
                ...state,
                user: {
                    ...state.user,
                    workerModeRequested: action.payload,
                    workerModeEnabled: action.payload
                }
            }
        case userActions.SET_REDIRECT_LINK:
            return {
                ...state,
                redirectLink: action.payload
            }
        case userActions.SET_REGISTER_ROLE:
            return {
                ...state,
                defaultRegisterRole: action.payload
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
                    profilePhoto: {
                        ...state.profilePhoto,
                        cacheUrl: action.payload,
                    }
                }
            }
        
        default:
            return state
    }
}