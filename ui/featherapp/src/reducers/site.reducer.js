


export const SET_NAVBAR = "site/room/JOIN"

const initialState = {
    showNavbar: true,
}

export default (state = initialState, action) => {
    switch (action.type) {

        case SET_NAVBAR:
            return {
                ...state,
                showNavbar: action.payload
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
