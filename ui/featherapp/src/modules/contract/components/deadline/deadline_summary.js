import {useEffect, useState, useMemo} from 'react'
import {WORKER_TYPE, BUYER_TYPE} from '../../../../services/user.service'
import {Tooltip, Button} from "flowbite-react"

import { LockOpenIcon, ArrowRightIcon } from '@heroicons/react/outline'
import { LockClosedIcon } from '@heroicons/react/solid'
import DecideButton from '../decide_button'
import DraftToggle from "./draft/draft_toggle"

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reactPayout } from '../../../../reducers/deadlines/dispatchers/deadlines.payout.dispatcher'
import { msgMethods, decisionTypes } from "../../../../services/chat.service"

const DeadlineSummary = (props) => {

    const [timeoutId, setTimeoutId] = useState(-1)
    const [payoutValue, setPayout] = useState(0)
    const [payoutDisplayVal, setPayoutDisplay] = useState(0)

    useEffect(() => {
      console.log("NEW VAL: ",payoutDisplayVal)
    }, [payoutDisplayVal])
    
    //Associated with editing mode not creation 
    const [payoutLock, setPayoutLock] = useState(false)
    const [payoutTextColor, setPayoutTextColor] = useState("text-gray-500")
    const [payoutEditInProgress, togglePayoutEditInProgress] = useState(false)
    
    const [oldPayout, setOldPayout] = useState(0)
    // End editing mode variables

    const [payoutError, setPayoutError] = useState("")
    const [payoutErrorLevel, setPayourErrorLevel] = useState(0)

    const [proposedByPartner, setProposedByPartner] = useState(false)
    const [payoutMsgId, setPayoutMsgId] = useState("")

    const [curPayoutPerc, setCurPayoutPerc] = useState(0)
    useEffect(() => {
      setCurPayoutPerc((payoutValue / props.curPrice).toFixed(4) * 100)
    }, [props.deadline, payoutValue, props.curPrice])
    const [prevPayoutPerc, setPrevPayoutPerc] = useState(0)

    useEffect(() => {
      if ((props.newDeadlineMode && !props.newDeadlineLocalMode) || props.deleteDeadlineMode || props.universalLock) {
        setPayoutLock(true)
      }
    }, [props.newDeadlineMode, props.deleteDeadlineMode])

    useEffect(() => {
      let final_date_id = ""
      for (let i = 0; i < props.messages.length; i++) {
        if (props.messages[i].method === msgMethods.PAYOUT) {
          if (props.messages[i].payoutBody.deadlineId === props.deadline.id) {
            final_date_id = props.messages[i].id
          }
        }
      }
      setPayoutMsgId(final_date_id)
    }, [props.messages.length, props.deadline])
    
    const isNumeric = (num) => {
      return !isNaN(num)
    }

    const changePayout = (e) => {
      if (!isNumeric(e.target.value)) {
        setPayoutError("payout is numeric, letters are not allowed")
        setPayourErrorLevel(3)        
        return
      }
      setPayoutDisplay(e.target.value)
      let newVal = parseInt(e.target.value)
    
      if (newVal == NaN) {
        newVal = 0
      } 
      if (e.target.value === "") {
        setPayoutError("you must specify a payout")
        setPayourErrorLevel(3)        
        return
      } else if (newVal < 0 || newVal > props.curPrice) {
        if (props.curPrice === 0) {
          setPayoutError("Set up the total contract price before payouts")
        } else {
          setPayoutError("Payout must be between 0 and " + props.curPrice +" dollars")
        }
        setPayourErrorLevel(3)
        return
      }
      let payout_sum = 0
      for (let i = 0; i < props.deadlines.length; i++) {
        if (props.deadline.id !== props.deadlines[i].id) {
          if (props.role === WORKER_TYPE) {
            payout_sum += props.deadlines[i].workerPayout
          } else if (props.role === BUYER_TYPE) {
            payout_sum += props.deadlines[i].buyerPayout
          } else {
            payout_sum += props.deadlines[i].currentPayout
          }
        } else {
          payout_sum += newVal
        }
      }
      if (payout_sum > props.curPrice) {
        setPayoutError("The sum of all payouts must be " + props.curPrice + " or less")
        setPayourErrorLevel(3)
        return
      } else {
        setPayoutError("")
        setPayourErrorLevel(0)
      }

      // remember when cloning object dates get messed up
      let newDeadline = JSON.parse(JSON.stringify(props.deadline))
      newDeadline.currentDate = new Date(newDeadline.currentDate)
      newDeadline.workerDate = new Date(newDeadline.workerDate)
      newDeadline.buyerDate = new Date(newDeadline.buyerDate)

      if (props.createMode === true || props.newDeadlineMode || props.deleteDeadlineMode) {
        newDeadline.workerPayout = newVal
        newDeadline.currentPayout = newVal
        newDeadline.buyerPayout = newVal
      } else if (props.role === WORKER_TYPE) {
        newDeadline.workerPayout = newVal
      } else if (props.role === BUYER_TYPE) {
        newDeadline.buyerPayout = newVal
      } else {
        newDeadline.currentPayout = newVal
      }
      if ((props.createMode !== true || props.newDeadlineMode || props.deleteDeadlineMode) && payoutEditInProgress === false) {
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
      } else if (props.newDeadlineMode || props.deleteDeadlineMode) {
        props.editDeadline(newDeadline)
      } else {
        if (newVal === oldPayout) {
          rejectPayout()
        } else {
          togglePayoutEditInProgress(true)
        }
      }
      
    }
    useEffect( () => {
      let payout_sum = 0
      for (let i = 0; i < props.deadlines.length; i++) {
        if (props.deadline.id !== props.deadlines[i].id) {
          if (props.role === WORKER_TYPE) {
            payout_sum += props.deadlines[i].workerPayout
          } else if (props.role === BUYER_TYPE) {
            payout_sum += props.deadlines[i].buyerPayout
          } else {
            payout_sum += props.deadlines[i].currentPayout
          }
        } else {
          payout_sum += payoutValue
        }
      }
      if (payout_sum < props.curPrice && !props.universalLock) {
        setPayoutError("you still have $" + (props.curPrice - payout_sum) + " of contract to allocate")
        setPayourErrorLevel(0)
      } else {
        setPayoutError("")
        setPayourErrorLevel(0)
      }
    }, [payoutValue])

    // Edit Mode Only
    useEffect( () => {
      if (payoutEditInProgress) {
        setPayoutTextColor("text-green-400")
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
      setPayoutDisplay(oldPayout)
      togglePayoutEditInProgress(false)
      setPayoutTextColor("text-gray-500")
      setPayoutError("")
    }

    // End edit mode only
    const changeDraftRequired = () => {
      let newDeadline = props.deadline
      newDeadline.draftRequired = !newDeadline.draftRequired
      props.editDeadline(newDeadline)
    }

    useEffect(() => {
      if (props.deadline) {
        let payoutLockShould = false
        if (props.deadline.payoutAwaitingApproval !== true) {
          if (props.role === WORKER_TYPE) {
            setPayout(props.deadline.workerPayout)
            if (payoutErrorLevel !== 3) {
              setPayoutDisplay(props.deadline.workerPayout)
            }
          } else if (props.role === BUYER_TYPE) {
            setPayout(props.deadline.buyerPayout)
            if (payoutErrorLevel !== 3) {
              setPayoutDisplay(props.deadline.buyerPayout)
            }
          } else {
            setPayout(props.deadline.currentPayout)
            if (payoutErrorLevel !== 3) {
              setPayoutDisplay(props.deadline.currentPayout)
            }
          }
          payoutLockShould = false
          setPayoutTextColor("text-gray-500")
          togglePayoutEditInProgress(false)
          
        } else {
          payoutLockShould = true
          setPayoutTextColor("text-green-400")
          setOldPayout(props.deadline.currentPayout)
          if (props.deadline.payoutProposerId == props.user.id) {
            setProposedByPartner(false)
            if (props.role === BUYER_TYPE) {
              setPayout(props.deadline.buyerPayout)
              if (payoutErrorLevel !== 3) {
                setPayoutDisplay(props.deadline.buyerPayout)
              }
            } else if (props.role === WORKER_TYPE) {
              setPayout(props.deadline.workerPayout)
              if (payoutErrorLevel !== 3) {
                setPayoutDisplay(props.deadline.workerPayout)
              }
            }
          } else {
            setProposedByPartner(true)
            if (props.role === BUYER_TYPE) {
              setPayout(props.deadline.workerPayout)
              if (payoutErrorLevel !== 3) {
                setPayoutDisplay(props.deadline.workerPayout)
              }
            } else if (props.role === WORKER_TYPE) {
              setPayout(props.deadline.buyerPayout)
              if (payoutErrorLevel !== 3) {
                setPayoutDisplay(props.deadline.buyerPayout)
              }
            }
          }
        }

        if (!props.newDeadlineLocalMode && !props.universalLock) {
          setPayoutLock(payoutLockShould)
        }
        
      }
    }, [props.deadline, props.reloadDeadlines])


    useEffect(() => {
      let total = 0.0
      for (let i = 0; i < props.deadline.idx; i++) {
        if (props.role === WORKER_TYPE) {
          total += props.deadlines[i].workerPayout
        } else if (props.role === BUYER_TYPE) {
          total += props.deadlines[i].buyerPayout
        } else {
          total += props.deadlines[i].currentPayout
        }
      }
      if (payoutValue && (total + payoutValue > props.curPrice)) {
        setPrevPayoutPerc( ( (props.curPrice - total) / props.curPrice).toFixed(4) * 100)
      }
      setPrevPayoutPerc(( total / props.curPrice).toFixed(4) * 100)
    }, [props.deadlines, curPayoutPerc, props.deadline])
    
    const approveChange = () => {
      props.reactPayout(props.curContract.id, payoutMsgId, props.deadline.id, decisionTypes.YES)
    }
    const denyChange = () => {
      props.reactPayout(props.curContract.id, payoutMsgId, props.deadline.id, decisionTypes.NO)
    }
    
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
                  <p 
                    className={"text-sm " + (payoutErrorLevel === 3 ? "text-red-400" : payoutErrorLevel === 0 ? "text-gray-400" : "")}
                  >
                    {payoutError}
                  </p>
                </div>

                <div className="my-1 max-w-sm h-5 flex flex-col justify-end">
                  <div className="flex">
                    {(prevPayoutPerc > 5) && (
                      <div className="flex justify-end" style={{width: prevPayoutPerc+"%"}}>
                        <Tooltip
                          content={prevPayoutPerc+"% of contract has been paid before deadline " + (props.deadline.idx+1)}
                          style="light"
                        >
                          <p className="cursor-pointer text-gray-400 text-xs">{prevPayoutPerc}%</p>
                        </Tooltip>
                      </div>
                    )}
                    {(curPayoutPerc > 5) && (
                      <div className="flex justify-end" style={{width: curPayoutPerc+"%"}}>
                        <Tooltip
                          content={curPayoutPerc+"% of contract will be paid for deadline " + (props.deadline.idx+1)}
                          style="light"
                        >
                          <p className="cursor-pointer text-gray-400 text-xs">{curPayoutPerc}%</p>
                        </Tooltip>
                      </div>
                    )}
                    
                  </div>
                  <div className="w-full flex bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                    <button 
                      data-tooltip-target="tooltip-prevpayout" 
                      data-tooltip-style="light" 
                      type="button" 
                      className={"bg-primary4 h-1.5 rounded-l-full " + (props.deadlines.length === 1 ? "rounded-r-full" : "")} 
                      style={{width: prevPayoutPerc+"%"}}
                    >
                    </button>

                    <button 
                      data-tooltip-target="tooltip-curpayout" 
                      data-tooltip-style="light" 
                      type="button" 
                      className={"bg-primary3 h-1.5 rounded-r-full " + (props.deadline.idx === 0 ? "rounded-l-full" : "")} 
                      style={{width: curPayoutPerc+"%"}}
                    >
                    </button>
                  </div>

                </div>
                
                <div className="flex flex-row items-center max-w-sm">
                  <div className="grow mt-1 relative flex items-center rounded-md shadow-sm">
                    <span className="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none rounded-l-md border border-r-1 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      Amount ($)
                    </span>
                    {(payoutLock == false) ? (
                      <input
                        type="text"
                        name="payout"
                        id="payout"
                        className={(payoutErrorLevel === 3 ? "text-red-400" : payoutTextColor) + " text-right focus:ring-primary4 focus:border-primary4 block w-full pl-28 pr-12 sm:text-sm border-gray-300 rounded-md"}
                        value={payoutDisplayVal}
                        placeholder=""
                        onChange={changePayout}
                        disabled={props.disabled || payoutLock}
                      />
                    ) : (payoutLock == true && (props.newDeadlineMode || props.deleteDeadlineMode || props.universalLock)) ? (
                      <>
                        <input
                          type="text"
                          name="price"
                          id="price"
                          className={(payoutErrorLevel === 3 ? "text-red-400" : payoutTextColor) + " focus:ring-primary4 focus:border-primary4 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"}
                          value={""}
                          disabled={props.disabled || payoutLock}
                        />
                        <div className="absolute inset-y-0 right-0 pr-12 flex items-center pointer-events-none">
                          <span className="text-gray-400 items-center text-sm flex" id="price-currency">
                            <p className={props.universalLock ? "text-gray-600" : "text-green-400"}>{payoutValue}</p>
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <input
                          type="text"
                          name="price"
                          id="price"
                          className={(payoutErrorLevel === 3 ? "text-red-400" : payoutTextColor) + " focus:ring-primary4 focus:border-primary4 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"}
                          value={""}
                          disabled={props.disabled || payoutLock}
                        />
                        <div className="absolute inset-y-0 right-0 pr-12 flex items-center pointer-events-none">
                          <span className="text-gray-400 items-center text-sm flex" id="price-currency">
                            <p>{oldPayout}</p>
                            <ArrowRightIcon className="w-3 h-3"/>
                            <p className="text-green-400">{payoutValue}</p>
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
                  {payoutEditInProgress && !(payoutErrorLevel === 3) && (
                    <div className="mt-1 ml-2 ">
                      <DecideButton approve={submitPayout} reject={rejectPayout}/>
                    </div>
                    
                  )}  

                  {(payoutLock && proposedByPartner) && (
                    <div className="mt-1 ml-2 ">
                      <DecideButton approve={approveChange} reject={denyChange}/>
                    </div>
                  )}
                  
                </div>

                {/* <DraftToggle required={props.deadline.draftRequired} changeRequired={changeDraftRequired}/> */}
              </div>
            </div>
  
          </div>
                
        </div>
      </div>
    )
}

const mapStateToProps = ({ user, contract, chat, deadlines }) => ({
  user: user.user,
  reloadDeadlines: deadlines.deadlinesChanged,
  curContract: contract.curContract,
  messages: chat.messages,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  reactPayout
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeadlineSummary)
