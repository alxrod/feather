import { useState, useRef, useMemo, useEffect } from 'react'
import ContentEditable from 'react-contenteditable'
import {UNEDITED, ADDED, REMOVED} from '../../../custom_encodings'
import patienceDiffPlus from './PatienceDiff'
import { renderToString } from 'react-dom/server'
import ContractTextComponent from './contract_text_component'
import DecideButton from './decide_button'

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
        if (total_offset + contentEditable.current.children[i].firstChild.length >= globalOffset) {
          let sel = window.getSelection();
          let range = document.createRange();
          
          const relOffset = globalOffset - total_offset
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
    for (const [key, chunk] of Object.entries(text_body)) {
      if (chunk.type === REMOVED) {
      }
      html_string += renderToString(<ContractTextComponent type={chunk.type} text={chunk.text} index={key}/>)
    }
    return html_string;
  };

  const mergeTextArea = (chars) => {
    var contract_text = [];
    var cur_chunk = {type: -1, text: ""};
    for (var i = 0; i < chars.length; i++) {
      if (cur_chunk.type === -1) {
        cur_chunk.type = chars[i].type
        cur_chunk.text += chars[i].text
      } else if (chars[i].type === cur_chunk.type) {
        cur_chunk.text += chars[i].text
      } else {
        contract_text.push(cur_chunk)
        cur_chunk = {type: chars[i].type, text: chars[i].text}
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
  
  const contentState = useMemo(() => convertStateToHtml(props.text_body))
  useEffect(() => {
    if (contentEditable) {
      for (let i = 0; i < contentEditable.current.children.length; i++) {
        contentEditable.current.children[i].onmouseover = textHoverHandler
      }
    }
    set_to_total_offset()
  }, [contentState, updateCursorFlag])

  const handleChange = (e) => {
    const newValue = removeTags(e.target.value)
    var total_string = []
    var total_string_concated = ""

    var cur_index = 0
    for (const [key, chunk] of Object.entries(props.text_body)) {
      for (var i = 0; i < chunk.text.length; i++) { 
        total_string.push({text: chunk.text[i], type: chunk.type})
        total_string_concated += chunk.text[i]
      }
      cur_index += chunk.text.length
    }

    if (total_string.length === 0) {
      if (newValue != "") {
        const new_text = mergeTextArea([{text: newValue, type: ADDED}])
        setGlobOff(newValue.length)
        props.set_text(new_text)
        return
      } else {
        return
      }
    }

    let diffs = patienceDiffPlus(total_string_concated, newValue).lines
    let insert_index = 0;
    let established_changes = 0

    let need_to_remove = []
    for (var i = 0; i < diffs.length; i++) { 
      if (diffs[i].aIndex !== -1) {
        insert_index = diffs[i].aIndex
      } else if (diffs[i].aIndex === -1) {
        established_changes++
        total_string.splice(insert_index+1, 0, {text: diffs[i].line, type: ADDED})
        insert_index += 1
      }
      if (diffs[i].bIndex === -1) {
        established_changes++
        
        const char_mode = get_char_mode(diffs[i].aIndex)
        if (char_mode == ADDED) {
          need_to_remove.push(diffs[i].aIndex)
        } else if (char_mode == UNEDITED) {
          total_string[diffs[i].aIndex] = {text: diffs[i].line, type: REMOVED}
        } else {
          setUpdateCursor(!updateCursorFlag)
        }
      }
    }

    let offset = 0
    for (let i = 0; i < need_to_remove.length; i++) {
      total_string.splice(need_to_remove[i] - offset, 1)
    }

    if (established_changes > 0) {
      // console.log("We have found " + established_changes + " changes from the last version")
      const oldSelNode = document.getSelection().anchorNode
      const oldSelOff = document.getSelection().focusOffset

      let newOff = get_total_offset(oldSelNode, oldSelOff)
      setGlobOff(newOff)
      // console.log("New glob offset: " + newOff)

      const new_text = mergeTextArea(total_string)

      props.set_text(new_text)
    }
    
  };

  

  return (
    <div className="flex items-start space-x-4">
      <div className="min-w-0 flex-1">
        <form action="#">
          <div className="border-b border-gray-200 focus-within:border-indigo-600">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <ContentEditable
              rows={4}
              innerRef={contentEditable}
              className="block focus:outline-none w-full border-0 border-b border-transparent p-0 pb-2 resize-none focus:ring-0 focus:border-indigo-600 sm:text-sm"
              html={contentState} // innerHTML of the editable div
              disabled={props.disabled}       // use true to disable editing
              onChange={handleChange} // handle innerHTML change
              tagName='article' // Use a custom HTML tag (uses a div by default)
            />
          </div>
          <div className="pt-2 flex justify-end">
            <div className="flex items-center space-x-5">
              <div className="flow-root">
                <button
                  type="button"
                  className="-m-2 w-10 h-10 rounded-full inline-flex items-center justify-center text-gray-400 hover:text-gray-500"
                >
                    <div className="flex justify-center items-center">
                        <div className="absolute top-0 right-0 mr-2 mt-2">
                        </div>
                    </div>
                </button>
              </div>
              <div className="flow-root">
                
              </div>
            </div>
            {!props.disabled && (
              <div className="flex flex-row">
                <p className="text-gray-600 mr-2">
                  Saving...
                </p>
                <svg role="status" className="inline w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
              </div>
            )}
          </div>
        </form>
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

export default ContractTextArea