export const editContract = (contracts, new_contract) => {
    contracts[new_contract.id] = new_contract
    return contracts
}

export const editPrice = (contract, price) =>{
    contract.price = price
    return contract
}
