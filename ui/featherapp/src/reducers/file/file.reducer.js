import * as actions from "./file.actions";
import * as helpers from "./file.helpers";


const initialState = {
    curPresignedUrl: "",
    uploadActive: false,
    uploadFailed: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.PROFILE_REQUEST_URL:
            return {
                ...state,
                uploadActive: true,
                uploadFailed: false,
                curPresignedUrl: action.payload
            }
        
        case actions.PROFILE_PUT_SUCCESS:
            return {
                ...state,
                uploadActive: false,
                uploadFailed: false
            }

        case actions.PROFILE_PUT_FAIL: 
            return {
                ...state,
                uploadActive: false,
                uploadFailed: true
            }
        default:
            return state
    }

}