import { combineReducers } from 'redux'


import user from './user/user.reducer'
import document from './document/document.reducer'
import items from './items/items.reducer'
import deadlines from './deadlines/deadlines.reducer'
import chat from './chat/chat.reducer'
import site from './site/site.reducer'
import file from './file/file.reducer'

export default combineReducers({
    user,
    site,
    document,
    items,
    deadlines,
    chat,
    file,
})