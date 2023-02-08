import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { useState, useEffect } from "react"
import { CheckCircleIcon } from "@heroicons/react/outline";

import { getInternalCharges } from '../../../reducers/stripe/dispatchers/stripe.setup.dispatcher';

const ActivePayments = (props) => {
  useEffect(() => {
    props.getInternalCharges()
  }, [])

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 pt-3 pb-1">
        <h3 className=" text-lg font-medium leading-6 text-gray-900">Active Payments</h3>
      </div>

      <div>
        <div className="flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-hidden sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle px-6 lg:px-8">
              <div className="overflow-y-scroll max-h-[200px] min-w-[150px]">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="whitespace-nowrap py-1.5 pl-8 pr-3 text-left text-xs font-normal text-gray-400 sm:pl-6"
                      >
                        Contract
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-1.5 text-left text-xs font-normal text-gray-400"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="hidden md:inline-flex whitespace-nowrap px-2 py-1.5 text-left text-xs font-normal text-gray-400"
                      >
                        Partner
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-1.5 text-left text-xs font-normal text-gray-400"
                      >
                        State
                      </th>
            
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {props.internalCharges.map((charge) => (
                      <tr key={charge.id}>
                        <td className="align-top whitespace-nowrap py-2 pl-4 pr-3 font-medium text-xs text-gray-900 sm:pl-6">
                          {charge.contractTitle}
                        </td>
                        
                          {charge.amount == 0 ? (
                            <td className="align-top whitespace-nowrap px-2 py-2 text-xs font-medium text-gray-500">
                              {(charge.amount / 100.0).toFixed(2)}
                            </td>
                          ) : charge.worker.id === props.user?.id ? (
                            <td className="align-top whitespace-nowrap px-2 py-2 text-xs font-medium text-primary5">
                              {"+"+(charge.amount / 100.0).toFixed(2)}
                            </td>
                          ) : (
                            <td className="align-top whitespace-nowrap px-2 py-2 text-xs font-medium text-red2">
                              {"-"+(charge.amount / 100.0).toFixed(2)}
                            </td>
                          )}
                          
                        
                        <td className="align-top hidden md:inline-flex whitespace-nowrap px-2 py-2 text-xs text-gray-500">
                          {charge.worker.id === props.user?.id ? (
                            charge.buyer.username
                          ) : (
                            charge.worker.username
                          )}
                        </td>
                        <td className="whitespace-normal px-2 py-2 text-xs text-gray-500">{charge.state}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
        {/* <div className="text-center p-6 flex flex-col items-center">
          <CheckCircleIcon className="text-gray-400 w-8 h-8" strokeWidth="1.5"/>
          <h3 className="mt-2 text-sm font-medium text-primary5">No active payments</h3>
          <p className="mt-1 text-sm text-gray-500">You're up to date on all payments.</p>
        </div> */}
      </div>
  )
}
// newMessages

const mapStateToProps = ({ stripe, user }) => ({
  internalCharges: stripe.internalCharges,
  user: user.user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getInternalCharges,
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(ActivePayments)