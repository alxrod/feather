import { useState, useEffect } from 'react'
import { CheckIcon } from '@heroicons/react/solid'
import { contractStages } from "../../../../services/contract.service"



export default function ContractTimeline(props) {
	const initialVal = {}
	initialVal[contractStages.CREATE] = {name: 'Creation', status: 'future' }
	initialVal[contractStages.INVITE] = {name: 'Invited', status: 'future' }
	initialVal[contractStages.NEGOTIATE] = {name: 'Negotiation', status: 'future' }
	initialVal[contractStages.ACTIVE] = {name: 'Drafting', status: 'future' }
	initialVal[contractStages.SETTLING] = {name: 'Settling', status: 'future' }
	initialVal[contractStages.COMPLETE] = {name: 'Complete', status: 'future' }

	const [steps, setSteps] = useState(initialVal)

	useEffect( () => {
		const newSteps = {}
		for (const [stage, detail] of Object.entries(steps)) {
			if (stage < props.stage) {
				newSteps[stage] = {name: detail["name"], status: "complete"}
			} else if (stage == props.stage) {
				newSteps[stage] = {name: detail["name"], status: "current"}
			} else {
				newSteps[stage] = {name: detail["name"], status: "future"}
			}
		}
		console.log("STAGES IS")
		console.log(newSteps)
		setSteps(newSteps)
	}, [])
  return (
    <nav aria-label="Progress" className="bg-white">
      <ol role="list" className="grid grid-cols-6">
        {Object.entries(steps).map((step) => (
          <li key={step[1].name} className="relative flex w-full">
            {step[1].status === 'complete' ? (
              <div className="group flex w-full items-center bg-indigo-600 py-0 h-1 sm:py-4">
                <span className="flex justify-center items-center w-full text-sm font-medium">
                  <span className="flex flex-shrink-0 items-center justify-center hidden md:flex">
                    <CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </span>
                  <span className="ml-2 text-sm font-medium text-white hidden sm:flex">{step[1].name}</span>
                </span>
              </div>
            ) : step[1].status === 'current' ? (
              <div className="group flex w-full items-center bg-indigo-600 py-0 h-1 sm:py-4">
                <span className="flex items-center justify-center w-full text-sm font-medium" >
                  <span className="ml-2 text-sm font-medium text-white hidden sm:flex">{step[1].name}</span>
                </span>
              </div>
            ) : (
              <div className="group flex w-full justify-center items-center py-0 h-1 sm:py-4">
                <span className="items-center flex justify-center w-full text-sm font-medium">
                  <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900 hidden sm:flex">{step[1].name}</span>
                </span>
              </div>
            )}

            {step[0] != contractStages.COMPLETE ? (
              <>
                {step[1].status === 'complete' ? (
                <div className="absolute top-0 right-0 h-full w-5 block bg-indigo-600" aria-hidden="true">
                  <svg
                    className="h-full w-full text-[#5850ec]"
                    viewBox="0 0 22 80"
										// is equivalent to indigo-600
                    fill="#5850ec"
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
								) : step[1].status === 'current' ? (
									<div className="absolute top-0 right-0 h-full w-5 block bg-white" aria-hidden="true">
										<svg
											className="h-full w-full text-[#5850ec]"
											viewBox="0 0 22 80"
											// is equivalent to indigo-500
											fill="#5850ec"
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
									<div className="absolute top-0 right-0 h-full w-5 block bg-white" aria-hidden="true">
                  <svg
                    className="h-full w-full text-white"
                    viewBox="0 0 22 80"
										// is equivalent to indigo-500
                    fill="white"
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
								)}
              </>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}