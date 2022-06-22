import { ChatAltIcon } from '@heroicons/react/solid'
import { CheckIcon, XIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline'
import TextTag from "../tag_in_text"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {useEffect, useRef } from 'react'

const MainTimeline = (props) => {
  const bottomOfChat = useRef(null)
  useEffect( () => {
    // console.log("Current Messages")
    // console.log(props.messages)
    bottomOfChat.current?.scrollIntoView({behavior: 'auto'});
  }, [props.messages])


  return (
    <div className="flow-root overflow-y-scroll grow h-[45vh]">
      <ul role="list" className="-mb-8">
        {props.messages.map((msg, msgIdx) => (
          <li key={msgIdx}>
            <div className="relative pb-8">
              {msgIdx !== props.messages.length - 1 ? (
                <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex items-start space-x-3">
              {/* msg.type === 'comment' */}
                {true ? (
                  <>
                    <div className="relative">
                      <img
                        className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
                        src={"https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"}
                        alt=""
                      />

                      <span className="absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px">
                        <ChatAltIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm">
                          <a href={"#"} className="font-medium text-gray-900">
                            {msg.user.username}
                          </a>
                        </div>
                        <div className="flex">
                          <p className="mt-0.5 text-sm text-gray-500 mr-1">Commented {"date"} on</p><TextTag tagName="Price"/>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-700">
                        <p>{msg.message}</p>
                      </div>
                    </div>
                  </>
                  // suggestion mode
                ) : null}
                {/* : false ? (
                  <>
                    <div>
                      <div className="relative px-1">
                        <div className="h-8 w-8 bg-yellow rounded-full ring-8 ring-white flex items-center justify-center">
                          <QuestionMarkCircleIcon className="h-5 w-5 text-white" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 py-1.5">
                      <div className="text-sm text-gray-500">
                        <a href={"#"} className="font-medium text-gray-900">
                          {msg.user.username}
                        </a>{' '}
                        suggested changing {' '}
                        <TextTag tagName={activityItem.tag}/> {' '}
                        from {' '}
                        <a href={"#"} className="font-medium text-gray-900">
                          {activityItem.old_value}
                        </a>{' '}
                         to {' '}
                        <a href={"#"} className="font-medium text-gray-900">
                          {activityItem.new_value}
                        </a>{' '}
                        <span className="whitespace-nowrap">{activityItem.date}</span>
                      </div>
                    </div>
                  </>
                ) : activityItem.type === 'accept' ? (
                  <>
                    <div>
                      <div className="relative px-1">
                        <div className="h-8 w-8 bg-green rounded-full ring-8 ring-white flex items-center justify-center">
                          <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 py-1.5">
                      <div className="text-sm text-gray-500">
                        <a href={"#"} className="font-medium text-gray-900">
                          {activityItem.person.name}
                        </a>{' '}
                        accepted changing {' '}
                        <TextTag tagName={activityItem.tag}/> {' '}
                        from {' '}
                        <a href={"#"} className="font-medium text-gray-900">
                          {activityItem.old_value}
                        </a>{' '}
                         to {' '}
                        <a href={"#"} className="font-medium text-gray-900">
                          {activityItem.new_value}
                        </a>{' '}
                        <span className="whitespace-nowrap">{activityItem.date}</span>
                      </div>
                    </div>
                  </>
                ) : activityItem.type == "reject" ? (
                  <>
                    <div>
                      <div className="relative px-1">
                        <div className="h-8 w-8 bg-red rounded-full ring-8 ring-white flex items-center justify-center">
                          <XIcon className="h-5 w-5 text-white" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 py-1.5">
                      <div className="text-sm text-gray-500">
                        <a href={"#"} className="font-medium text-gray-900">
                          {activityItem.person.name}
                        </a>{' '}
                        rejected changing {' '}
                        <TextTag tagName={activityItem.tag}/> {' '}
                        from {' '}
                        <a href={"#"} className="font-medium text-gray-900">
                          {activityItem.old_value}
                        </a>{' '}
                         to {' '}
                        <a href={"#"} className="font-medium text-gray-900">
                          {activityItem.new_value}
                        </a>{' '}
                        <span className="whitespace-nowrap">{activityItem.date}</span>
                      </div>
                    </div>
                  </>
                ) : null} */}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div ref={bottomOfChat}></div>
    </div>
  )
}

const mapStateToProps = ({ chat }) => ({
  messages: chat.messages
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(MainTimeline)