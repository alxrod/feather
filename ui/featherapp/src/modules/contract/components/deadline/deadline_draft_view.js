import React, {useState, useEffect, Fragment} from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {WORKER_TYPE, BUYER_TYPE} from "../../../../services/user.service"
import DeadlineHistory from "./deadline_history"

const DeadlineDraftView = (props) => {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [curItems, setCurItems] = useState([])

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
    console.log("AN INITIAL CALL?")
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


  return (
    <div className="bg-white overflow-hidden shadow rounded-lg w-full mt-5 flex flex-row">
      <div className="bg-gray-50 px-4 py-5 sm:p-6 flex flex-col">
        <div className="pb-5">
          <h3 className="text-lg leading-6 font-medium text-indigo-400">Deadlines</h3>
        </div>
        <DeadlineHistory deadlines={props.deadlines} selectedIdx={selectedIdx} changeSelection={changeSelection} openModal={props.openModal}/>
      </div>
      <div className="px-4 py-5 sm:p-6 grow">
        <form className="space-y-8 divide-y divide-gray-200">
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div>
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Next Deadline</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  <b className="text-indigo-500">{props.deadlines[selectedIdx]?.currentPayout}%</b> will be payed out on{" "}
                  <b className="text-indigo-500">{genTimeString(props.deadlines[selectedIdx]?.currentDate)}</b> 
                  {curItems.map((item, idx) => (
                    <Fragment key={idx}>
                      {(idx === (curItems.length-1)) ? (
                        <>{idx === 0 ? " if " : " and "}<b className="text-indigo-500">{item.name}</b>{(curItems.length === 1) ? " is complete " : " are completed"}</>
                      ) : (idx === 0) ? (
                        <>{" if "}<b className="text-indigo-500">{item.name}</b>{", "}</>
                      ) : (
                        <><b className="text-indigo-500">{item.name}</b>{", "}</>
                      )}
                    </Fragment>
                  ))}
                </p>
              </div>
      
              <div className="overflow-y-scroll min-h-[40vh] max-h-[40vh]">   
                {curItems.map((item, idx) => (
                  <Fragment key={idx}>
                    <div
                      href="#"
                      className={"relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 mt-2 text-sm mb-1"}
                    >
                      <span className="absolute flex-shrink-0 flex items-center justify-center">
                      <span
                          className='bg-indigo-500 h-1.5 w-1.5 rounded-full'
                          aria-hidden="true"
                      />
                      </span>
                      <span className="ml-3.5 font-medium text-gray-900">{item.name}</span>
                    </div>
                    <p className="text-sm ml-2">{item.currentBody}</p>
                  </Fragment>
                ))}
              </div>
              
            </div>

          </div>
        </form>
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
