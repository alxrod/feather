import ContractService from "../services/contract.service";

export const CONTRACT_CREATE = "contract/contract/CREATE"

const initialState = {}

export default (state = initialState, action) => {
    switch (action.type) {
        case CONTRACT_CREATE:
            return {
                ...state,
                contractNubs: {
                    ...state.contractNubs,
                    [action.payload.id]: {
                        id: action.payload.id,
                        title: action.payload.title,
                        deadline: action.payload.deadline.current,
                        price: action.payload.price.current,
                        stage: action.payload.stage,
                    }
                },
                cachedContracts: {
                    ...state.cachedContracts,
                    [action.payload.id]: action.payload
                }
            }
        
        default:
            return state
    }
}

export const createContract = (title, summary, intro_message, price_set, deadline_set, items) => {
    return dispatch => {
        const user = JSON.parse(localStorage.getItem("user"))
        let token = ""
        let id = ""
        if (user !== null) {
            token = user.access_token
            id = user.user_id
        }
        if (token == "") {
            return Promise.reject("You must log in first.")
        }

        return ContractService.create_contract(token, id, title, summary, intro_message, price_set, deadline_set, items).then(
            (response) => {
                // dispatch({
                //     type: REGISTER_SUCCESS,
                //     payload: {user: response}
                // });
                // dispatch({
                //     type: SET_MESSAGE,
                //     payload: "You have successfuly registered!"
                // });
                console.log("Finished Contract Creation")
                console.log(response)
                return Promise.resolve();
            },
            (error) => {
                const message = 
                    (error.response &&
                     error.response.data &&
                     error.response.data.message) ||
                    error.message ||
                    error.toString();
                // dispatch({
                //     type: REGISTER_FAIL,
                // });
                // dispatch({
                //     type: SET_MESSAGE,
                //     payload: message,
                // });
                console.log("Failed Contract Creation")
                console.log(error)
                return Promise.reject(message);
            }
        );
    }
};