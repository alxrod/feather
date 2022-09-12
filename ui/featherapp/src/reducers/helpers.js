import {AUTH_FAILED} from "./user/user.reducer";
import {WORKER_TYPE, BUYER_TYPE, authChecker} from "../services/user.service";

export const authCheck = (dispatch) => {
    return authChecker(true).then(creds => {
        if (creds === undefined) {
            dispatch({ type: AUTH_FAILED})
        }
        return Promise.resolve(creds)
    })
}

export const parseError = (error) => {
    const message = 
        (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();
    console.log("ERROR CAUGHT IN DISPATCH: " + message)
    return Promise.reject(message);
}