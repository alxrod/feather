export const SET_NAVBAR = "site/room/JOIN"
export const TOGGLE_PAYMENT_FROM_REG = "site/room/TOGGLE_PAYMENT_FROM_REG"
export const TOGGLE_REGISTER_BOTH_METHODS = "site/register/TOGGLE_BOTH_METHODS"
export const SET_REDIRECT_ROUTE = "site/redirect/SET_ROUTE"

const initialState = {
    showNavbar: true,
    fromRegister: false,
    internalTestMode: true,
    registerForBothMethods: false,
    redirectRoute: ""
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_REDIRECT_ROUTE:
            return {
                ...state,
                redirectRoute: action.payload
            }
        case SET_NAVBAR:
            return {
                ...state,
                showNavbar: action.payload
            }
        
        case TOGGLE_PAYMENT_FROM_REG:
            return {
                ...state,
                fromRegister: action.payload
            }

        case TOGGLE_REGISTER_BOTH_METHODS:
            return {
                ...state,
                registerForBothMethods: action.payload
            }

        default:
            return state
    }

}

export const setNavbar = (navbar_stat) => {
    return dispatch => {
        dispatch({
            type: SET_NAVBAR,
            payload: navbar_stat,
        });
    }
};

export const toggleFromRegister = (register_state) => {
    console.log("TOGGLIGN FROM REG TO ", register_state)
    return dispatch => {
        dispatch({
            type: TOGGLE_PAYMENT_FROM_REG,
            payload: register_state,
        });
    }
};

export const toggleRegisterMethods = (both_state) => {
    console.log("TOGGLIGN BOTH REG TO ", both_state)
    return dispatch => {
        dispatch({
            type: TOGGLE_REGISTER_BOTH_METHODS,
            payload: both_state,
        });
    }
};

export const setRedirectRoute = (redirectRoute) => {
    console.log("Setting it to ", redirectRoute)
    return dispatch => {
        dispatch({
            type: SET_REDIRECT_ROUTE,
            payload: redirectRoute,
        });
    }
};