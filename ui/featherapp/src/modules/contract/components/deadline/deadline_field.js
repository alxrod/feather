import React, {useState, useEffect, useMemo} from "react";
import {ExclamationCircleIcon} from "@heroicons/react/outline"
import CalendarModal from "./calendar_modal";
import DeadlineDisplay from "./deadline_display"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { exportDeadlines, exportDeadline, importDeadlines, genTestSet, genEmptyDeadline, addWeeks, inBetweenDates } from "./helpers"
import {WORKER_TYPE, BUYER_TYPE} from "../../../../services/user.service"
import {
  suggestPayout, 
  addLocalDeadline, 
  addDeadline, 
  renameDeadlines, 
  deleteLocalDeadline
} from "../../../../reducers/contract.reducer"

const DeadlineField = (props) => {

  // Visuals:
  const [errorVisibility, setErrorVisibility] = useState("hidden")
  const [reloadFlag, toggleReloadFlag] = useState(false)
  const [localDeadlines, setLocalDeadlines] = useState([])
  const [nextDeadlineName, setNextDeadlineName] = useState("Deadline")

  useEffect( () => {
    if (props.deadlines.length > 0) {
      console.log("Deadlines changed to")
      console.log(props.deadlines)
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
      const newDeadlines = importDeadlines(props.deadlines)
      setLocalDeadlines(sortDeadlines(newDeadlines))
    } else if (props.createMode !== true && props.selectedId !== "") {
      const contract = props.cachedContracts[props.selectedId]
      const importedDeadlines = importDeadlines(contract.deadlinesList)
      setLocalDeadlines(sortDeadlines(importedDeadlines))
    }
  }, [props.deadlines, props.selectedId, props.reloadDeadlines, props.deadlinesChanged])

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
    
    let newDeadlines = localDeadlines
    newDeadlines.push(new_deadline)
    
    setLocalDeadlines(sortDeadlines(newDeadlines))

    if (!props.createMode) {
      props.addLocalDeadline(exportDeadline(new_deadline))
    }
    toggleReloadFlag(!reloadFlag)
    for (let i = 0; i < newDeadlines.length; i++) {
      if (newDeadlines[i].id === new_deadline.id) {
        return i
      }
    }
  }

  const confirmNewDeadline = (deadline) => {
    props.addDeadline(props.selectedId, exportDeadline(deadline))
  }

  const sortDeadlines = (deadlines) => {
    if (role === WORKER_TYPE) {
      deadlines.sort((a, b) => (a.worker.date > b.worker.date) ? 1 : -1)
    } else if (role === BUYER_TYPE) {
      deadlines.sort((a, b) => (a.buyer.date > b.buyer.date) ? 1 : -1)
    } else {
      deadlines.sort((a, b) => (a.current.date > b.current.date) ? 1 : -1)
    }
    for (let i = 0; i < deadlines.length; i++) {
      deadlines[i].idx = i
      deadlines[i].name = "Deadline "+(i+1).toString()
      deadlines[i].relDate = deadlines[i].current.date
      if (role === WORKER_TYPE) {
        deadlines[i].relDate = deadlines[i].worker.date
      } else if (role === BUYER_TYPE) {
        deadlines[i].relDate = deadlines[i].buyer.date
      }
    }

    if (!props.createMode) {
      const exported = exportDeadlines(deadlines)
      props.renameDeadlines(exported)
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
        deleteLocalDeadline={props.deleteLocalDeadline}
        sortDeadlines={sortDeadlines}
        saveDeadlines={saveDeadlines}
        createMode={props.createMode}
        confirmNewDeadline={confirmNewDeadline}

        contractItemIds={props.contractItemIds}
        user={props.user}
        
        submitPayout={submitPayout}
      />
    </>
  )
}


const mapStateToProps = ({ user, contract, chat }) => ({
  user: user.user,
  selectedId: contract.selectedId,
  cachedContracts: contract.cachedContracts,
  reloadDeadlines: contract.reloadDeadlinesFlag,
  deadlinesChanged: contract.deadlinesChanged,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  suggestPayout,
  addLocalDeadline,
  renameDeadlines,
  addDeadline,
  deleteLocalDeadline,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeadlineField)
