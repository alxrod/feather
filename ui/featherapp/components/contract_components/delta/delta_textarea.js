// For when I go back to implement proper google docs:
import { Fragment, useState, useEffect, useRef } from 'react'
import { generateContractText } from './delta_text_component'
import ContentEditable from 'react-contenteditable'
import {UNEDITED, ADDED, REMOVED} from '../../../custom_encodings'

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


    const mergeTextArea = (words) => {
        var contract_text = [];
        var cur_chunk = {type: -1, text: "", author: ""};
        for (var i = 0; i < words.length; i++) {
          if (cur_chunk.type === -1) {
            cur_chunk.type = words[i].type
            cur_chunk.author = words[i].author
            cur_chunk.text += words[i].text
          } else if (words[i].type === cur_chunk.type && words[i].author === cur_chunk.author) {
            cur_chunk.text += " "+words[i].text
          } else {
            contract_text.push(cur_chunk)
            cur_chunk = {type: words[i].type, text: " "+words[i].text, author: words[i].author}
          }
        }
        if (cur_chunk.type !== -1) {
          contract_text.push(cur_chunk)
        }

        return contract_text
    }
    
    const calcDifferences = (oldVal, newVal) => {
      let old_words = oldVal.split(" ")
      let new_words = newVal.split(" ")
      let output = []
      let j = 0
      let i = 0


      while (i < old_words.length || j < new_words.length) {
        if (j >= new_words.length) {
          output.push({text: old_words[i], type: REMOVED, author: props.cur_id})
          i++
        } else if (i >= old_words.length) {
          output.push({text: new_words[j], type: ADDED, author: props.cur_id})
          j++
        } else if (old_words[i] === new_words[j]) {
          output.push({text: old_words[i], type: UNEDITED, author: props.cur_id})
          i++
          j++
        } else {
          let k = j
          let insert = false
          let in_between = []
          while (k < new_words.length) {
            if (new_words[k] === old_words[i]) {
              insert = true
              break
            } else {
              in_between.push({text: new_words[k], type: ADDED, author: props.cur_id})
            }
            k++
          }
          
          if (insert) {
            output = [...output, ...in_between]
            j=k
            continue
          } 
          
          let not_missing = false
          let n = j;
          let m = i;
          while (!not_missing && n < new_words.length) {
            m = i;
            in_between = []
            while (m < old_words.length) {
              if (new_words[n] === old_words[m]) {
                not_missing = true
                break
              } else {
                in_between.push({text: old_words[m], type: REMOVED, author: props.cur_id})
              }
              m++
            }
            n++;
          }
          output = [...output, ...in_between]
          i=m
        }

      }
      return output
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
        
        let diffs = calcDifferences(oldValue, newValue)
        const new_text = mergeTextArea(diffs)
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
        let i = 0
        for (const [key, chunk] of Object.entries(text_body)) {
          let text = chunk.text
          if (i != 0) {
            text += " "
          }
          html_string += generateContractText(key, text, chunk.type)
          i++
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