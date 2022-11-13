import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'


import user from './user/user.reducer'
import contract from './contract/contract.reducer'
import items from './items/items.reducer'
import deadlines from './deadlines/deadlines.reducer'
import chat from './chat/chat.reducer'
import site from './site/site.reducer'
import file from './file/file.reducer'

export const history = createBrowserHistory()

export default combineReducers({
    router: connectRouter(history),
    user,
    site,
    contract,
    items,
    deadlines,
    chat,
    file,
    
})