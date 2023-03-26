import React, {useState, useEffect} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { UserIcon, RefreshIcon, PaperAirplaneIcon, ExclamationIcon, ClipboardCopyIcon} from '@heroicons/react/outline'
import {Tooltip} from "flowbite-react"
import {changeInviteEmail, resendInviteEmail} from "../../../reducers/contract/dispatchers/contract.dispatcher"

const PartnerProfile = (props) => {
  const [inviteEmail, setInviteEmail] = useState("")
  const [showNewSend, setShowNewSend] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  const [partnerExists, setPartnerExists] = useState(false)
  const [partnerMessage, setPartnerMessage] = useState("")
  const [showCopyMsg, toggleShowCopyMsg] = useState(false)
  useEffect(() => {

    if (props.curContract?.invitedEmail && inviteEmail === "") {
      setInviteEmail(props.curContract?.invitedEmail)
    }
    if (props.curContract?.worker?.id !== "" && props.curContract?.buyer?.id) {
      setPartnerExists(true)
      if (props.curContract?.worker?.id !== props.user.id) {
        setPartnerMessage("Your contractor is " + props.curContract?.worker.username)
      } else if (props.curContract?.buyer?.id !== props.user.id) {
        setPartnerMessage("Your sponsor is " + props.curContract?.buyer.username)
      }
    }
  }, [props.curContract.id])

  const changeInviteEmail = (e) => {
    const newVal = e.target.value
    setInviteEmail(newVal)
    
    if (validateEmail(newVal) && newVal !== props.curContract?.invitedEmail) {
      setShowNewSend(true)
    } else if (newVal === props.curContract?.invitedEmail) {
      setShowNewSend(false)
    }
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const copyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(
        process.env.NEXT_PUBLIC_FRONTEND_URL+
        "/invite/"+
        props.curContract.id+
        "/"+props.curContract.invitePassword
      );
      toggleShowCopyMsg(true)
      setTimeout(() => {
        toggleShowCopyMsg(false)
      }, 3000);
    }
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md mt-5 focus-within:ring-2 focus-within:ring-primary4">
      <div className="divide-y divide-gray-200">
        <div className="block">
          {partnerExists && (
            <div className={"items-center px-4 py-4 sm:px-6 " + (!partnerExists ? "border-t border-gray-100" : "")}>
              <h1 className="text-lg font-semibold text-gray-500">{partnerMessage}</h1>
            </div>
          )}
          
          {!partnerExists && props.curContract?.linkShare && (
            <div className="flex items-center px-4 py-4 sm:px-6">
              <div className="min-w-0 flex-1 flex items-center text-gray-400">
                <h1 className="text-gray-600 mr-2">Share This Contract:</h1>
                <h3 className="mr-1 hover:text-primary5 cursor-pointer" onClick={copyLink}>click here to copy invite link</h3>
                <div className="grow"/>
                {showCopyMsg && (
                  <div className="flex text-sm items-center">
                    copied
                    <ClipboardCopyIcon className="ml-1.5 h-4 w-4 flex-shrink-0"/>
                  </div>
                )}
              </div>
            </div>
          )}
          {(!partnerExists && props.curContract?.invitedEmail !== "") && (
            <div className={"items-center px-4 py-4 sm:px-6 " + (!partnerExists ? "border-t border-gray-100" : "")}>
              <h1 className="mb-1">Already Invited:</h1>

              <div className="min-w-0 flex-1 flex items-center">
                <div className="flex-shrink-0">
                  <UserIcon className="mr-1.5 h-5 lg:h-6 w-5 lg:w-6 flex-shrink-0 text-gray-400"/>
                </div>
                <div className="min-w-0 flex-1 px-4 flex">
                    <p className="text-base inline md:hidden text-gray-400 truncate mr-2">{"Invited "}</p>
                    <input 
                      className="text-base font-medium text-gray-700 truncate mr-2 w-full focus:ring-0 focus:border-0 bg-transparent focus:outline-0"
                      value={inviteEmail}
                      onChange={changeInviteEmail}
                    />
                </div>

                {!partnerExists && (
                  <div className="flex items-center">
                    {showMessage && (
                      <p className="text-base text-gray-400 mr-2 mb-1.5">Sent!</p>
                    )}
                    {(validateEmail(inviteEmail) && (showNewSend)) ? (
                      <Tooltip 
                        style="light" 
                        content={"Send invite to new email"}
                      >
                        <button 
                        className="focus:text-gray-600 hover:text-gray-500 text-gray-400"
                        onClick={() => {
                            props.changeInviteEmail(props.curContract.id, inviteEmail)
                            setShowNewSend(false)
                            setShowMessage(true)
                            setTimeout(() => {
                              setShowMessage(false)
                            }, 1000);
                        }}>
                          <PaperAirplaneIcon className="h-5 w-5 mr-2 cursor-pointer" aria-hidden="true" />
                        </button>
                      </Tooltip>
                    ) : validateEmail(inviteEmail) ?  (
                      <Tooltip 
                        style="light" 
                        content={"Resend email invite"}
                      >
                        <button 
                        className="focus:text-gray-600 hover:text-gray-500 text-gray-400"
                        onClick={() => {
                          props.resendInviteEmail(props.curContract.id)
                          setShowMessage(true)
                          setTimeout(() => {
                            setShowMessage(false)
                          }, 2000);
                        }}>
                          <RefreshIcon className="h-5 w-5 cursor-pointer" aria-hidden="true"/>
                        </button>
                      </Tooltip>
                  ) : (
                      <Tooltip 
                        style="light" 
                        content={"That isn't a valid email address"}
                      >
                        <ExclamationIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                      </Tooltip>
                    )}
                  </div>
                )}
              </div>
              
            </div>
          )}
          </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ contract, user }) => ({
  curContract: contract.curContract,
  user: user.user
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  changeInviteEmail,
  resendInviteEmail,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PartnerProfile)