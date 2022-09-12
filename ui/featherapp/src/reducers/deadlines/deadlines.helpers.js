
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
        if (deadlines[i].id === "TEMPORARY") {
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

export const removeDeadline = (deadlines, removal) => {
    const newDeadlines = []
    for (let i = 0; i < deadlines.length; i++) {
        if (deadlines[i].id !== removal) {
            newDeadlines.push(deadlines[i])
        }
    }
    return newDeadlines
}

export const editDeadlinePayout = (deadlines, payout_info) => {
    let deadline = {}
    let i=0;
    while (i<deadlines.length) {
        if (deadlines[i].id === payout_info.deadlineId) {
            deadline = deadlines[i]
            break
        }
        i++
    }

    deadline.payoutAwaitingApproval = payout_info.awaitingApproval
    deadline.workerPayout = payout_info.worker
    deadline.buyerPayout = payout_info.buyer
    deadline.currentPayout = payout_info.current
    deadline.payoutProposerId = payout_info.proposerId

    deadlines[i] = deadline
    return deadlines   
}

export const editDeadlineDate = (deadlines, date_info) => {
    let deadline = {}
    let i=0;
    while (i<deadlines.length) {
        if (deadlines[i].id === date_info.deadlineId) {
            deadline =deadlines[i]
            break
        }
        i++
    }

    deadline.dateAwaitingApproval = date_info.awaitingApproval
    deadline.workerDate = date_info.worker
    deadline.buyerDate = date_info.buyer
    deadline.currentDate = date_info.current
    deadline.dateProposerId = date_info.proposerId

    deadlines[i] = deadline
    return deadlines
    
}
