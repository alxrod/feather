import { UNEDITED, ADDED } from "../../../../custom_encodings"

export const generateContractText = (index, text, type) => {
  let classes = "font-normal "
  if (type === UNEDITED) {
    classes += "text-gray-800"
  } else if (type === ADDED) {
    classes += "text-green"
  } else {
    classes += "text-red line-through"
  }
  return ('<b index="'+index+'" class="'+classes+'"'+'>'+text+'</b>')
}