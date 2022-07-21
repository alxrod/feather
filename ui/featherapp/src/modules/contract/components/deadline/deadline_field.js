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

  
  // Logic


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

  const [localDeadlines, setLocalDeadlines] = useState([genEmptyDeadline(new Date()), genEmptyDeadline(addWeeks(new Date(), 1)), genEmptyDeadline(addWeeks(new Date(), 2))])
  const [role, setRole] = useState(WORKER_TYPE)
  
  const editDeadline = (idx, new_deadline) => {
    const newDeadlines = localDeadlines
    newDeadlines[idx] = localDeadlines
    setLocalDeadlines(newDeadlines)
  }

  const removeDeadline = (idx) => {
    const newDeadlines = []
    for (let i = 0; i < localDeadlines.length; i++) {
      if (i !== idx) {
        newDeadlines.push(localDeadlines[i])
      }
    }
    setLocalDeadlines(newDeadlines)
  }

  const addDeadline = (new_deadline) => {
    const newDeadlines = localDeadlines
    newDeadlines.push(new_deadline)
    setLocalDeadlines(newDeadlines)
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
        deadlines={localDeadlines}
        editDeadline={editDeadline}
        addDeadline={addDeadline}
        removeDeadline={removeDeadline}
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