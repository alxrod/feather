export const replaceSuggestItemCurCon = (items, replacement) => {
    let newItems = []
    for (let i = 0; i < items.length; i++) {
        if (items[i].id !== replacement.id) {
            newItems.push(items[i])
        }
    }
    newItems.push(replacement)
    return newItems
}

export const activateDeletionOfItem = (items, id) => {
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) {
            items[i].awaitingDeletion = true
            items[i].awaitingApproval = true
        }
    }
    return items
}

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
export const removeItemCurCon = (items, remove) => {
    let newItems = []
    for (let i = 0; i < items.length; i++) {
        if (items[i].id !== remove.id) {
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
    item.currentBody = newBody.current
    item.workerBody = newBody.worker
    item.buyerBody = newBody.buyer
    item.awaitingApproval = newBody.awaitingApproval      
    return item
}

export const updateSettledStates = (item, workerSettled, buyerSettled, adminSettled) => {
    item.workerSettled = workerSettled
    item.buyerSettled = buyerSettled
    item.adminSettled = adminSettled
    return item
}

export const updateContractItems = (contract, newItemsList) => {
    contract.itemsList = newItemsList
    return contract
}

export const replaceContractItem = (items, new_item) => {
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === new_item.id) {
            items[i] = new_item
        }
    }
    return items
}
export const deleteContractItem = (items, remove_id) => {
    let new_items = []
    for (let i = 0; i < items.length; i++) {
        if (items[i].id !== remove_id) {
            new_items.push(items[i])
        }
    }
    return new_items
}