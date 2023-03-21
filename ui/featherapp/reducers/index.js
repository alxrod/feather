import { combineReducers } from 'redux'


import user from './user/user.reducer'
import contract from './contract/contract.reducer'
import items from './items/items.reducer'
import deadlines from './deadlines/deadlines.reducer'
import chat from './chat/chat.reducer'
import site from './site/site.reducer'
import file from './file/file.reducer'
import stripe from './stripe/stripe.reducer'

export default combineReducers({
    user,
    site,
    contract,
    items,
    deadlines,
    chat,
    file,
    stripe,
})