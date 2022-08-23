// For when I go back to implement proper google docs:
import { Fragment, useState, useEffect, useRef } from 'react'
import { generateContractText } from './delta_text_component'
import ContentEditable from 'react-contenteditable'
import {UNEDITED, ADDED, REMOVED} from '../../../../custom_encodings'
import patienceDiffPlus from './PatienceDiff'
import { renderToString } from 'react-dom/server'

import DecideButton from '../decide_button'
import Loading from "../../../general_components/loading"

export default (props) => {
   
    const [text_body, set_body] = useState([])
    const [reloadFlag, setReloadFlag] = useState(false)
    const [htmlBody, setHtmlBody] = useState("<p></p>")
    const contentEditable = useRef(null)

    useEffect(() => {
        changeText(props.old_text, props.new_text)
    }, [props.old_text, props.new_text])

    useEffect(() => {
        setHtmlBody(convertStateToHtml(text_body))
    }, [reloadFlag])


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
    

    const changeText = (oldValue, newValue) => {
        var total_string = []

        // Iterate through all of the chunks in the current text body and 
        // add individual character chunks to the total string array
        for (const [_, char] of Object.entries(oldValue.split(""))) {
            total_string.push({text: char, type: UNEDITED})
        }

        // If the previous total string is empty, we are going to simplify by just
        // adding the text as a single chunk and setting the offset to that location.
        if (total_string.length === 0) {
            if (newValue != "") {
                const new_text = mergeTextArea([{text: newValue, type: ADDED, author: props.cur_id}])
                set_body(new_text)
                setReloadFlag(!reloadFlag)
                return
            } else {
                return
            }   
        }
        
        let diffs = patienceDiffPlus(oldValue, newValue).lines
        let insert_index = 0;

        for (var i = 0; i < diffs.length; i++) { 
            if (diffs[i].aIndex !== -1) {
                insert_index = diffs[i].aIndex
            } else if (diffs[i].aIndex === -1) {
                total_string.splice(insert_index+1, 0, {text: diffs[i].line, type: ADDED, author: props.cur_id})
                insert_index += 1
            }
            if (diffs[i].bIndex === -1) {
                total_string[diffs[i].aIndex] = {text: diffs[i].line, type: REMOVED, author: props.cur_id}
            }
        }
        const new_text = mergeTextArea(total_string)
        set_body(new_text)
        setReloadFlag(!reloadFlag)
        return
    }

    const convertStateToHtml = (text_body) => {
        var html_string = "";
        if (text_body.length == 0) {
          return generateContractText(0, "", UNEDITED)
        }
        
        // console.log(text_body)
        for (const [key, chunk] of Object.entries(text_body)) {
          let text = chunk.text
          html_string += generateContractText(key, text, chunk.type)
        }
        // console.log("HTML STRING:")
        // console.log(html_string)
        return html_string;
    };

    return (
        <Fragment>
            <ContentEditable
              innerRef={contentEditable}
              className="block focus:outline-none w-full border-0 border-b border-transparent p-0 m-0 resize-none sm:text-sm"
              html={htmlBody} // innerHTML of the editable div
              disabled={true}       // use true to disable editing
              tagName='article' // Use a custom HTML tag (uses a div by default)
            />
        </Fragment>
    )
}