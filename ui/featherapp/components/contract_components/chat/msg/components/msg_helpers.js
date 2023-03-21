import {resolTypes, decisionTypes} from "../../../../../services/chat.service"
import { WORKER_TYPE, BUYER_TYPE } from "../../../../../services/user.service"

export const displayDecide = (msg, status, user, embedded) => {
    return !embedded && (msg.body.resolStatus === resolTypes.UNDECIDED && !msg.expired) &&
    ((status === decisionTypes.UNDECIDED) ||
    (user.adminStatus && msg.adminStatus === decisionTypes.UNDECIDED))
}

export const assignStatus = (msg, user, yourRole, setStatus, setOtherStatus) => {
    if (msg) {
        if (user.adminStatus) {
          if (msg.adminStatus === undefined) {
            setStatus(decisionTypes.UNDECIDED)
          } else {
            setStatus(msg.adminStatus)
          }
        } else if (yourRole == WORKER_TYPE) {
          setStatus(msg.body.workerStatus)
          setOtherStatus(msg.body.buyerStatus)
        } else if (yourRole == BUYER_TYPE) {
          setStatus(msg.body.buyerStatus)
          setOtherStatus(msg.body.workerStatus)
        } 
    }
}

export const fontSize = (size, embedded) => {
  if (embedded) {
    size -= 1
  }
  if (size == 0) {
    return "text-xs"
  } else if (size == 1) {
    return "text-sm" 
  } else if (size == 2) {
    return "text-base"
  } else if (size == 3) {
    return "text-lg"
  } else if (size == 4) {
    return "text-xl"
  }
}