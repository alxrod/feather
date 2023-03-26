import {AUTH_FAILED} from "./user/user.actions";
import {WORKER_TYPE, BUYER_TYPE, authChecker} from "../services/user.service";
import { errorTypes } from "../services/errors";
// import { push } from 'connected-react-router'
import CombinedStore from "./index"
import UserService from "../services/user.service";
import { LOGOUT } from "./user/user.actions"

export const authCheck = (dispatch) => {
    return UserService.authChecker(true).then(
        (creds) => {
            return Promise.resolve(creds)
        },
        (err) => {
            console.log(err.message)
            bailAuth(dispatch)
            return Promise.reject(err.message)
        },
    )
}

const bailAuth = (dispatch) => {
    localStorage.removeItem("creds");
    sessionStorage.removeItem("creds");

    dispatch({
        type: LOGOUT,
    })
}

export const parseError = (error, dispatch) => {
    const message = 
        (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();

    console.log("ERROR CAUGHT IN PARSE ERROR: " + message)
    return Promise.reject(message);
}