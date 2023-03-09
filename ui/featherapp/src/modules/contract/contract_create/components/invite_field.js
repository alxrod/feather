import { useEffect } from "react"
import { RefreshIcon } from "@heroicons/react/outline"
import { MailIcon, XIcon } from "@heroicons/react/outline"


const InviteField = (props) => {
    const clearEmail = (e) => {
      e.preventDefault();
      props.setInvitedEmail("")
    }

    const changeInvitedEmail = (e) => {
      props.setInvitedEmail(e.target.value)
    }

  
    return (
      <div className="relative flex flex-col">
        <div className="flex flex-col border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-primary4 focus-within:ring-1 focus-within:ring-primary4">
          <div className="flex flex-row">
            <div className="relative flex flex-grow items-stretch focus-within:z-10">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                Invite
                <MailIcon className="h-5 w-5 ml-1 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="email"
                name="email"
                id="email"
                className="block text-lg p-3 w-full border-0 ring-0 pl-20 text-gray-900 focus:ring-0 placeholder:text-gray-400 sm:leading-6"
                placeholder="Your Partner's Email"
                value={props.invitedEmail}
                onChange={changeInvitedEmail}
              />
            </div>
    
            <button onClick={clearEmail} className="px-4">
              <XIcon className="w-5 h-5 text-gray-400"/>
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  export default InviteField