export const SET_NAVBAR = "site/room/JOIN"
export const TOGGLE_PAYMENT_FROM_REG = "site/room/TOGGLE_PAYMENT_FROM_REG"

const initialState = {
    showNavbar: true,
    fromRegister: false,
    internalTestMode: true,
}

export default (state = initialState, action) => {
    switch (action.type) {
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
