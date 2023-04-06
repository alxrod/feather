import MessageBodyFrame from "./message_body_frame";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { useState, useEffect } from "react"
import { CheckCircleIcon } from "@heroicons/react/outline";
const NewMessages = (props) => {

  const [curMessage, setCurMessage] = useState({})
  useEffect(() => {
    if (props.newMessages.length > 0) {
      setCurMessage(props.newMessages[0])
    }
  }, [props.newMessages.length])

  const genTimeString = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString([], {timeStyle: 'short'}) + " " + date.toLocaleDateString() 
  }

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 pt-3 pb-3 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">New Messages</h3>
      </div>
        {props.newMessages.length > 0 ? (
        <div className="flex">
          <div>
            <ul role="list" className="divide-y divide-gray-200 border-r border-gray-200 max-h-[200px] sm:min-w-[100px] overflow-y-scroll hidden-scrollbar h-full">
              {props.newMessages.map((message) => (
                <li key={message.id} className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setCurMessage(message)
                  }}
                >

                  <div className="flex space-x-3 items-center">
                    <div className="relative min-w-0 flex-1 flex items-center">
                      <span className="absolute flex-shrink-0 flex items-center justify-center">
                          <span
                              className='bg-primary4 h-1.5 w-1.5 rounded-full'
                              aria-hidden="true"
                          />
                      </span>
                      <p className="ml-3.5 text-xs font-medium text-gray-900 hidden sm:inline-flex">
                        { 
                          message.contractInfo.title.substring(0, 10)+
                          (message.contractInfo.title.length > 10 ? "..." : "")
                        }
                      </p>
                    </div>
                  </div>

                </li>
              ))}
            </ul>
          </div>
          <div className="px-4 py-5 sm:p-6 grow bg-secondary1 flex">
            <MessageBodyFrame message={curMessage}/>
          </div>
        </div>
        ) : (
          <div className="text-center p-6 flex flex-col items-center">
            <CheckCircleIcon className="text-gray-400 w-8 h-8" strokeWidth="1.5"/>
            <h3 className="mt-2 text-sm font-medium text-primary5">No messages</h3>
            <p className="mt-1 text-sm text-gray-500">You're up to date on all contracts.</p>
          </div>
        )}
      </div>
  )
}
// newMessages

const mapStateToProps = ({ chat }) => ({
  newMessages: chat.newMessages,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(NewMessages)