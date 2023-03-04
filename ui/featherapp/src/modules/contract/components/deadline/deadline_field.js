import React, {useState, useEffect, useMemo, useRef} from "react";
import {ExclamationCircleIcon} from "@heroicons/react/outline"
import EditModal from "./edit_modal";
import DeadlineDisplay from "./header/deadline_display"
import DeadlineDraftView from "./draft/deadline_draft_view"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {WORKER_TYPE, BUYER_TYPE} from "../../../../services/user.service"
import useWindowDimensions from "../../../../custom_hooks/useWindowDimensions"
import { loadLocalDeadlines } from "../../../../reducers/deadlines/dispatchers/deadlines.add.dispatcher"
import { contractStages } from "../../../../services/contract.service";

import {
  renameDeadlines, 
} from "../../../../reducers/deadlines/dispatchers/deadlines.add.dispatcher"

import {
  suggestPayout
} from "../../../../reducers/deadlines/dispatchers/deadlines.payout.dispatcher"

import { sortDeadlines, genEmptyDeadline } from "./helpers";

export const DeadlineFieldContext = React.createContext({});

const DeadlineField = (props) => {

  const [role, setRole] = useState(WORKER_TYPE)
  const [openModal, setOpenModal] = useState(false)

  const mainElem = useRef(null)
  const [displayWidth, setDisplayWidth] = useState("0px") 
  const {height, width} = useWindowDimensions()
  const [showDates, toggleShowDates] = useState(true)

  const [inDraftMode, setInDraftMode] = useState(false)
  // In vh terms
  const [itemsHeight, setItemsHeight] = useState(200)

  // FOR THE CONTEXT
  const [selectedID, setSelectedID] = useState("")
  const [sortedDeadlines, setSortedDeadlines] = useState([])
  useEffect(() => {
    const deadlines = sortDeadlines(props.deadlines, role)
    setSortedDeadlines(deadlines)
    if (deadlines.length !== sortDeadlines.length) {
      props.renameDeadlines(deadlines)
    }
    if (selectedID === "" && deadlines.length > 0) {
      setSelectedID(deadlines[0].id)
    }
  }, [props.deadlines, props.deadlinesChanged, role])

  const curDeadline = useMemo(() => {
    let nextCur = undefined
    for (let i = 0; i < sortedDeadlines.length; i++) {
      if (sortedDeadlines[i].id === selectedID) {
        nextCur = sortedDeadlines[i]
        nextCur.idx = i
      }
    }
    if (nextCur === undefined) {
      if (sortedDeadlines.length > 0) {
        nextCur = sortedDeadlines[0]
        nextCur.idx = 0
      } else {
        nextCur = genEmptyDeadline(new Date())
      }
    }
    if (nextCur.awaitingCreation && nextCur.deadlineProposerId !== props.user.id) {
      nextCur.locked = true
    } else if (nextCur.awaitingDeletion) {
      nextCur.locked = true
    } else {
      nextCur.locked = false
    }
    return nextCur
  })

  // Use effect to resort the deadlines every time that they are updated in the reducer state
  useEffect( () => {
    if (mainElem.current) {
      let newWidth = mainElem.current?.offsetWidth - 70
      setDisplayWidth(newWidth+"px")
      if ((newWidth / props.deadlines.length) < 25) {
        toggleShowDates(false)
      } else {
        toggleShowDates(true)
      }
    }
  }, [height, width, props.deadlinesChanged])

  // Set the user's role
  useEffect(() => {
    if (props.curContract.id) {
      setRole(props.curContract.role)
    }
    if (props.curContract.stage === contractStages.ACTIVE || props.curContract.stage === contractStages.COMPLETE) {
      setInDraftMode(true)
      setItemsHeight(200)
    }
    if (props.curContract.stage === contractStages.SETTLE) {
      setInDraftMode(true)
      setItemsHeight(150)
    }
  }, [props.curContract])

  const handleOpenCalendar = (e) => {
    if (props.disabled !== true) {
      setOpenModal(true)
    }
  }

  return (
    <DeadlineFieldContext.Provider value={{
        sortedDeadlines, 
        curDeadline,
        selectedID,
        setSelectedID,
    }}>
      {inDraftMode ? (
        <div className={"mt-5 "}>
          <DeadlineDraftView role={role} deadlines={sortedDeadlines} openModal={handleOpenCalendar} height={itemsHeight}/>
        </div>
      ) : (
        <div className="grow items-center flex flex-row" ref={mainElem}>
          <div className="grow h-full">
            <DeadlineDisplay role={role} deadlines={sortedDeadlines} iconSize={"1.2rem"} showDates={showDates} preview={true}/>
          </div>
          <button
            type="button"
            onClick={handleOpenCalendar}
            className="ml-3 flex items-center px-4 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary7 bg-primary1 hover:bg-primary4 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary4"
          >
            Edit
          </button>
        </div>
      )}
      <EditModal 

        open={openModal} 
        setOpen={setOpenModal} 
        role={role}
        createMode={props.createMode}
        universalLock={props.universalLock}

        curPrice={
          (props.createMode ? props.curPrice : (props.curContract.id ? props.curContract.price.current : 0))
        }

      />
    </DeadlineFieldContext.Provider>
  )
}


const mapStateToProps = ({ user, contract, deadlines }) => ({
  user: user.user,
  curContract: contract.curContract,
  deadlinesChanged: deadlines.deadlinesChanged,
  deadlines: deadlines.deadlines,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  suggestPayout,
  renameDeadlines,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeadlineField)
