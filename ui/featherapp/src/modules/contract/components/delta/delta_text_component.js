import { UNEDITED, ADDED } from "../../../../custom_encodings"

export const generateContractText = (index, text, type) => {
  let classes = "font-normal "
  if (type === UNEDITED) {
    classes += "text-gray-800"
  } else if (type === ADDED) {
    classes += "text-green-400"
  } else {
    classes += "text-red-400 line-through"
  }
  const start = '<b index="'+index+'" class="'+classes+'">'
  const end = '</b>'
  let out_str = ""
  
  for (let i = 0; i < text.length; i++) {
    out_str += start + text[i] + end
  }
  return out_str
}