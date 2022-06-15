import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import user from './user'

export const history = createBrowserHistory()

export default combineReducers({
    router: connectRouter(history),
    user,
})