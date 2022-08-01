import {useEffect, useState, useMemo} from 'react'
import {WORKER_TYPE, BUYER_TYPE} from '../../../../services/user.service'
import {Tooltip, Button} from "flowbite-react"

const DeadlineSummary = (props) => {
  
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
      setPayout(newVal)
      props.editDeadline(newDeadline)
    }

    useEffect(() => {
      if (props.role === WORKER_TYPE) {
        setPayout(props.deadline.worker.payout)
      } else if (props.role === BUYER_TYPE) {
        setPayout(props.deadline.buyer.payout)
      } else {
        setPayout(props.deadline.current.payout)
      }
    }, [props.deadline])

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
        console.log(props.deadlines[i])
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
    

    const [payoutValue, setPayout] = useState(0)

    return (
      <div className="flex flex-col">
        <div className="flex flex-col mt-0 md:col-span-2">
          <div className="bg-white space-y-6 pb-2 flex flex-col">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-2">
                <div className="flex justify-between">
                  <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                    Payout
                  </label>
                  <p className="text-red text-sm">{payoutError}</p>
                </div>

                <div className="my-1">
                  <div className="flex w-full">
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
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    Percentage
                  </span>
                  <input
                    type="text"
                    name="company-website"
                    id="company-website"
                    className="text-right focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none sm:text-sm border-r-2 border-r-white focus:border-r-2 border-gray-300"
                    placeholder="0"
                    value={payoutValue}
                    onChange={changePayout}
                  />
                  <span className="inline-flex items-center px-2 rounded-r-md border border-l-0 border-gray-300 bg-white text-gray-500 text-sm">
                    %
                  </span>
                </div>
                
              </div>
            </div>
  
          </div>
                
        </div>
      </div>
    )
}

export default DeadlineSummary
