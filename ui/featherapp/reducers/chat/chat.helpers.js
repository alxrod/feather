import { decisionTypes } from "../../services/chat.service";
export const editMessageState = (msgs, info) => {
    let msg = {};
    let i = -1;
    for (i = 0; i < msgs.length; i++) {
        if (msgs[i].id === info.body.msgId) {
            msg = msgs[i]
            msg.body.buyerStatus = info.body.buyerStatus
            msg.body.workerStatus = info.body.workerStatus
            msg.body.resolStatus = info.body.resolStatus
            msg.body.resolved = info.body.resolved
            if (info.body.adminStatus !== decisionTypes.UNDECIDED) {
                msg.adminStatus = info.body.adminStatus
                msg.adminOverride = true
            }
            break
        }
    }
    return [msg, i];
}
