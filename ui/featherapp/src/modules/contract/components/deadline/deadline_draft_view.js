import React, {useState, useEffect, Fragment} from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {WORKER_TYPE, BUYER_TYPE} from "../../../../services/user.service"
import DeadlineHistory from "./deadline_history"

const DeadlineDraftView = (props) => {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [curItems, setCurItems] = useState([])
  const [deadlineName, setDeadlineName] = useState("Deadline")

  const changeSelection = (idx) => {
    setSelectedIdx(idx)
  }
  const genTimeString = (date) => {
    if (date) {
      return date.toLocaleTimeString([], {timeStyle: 'short'}) + " " + date.toLocaleDateString() 
    } else {
      return ""
    }
    
  }
  useEffect( () => {
    const newCurItems = []
    for (let i = 0; i < props.contractItems.length; i++) {
      for (let j = 0; j < props.deadlines[selectedIdx]?.itemsList.length; j++) {
        if (props.contractItems[i].id === props.deadlines[selectedIdx]?.itemsList[j].id) {
          newCurItems.push(props.contractItems[i])
        }
      }
    }
    setCurItems(newCurItems)
  }, [selectedIdx, props.contractItems, props.deadlines[selectedIdx]])

  useEffect( () => {
    setDeadlineName(props.deadlines[selectedIdx]?.name)
  }, [selectedIdx, props.deadlines[selectedIdx]])

  useEffect( () => {
    for (let i = 0; i < props.deadlines.length; i++) {
      if (props.curContract?.currentDeadlineId === props.deadlines[i]?.id) {
        setSelectedIdx(i)
      }
    }
  }, [props.curContract?.currentDeadlineId, props.deadlines])

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg w-full flex flex-row h-full">
      <div className="bg-gray-50 px-4 py-5 sm:p-6 flex flex-col">
        <div className="pb-5 hidden md:flex">
          <h3 className="text-lg leading-6 font-medium text-primary3">Deadlines</h3>
        </div>
        <DeadlineHistory deadlines={props.deadlines} selectedIdx={selectedIdx} changeSelection={changeSelection} openModal={props.openModal}/>
      </div>
      <div className="px-4 py-5 sm:p-6 grow">
        <div className="flex flex-col h-full">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {deadlineName}
              {props.deadlines[selectedIdx]?.complete ? (
                <i className="ml-2 font-medium text-primary3">(complete)</i>
              ) : (props.deadlines[selectedIdx]?.id === props.curContract.currentDeadlineId) ? (
                <i className="ml-2 font-medium text-primary3">(current)</i>
              ): null}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              <b className="text-primary4">${props.deadlines[selectedIdx]?.currentPayout}</b> will be payed out on{" "}
              <b className="text-primary4">{genTimeString(props.deadlines[selectedIdx]?.currentDate)}</b> 
              {curItems.map((item, idx) => (
                <Fragment key={idx}>
                  {(idx === (curItems.length-1)) ? (
                    <>{idx === 0 ? " if " : " and "}<b className="text-primary4">{item.name}</b>{(curItems.length === 1) ? " is complete " : " are completed"}</>
                  ) : (idx === 0) ? (
                    <>{" if "}<b className="text-primary4">{item.name}</b>{", "}</>
                  ) : (
                    <><b className="text-primary4">{item.name}</b>{", "}</>
                  )}
                </Fragment>
              ))}
            </p>
          </div>
  
          <div className="overflow-y-scroll" style={{height: props.height}}>   
            {curItems.map((item, idx) => (
              <Fragment key={idx}>
                <div
                  href="#"
                  className={"relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 mt-2 text-sm mb-1"}
                >
                  <span className="absolute flex-shrink-0 flex items-center justify-center">
                  <span
                      className='bg-primary4 h-1.5 w-1.5 rounded-full'
                      aria-hidden="true"
                  />
                  </span>
                  <span className="ml-3.5 font-medium text-gray-900">{item.name}</span>
                </div>
                <p className="text-sm ml-2">{item.currentBody}</p>
              </Fragment>
            ))}
            {curItems.length === 0 && (
              <div className="flex flex-col w-full h-full justify-center items-center">
                <h3 className="font-medium text-gray-400">There are no items for this deadline</h3>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ user, contract, deadlines, items}) => ({
  user: user.user,
  curContract: contract.curContract,
  deadlinesChanged: deadlines.deadlinesChanged,
  contractItems: items.items
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeadlineDraftView)
