import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service"

export const sortDeadlines = (deadlines, role) => {
  if (role === WORKER_TYPE) {
    deadlines.sort((a, b) => (a.workerDate > b.workerDate) ? 1 : -1)
  } else if (role === BUYER_TYPE) {
    deadlines.sort((a, b) => (a.buyerDate > b.buyerDate) ? 1 : -1)
  } else {
    deadlines.sort((a, b) => (a.currentDate > b.currentDate) ? 1 : -1)
  }
  for (let i = 0; i < deadlines.length; i++) {
    deadlines[i].idx = i
    if (i === 0) {
      deadlines[i].name = "Start Date".toString()
    } else {
      deadlines[i].name = "Deadline "+(i).toString()
    }
    deadlines[i].relDate = new Date(deadlines[i].currentDate.getTime())
    if (role === WORKER_TYPE) {
      deadlines[i].relDate = new Date(deadlines[i].workerDate.getTime())
    } else if (role === BUYER_TYPE) {
      deadlines[i].relDate = new Date(deadlines[i].buyerDate.getTime())
    }
  }

  return deadlines
}

export const getDeadlineIdBefore = (deadlines, id) => {
  const sortedDeadlines = sortDeadlines(deadlines)
  for (let i = sortedDeadlines.length-1; i >= 0; i--) {
    if (sortedDeadlines[i] === id) {
      if (i !== 0) {
        return sortedDeadlines[i-1].id
      } else {
        return sortedDeadlines[i+1].id
      }
    }
  }
  return 0
}
export const genEmptyDeadline = (date) => {
    date.setHours(12, 0, 0)
    return {
      relDate: date,
      
      currentPayout: 0,
      currentDate: date,

      workerPayout: 0,
      workerDate: date,

      buyerPayout: 0,
      buyerDate: date,

      awaitingCreation: false,
  
      payoutAwaitingApproval: false,
      dateAwaitingApproval: false,
      itemsAwaitingApproval: false,
      draftRequired: false,
  
      proposerId: "",
      itemsList: [],
    }
}

export const genEmptyDeadlineSet = () => {
  return [
    genEmptyDeadline(addWeeks(new Date(), 1), "1"),
    genEmptyDeadline(addWeeks(new Date(), 5), "2"),
  ]
}
  
export const addWeeks = (date, weeks) => {
    let newDate = new Date(date.getTime());
    newDate.setDate(newDate.getDate() + weeks * 7)
    return newDate
}

export const inBetweenDates = (first, second) => {
  let inBetweenTime = ((second.getTime() - first.getTime()) / 2) + first.getTime()
  let newDate = new Date(inBetweenTime);
  return newDate
}