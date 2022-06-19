import { UNEDITED, ADDED } from "../../../../custom_encodings"
const ContractTextComponent = (props) => {
  let classes = "font-normal "
  if (props.type === UNEDITED) {
    classes += "text-gray-800"
  } else if (props.type === ADDED) {
    classes += "text-green"
  } else {
    classes += "text-red line-through"
  }
  return (
    <b index={props.index} className={classes}>{props.text}</b>
  )
    
}

export default ContractTextComponent