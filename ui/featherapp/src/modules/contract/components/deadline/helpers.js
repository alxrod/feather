export const genEmptyDeadline = (date) => {
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