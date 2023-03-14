import { DeadlineNub } from "./types"

export const sortDeadlines = (deadlines: DeadlineNub[]) => {
  deadlines.sort((a, b) => (new Date(a.date) > new Date(b.date)) ? 1 : -1)
  
  for (let i = 0; i < deadlines.length; i++) {
    if (i === 0) {
      deadlines[i].name = "Start Date"
    } else {
      deadlines[i].name = "Deadline "+(i).toString()
    }
  }

  return deadlines
}

export const dateToString = (deadline: DeadlineNub) => {
  let date = new Date(deadline.date)
  let [hrs, mins, sec, apm] = date.toLocaleTimeString("en-US").split(/\W/);
  let reform_hrs = (parseInt(hrs) + 11) % 12 + 1;
  return (reform_hrs+":"+mins+apm + 
  ", " + date.toLocaleDateString())
}