export const unpackLong = (deadline) => {
  let date = deadline.relDate
  if (date === undefined) {
    if (deadline.currentDate === undefined) {
      return ""
    } else {
      date = deadline.currentDate
    }
  }
  return (date.toLocaleTimeString([], {timeStyle: 'short'}) + 
  ", " + date.toLocaleDateString())
}

export const unpackShort = (deadline) => {
  let date = deadline.relDate
  if (date === undefined) {
    if (deadline.currentDate === undefined) {
      return ""
    } else {
      date = deadline.currentDate
    }
  }
  return date.toLocaleDateString('en-us', { day:"numeric", month:"numeric"})
}