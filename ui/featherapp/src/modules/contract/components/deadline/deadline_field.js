import React, {useState, useEffect, useMemo, useRef} from "react";
import {ExclamationCircleIcon} from "@heroicons/react/outline"
import CalendarModal from "./calendar_modal";
import DeadlineDisplay from "./deadline_display"
import DeadlineDraftView from "./deadline_draft_view"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { genEmptyDeadline, addWeeks, inBetweenDates } from "./helpers"
import {WORKER_TYPE, BUYER_TYPE} from "../../../../services/user.service"
import useWindowDimensions from "../../../../custom_hooks/useWindowDimensions"
import { loadLocalDeadlines } from "../../../../reducers/deadlines/dispatchers/deadlines.add.dispatcher"
import { contractStages } from "../../../../services/contract.service";

import {
  addLocalDeadline, 
  addDeadline, 
  renameDeadlines, 
} from "../../../../reducers/deadlines/dispatchers/deadlines.add.dispatcher"

import {
  suggestPayout
} from "../../../../reducers/deadlines/dispatchers/deadlines.payout.dispatcher"

const DeadlineField = (props) => {

  // Visuals:
  const [errorVisibility, setErrorVisibility] = useState("hidden")
  const [reloadFlag, toggleReloadFlag] = useState(false)
  const [localDeadlines, setLocalDeadlines] = useState([])
  const [nextDeadlineName, setNextDeadlineName] = useState("Deadline")
  const [role, setRole] = useState(WORKER_TYPE)
  const [openModal, setOpenModal] = useState(false)

  const mainElem = useRef(null)
  const [displayWidth, setDisplayWidth] = useState("0px") 
  const {height, width} = useWindowDimensions()
  const [showDates, toggleShowDates] = useState(true)

  const [inDraftMode, setInDraftMode] = useState(false)


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
  
  useEffect( () => {
    if (props.deadlines.length > 0) {
      let max = 1
      for (let i = 0; i < props.deadlines.length; i++) {
        if (props.deadlines[i].name) {
          const num = parseInt(props.deadlines[i].name.split(" ")[1])
          if (num > max) {
            max = num
          }
        }
      }
      setNextDeadlineName("Deadline "+(max+1).toString())
    }

    if (props.createMode === true && props.deadlines && props.deadlines.length >= 2) {
      setLocalDeadlines(sortDeadlines(props.deadlines))
    } else if (props.createMode !== true && props.curContract.id) {
      setLocalDeadlines(sortDeadlines(props.deadlines))
    }
  }, [props.deadlines, props.reloadDeadlines, props.deadlinesChanged])

  // Set the user's role
  useEffect(() => {
    if (props.curContract.id) {
      setRole(props.curContract.role)
    }
    if (props.curContract.stage == contractStages.ACTIVE) {
      setInDraftMode(true)
    }
  }, [props.curContract])


  // Deadline reducer operations 
  // ----------------------------------------------------------------
  const saveDeadlines = () => {
    props.loadLocalDeadlines(localDeadlines)
  }
  
  const editDeadline = (new_deadline) => {
    const newDeadlines = localDeadlines
    for (let i = 0; i < newDeadlines.length; i++) {
      if (newDeadlines[i].id === new_deadline.id) {
        newDeadlines[i] = new_deadline
      }
    }
    setLocalDeadlines(sortDeadlines(newDeadlines))
  }

  const removeDeadline = (id) => {
    const newDeadlines = []
    for (let i = 0; i < localDeadlines.length; i++) {
      if (localDeadlines[i].id !== id) {
        newDeadlines.push(localDeadlines[i])
      }
    }
    setLocalDeadlines(sortDeadlines(newDeadlines))
  }

  const addDeadline = (curSelected) => {
    const curDeadline = localDeadlines[curSelected]
    let curDate = curDeadline.currentDate
    if (role === WORKER_TYPE) {
      curDate = curDeadline.workerDate
    } else if (role === BUYER_TYPE) {
      curDate = curDeadline.buyerDate
    }

    let newDate = addWeeks(curDate,1)
    if (curSelected < (localDeadlines.length - 1) ) {
      const nextDeadline = localDeadlines[curSelected + 1] 
      let nextDate = nextDeadline.currentDate
      if (role === WORKER_TYPE) {
        nextDate = nextDeadline.workerDate
      } else if (role === BUYER_TYPE) {
        nextDate = nextDeadline.buyerDate
      }
      newDate = inBetweenDates(curDate, nextDate)
    }

    const new_deadline = genEmptyDeadline(newDate)
    new_deadline.name = nextDeadlineName
    if (!props.createMode) {
      new_deadline.awaitingCreation = true
    }
    new_deadline.id = (localDeadlines.length +1).toString()
    if (!props.createMode) {
      new_deadline.id = "TEMPORARY"
    }
  
    new_deadline.idx = localDeadlines.length
    new_deadline.temporary = true

    props.addLocalDeadline(new_deadline)
  }

  const confirmNewDeadline = (deadline) => {
    props.addDeadline(props.curContract.id, deadline)
  }


// Sortign helper function
  const sortDeadlines = (deadlines) => {
    if (role === WORKER_TYPE) {
      deadlines.sort((a, b) => (a.workerDate > b.workerDate) ? 1 : -1)
    } else if (role === BUYER_TYPE) {
      deadlines.sort((a, b) => (a.buyerDate > b.buyerDate) ? 1 : -1)
    } else {
      deadlines.sort((a, b) => (a.currentDate > b.currentDate) ? 1 : -1)
    }
    for (let i = 0; i < deadlines.length; i++) {
      deadlines[i].idx = i
      deadlines[i].name = "Deadline "+(i+1).toString()
      deadlines[i].relDate = deadlines[i].currentDate
      if (role === WORKER_TYPE) {
        deadlines[i].relDate = deadlines[i].workerDate
      } else if (role === BUYER_TYPE) {
        deadlines[i].relDate = deadlines[i].buyerDate
      }
    }

    if (!props.createMode) {
      // Call out to reducer to set up renaming, doesn't force udpate
      props.renameDeadlines(deadlines)
    }

    return deadlines
  }

  const submitPayout = (deadline_id, new_payout) => {
    props.suggestPayout(props.curContract.id, deadline_id, new_payout)
  }

  // Open Modal
  const handleOpenCalendar = (e) => {
    if (props.disabled !== true) {
      setOpenModal(true)
    }
  }
  return (
    <>
      {inDraftMode ? (
        <DeadlineDraftView role={role} deadlines={localDeadlines} openModal={handleOpenCalendar}/>
      ) : (
        <div className=" flex grow" ref={mainElem}>
          <div className="flex grow items-center">
            <div className="grow h-full">
              <div className="overflow-x-scroll overflow-y-hidden3 h-full" style={{width: displayWidth}}>
                <DeadlineDisplay role={role} deadlines={localDeadlines} iconSize={5} showDates={showDates}/>
              </div>
            </div>
            <button
              type="button"
              onClick={handleOpenCalendar}
              className="ml-3 inline-flex items-center px-4 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-800 bg-indigo-100 hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit
            </button>
          </div>
        </div>
      )}
      <CalendarModal 

        open={openModal} 
        setOpen={setOpenModal} 
        role={role} 
        deadlines={localDeadlines}
        createMode={props.createMode}
        contractItemIds={props.contractItemIds}
        universalLock={props.universalLock}

        // Deadline editing functions
        editDeadline={editDeadline}
        addDeadline={addDeadline}
        removeDeadline={removeDeadline}
        confirmNewDeadline={confirmNewDeadline}
        saveDeadlines={saveDeadlines}
        submitPayout={submitPayout}

      />
    </>
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
  addLocalDeadline,
  renameDeadlines,
  addDeadline,
  loadLocalDeadlines,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeadlineField)
