export const editMessageState = (msgs, info) => {
    let msg = {};
    let i = -1;
    for (i = 0; i < msgs.length; i++) {
        if (msgs[i].id === info.msgId) {
            msg = msgs[i]

            msg.body.buyerStatus = info.buyerStatus
            msg.body.workerStatus = info.workerStatus
            msg.body.resolStatus = info.resolStatus
            msg.body.resolved = info.resolved
            break
        }
    }
    return [msg, i];
}
