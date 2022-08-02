export const exportDeadlines = (incoming) => {
    let outgoing = []
    for (let i = 0; i < incoming.length; i++) {
      let in_d = incoming[i]
      let out_d = {
        idx: i,
        payoutAwaitingApproval: in_d.payoutAwaitingApproval,
        dateAwaitingApproval: in_d.dateAwaitingApproval,
        itemsAwaitingApproval: in_d.itemsAwaitingApproval,
        
        payoutProposerId: in_d.payoutProposerId,
        dateProposerId: in_d.dateProposerId,
  
        currentPayout: in_d.current.payout,
        currentDate: in_d.current.date,
  
        workerPayout: in_d.worker.payout,
        workerDate: in_d.worker.date,
  
        buyerPayout: in_d.buyer.payout,
        buyerDate: in_d.buyer.date,
  
        itemsList: in_d.itemsList,
        
      }
      out_d.id = in_d.id
      outgoing.push(out_d)
    }
    return outgoing
}
export const importDeadlines = (incoming) => {
  let outgoing = []
  for (let i = 0; i < incoming.length; i++) {
    let in_d = incoming[i]
    let out_d = {
      idx: i,
      current: {
        payout: in_d.currentPayout,
        date: in_d.currentDate,
      },
      worker: {
        payout: in_d.workerPayout,
        date: in_d.workerDate,
      },
      buyer: {
        payout: in_d.buyerPayout,
        date: in_d.buyerDate,
      },
      payoutAwaitingApproval: in_d.payoutAwaitingApproval,
      dateAwaitingApproval: in_d.dateAwaitingApproval,
      itemsAwaitingApproval: in_d.itemsAwaitingApproval,

      payoutProposerId: in_d.payoutProposerId,
      dateProposerId: in_d.dateProposerId,
      itemsList: in_d.itemsList
    }
    if (in_d.id === "") {
      out_d.id = (i+1).toString()
    } else {
      out_d.id = in_d.id
    }
    if (i === incoming.length - 1) {
      out_d.lastDeadline = true
    } else {
      out_d.lastDeadline = false
    }
    outgoing.push(out_d)
  }
  return outgoing
}

  
export const genTestSet = () => {
    return [
      {
        id: 1,
        idx: 0,
        current: {
          payout: 0,
          date: new Date(),
        },
        worker: {
          payout: 0,
          date: new Date(),
        },
        buyer: {
          payout: 0,
          date: new Date(),
        },
        awaitingApproval: false,
        proposerId: ""
      },
      {
        id: 2,
        idx: 1,
        current: {
          payout: 15,
          date: addWeeks(new Date(), 1),
        },
        worker: {
          payout: 15,
          date: addWeeks(new Date(), 1),
        },
        buyer: {
          payout: 15,
          date: addWeeks(new Date(), 1),
        },
        awaitingApproval: false,
        proposerId: ""
      },
      {
        id: 3,
        idx: 2,
        current: {
          payout: 85,
          date: addWeeks(new Date(), 2),
        },
        worker: {
          payout: 85,
          date: addWeeks(new Date(), 2),
        },
        buyer: {
          payout: 85,
          date: addWeeks(new Date(), 2),
        },
        awaitingApproval: false,
        proposerId: ""
      }
    ]
}
  
export const genEmptyDeadline = (date) => {
    return {
      current: {
        payout: 0,
        date: date,
      },
      worker: {
        payout: 0,
        date: date,
      },
      buyer: {
        payout: 0,
        date: date,
      },
  
      payoutAwaitingApproval: false,
      dateAwaitingApproval: false,
      itemsAwaitingApproval: false,
  
      proposerId: "",
      itemsList: [],
    }
}
  
export const addWeeks = (date, weeks) => {
    let newDate = new Date(date.getTime());
    newDate.setDate(newDate.getDate() + weeks * 7)
    return newDate
}