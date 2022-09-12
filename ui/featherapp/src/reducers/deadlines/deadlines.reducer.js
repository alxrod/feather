import * as actions from "./deadlines.actions";
import * as helpers from "./deadlines.helpers";

const initialState = {
    deadlines: [],
    deadlinesChanged: false,
    redrawDisplay: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.CONTRACT_UPDATE_PAYOUT:
            console.log("CONTRACT_UPDATE_PAYOUT")
            return {
                ...state,
                deadlinesChanged: !state.deadlinesChanged,
                deadlines: helpers.editDeadlinePayout(state.deadlines , action.payload)
            }
        
        case actions.CONTRACT_UPDATE_DATE:
            console.log("CONTRACT_UPDATE_DATE")
            return {
                ...state,
                deadlinesChanged: !state.deadlinesChanged,
                deadlines: helpers.editDeadlineDate(state.deadlines, action.payload)
            }
        
        case actions.CONTRACT_DEADLINE_RELOAD:
            console.log("CONTRACT_DEADLINE_RELOAD")
            return {
                ...state,
                deadlinesChanged: !state.deadlinesChanged,
            }

        case actions.CONTRACT_DEADLINE_ADD:
            console.log("CONTRACT_DEADLINE_ADD")
            console.log(action.payload)
            return {
                ...state,
                deadlinesChanged: !state.deadlinesChanged,
                deadlines: [...state.deadlines, action.payload]
            }
        
        case actions.CONTRACT_DEADLINE_LOAD:
            console.log("CONTRACT_DEADLINE_LOAD")
            return {
                ...state,
                deadlinesChanged: !state.deadlinesChanged,
                deadlines: [...action.payload],
            }
        
        case actions.CONTRACT_ADD_DEADLINE_FROM_DB:
            console.log("CONTRACT_ADD_DEADLINE_FROM_DB")
            const newDeadlinesWDB = helpers.addOrReplaceDeadline(state.deadlines, action.payload)
            console.log(action.payload)
            console.log(newDeadlinesWDB)
            return {
                ...state,
                deadlinesChanged: !state.deadlinesChanged,
                deadlines: newDeadlinesWDB
            }
         
        case actions.CONTRACT_DEADLINE_NAMES_UPDATE:
            console.log("CONTRACT_DEADLINE_NAMES_UPDATE")
            console.log(action.payload)
            const renamedDeadlines = helpers.applyRenameDeadlines(state.deadlines, action.payload)
            return {
                ...state,
                redrawDisplay: !state.redrawDisplay,
                deadlines: renamedDeadlines
            }
        
        case actions.CONTRACT_DEADLINE_REPLACE:
            console.log("CONTRACT_DEADLINE_REPLACE")
            const replacedDeadlines = helpers.replaceDeadline(state.deadlines, action.payload)
            return {
                ...state,
                deadlinesChanged: !state.deadlinesChanged,
                deadlines: replacedDeadlines,
            }

        case actions.CONTRACT_DEADLINE_REMOVE:
            console.log("CONTRACT_DEADLINE_REMOVE")
            const removedDeadlines = helpers.removeDeadline(state.deadlines, action.payload.id)
            return {
                ...state,
                deadlinesChanged: !state.deadlinesChanged,
                deadlines: removedDeadlines,
            }

        default:
            return state
    }

}