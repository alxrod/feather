import { useState, useCallback, useEffect, useRef} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ContentEditable from 'react-contenteditable'
import {UNEDITED, ADDED, REMOVED} from '../../../../custom_encodings'
import patienceDiffPlus from './PatienceDiff'
import { renderToString } from 'react-dom/server'
import { generateContractText } from './contract_text_component'
import DecideButton from '../decide_button'
import Loading from "../../../general_components/loading"


const ContractTextArea = (props) => {

  // const set_to_total_offset = () => {
  //   if (contentEditable.current.children.length < curOffset) {
  //     return
  //   } 
  // }

  // const mergeTextArea = (chars) => {
  //   var contract_text = [];
  //   var cur_chunk = {type: -1, text: "", author: ""};
  //   for (var i = 0; i < chars.length; i++) {
  //     if (cur_chunk.type === -1) {
  //       cur_chunk.type = chars[i].type
  //       cur_chunk.author = chars[i].author
  //       cur_chunk.text += chars[i].text
  //     } else if (chars[i].type === cur_chunk.type && chars[i].author === cur_chunk.author) {
  //       cur_chunk.text += chars[i].text
  //     } else {
  //       contract_text.push(cur_chunk)
  //       cur_chunk = {type: chars[i].type, text: chars[i].text, author: chars[i].author}
  //     }
  //   }
  //   if (cur_chunk.type !== -1) {
  //     contract_text.push(cur_chunk)
  //   }
  //   return contract_text
  // }

  
  
  // useEffect(() => {
  //   if (contentEditable) {
  //     for (let i = 0; i < contentEditable.current.children.length; i++) {
  //       contentEditable.current.children[i].onmouseover = textHoverHandler
  //     }
  //   }
    
  // }, [refreshFlag])
  // Bulk of live editing logic
  const handleChange = (e) => {
    props.set_text(e.target.value)
  };  

  return (
    <div className={"flex flex-col items-start space-x-4" + (props.embedded && " grow")}>
      <div className="grow w-full">
          <div 
            className={"h-full focus-within:border-indigo-600" + (props.embedded ? " rounded-lg border border-gray-200 p-4" : " border-b")}
            onClick={(e) => e.preventDefault()}
          >
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
                name="intro_msg"
                id="intro_msg"
                className="grow w-full inline-block focus:border-0 focus:ring-0 focus:outline-none w-full border-0 border-b border-transparent p-0 pb-2 resize-none sm:text-sm"
                placeholder="Add the description for this contract item..."
                value={props.text_body}
                onChange={handleChange}
            />
          </div>
      </div>
     
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  cur_id: (user.user !== null) ? user.user.user_id : "",
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(ContractTextArea)




// For when I go back to implement proper google docs:
// const removeTags = (str) => {
//   if ((str===null) || (str===''))
//       return "";
//   else
//       str = str.toString()
//       str = str.replaceAll('&nbsp;', ' ')
//       str = str.replaceAll('&lt;', '<') 
//       str = str.replaceAll('&gt;', '>')
//       str = str.replaceAll('&amp;', '&')
        
//   // Regular expression to identify HTML tags in 
//   // the input string. Replacing the identified 
//   // HTML tag with a null string.
//   return str.replace( /(<([^>]+)>)/ig, '');
// }
// const handleChange = (e) => {
//   const newValue = removeTags(e.target.value)
//   console.log("New Value: "+newValue)
//   var total_string = []
//   var total_string_concated = ""

//   // If we are in creation mode, everything goes, text will be added as a singular chunk
//   if (overrideMode == true) {
//     const new_text = [{text: newValue, type: UNEDITED, author: props.cur_id}]
//     setOffset(newValue.length)
//     setLocalText(new_text)
    
//     return 
//   }

//   // Iterate through all of the chunks in the current text body and 
//   // add individual character chunks to the total string array
//   for (const [key, chunk] of Object.entries(localText)) {
//     for (var i = 0; i < chunk.text.length; i++) { 
//       total_string.push({text: chunk.text[i], type: chunk.type})
//       total_string_concated += chunk.text[i]
//     }
//   }

//   // console.log("Total Strign:")
//   // console.log(total_string)

//   // If the previous total string is empty, we are going to simplify by just
//   // adding the text as a single chunk and setting the offset to that location.
//   if (total_string.length === 0) {
//     if (newValue != "") {
//       const new_text = mergeTextArea([{text: newValue, type: ADDED, author: props.cur_id}])
//       setOffset(newValue.length)
//       setLocalText(new_text)
//       return
//     } else {
//       return
//     }
//   }

//   if (total_string.length === newValue.length) {
//     return
//   }

//   // New strategy: identify location of the new offset
//   // Use the length of the string to identify if text has been added or deleted
//   // if it has been added select the text from cursor + length diff and insert it into our total string
//   // If it has been deleted alter those indices of the total string to:
//   // deleted if they are unedited, or remove them if they are delete mode or add mode.
  
//   // First get the offset.
//   const selNode = document.getSelection().anchorNode.parentElement
//   let newOff = parseInt(selNode.getAttribute('data-index'))
//   // console.log("New off is: " + newOff)

//   const len_dif = newValue.length - total_string.length 
//   // true is added, false is deleted
//   let added = true
//   if (len_dif < 0) {
//     added = false
//   }

//   // console.log("Changes made:")
//   // console.log("An " + (added ? "addition" : "deletion") + " was made of " + len_dif + " characters")
//   if (added === true) {
//     // console.log("Total string now is " + newValue.length + " characters and addition was from " + (newOff) + " to " + (newOff+len_dif))
//     // console.log("Added: " + newValue.substring((newOff), (newOff+len_dif)))
//   } else {
//     // console.log("Deleted: " + total_string_concated.substring(newOff+1, (newOff+len_dif+1)))
//   }

//   // You have to add or subtract 1 depending on which side of the cursor you're on.
//   let changeStart = (newOff+1)
//   let changeEnd = (newOff+len_dif+1)
//   if (!added) {
//     // console.log("SWITCHING MODE TO DELTE")
//     changeStart = (newOff+2)
//     changeEnd = (newOff+len_dif+2)
//   }

//   // console.log("NewVal")
//   // console.log(changeStart)
//   // console.log(changeEnd)
//   // console.log(newValue.substring(changeStart, changeEnd))
//   if (added) {
//     for (let i = changeStart; i < changeEnd; i++) {
//       // console.log("New Value: " + newValue +", i: " +i)
//       // console.log("Adding " + newValue[i] +" from offset " + newOff)
//       total_string.splice(i, 0, {text: newValue[i], type: ADDED, author: props.cur_id})
//     }
//   } else {
//     let removalI = changeStart;
//     for (let i = changeStart-1; i >= changeEnd; i-=1) {
//       // console.log("Removing element "+i+" from "+total_string_concated+" of length" + total_string.length)
//       // console.log("Removing I: " + i)
//       // console.log(total_string[i])
//       if (total_string[i].type === UNEDITED) {
//         total_string[i].type = REMOVED
//         total_string[i].author = props.cur_id
//         removalI -= 1
//       } else {
//         total_string.splice(removalI, 1)
//       }
//     }
//   }

//   // console.log("Before merge total string is:")
//   // console.log(total_string)
//   const new_text = mergeTextArea(total_string)
//   // console.log("new text is: ")
//   // console.log(new_text)

//   if (added) {
//     setOffset(changeStart)
//   } else {
//     setOffset(changeEnd)
//   }
//   setLocalText(new_text)    
// };
{/* <text
key="editor1"
innerRef={contentEditable}
className="inline-block focus:outline-none w-full border-0 border-b border-transparent p-0 pb-2 resize-none sm:text-sm"
html={contentState} // innerHTML of the editable div
disabled={props.disabled}       // use true to disable editing
onChange={handleChange} // handle innerHTML change
tagName='article' // Use a custom HTML tag (uses a div by default)
/> */}
//<div id={'contract_item_textarea'} 
//  className="flex flex-row justify-end"
//  onMouseLeave={textHoverLeave} 
//  style={{ 
//    display: (showHL == true ? "flex" : "none"), 
//    position: 'absolute', 
//    margin: 0, 
//    top: hlightY, 
//    left: hlightX, 
//    zIndex: 9, 
//    width: hlightW + "px", 
//    height: hlightH  }}>
//  <div className="h-[20px]">
//    <DecideButton approve={handleApproveChunk} reject={handleRejectChunk}></DecideButton>
//    {/* <DecideButton></DecideButton> */}
//  </div>
//</div>
// const [hlightX, setHLX] = useState(0)
// const [hlightY, setHLY] = useState(0)
// const [hlightW, setHLW] = useState(100)
// const [hlightH, setHLH] = useState(40)
// const [showHL, toggleHL] = useState(false)
// const handleApproveChunk = (e) => {
//   // console.log("approved chunk " + curSelChunk)
//   if (curSelChunk !== -1) {
//     const type = localText[curSelChunk].type
//     if (type === ADDED) {
//       let new_text = [...localText]
//       new_text[curSelChunk].type = UNEDITED
//       setLocalText(new_text)
//       setSelChunk(-1)
//       toggleHL(false)
//     } else {
//       let new_text = [...localText]
//       new_text.splice(curSelChunk, 1)
//       setLocalText(new_text)
//       setSelChunk(-1)
//       toggleHL(false)
//     }
//   }
// }

// const handleRejectChunk = (e) => {
//   // console.log("rejecting chunk " + curSelChunk)
//   if (curSelChunk !== -1) {
//     const type = localText[curSelChunk].type
//     if (type === ADDED) {
//       let new_text = [...localText]
//       new_text.splice(curSelChunk, 1)
//       setLocalText(new_text)
//       setSelChunk(-1)
//       toggleHL(false)

//     } else {
//       let new_text = [...localText]
//       new_text[curSelChunk].type = UNEDITED
//       setLocalText(new_text)
//       setSelChunk(-1)
//       toggleHL(false)
//     }
//   }
// }


// const textHoverHandler = (e) => {
//   const position = e.target.getBoundingClientRect()
//   const index = parseInt(e.target.getAttribute("index"))
//   if (props.text_body[index].type === UNEDITED) {
//     return
//   }
//   setSelChunk(index)
//   const x = position.x + window.scrollX 
//   const y = position.y + window.scrollY - (position.height+5)
//   const w = position.width
//   const h = position.height*2;
//   setHLX(x)
//   setHLY(y)
//   setHLW(w)
//   setHLH(h)
//   // setSelChunk(e.target.)
//   toggleHL(true)
// }

// const textHoverLeave = (e) => {
//   toggleHL(false)
// }
