
// ENTIRE CONTRACT
export const OPN = "Open"
export const DEN = "Rejected"
export const EXP = "Expired"
export const ACT = "Active"
export const NEG = "Negotiating"
export const COM = "Completed"

export const get_code = (status) => {
    if (status === OPN || status === ACT) {
        return 0
    } else if (status === DEN || status == EXP) {
        return 2
    } else {
        return 1
    }
}

export const get_style_code = (status) => {
    const code = get_code(status)
    if (code === 0) {
        return "bg-green"
    } else if (code === 1) {
        return "bg-yellow"
    } else {
        return "bg-red"
    }
}

// CONTRACT ITEM
export const ITEM_AGREED = "Both parties have agreed on this item."
export const ITEM_DISAGREED = "This item is disagreed on. You need a new value."
export const ITEM_WAITING_OTHER = "Waiting on your partner to approve the change."
export const ITEM_WAITING_YOU = "You need to approve or reject the change."

// Warnings
export const ITEM_FAIR = 0
export const ITEM_POS = 1
export const ITEM_NEG = 2

export const ITEM_FAIR_descript = "This item is a good compromise for both parties according to feather analytics"
export const ITEM_POS_descript = "This item is a better deal for you than its average in feather analytics."
export const ITEM_NEG_descript = "This item is a worse deal for you than its average in feather analytics."

// Text Editing
export const UNEDITED = 0
export const ADDED = 1
export const REMOVED = 2

export const ITEM_APPROVED = 0
export const ITEM_REJECTED = 1
export const ITEM_PENDING = 2