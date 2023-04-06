import * as actions from "./deadlines.actions";
import * as helpers from "./deadlines.helpers";

const initialState = {
    deadlines: [],
    deadlinesChanged: false,
    deadlinesPurged: false,
    redrawDisplay: false,
}

const DEADLINE_DEBUG = false
const debug_log = (action) => {
    if (DEADLINE_DEBUG) {
        console.log("DEADLINE_REDUCER: "+action.type+": "+ JSON.stringify(action.payload))
    }
}
export default (state = initialState, action) => {
    switch (action.type) {
        case actions.DEADLINE_ITEM_PURGE:
            debug_log(action)
            return {
                ...state,
                deadlinesChanged: !state.deadlinesChanged,
                deadlinesPurged: !state.deadlinesPurged,
                deadlines: helpers.purgeItem(state.deadlines, action.payload)
            }

        case actions.DEADLINE_UPDATE_DATE:
            debug_log(action)
            return {
                ...state,
                deadlinesChanged: !state.deadlinesChanged,
                deadlines: helpers.editDeadlineDate(state.deadlines, action.payload)
            }
        
        case actions.DEADLINE_RELOAD:
            debug_log(action)
            return {
                ...state,
                deadlinesChanged: !state.deadlinesChanged,
            }
        
        case actions.DEADLINE_LOAD:
            debug_log(action)
            return {
                ...state,
                deadlinesChanged: !state.deadlinesChanged,
                deadlines: [...action.payload],
            }
        
        case actions.DEADLINE_ADD:
            debug_log(action)
            const newDeadlinesWDB = helpers.addOrReplaceDeadline(state.deadlines, action.payload)
            return {
                ...state,
                deadlinesChanged: !state.deadlinesChanged,
                deadlines: newDeadlinesWDB
            }
         
        case actions.DEADLINE_NAMES_UPDATE:
            debug_log(action)
            const renamedDeadlines = helpers.applyRenameDeadlines(state.deadlines, action.payload)
            return {
                ...state,
                redrawDisplay: !state.redrawDisplay,
                deadlines: renamedDeadlines
            }
        
        case actions.DEADLINE_REPLACE:
            debug_log(action)
            const replacedDeadlines = helpers.replaceDeadline(state.deadlines, action.payload)
            return {
                ...state,
                deadlinesChanged: !state.deadlinesChanged,
                deadlines: replacedDeadlines,
            }

        case actions.DEADLINE_DELETE:
            debug_log(action)
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