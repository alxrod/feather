export const editContract = (contracts, new_contract) => {
    contracts[new_contract.id] = new_contract
    return contracts
}

export const editPrice = (contract, price) =>{
    contract.price = price
    return contract
}

export const editAdminRequested = (contract, admin_requested) => {
    contract.adminRequested = admin_requested
    return contract
}
export const parseKeyFromLink = (link) => {
    const spl = link.split("file/")
    if (spl.length < 2) {
        return ""
    }
    const spl2 = spl[1].split("/")
    return spl2[0]
}
export const replaceContractNub = (nubs, new_nub) => {
    for (let i = 0; i < nubs.length; i++) {
        if (nubs[i].id === new_nub.id) {
            nubs[i] = new_nub
        }
    }
    return nubs
}
export const replaceContractNubStage = (nubs, id, stage) => {
    for (let i = 0; i < nubs.length; i++) {
        if (nubs[i].id === id) {
            nubs[i].stage = stage
        }
    }
    return nubs
}