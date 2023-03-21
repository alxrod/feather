import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { useState, useEffect } from "react"
import { MailIcon } from "@heroicons/react/outline";
import DeadlineDisplay from "../../contract_components/deadline/header/deadline_display"
import {contractStages} from "../../../services/contract.service.js"
import { displayPrice} from "../../helpers"
import DeadlineDisplayProvider from "./deadline_display_provider"
import Image from "next/image"

const ContractNub = (props) => {
  const [stageBg, setStageBg] = useState("green")
  const [link, setLink] = useState("/contracts")
  const [newMsgCount, setNewMsgCount] = useState(0)
  const [profPics, setProfPics] = useState([])

  useEffect(() => {
    if (props.user) {
      const newPics = []
      if (props.user.profilePhotoUploaded !== false) {
        newPics.push(props.user.profilePhoto?.cacheUrl)
      }
      for (let i = 0; i < props.cachedProfileUrls.length; i++) {
        if (props.cachedProfileUrls[i][0] === props.contract.workerId && props.cachedProfileUrls[i][1] !== "") {
          newPics.push(props.cachedProfileUrls[i][1])
        }
        if (props.cachedProfileUrls[i][0] === props.contract.buyerId && props.cachedProfileUrls[i][1] !== "") {
          newPics.push(props.cachedProfileUrls[i][1])
        }
      }
      
      setProfPics(newPics)
    }
  }, [props.cachedProfileUrls, props.user])
  useEffect(() =>  {
    if (props.contract && props.newMessages.length > 0) {
      let msgCount = 0
      for (let i = 0; i < props.newMessages.length; i++) {
        if (props.newMessages[i].contractInfo.id === props.contract.id) {
          msgCount++
        }
      }
      setNewMsgCount(msgCount)
    }
  }, [props.newMessages, props.contract])
  useEffect(() => {
    if (props.contract) {
      if (props.contract.stage < contractStages.SETTLE) {
        setStageBg("yellow")
      }
      setLink(genLink(props.contract))

    }
  }, [props.contract])


  const genLink = (contract) => {
    if (contract.stage === contractStages.CREATE) {
      return "/create/"+contract.id
    } else if (contract.stage == contractStages.INVITE) {
      return "/negotiate/"+contract.id
    } else if (contract.stage == contractStages.NEGOTIATE) {
      return "/negotiate/"+contract.id
    } else if (contract.stage == contractStages.SIGNED) {
      return "/view/"+contract.id
    } else if (contract.stage == contractStages.ACTIVE) {
      return "/view/"+contract.id
    } else if (contract.stage == contractStages.SETTLE) {
      return "/settle/"+contract.id
    } else if (contract.stage == contractStages.COMPLETE) {
      return "/view/"+contract.id
    }
  }
  return (
    <a href={link}>
      <div className="overflow-hidden rounded-lg bg-white shadow border-2 border-white hover:border-primary5">
        <div className="px-4 py-5 sm:p-6">
        <div className="pb-5">
          <div className="flex flex-wrap justify-between">

            <h1 href={link} className="text-lg font-medium leading-6 text-gray-900">{props.contract.title}</h1>
            
            <div className="flex gap-x-2">
              <h3 href={link} className="text-lg font-normal leading-6 text-gray-400">${displayPrice(props.contract.price)}</h3>

              <span className={"inline-flex items-center rounded-full bg-"+stageBg+"-100 px-3 py-0.5 text-sm font-medium text-"+stageBg+"-800"}>
                {props.contract.stage === contractStages.CREATE ? (
                  "Created"
                ) : props.contract.stage === contractStages.INVITE ? (
                  "Invited"
                ) : props.contract.stage === contractStages.NEGOTIATE ? (
                  "Negotiating"
                ) : props.contract.stage === contractStages.ACTIVE ? (
                  "Drafting"
                ) : props.contract.stage === contractStages.SETTLE ? (
                  "Settling"
                ) : props.contract.stage === contractStages.COMPLETE ? (
                  "Complete"
                ) : (
                  "Invalid"
                )}
              </span>
              
              {newMsgCount > 0 && (
                <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-0.5 text-sm font-medium text-red-800">
                  {newMsgCount}
                  <MailIcon className="w-4 h-4 mx-1"/>
                </span>
              )}
        
              <div className="flex -space-x-1 overflow-hidden">
                {profPics.map((pic, i) => {
                  return (
                    <Image
                      className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                      src={pic}
                      alt=""
                      key={i}
                    />
                  )
                })}
              </div>

            </div>

          </div>
          <div className="mt-3">
            <DeadlineDisplayProvider 
              deadlines={props.contract.deadlinesList}
            >
              <DeadlineDisplay
                preview={true}
                iconSize={"0.875rem"}
                selected={0}
                // setSelected={setSelected}
                showDates={true}
              />
            </DeadlineDisplayProvider>
          </div>
          <p className="mt-2 max-w-4xl text-sm text-gray-500">
            {props.contract.summary}
          </p>
        </div>
        </div>
      </div>
    </a>
    // <div className="border-b border-gray-200 pb-5">
    //   <h3 className="text-lg font-medium leading-6 text-gray-900">Job Postings</h3>
    //   <p className="mt-2 max-w-4xl text-sm text-gray-500">
    //     Workcation is a property rental website. Etiam ullamcorper massa viverra consequat, consectetur id nulla tempus.
    //     Fringilla egestas justo massa purus sagittis malesuada.
    //   </p>
    // </div>

  )
}
// newMessages

const mapStateToProps = ({ chat, file, user}) => ({
  newMessages: chat.newMessages,
  cachedProfileUrls: file.cachedProfileUrls,
  user: user.user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(ContractNub)