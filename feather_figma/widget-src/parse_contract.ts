import { ContractNub, DeadlineNub, ItemNub } from "./types"
import { sortDeadlines } from "./helpers"
const parseContract = (payload: string): ContractNub => {
  let raw_nub = JSON.parse(payload)
  console.log("RAw: ", raw_nub)
  let deadlines: DeadlineNub[] = []
  for (let i = 0; i < raw_nub.deadlines.length; i++) {
    let nubs: ItemNub[] = []
    for (let j = 0; j < raw_nub.deadlines[i].items.length; j++) {
      for (let k = 0; k < raw_nub.items.length; k++) {
        if (raw_nub.items[k].id === raw_nub.deadlines[i].items[j].id) {
          nubs.push({
            id: raw_nub.items[k].id,
            name: raw_nub.items[k].name,
            body: raw_nub.items[k].currentBody
          })
          break
        }
      }
    }
    let deadline: DeadlineNub = {
      id: raw_nub.deadlines[i].id,
      payout: parseInt(raw_nub.deadlines[i].currentPayout), 
      date: raw_nub.deadlines[i].currentDate,
      items: nubs,
    }
    deadlines.push(deadline);
  }
  deadlines = sortDeadlines(deadlines);

  let items: ItemNub[] = []
  for (let i = 0; i < raw_nub.items.length; i++) {
    items.push({
      id: raw_nub.items[i].id,
      name: raw_nub.items[i].name,
      body: raw_nub.items[i].currentBody
    })
  }

  let newCon = {
    title: raw_nub.title,
    summary: raw_nub.summary,
    id: raw_nub.id,
    price: parseInt(raw_nub.price.current),
    deadlines: deadlines,
    items: items,
    worker: {
      id: raw_nub.worker.id,
      username: raw_nub.worker.username,
    },
    buyer: {
      id: raw_nub.buyer.id,
      username: raw_nub.buyer.username,
    }
  }
  return newCon
}

export default parseContract