/* This example requires Tailwind CSS v2.0+ */
import { ArrowRightIcon } from '@heroicons/react/outline'
import {useState, useEffect} from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { claimContract, queryInvite} from "../../../reducers/contract/dispatchers/contract.dispatcher";
import { setRedirect, setRegisterRole } from "../../../reducers/user/dispatchers/user.dispatcher";

import { displayPrice } from "../../../components/helpers"
import {useRouter} from "next/router"

import SetupModal from "../../../components/invite/setup_modal"

export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  }
}

export async function getStaticProps({ params }) {
  return {
    props: {
      contractId: params.contractId,
      contractSecret: params.contractSecret,
    },
  };
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ContractInvite = (props) => {

  const router = useRouter()

  const [contract, setContract] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")

  const [isOwner, setOwner] = useState(false)
  const [incompatWContract, setIncompatWContract] = useState(false)
  const [incompatMsg, setIncompatMsg] = useState(false)

  const [existingUser, setExistingUser] = useState(null)
  const [isWrongUser, setWrongUser] = useState(false)

  const [setupModalOpen, openSetupModal] = useState(false)

  useEffect(() => {
    if (props.isLoggedIn && props.user.email !== contract?.invitedEmail && !contract?.linkShare) {
      setWrongUser(true)
    } else {
      setWrongUser(false)
    }
  }, [props.isLoggedIn, props.user, contract?.invitedEmail])

  const handleClaim = (e) => {
    if (!props.isLoggedIn) {
      openSetupModal(true)
      return
    }
    props.claimContract(props.contractId, props.contractSecret).then(() => {
      console.log("Contract claimed")
    }).catch((error) => {
      console.log("Error is: ", error)
      setErrorMessage(error)
    })
  }

  useEffect( () => {
    if (contract === null) {
      props.queryInvite(props.contractId, props.contractSecret).then((body) => {
        for (let i = 0; i < body.deadlinesList.length; i++) {
          let items = []
          for (let j = 0; j < body.deadlinesList[i].itemsList.length; j++) {
            for (let k = 0; k < body.itemsList.length; k++) {
              if (body.deadlinesList[i].itemsList[j].id ===  body.itemsList[k].id) {
                console.log("FOUND it ")
                items.push(body.itemsList[k])
              }
            }
          }
          body.deadlinesList[i].items = items
        }
        setContract(body)
        console.log("BODY: ", body)
        if (props.user !== null && (body.worker.id === props.user.id || body.buyer.id === props.user.id)) {
          setOwner(true)
          setExistingUser(props.user)
        } else if (body.buyer.id !== "") {
          setExistingUser(body.buyer)
        } else if (body.worker.id !== "") {
          setExistingUser(body.worker)
        }
      },
      () => {
        router.push("/unknown")
      })
    }
  }, [props.contractId])

  if (props.contractClaimed) {
    router.push("/negotiate/"+props.contractId)
  }

  const genTimeString = (date) => {
    if (date) {
      return date.toLocaleTimeString([], {timeStyle: 'short'}) + " " + date.toLocaleDateString() 
    } else {
      return ""
    }
    
  }

  return (
    <div>
      {contract && (
      
      <div className="p-4">
        <SetupModal 
          open={setupModalOpen} 
          setOpen={openSetupModal} 
          loginModeDefault={contract.invitedUserInSystem}
          defaultEmail={contract.invitedEmail}
          existingUsername={existingUser ? existingUser?.username : ""}
          needPaymentMethod={contract.buyer.id === ""}
          handleClaim={handleClaim}
        />
        <div className="pt-4 pb-16 px-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center lg:justify-center">
              <div className="overflow-hidden rounded-lg bg-white shadow w-full">
                <div className="bg-white p-6">
                  <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="sm:flex sm:space-x-5">
                      <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                        <p className="text-sm font-medium text-gray-600">Contract Title:</p>
                        <p className="text-xl font-bold text-gray-900 sm:text-2xl">{contract.title}</p>
                        {(contract.worker.id === "") ?
                          <p className="text-lg font-medium text-primary5">{existingUser?.username+" "}is looking for a contractor</p>
                        : (
                          <p className="text-lg font-medium text-primary5">{existingUser?.username+" "}is looking for a sponsor</p>
                        )}
                      </div>
                    </div>
                    <div className="mt-5 flex justify-center sm:mt-0">
                      <h1 className="text-primary5 text-2xl font-semibold">
                        ${displayPrice(contract.price.current)} Pay
                      </h1>
                    </div>
                  </div>
                </div>
                {!isWrongUser && (
                  <div className="w-full border-t border-gray-200 bg-gray-100 text-gray-600">
                    
                    <button
                      type="button"
                      className="w-full flex justify-center items-center hover:bg-primary5 hover:text-white text-2xl font-semibold py-3"
                      onClick={handleClaim}
                    >
                      Join Contract
                      <ArrowRightIcon className="ml-0.5 h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                )}
                {props.isLoggedIn && isWrongUser && (
                  <div className="w-full border-t border-gray-200 bg-gray-100 text-gray-600">
                    
                  <button
                    type="button"
                    className="w-full flex justify-center items-center font-medium py-3"
                  >
                    You are not logged in as the invited email
                  </button>
                </div>
                )}
              </div>

              <div className="flow-root w-full px-16 py-10">
                <ul role="list" className="-mb-8">
                  {contract.deadlinesList.map((deadline, deadlineIdx) => (
                    <li key={deadline.id} className="group">
                      <div className="relative">
                        {deadlineIdx !== contract.deadlinesList.length - 1 ? (
                          <span className="absolute top-2 left-3 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span
                              className={classNames(
    
                                'h-6 w-6 mt-1 rounded-full flex items-center justify-center ring-8 bg-primary6 ring-transparent group-hover:ring-primary4'
                              )}
                            >
                            </span>
                          </div>
                          <div className="flex min-w-0 flex-1 justify-between space-x-4">
                            <div>
                              <p className="text-2xl text-gray-800 font-semibold">
                                {deadline.name}{' '}
                              </p>
                            </div>
                            <div className="whitespace-nowrap text-right text-base text-gray-500">
                              <strong className={"text-primary5 text-xl font-medium"}>${displayPrice(deadline.currentPayout)}</strong> on {" "}
                              <time dateTime={deadline.currentDate}>{genTimeString(deadline.currentDate)}</time>
                            </div>
                          </div>
                          
                        </div>
                        <div className="ml-8 mt-4">
                          <div className="grid grid-cols-1 gap-4">
                            {deadline.items.map((item) => (
                            <div
                              key={item.id}
                              className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-5 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                            >
                              <div className="min-w-0 flex-1">
                                <div>
                                  <span className="absolute inset-0" aria-hidden="true" />
                                  <div className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm">
                                      <span className="absolute flex-shrink-0 flex items-center justify-center">
                                          <span
                                              className='bg-primary4 h-1.5 w-1.5 rounded-full'
                                              aria-hidden="true"
                                          />
                                      </span>
                                      <span className="ml-3.5 font-medium text-gray-900">{item.name}</span>
                                  </div>
                                  <p className="truncate text-sm text-gray-500 mt-1 ml-1">{item.currentBody}</p>
                                </div>
                              </div>
                            </div>
                            ))}
                          </div>
                        </div>
                        <div className="h-10"></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

const mapStateToProps = ({ contract, user }) => ({
  user: user.user,
  isLoggedIn: user.isLoggedIn,
  contractClaimed: contract.contractClaimed,
  contractNubs: contract.contractNubs,
  
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setRedirect,
  claimContract,
  queryInvite,
  setRegisterRole,
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(ContractInvite)