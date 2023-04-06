import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { useState, useEffect } from "react"
import { MailIcon } from "@heroicons/react/outline";
import DeadlineDisplay from "../../contract_components/deadline/header/deadline_display"

import DeadlineDisplayProvider from "../contract_nub/deadline_display_provider"

import Image from "next/image"

const ContractNub = (props) => {
  const [link, setLink] = useState("/documents")
  const [profPics, setProfPics] = useState([])

  useEffect(() => {
    if (props.user) {
      const newPics = []
      for (let j = 0; j < props.document.userIdsList.length; j++) {
        for (let i = 0; i < props.cachedProfileUrls.length; i++) {
          if (props.cachedProfileUrls[i][0] === props.document.userIdsList[j] && props.cachedProfileUrls[i][1] !== "") {
            newPics.push(props.cachedProfileUrls[i][1])
            break
          }
        }
      }
      setProfPics(newPics)
    }
  }, [props.cachedProfileUrls, props.user])

  useEffect(() => {
    if (props.document) {
      setLink("/document/view/"+props.document.id)
    }
  }, [props.document])
  
  return (
    <a href={link}>
      <div className="overflow-hidden rounded-lg bg-white shadow border-2 border-white hover:border-primary5">
        <div className="px-4 py-5 sm:p-6">
        <div className="pb-5">
          <div className="flex flex-wrap justify-between">

            <h1 href={link} className="text-lg font-medium leading-6 text-gray-900">{props.document.title}</h1>
            
            <div className="flex gap-x-2">
              
              {props.newMsgs > 0 && (
                <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-0.5 text-sm font-medium text-red-800">
                  {props.newMsgs}
                  <MailIcon className="w-4 h-4 mx-1"/>
                </span>
              )}
        
              <div className="flex -space-x-1 overflow-hidden">
                {profPics.map((pic, i) => {
                  return (
                    <Image
                      className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                      src={pic}
                      width={24}
                      height={24}
                      key={i}
                      alt="profile_pic"
                    />
                  )
                })}
              </div>

            </div>

          </div>
          <div className="mt-3">
            <DeadlineDisplayProvider 
              deadlines={props.document.deadlinesList}
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
            {props.document.summary}
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
  cachedProfileUrls: file.cachedProfileUrls,
  user: user.user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(ContractNub)