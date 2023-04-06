export const purgeItem = (deadlines, item_id) => {
    for (let i = 0; i < deadlines.length; i++) {
        const newItems = []
        const newStates = []
        for (let j = 0; j < deadlines[i].itemsList.length; j++) {
            if (deadlines[i].itemsList[j].id !== item_id) {
                newItems.push(deadlines[i].itemsList[j])
                newStates.push(deadlines[i].itemStatesList[j])
            }
        }
        deadlines[i].itemsList = newItems
        deadlines[i].itemStatesList = newStates
    }
    return deadlines
}
export const applyRenameDeadlines = (mainDeadlines, newDeadlines) => {
    for (let i = 0; i < mainDeadlines.length; i++) {
        for (let j = 0; j < newDeadlines.length; j++) {
            if (newDeadlines[j].id === mainDeadlines[i].id) {
                mainDeadlines[i].name = newDeadlines[j].name
                j = newDeadlines.length
            }
        }
    }
    return mainDeadlines
}

export const addOrReplaceDeadline = (deadlines, newDeadline) => {
    let found = false
    for (let i = 0; i < deadlines.length; i++) {
        if (deadlines[i].id === newDeadline.id) {
            deadlines[i] = newDeadline
            found = true
        }
    }
    if (!found) {
        deadlines.push(newDeadline)
    }
    return deadlines
}

export const replaceDeadline = (deadlines, newDeadline) => {
    let found = false
    for (let i = 0; i < deadlines.length; i++) {
        if (deadlines[i].id === newDeadline.id) {
            deadlines[i] = newDeadline
            found = true
        }
    }
    if (!found) {
        deadlines.push(newDeadline)
    }
    return deadlines
}

export const suggestDeleteDeadline = (deadlines, info) => {
    for (let i = 0; i < deadlines.length; i++) {
        if (deadlines[i].id === info.id) {
            deadlines[i].awaitingDeletion = true
            deadlines[i].deadlineProposerId = info.proposerId
        }
    }
    return deadlines
}

export const removeDeadline = (deadlines, removal) => {
    const newDeadlines = []
    for (let i = 0; i < deadlines.length; i++) {
        if (deadlines[i].id !== removal) {
            newDeadlines.push(deadlines[i])
        }
    }
    return newDeadlines
}

export const editDeadlineDate = (deadlines, date_info) => {
    let deadline = {}
    let i=0;
    while (i<deadlines.length) {
        if (deadlines[i].id === date_info.deadlineId) {
            deadline = deadlines[i]
            break
        }
        i++
    }
    deadline.currentDate = date_info.newVersion
    deadlines[i] = deadline
    return deadlines
    
}

export const getDeadline = (deadlines, id) => {
    for (let i = 0; i < deadlines.length; i++) {
        if (deadlines[i].id === id) {
            return deadlines[i]
        }
    }
} 

export const updateSettleInfo = (deadline, info) => {
    deadline.buyerSettled = info?.buyerSettled
    return deadline
}
