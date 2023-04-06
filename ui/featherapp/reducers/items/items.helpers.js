export const replaceItemCurCon = (items, replacement) => {
    let newItems = []
    for (let i = 0; i < items.length; i++) {
        if (items[i].id !== replacement.id) {
            newItems.push(items[i])
        }
    }
    newItems.push(replacement)
    return newItems
}
export const removeItemCurCon = (items, remove_id) => {
    let newItems = []
    for (let i = 0; i < items.length; i++) {
        if (items[i].id !== remove_id) {
            newItems.push(items[i])
        }
    }
    return newItems
}


export const getContractItem = (items, id) => {
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) {
            return items[i]
        }
    }
}


export const contractItemUpdateFigmaComponent = (item, new_comp_id) => {
    item.figmaComponentId = new_comp_id  
    return item
}

export const contractItemUpdateBody = (item, newBody) => {
    item.currentBody = newBody.newVersion    
    return item
}

export const replaceContractItem = (items, new_item) => {
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === new_item.id) {
            items[i] = new_item
        }
    }
    return items
}