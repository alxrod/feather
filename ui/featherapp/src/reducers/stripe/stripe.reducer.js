import * as actions from "./stripe.actions";
import * as helpers from "./stripe.helpers";

const initialState = {
    clientSecret: ""
}

export default (state = initialState, action) => {
    switch (action.type) {
        // case actions.STRIPE_REQUEST_SETUP_SECRET:
        //     return {
        //         ...state,
        //         deadlinesChanged: !state.deadlinesChanged,
        //         deadlines: helpers.editDeadlinePayout(state.deadlines , action.payload)
        //     }
        case actions.STRIPE_SET_CLIENT_SECRET:
            return {
                ...state,
                clientSecret: action.payload
            }
        
        default:
            return state
    }

}