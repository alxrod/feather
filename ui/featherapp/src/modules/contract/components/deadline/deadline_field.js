import React, {useState, useEffect, useMemo} from "react";
import {ExclamationCircleIcon} from "@heroicons/react/outline"
import CalendarModal from "./calendar_modal";
import DeadlineDisplay from "./deadline_display"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { exportDeadlines, importDeadlines, genTestSet, genEmptyDeadline, addWeeks, inBetweenDates } from "./helpers"
import {WORKER_TYPE, BUYER_TYPE} from "../../../../services/user.service"
import {suggestPayout} from "../../../../reducers/contract.reducer"

const DeadlineField = (props) => {

  // Visuals:
  const [errorVisibility, setErrorVisibility] = useState("hidden")
  const [reloadFlag, toggleReloadFlag] = useState(false)
  const [localDeadlines, setLocalDeadlines] = useState([])

  useEffect( () => {
    if (props.createMode === true && props.deadlines && props.deadlines.length >= 2) {
      const newDeadlines = importDeadlines(props.deadlines)
      setLocalDeadlines(newDeadlines)
    } else if (props.createMode !== true && props.selectedId !== "") {
      console.log("TRIGGING A DEADLINE RELOAD")
      const contract = props.cachedContracts[props.selectedId]
      const importedDeadlines = importDeadlines(contract.deadlinesList)
      console.log("New Imported Deadliens are:")
      console.log(importedDeadlines)
      setLocalDeadlines(importedDeadlines)
    }
  }, [props.deadlines, props.selectedId, props.reloadDeadlines])

  const saveDeadlines = () => {
    props.changeDeadlines(exportDeadlines(localDeadlines))
  }

  const [role, setRole] = useState(WORKER_TYPE)
  
  const editDeadline = (new_deadline) => {
    const newDeadlines = localDeadlines
    for (let i = 0; i < newDeadlines.length; i++) {
      if (newDeadlines[i].id === new_deadline.id) {
        newDeadlines[i] = new_deadline
      }
    }
    setLocalDeadlines(sortDeadlines(newDeadlines))
    toggleReloadFlag(!reloadFlag)
  }

  const removeDeadline = (id) => {
    const newDeadlines = []
    for (let i = 0; i < localDeadlines.length; i++) {
      if (localDeadlines[i].id !== id) {
        newDeadlines.push(localDeadlines[i])
      }
    }
    setLocalDeadlines(sortDeadlines(newDeadlines))
    toggleReloadFlag(!reloadFlag)
  }

  const addDeadline = (curSelected) => {
    const curDeadline = localDeadlines[curSelected]
    let curDate = curDeadline.current.date
    if (role === WORKER_TYPE) {
      curDate = curDeadline.worker.date
    } else if (role === BUYER_TYPE) {
      curDate = curDeadline.buyer.date
    }

    let newDate = addWeeks(curDate,1)
    if (curSelected < (localDeadlines.length - 1) ) {
      const nextDeadline = localDeadlines[curSelected + 1] 
      let nextDate = nextDeadline.current.date
      if (role === WORKER_TYPE) {
        nextDate = nextDeadline.worker.date
      } else if (role === BUYER_TYPE) {
        nextDate = nextDeadline.buyer.date
      }
      newDate = inBetweenDates(curDate, nextDate)
    }

    const new_deadline = genEmptyDeadline(newDate)
    new_deadline.id = (localDeadlines.length +1).toString()
    new_deadline.idx = localDeadlines.length
    let newDeadlines = localDeadlines
    newDeadlines.push(new_deadline)
    console.log("Before sort new deadlines look like")
    console.log(newDeadlines)
    setLocalDeadlines(sortDeadlines(newDeadlines))
    toggleReloadFlag(!reloadFlag)
    for (let i = 0; i < newDeadlines.length; i++) {
      if (newDeadlines[i].id === new_deadline.id) {
        return i
      }
    }
  }

  const sortDeadlines = (deadlines) => {
    console.log("Inspecting Deadlines")
    console.log(deadlines)
    if (role === WORKER_TYPE) {
      deadlines.sort((a, b) => (a.worker.date > b.worker.date) ? 1 : -1)
    } else if (role === BUYER_TYPE) {
      deadlines.sort((a, b) => (a.buyer.date > b.buyer.date) ? 1 : -1)
    } else {
      deadlines.sort((a, b) => (a.current.date > b.current.date) ? 1 : -1)
    }
    console.log("Checking in resort")
    for (let i = 0; i < deadlines.length; i++) {
      deadlines[i].idx = i
      deadlines[i].relDate = deadlines[i].current.date
      if (role === WORKER_TYPE) {
        
        deadlines[i].relDate = deadlines[i].worker.date
      } else if (role === BUYER_TYPE) {
        deadlines[i].relDate = deadlines[i].buyer.date
      }
      console.log(deadlines[i].relDate)
    }
    return deadlines
  }

  const submitPayout = (deadline_id, new_payout) => {
    props.suggestPayout(props.selectedId, deadline_id, new_payout)
  }

  useEffect(() => {
    if (props.selectedId !== "") {
      const contract = props.cachedContracts[props.selectedId]
      setRole(contract.role)
      // setDeadline(contract.deadline)
    }
  }, [props.selectedId])

  const [openModal, setOpenModal] = useState(false)

  const handleOpenCalendar = (e) => {
    if (props.disabled !== true) {
      setOpenModal(true)
    }
  }
  return (
    <>
      <div className="flex">
        <div className="flex grow items-center">
          <div className="w-full" >
            <DeadlineDisplay role={role} deadlines={localDeadlines} iconSize={5}/>
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
      <CalendarModal 
        open={openModal} 
        setOpen={setOpenModal} 
        role={role} 
        reloadFlag={reloadFlag}
        deadlines={localDeadlines}
        editDeadline={editDeadline}
        addDeadline={addDeadline}
        removeDeadline={removeDeadline}
        sortDeadlines={sortDeadlines}
        saveDeadlines={saveDeadlines}
        createMode={props.createMode}

        contractItemIds={props.contractItemIds}
        
        submitPayout={submitPayout}
      />
    </>
  )
}


const mapStateToProps = ({ user, contract, chat }) => ({
  selectedId: contract.selectedId,
  cachedContracts: contract.cachedContracts,
  reloadDeadlines: contract.reloadDeadlinesFlag,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  suggestPayout
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeadlineField)
