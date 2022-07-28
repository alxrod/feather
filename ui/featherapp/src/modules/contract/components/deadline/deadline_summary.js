import {useEffect, useState, useMemo} from 'react'
import {WORKER_TYPE, BUYER_TYPE} from '../../../../services/user.service'

const DeadlineSummary = (props) => {
    const isNumeric = (num) => {
      return !isNaN(num)
    }

    const changePayout = (e) => {
      let newVal = parseInt(e.target.value)
      if (e.target.value === "") {
        newVal = 0
      } else if (!isNumeric(e.target.value) || newVal < 0 || newVal > 100) {
        props.setErrorMsg("You must set the payout for this deadline between 0-100%")
        return
      } else {
        props.setErrorMsg("")
      }
      let newDeadline = props.deadline
      if (props.role === WORKER_TYPE) {
        newDeadline.worker.payout = newVal
      } else if (props.role === BUYER_TYPE) {
        newDeadline.buyer.payout = newVal
      } else {
        newDeadline.current.payout = newVal
      }
      setPayout(newVal)
      props.editDeadline(newDeadline)
    }

    const changeDetail = (e) => {
      const newVal = e.target.value
      let newDeadline = props.deadline
      if (props.role === WORKER_TYPE) {
        newDeadline.worker.detail = newVal
      } else if (props.role === BUYER_TYPE) {
        newDeadline.buyer.detail = newVal
      } else {
        newDeadline.current.detail = newVal
        
      }
      setDetail(newVal)
      props.editDeadline(newDeadline)
    }
    
    useEffect(() => {
      if (props.role === WORKER_TYPE) {
        setPayout(props.deadline.worker.payout)
        setDetail(props.deadline.worker.detail)
      } else if (props.role === BUYER_TYPE) {
        setPayout(props.deadline.buyer.payout)
        setDetail(props.deadline.buyer.detail)
      } else {
        setPayout(props.deadline.current.payout)
        setDetail(props.deadline.current.detail)
      }
    }, [props.deadline])

    const [payoutValue, setPayout] = useState(0)
    const [detailValue, setDetail] = useState("")

    return (
      <div className="grow flex flex-col">
        <div className="grow flex flex-col mt-0 md:col-span-2">
          <div className="bg-white space-y-6 grow pb-2 flex flex-col">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-2">
                <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                  Payout
                </label>
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
  
            <div className="grow flex flex-col">
              <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                Requirement
              </label>
              <div className="mt-1 grow flex flex-col">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block grow w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="Brief description of what to complete for this draft."
                  value={detailValue}
                  onChange={changeDetail}
                />
              </div>
            </div>
  
          </div>
                
        </div>
      </div>
    )
}

export default DeadlineSummary
