import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import user from './user.reducer'
import contract from './contract.reducer'
import chat from './chat.reducer'
import site from './site.reducer'

export const history = createBrowserHistory()

export default combineReducers({
    router: connectRouter(history),
    user,
    site,
    contract,
    chat,
    
})