import { useState, useRef, useMemo, useEffect } from 'react'
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

  const get_total_offset = (node, offset) => {
    let total_offset = 0
    if (contentEditable.current !== null) {
      for (let i=0; i<contentEditable.current.children.length; i++) {
        if (contentEditable.current.children[i].firstChild == node) {
          return total_offset + offset
        } else {
          if (contentEditable.current.children[i].firstChild !== null) {
            total_offset += contentEditable.current.children[i].firstChild.length
          }
        }
      }
    }
    return total_offset
  }

  const set_to_total_offset = () => {
    if (props.text_body.length == 0) {
      return
    }

    let total_offset = 0
    if (contentEditable.current !== null) {
      for (let i=0; i<contentEditable.current.children.length; i++) {
        if (contentEditable.current.children[i].firstChild) {
          if (total_offset + contentEditable.current.children[i].firstChild.length >= globalOffset) {
            let sel = window.getSelection();
            let range = document.createRange();
            
            const relOffset = globalOffset - total_offset
            // console.log("rel offset: " + relOffset)
            range.setStart(contentEditable.current.children[i].firstChild, relOffset);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
  
            return
          } else {
            total_offset += contentEditable.current.children[i].firstChild.length
          }
        }
      }
    }
  }

  const get_char_mode = (index) => {
    let moving_index = 0
    for (let chunk_i=0; props.text_body.length; chunk_i++) {
      for (let i=0; i<props.text_body[chunk_i].text.length; i++) {
        if (moving_index === index) {
          return props.text_body[chunk_i].type
        }
        moving_index++
      }
    }
  }
  


  const convertStateToHtml = (text_body) => {
    var html_string = "";
    if (text_body.length == 0) {
      return generateContractText(0, "", UNEDITED)
    }
    
    // console.log(text_body)
    for (const [key, chunk] of Object.entries(text_body)) {
      let text = chunk.text
      text = text.replaceAll(" ", "&nbsp;")
      html_string += generateContractText(key, text, chunk.type)
    }
    // console.log("HTML STRING:")
    // console.log(html_string)
    return html_string;
  };

  const mergeTextArea = (chars) => {
    var contract_text = [];
    var cur_chunk = {type: -1, text: "", author: ""};
    for (var i = 0; i < chars.length; i++) {
      if (cur_chunk.type === -1) {
        cur_chunk.type = chars[i].type
        cur_chunk.author = chars[i].author
        cur_chunk.text += chars[i].text
      } else if (chars[i].type === cur_chunk.type && chars[i].author === cur_chunk.author) {
        cur_chunk.text += chars[i].text
      } else {
        contract_text.push(cur_chunk)
        cur_chunk = {type: chars[i].type, text: chars[i].text, author: chars[i].author}
      }
    }
    if (cur_chunk.type !== -1) {
      contract_text.push(cur_chunk)
    }
    return contract_text
  }

  const removeTags = (str) => {
      if ((str===null) || (str===''))
          return "";
      else
          str = str.toString()
          str = str.replaceAll('&nbsp;', ' ')
          str = str.replaceAll('&lt;', '<') 
          str = str.replaceAll('&gt;', '>')
          str = str.replaceAll('&amp;', '&')
            
      // Regular expression to identify HTML tags in 
      // the input string. Replacing the identified 
      // HTML tag with a null string.
      return str.replace( /(<([^>]+)>)/ig, '');
  }

  const [isSaving, setSaving] = useState(false)
  const [overrideMode, activateOverride] = useState(props.override == true ? true : false)
  const contentEditable = useRef(null);

  const [hlightX, setHLX] = useState(0)
  const [hlightY, setHLY] = useState(0)
  const [hlightW, setHLW] = useState(100)
  const [hlightH, setHLH] = useState(40)
  const [showHL, toggleHL] = useState(false)

  const [curSelChunk, setSelChunk] = useState(-1)

  const [globalOffset, setGlobOff] = useState(0);
  const [updateCursorFlag, setUpdateCursor] = useState(false);

  const handleApproveChunk = (e) => {
    console.log("approved chunk " + curSelChunk)
    if (curSelChunk !== -1) {
      const type = props.text_body[curSelChunk].type
      if (type === ADDED) {
        let new_text = [...props.text_body]
        new_text[curSelChunk].type = UNEDITED
        props.set_text(new_text)
        setSelChunk(-1)
        toggleHL(false)
      } else {
        let new_text = [...props.text_body]
        new_text.splice(curSelChunk, 1)
        props.set_text(new_text)
        setSelChunk(-1)
        toggleHL(false)
      }
    }
  }

  const handleRejectChunk = (e) => {
    console.log("rejecting chunk " + curSelChunk)
    if (curSelChunk !== -1) {
      const type = props.text_body[curSelChunk].type
      if (type === ADDED) {
        let new_text = [...props.text_body]
        new_text.splice(curSelChunk, 1)
        props.set_text(new_text)
        setSelChunk(-1)
        toggleHL(false)

      } else {
        let new_text = [...props.text_body]
        new_text[curSelChunk].type = UNEDITED
        props.set_text(new_text)
        setSelChunk(-1)
        toggleHL(false)
      }
    }
  }


  const textHoverHandler = (e) => {
    const position = e.target.getBoundingClientRect()
    const index = parseInt(e.target.getAttribute("index"))
    if (props.text_body[index].type === UNEDITED) {
      return
    }
    setSelChunk(index)
    const x = position.x + window.scrollX 
    const y = position.y + window.scrollY - (position.height+5)
    const w = position.width
    const h = position.height*2;
    setHLX(x)
    setHLY(y)
    setHLW(w)
    setHLH(h)
    // setSelChunk(e.target.)
    toggleHL(true)
  }

  const textHoverLeave = (e) => {
    toggleHL(false)
  }
  
  const contentState = useMemo(() => {
    return convertStateToHtml(props.text_body)
  })
  useEffect(() => {
    if (contentEditable) {
      for (let i = 0; i < contentEditable.current.children.length; i++) {
        contentEditable.current.children[i].onmouseover = textHoverHandler
      }
    }
    set_to_total_offset()
  }, [contentState, updateCursorFlag])

  // Bulk of live editing logic
  const handleChange = (e) => {
    const newValue = removeTags(e.target.value)
    var total_string = []
    var total_string_concated = ""

    // If we are in creation mode, everything goes, text will be added as a singular chunk
    if (overrideMode == true) {
      const new_text = [{text: newValue, type: UNEDITED, author: props.cur_id}]
      setGlobOff(newValue.length)
      props.set_text(new_text)
      
      return 
    }

    // Iterate through all of the chunks in the current text body and 
    // add individual character chunks to the total string array
    for (const [key, chunk] of Object.entries(props.text_body)) {
      for (var i = 0; i < chunk.text.length; i++) { 
        total_string.push({text: chunk.text[i], type: chunk.type})
        total_string_concated += chunk.text[i]
      }
    }

    // If the previous total string is empty, we are going to simplify by just
    // adding the text as a single chunk and setting the offset to that location.
    if (total_string.length === 0) {
      if (newValue != "") {
        const new_text = mergeTextArea([{text: newValue, type: ADDED, author: props.cur_id}])
        console.log("ADVANCING TO END")
        setGlobOff(newValue.length)
        props.set_text(new_text)
        return
      } else {
        return
      }
    }

    if (total_string.length === newValue.length) {
      return
    }

    // New strategy: identify location of the new offset
    // Use the length of the string to identify if text has been added or deleted
    // if it has been added select the text from cursor + length diff and insert it into our total string
    // If it has been deleted alter those indices of the total string to:
    // deleted if they are unedited, or remove them if they are delete mode or add mode.
    
    // First get the offset.
    const oldSelNode = document.getSelection().anchorNode
    const oldSelOff = document.getSelection().focusOffset

    let newOff = get_total_offset(oldSelNode, oldSelOff)
    console.log("New off is: " + newOff)

    const len_dif = newValue.length - total_string.length 
    // true is added, false is deleted
    let added = true
    if (len_dif < 0) {
      added = false
    }

    // console.log("Changes made:")
    // console.log("An " + (added ? "addition" : "deletion") + " was made of " + len_dif + " characters")
    if (added === true) {
      // console.log("Total string now is " + newValue.length + " characters and addition was from " + (newOff-1) + " to " + (newOff+len_dif-1))
      // console.log("Added: " + newValue.substring((newOff-1), (newOff+len_dif-1)))
    } else {
      // console.log("Deleted: " + total_string_concated.substring(newOff+1, (newOff+len_dif+1)))
    }

    let changeStart = (newOff-1)
    let changeEnd = (newOff+len_dif-1)
    if (!added) {
      // console.log("SWITCHING MODE TO DELTE")
      changeStart = (newOff+1)
      changeEnd = (newOff+len_dif+1)
    }

    if (added) {
      for (let i = changeStart; i < changeEnd; i++) {
        // console.log("New Value: " + newValue +", i: " +i)
        // console.log("Adding " + newValue[i])
        total_string.splice(i, 0, {text: newValue[i], type: ADDED, author: props.cur_id})
      }
    } else {
      let removalI = changeStart;
      for (let i = changeStart-1; i >= changeEnd; i-=1) {
        // console.log("Removing element "+i+" from "+total_string_concated+" of length" + total_string.length)
        if (total_string[i].type === UNEDITED) {
          total_string[i].type = REMOVED
          total_string[i].author = props.cur_id
          removalI -= 1
        } else {
          total_string.splice(removalI, 1)
        }
      }
    }

    const new_text = mergeTextArea(total_string)
    setGlobOff(newOff)
    props.set_text(new_text)    
  };

  

  return (
    <div className={"flex flex-col items-start space-x-4" + (props.embedded && " grow")}>
      <div className="grow w-full">
          <div 
            className={"h-full focus-within:border-indigo-600" + (props.embedded ? " rounded-lg border border-gray-200 p-4" : " border-b")}
            onClick={() => contentEditable.current.focus()}
          >
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <ContentEditable
              innerRef={contentEditable}
              className="block focus:outline-none w-full border-0 border-b border-transparent p-0 pb-2 resize-none sm:text-sm"
              html={contentState} // innerHTML of the editable div
              disabled={props.disabled}       // use true to disable editing
              onChange={handleChange} // handle innerHTML change
              tagName='article' // Use a custom HTML tag (uses a div by default)
            />
          </div>
      </div>
      <div id={'contract_item_textarea'} 
          className="flex flex-row justify-end"
          onMouseLeave={textHoverLeave} 
          style={{ 
            display: (showHL == true ? "flex" : "none"), 
            position: 'absolute', 
            margin: 0, 
            top: hlightY, 
            left: hlightX, 
            zIndex: 9, 
            width: hlightW + "px", 
            height: hlightH  }}>
          <div className="h-[20px]">
            <DecideButton approve={handleApproveChunk} reject={handleRejectChunk}></DecideButton>
            {/* <DecideButton></DecideButton> */}
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