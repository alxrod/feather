import { useState, useEffect } from "react"
import { ExclamationIcon,  XIcon} from "@heroicons/react/outline"
import { LockClosedIcon } from "@heroicons/react/solid"
import FigmaLogo from "./figma_logo"
import {Tooltip} from "flowbite-react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DecideButton from "../decide_button";
import {setFigmaLink} from "../../../../reducers/contract/dispatchers/contract.dispatcher"

const FigmaLinkField = (props) => {
  const [newLink, setNewLink] = useState("")
  const [showDecideButton, setShowDecideButton] = useState(false)
  const [editing, setEditing] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  
  const isValidUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(urlString);
  }

  useEffect(() => {
    console.log("Old: ", newLink, " New: ", props.curContract?.figmaLink)
    if (!editing && newLink !== props.curContract?.figmaLink) {
      setNewLink(props.curContract?.figmaLink)
    } 
  }, [props.curContract?.figmaLink])

  useEffect(() => { 
    if (newLink !== props.curContract?.figmaLink) {
      setShowDecideButton(true)
    } else {
      setShowDecideButton(false)
    }
  }, [props.curContract?.figmaLink, newLink])
  
  const clearLink = (e) => {
    e.preventDefault();
    setNewLink("")
  }

  const changeLink = (e) => {
    const newVal = e.target.value
    setNewLink(newVal)
    if (!isValidUrl(newVal)) {
      setErrorMsg("Please provide a real link")
    } else if (!newVal.includes(".figma.com/file/")) {
      setErrorMsg("This is not a figma file link")
    } else {
      setErrorMsg("")
    }
  }

  const submitNewLink = (e) => {
    props.setFigmaLink(props.curContract.id, newLink).then(
      () => {
        setShowDecideButton(false)
      },
      (error) => {
        console.log("Change Link error:", error)
      }
    )
  }

  return (
    <div className="relative flex flex-col">
      <div className="flex flex-col border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-primary4 focus-within:ring-1 focus-within:ring-primary4">
        <div className="flex flex-row">
          <div className="relative flex flex-grow items-stretch focus-within:z-10">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <div className="mx-1 text-gray-400" aria-hidden="true">
                <FigmaLogo/>
              </div>
              Your Figma File: 
            </div>
            <input
              type="text"
              name="figma_link"
              id="figma_link"
              className="block p-3 w-full border-0 ring-0 pl-40 text-gray-900 focus:ring-0 placeholder:text-gray-400 sm:leading-6"
              placeholder="No link provided yet"
              value={newLink}
              onChange={changeLink}
              disabled={!props.lock}
              onBlur={() => {setEditing(false)}}
              onFocus={() => {setEditing(true)}}
            />
          </div>

          {props.lock ? (
            <Tooltip
              content={<p className="w-[100px]">You can't change links while the contract is active</p>}
              style="light"
              width={100}
            >
              <div className="px-4 h-full flex flex-col justify-center">
                <LockClosedIcon className="w-6 h-6 text-gray-400"/>
              </div>
            </Tooltip>
          ) : !showDecideButton ? (
            <button onClick={clearLink} className="px-4">
              <XIcon className="w-5 h-5 text-gray-400"/>
            </button>
          ) : errorMsg === "" ? (
            <div className="p-4">
              <DecideButton approve={submitNewLink} reject={clearLink}/>
            </div>
          ) : (
            <Tooltip
              content={<p className="w-[100px]">{errorMsg}</p>}
              style="light"
              width={100}
            >
              <div className="px-4 h-full flex flex-col justify-center">
                <ExclamationIcon strokeWidth={2} className="w-6 h-6 text-red-400"/>
              </div>
            </Tooltip>
            
          )}
          
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = ({ user, contract }) => ({
  curContract: contract.curContract,
  user: user.user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setFigmaLink
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(FigmaLinkField)