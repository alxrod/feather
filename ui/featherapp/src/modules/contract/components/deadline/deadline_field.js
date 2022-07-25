import React, {useState, useEffect, useMemo} from "react";
import {ExclamationCircleIcon} from "@heroicons/react/outline"
import CalendarModal from "./calendar_modal";
import DeadlineDisplay from "./deadline_display"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {WORKER_TYPE, BUYER_TYPE} from "../../../../services/user.service"

const DeadlineField = (props) => {

  // Visuals:
  const [errorVisibility, setErrorVisibility] = useState("hidden")
  const [reloadFlag, toggleReloadFlag] = useState(false)
  
  // Logic

  const genTestSet = () => {
    return [
      {
        id: 1,
        idx: 0,
        current: {
          payout: 0,
          date: new Date(),
          detail: "Submit the material"
        },
        worker: {
          payout: 0,
          date: new Date(),
          detail: "Submit the material"
        },
        buyer: {
          payout: 0,
          date: new Date(),
          detail: "Submit the material"
        },
        awaitingApproval: false,
        proposerId: ""
      },
      {
        id: 2,
        idx: 1,
        current: {
          payout: 15,
          date: addWeeks(new Date(), 1),
          detail: "Submit the first draft"
        },
        worker: {
          payout: 15,
          date: addWeeks(new Date(), 1),
          detail: "Submit the first draft"
        },
        buyer: {
          payout: 15,
          date: addWeeks(new Date(), 1),
          detail: "Submit the first draft"
        },
        awaitingApproval: false,
        proposerId: ""
      },
      {
        id: 3,
        idx: 2,
        current: {
          payout: 85,
          date: addWeeks(new Date(), 2),
          detail: "Submit the final draft"
        },
        worker: {
          payout: 85,
          date: addWeeks(new Date(), 2),
          detail: "Submit the final draft"
        },
        buyer: {
          payout: 85,
          date: addWeeks(new Date(), 2),
          detail: "Submit the final draft"
        },
        awaitingApproval: false,
        proposerId: ""
      }
    ]
  }

  const genEmptyDeadline = (date) => {
    return {
      current: {
        payout: 0,
        date: date,
        detail: ""
      },
      worker: {
        payout: 0,
        date: date,
        detail: ""
      },
      buyer: {
        payout: 0,
        date: date,
        detail: ""
      },
      awaitingApproval: false,
      proposerId: ""
    }
  }

  const addWeeks = (date, weeks) => {
    date.setDate(date.getDate() + weeks * 7)
    return date
  }

  const [localDeadlines, setLocalDeadlines] = useState(genTestSet())
  const [role, setRole] = useState(WORKER_TYPE)
  
  const editDeadline = (new_deadline) => {
    const newDeadlines = localDeadlines
    for (let i = 0; i < newDeadlines.length; i++) {
      if (newDeadlines[i].id === new_deadline.id) {
        newDeadlines[i] = new_deadline
      }
    }
    console.log("Updating deadlines")
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

  const addDeadline = () => {
    console.log("ADDING DEADLINE")
    const lastDeadline = localDeadlines[localDeadlines.length-1]
    const newDate = addWeeks(lastDeadline.current.date,1)
    const new_deadline = genEmptyDeadline(newDate)
    
    new_deadline.id = lastDeadline.id+1
    new_deadline.idx = lastDeadline.idx+1
    const newDeadlines = localDeadlines
    new_deadline.id = localDeadlines.length + 1
    newDeadlines.push(new_deadline)
    setLocalDeadlines(sortDeadlines(newDeadlines))
    toggleReloadFlag(!reloadFlag)
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
      deadlines[i].relDate = deadlines[i].current.date
      if (role === WORKER_TYPE) {
        deadlines[i].relDate = deadlines[i].worker.date
      } else if (role === BUYER_TYPE) {
        deadlines[i].relDate = deadlines[i].buyer.date
      }
    }
    return deadlines
  }


  // list.sort((a, b) => (a.color > b.color) ? 1 : -1)

  useEffect(() => {
    if (props.selectedId !== "") {
      const contract = props.cachedContracts[props.selectedId]
      setRole(contract.role)
      // setDeadline(contract.deadline)
    }
  }, [props.selectedId])

  const [openModal, setOpenModal] = useState(false)

  const handleOpenCalendar = (e) => {
    if (props.disabled == false || props.disabled == undefined) {
      // console.log("Opening")
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
          {/* <div className={"flex items-center " + errorVisibility}>
            <ExclamationCircleIcon className="h-4 w-4 text-red" aria-hidden="true" />
            <p className="text-red text-sm">You must enter a valid date</p>
          </div> */}
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
      />
    </>
  )
}


const mapStateToProps = ({ user, contract, chat }) => ({
  selectedId: contract.selectedId,
  cachedContracts: contract.cachedContracts,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeadlineField)