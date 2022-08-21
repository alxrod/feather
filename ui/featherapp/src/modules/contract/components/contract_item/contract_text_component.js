import { UNEDITED, ADDED } from "../../../../custom_encodings"

export const generateContractText = (index, text, type, offset, id) => {
  let classes = "font-normal "
  if (type === UNEDITED) {
    classes += "text-gray-800"
  } else if (type === ADDED) {
    classes += "text-green"
  } else {
    classes += "text-red line-through"
  }
  const start = '<b contenteditable="true" index="'+index+'" class="'+classes+'" data-index='
  const end = '</b>'
  let out_str = ""
  for (let i = 0; i < text.length; i++) {
    if (text[i] === " ") {
      out_str += start + (offset+i) + ' id="'+id+'_'+(offset+i)+'">' + "&nbsp;" + end
    } else {
      out_str += start + (offset+i) + ' id="'+id+'_'+(offset+i)+'">' + text[i] + end
    }
  }
  return out_str
}