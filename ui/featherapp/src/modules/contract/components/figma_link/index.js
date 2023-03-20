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
  return (
    <div className="relative flex flex-col">
      <div className="flex flex-col border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-primary4 focus-within:ring-1 focus-within:ring-primary4">
        <div className="flex flex-row">
          <div className="relative flex flex-grow items-stretch focus-within:z-10 items-center p-4">
            <div className="mx-1 text-gray-400 flex items-center" aria-hidden="true">
              <FigmaLogo/>
            </div>
            {props.curContract.figmaLink === "" ? (
              <h1 className="text-gray-400">No one has connected a figma file to this contract</h1>
            ) : (
              <a target="_blank" href={props.curContract.figmaLink} className="text-primary5 font-medium">Click here to view this contract's Figma file</a>
            )}
            
          </div>

          {/* {props.lock ? (
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
            
          )} */}
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
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(FigmaLinkField)