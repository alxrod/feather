import { useState, useEffect } from 'react'
import { CheckIcon } from '@heroicons/react/solid'
import { contractStages } from "../../services/contract.service"



export default function ContractTimeline(props) {
	const initialVal = [ 
    {name: 'Creation', status: 'future', stage: contractStages.CREATE},
    {name: 'Invited', status: 'future', stage: contractStages.INVITE},
    {name: 'Negotiation', status: 'future', stage: contractStages.NEGOTIATE},
    {name: 'Drafting', status: 'future', stage: contractStages.ACTIVE},
    {name: 'Settling', status: 'future', stage: contractStages.SETTLE},
    {name: 'Complete', status: 'future', stage: contractStages.COMPLETE},
  ]

	const [steps, setSteps] = useState(initialVal)

	useEffect( () => {
		const newSteps = []
		initialVal.forEach((step, idx) => {
			if (step.stage < props.stage) {
				newSteps.push({name: step["name"], status: "complete"})
			} else if (step.stage == props.stage) {
				newSteps.push({name: step["name"], status: "current"})
			} else {
				newSteps.push({name: step["name"], status: "future"})
			}
    })
		setSteps(newSteps)
	}, [])
  return (
    <nav aria-label="Progress" className="bg-secondary1">
      <ol role="list" className="grid grid-cols-6">
        {steps.map((step,idx) => (
          <li key={step.name} className="relative flex w-full">
            {step.status === 'complete' || (step.status === "current" && idx == steps.length-1) ? (
              <div className="group flex w-full items-center py-1">
                <span className="flex justify-center items-center w-full text-sm font-medium">
                  <span className="flex flex-shrink-0 items-center justify-center hidden md:flex">
                    <CheckIcon className="h-6 w-6 text-primary5" aria-hidden="true" />
                  </span>
                  <span className="ml-2 text-sm font-medium text-primary5 hidden sm:flex">{step.name}</span>
                </span>
              </div>
            ) : step.status === 'current' ? (
              <div className="group flex w-full items-center py-1">
                <span className="flex items-center justify-center w-full text-sm font-medium" >
                  <span className="ml-2 text-sm font-semibold text-primary5 hidden sm:flex">{step.name}</span>
                </span>
              </div>
            ) : (
              <div className="group flex w-full justify-center items-center py-1">
                <span className="items-center flex justify-center w-full text-sm font-medium">
                  <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900 hidden sm:flex">{step.name}</span>
                </span>
              </div>
            )}
          </li>
        ))}
      </ol>
      <ol role="list" className="grid grid-cols-6">
        {steps.map((step,idx) => (
          <li key={step.name} className="relative flex w-full">
            {step.status === 'complete' || (step.status === "current" && idx == steps.length-1) ? (
              <div className="group flex w-full items-center bg-primary5 py-0 h-1">
                {/* <span className="flex justify-center items-center w-full text-sm font-medium">
                  <span className="flex flex-shrink-0 items-center justify-center hidden md:flex">
                    <CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </span>
                  <span className="ml-2 text-sm font-medium text-white hidden sm:flex">{step.name}</span>
                </span> */}
              </div>
            ) : step.status === 'current' ? (
              <div className="group flex w-full items-center bg-primary5 py-0 h-1">
                {/* <span className="flex items-center justify-center w-full text-sm font-medium" >
                  <span className="ml-2 text-sm font-medium text-white hidden sm:flex">{step.name}</span>
                </span> */}
              </div>
            ) : (
              <div className="group flex w-full justify-center items-center py-0 h-1">
                {/* <span className="items-center flex justify-center w-full text-sm font-medium">
                  <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900 hidden sm:flex">{step.name}</span>
                </span> */}
              </div>
            )}

            {step.stage != contractStages.COMPLETE ? (
              <>
                {step.status === 'complete' || (step.status === "current" && idx == steps.length-1) ? (
                <div className="absolute top-0 right-0 h-full w-5 block bg-primary5" aria-hidden="true">
                  <svg
                    className="h-full w-full text-[#1C6D3A]"
                    viewBox="0 0 22 80"
										// is equivalent to primary5
                    fill="#1C6D3A"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 -2L20 40L0 82"
                      vectorEffect="non-scaling-stroke"
                      stroke="currentcolor"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
								) : step.status === 'current' ? (
									<div className="absolute top-0 right-0 h-full w-5 block bg-secondary1" aria-hidden="true">
										<svg
											className="h-full w-full text-[#1C6D3A]"
											viewBox="0 0 22 80"
											// is equivalent to primary4
											fill="#1C6D3A"
											preserveAspectRatio="none"
										>
											<path
												d="M0 -2L10 40L0 82"
												vectorEffect="non-scaling-stroke"
												stroke="currentcolor"
												strokeLinejoin="round"
											/>
										</svg>
									</div>
								) : (
									<div className="absolute top-0 right-0 h-full w-5 block bg-secondary1" aria-hidden="true">
                  </div>
								)}
              </>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}