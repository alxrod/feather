import {AUTH_FAILED} from "./user/user.actions";
import {WORKER_TYPE, BUYER_TYPE, authChecker} from "../services/user.service";
import { errorTypes } from "../services/errors";
import { push } from 'connected-react-router'
import CombinedStore from "./index"
import UserService from "../services/user.service";
import { LOGOUT } from "./user/user.actions"

export const authCheck = (dispatch) => {
    return UserService.authChecker(true).then(
        (creds) => {
            return Promise.resolve(creds)
        },
        (err) => {
            return Promise.reject({})
        },
    )
}

export const bailAuth = (dispatch) => {
    localStorage.removeItem("user");
    localStorage.removeItem("creds");
    localStorage.removeItem("contractNubs");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("creds");
    sessionStorage.removeItem("contractNubs");

    dispatch({
        type: LOGOUT,
    })
    dispatch(push("/"))
}

export const parseError = (error, dispatch) => {
    const message = 
        (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();
    if (message === errorTypes.CONTRACT_WRONG_PERMISSION) {
        dispatch(push("/unauth-contract"))
    } else {
        dispatch(push("/unknown"))
    }
    

    console.log("ERROR CAUGHT IN DISPATCH: " + message)
    return Promise.reject(message);
}