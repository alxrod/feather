import {useEffect, useState, useMemo} from 'react'
import {WORKER_TYPE, BUYER_TYPE} from '../../../../services/user.service'
import {Tooltip, Button} from "flowbite-react"

import { LockOpenIcon, ArrowRightIcon } from '@heroicons/react/outline'
import { LockClosedIcon } from '@heroicons/react/solid'
import DecideButton from '../decide_button'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const DeadlineSummary = (props) => {
  
    const [timeoutId, setTimeoutId] = useState(-1)
    const [payoutValue, setPayout] = useState(0)

    //Associated with editing mode not creation 
    const [payoutLock, setPayoutLock] = useState(false)
    const [payoutTextColor, setPayoutTextColor] = useState("text-gray-500")
    const [payoutEditInProgress, togglePayoutEditInProgress] = useState(false)
    
    const [oldPayout, setOldPayout] = useState(0)
    // End editing mode variables

    
    
    const isNumeric = (num) => {
      return !isNaN(num)
    }
    const [payoutError, setPayoutError] = useState("")
    const changePayout = (e) => {
      let newVal = parseInt(e.target.value)
      if (e.target.value === "") {
        newVal = 0
      } else if (!isNumeric(e.target.value) || newVal < 0 || newVal > 100) {
        setPayoutError("Payout must be between 0-100%")
        return
      } else {
        setPayoutError("")
      }
      let newDeadline = props.deadline
      if (props.createMode === true) {
        newDeadline.worker.payout = newVal
        newDeadline.current.payout = newVal
        newDeadline.buyer.payout = newVal
      } else if (props.role === WORKER_TYPE) {
        newDeadline.worker.payout = newVal
      } else if (props.role === BUYER_TYPE) {
        newDeadline.buyer.payout = newVal
      } else {
        newDeadline.current.payout = newVal
      }
      if (props.createMode !== true && payoutEditInProgress === false) {
        setOldPayout(payoutValue)
      }
      setPayout(newVal)

      if (props.createMode === true) {
        props.editDeadline(newDeadline)
        if (timeoutId !== -1) {
          clearTimeout(timeoutId);
        }
        const id = setTimeout(function(){
          props.saveDeadlines()
          setTimeoutId(-1)
        },1000)
        setTimeoutId(id)
      } else {
        if (newVal === oldPayout) {
          rejectPayout()
        } else {
          togglePayoutEditInProgress(true)
        }
      }
      
    }

    // Edit Mode Only
    useEffect( () => {
      if (payoutEditInProgress) {
        setPayoutTextColor("text-green")
      } else {
        
      }
    }, [payoutEditInProgress])

    const submitPayout = () => {
      if (props.createMode !== true) {
        setPayoutLock(true)
        togglePayoutEditInProgress(false)
        if (props.submitPayout) {
          props.submitPayout(props.deadline.id, payoutValue)
        }
      }
    }

    const rejectPayout = () => {
      setPayout(oldPayout)
      togglePayoutEditInProgress(false)
      setPayoutTextColor("text-gray-500")
    }

    // End edit mode only

    useEffect(() => {
      
      if (props.deadline) {

        if (props.deadline.payoutAwaitingApproval !== true) {
          if (props.role === WORKER_TYPE) {
            setPayout(props.deadline.worker.payout)
          } else if (props.role === BUYER_TYPE) {
            setPayout(props.deadline.buyer.payout)
          } else {
            setPayout(props.deadline.current.payout)
          }
          setPayoutLock(false)
          setPayoutTextColor("text-gray-500")
          togglePayoutEditInProgress(false)
          
        } else {
          setPayoutLock(true)
          setPayoutTextColor("text-green")
          setOldPayout(props.deadline.current.payout)
          if (props.deadline.payoutProposerId == props.user.user_id) {
            if (props.role === BUYER_TYPE) {
              setPayout(props.deadline.buyer.payout)
            } else if (props.role === WORKER_TYPE) {
              setPayout(props.deadline.worker.payout)
            }
          } else {
            if (props.role === BUYER_TYPE) {
              setPayout(props.deadline.worker.payout)
            } else if (props.role === WORKER_TYPE) {
              setPayout(props.deadline.buyer.payout)
            }
          }
        }
      }
    }, [props.deadline, props.reloadDeadlines])

    const curPayout = useMemo(() => {
      if (props.role === WORKER_TYPE) {
        return props.deadline.worker.payout
      } else if (props.role === BUYER_TYPE) {
        return props.deadline.buyer.payout
      } else {
        return props.deadline.current.payout
      }
    })
    const [prevPayout, setPrevPayout] = useState(0)

    useEffect(() => {
      let total = 0.0
      for (let i = 0; i < props.deadline.idx; i++) {
        if (props.role === WORKER_TYPE) {
          total += props.deadlines[i].worker.payout
        } else if (props.role === BUYER_TYPE) {
          total += props.deadlines[i].buyer.payout
        } else {
          total += props.deadlines[i].current.payout
        }
      }
      if (curPayout && (total + curPayout > 100)) {
        setPrevPayout(100 - curPayout)
      }
      setPrevPayout(total)
    }, [props.deadlines, curPayout])
    

    

    return (
      <div className="flex flex-col">
        <div className="flex flex-col mt-0 md:col-span-2">
          <div className="bg-white space-y-6 pb-2 flex flex-col">
            <div>
              <div>
                <div className="flex justify-between max-w-sm">
                  <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                    Payout
                  </label>
                  <p className="text-red text-sm">{payoutError}</p>
                </div>

                <div className="my-1 max-w-sm h-5 flex flex-col justify-end">
                  <div className="flex">
                    {(prevPayout > 5) && (
                      <div className="flex justify-end" style={{width: prevPayout+"%"}}>
                        <Tooltip
                          content={prevPayout+"% of contract has been paid before deadline " + (props.deadline.idx+1)}
                          style="light"
                        >
                          <p className="cursor-pointer text-gray-400 text-xs">{prevPayout}%</p>
                        </Tooltip>
                      </div>
                    )}
                    {(curPayout > 5) && (
                      <div className="flex justify-end" style={{width: curPayout+"%"}}>
                        <Tooltip
                          content={curPayout+"% of contract will be paid for deadline " + (props.deadline.idx+1)}
                          style="light"
                        >
                          <p className="cursor-pointer text-gray-400 text-xs">{curPayout}%</p>
                        </Tooltip>
                      </div>
                    )}
                    
                  </div>
                  <div className="w-full flex bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                    <button 
                      data-tooltip-target="tooltip-prevpayout" 
                      data-tooltip-style="light" 
                      type="button" 
                      className={"bg-indigo-500 h-1.5 rounded-l-full " + (props.deadlines.length === 1 ? "rounded-r-full" : "")} 
                      style={{width: prevPayout+"%"}}
                    >
                    </button>

                    <button 
                      data-tooltip-target="tooltip-curpayout" 
                      data-tooltip-style="light" 
                      type="button" 
                      className={"bg-indigo-400 h-1.5 rounded-r-full " + (props.deadline.idx === 0 ? "rounded-l-full" : "")} 
                      style={{width: curPayout+"%"}}
                    >
                    </button>
                  </div>

                </div>
                
                <div className="flex flex-row items-center max-w-sm">
                  <div className="grow mt-1 relative flex items-center rounded-md shadow-sm">
                    <span className="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none rounded-l-md border border-r-1 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      Percentage
                    </span>
                    {(payoutLock == false) ? (
                      <input
                        type="text"
                        name="payout"
                        id="payout"
                        className={payoutTextColor + " text-right focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-28 pr-12 sm:text-sm border-gray-300 rounded-md"}
                        value={payoutValue}
                        placeholder="0"
                        onChange={changePayout}
                        disabled={props.disabled || payoutLock}
                      />
                    ) : (
                      <>
                        <input
                          type="text"
                          name="price"
                          id="price"
                          className={payoutTextColor + " focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"}
                          value={""}
                          disabled={props.disabled || payoutLock}
                        />
                        <div className="absolute inset-y-0 right-0 pr-12 flex items-center pointer-events-none">
                          <span className="text-gray-400 items-center text-sm flex" id="price-currency">
                            <p>{oldPayout}</p>
                            <ArrowRightIcon className="w-3 h-3"/>
                            <p className="text-green">{payoutValue}</p>
                          </span>
                        </div>
                      </>
                    )}
                      
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-400 sm:text-sm" id="price-currency">
                        {payoutLock && (
                          <LockClosedIcon className="w-4 h-4"/>
                        )}
                        {!payoutLock && (
                          <LockOpenIcon className="w-4 h-4"/>
                        )}
                      </span>
                    </div>
                  </div>
                  {payoutEditInProgress && (
                    <div className="mt-1 ml-2 ">
                      <DecideButton approve={submitPayout} reject={rejectPayout}/>
                    </div>
                    
                  )}  
                  
                </div>
              </div>
            </div>
  
          </div>
                
        </div>
      </div>
    )
}

const mapStateToProps = ({ user, contract }) => ({
  user: user.user,
  reloadDeadlines: contract.reloadDeadlinesFlag
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeadlineSummary)
