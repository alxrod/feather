import {AUTH_FAILED} from "./user/user.actions";
import {WORKER_TYPE, BUYER_TYPE, authChecker} from "../services/user.service";
import { errorTypes } from "../services/errors";
import { push } from 'connected-react-router'

export const authCheck = (dispatch) => {
    return authChecker(true).then(creds => {
        if (creds === undefined) {
            dispatch({ type: AUTH_FAILED})
        }
        return Promise.resolve(creds)
    })
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