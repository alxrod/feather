import { ChatAltIcon } from '@heroicons/react/solid'
import { CheckIcon, XIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline'
import ChatLabel from "./chat_label"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {useEffect, useRef } from 'react'

import {msgMethods} from "../../../../services/chat.service"

import CommentMsg from "./msg/msg_comment"
import PriceMsg from "./msg/msg_price"
import PayoutMsg from "./msg/msg_payout"
import DateMsg from "./msg/msg_date"

const MainTimeline = (props) => {
  const bottomOfChat = useRef(null)
  useEffect( () => {
    bottomOfChat.current?.scrollIntoView({behavior: 'auto', block: 'nearest', inline: 'start'});
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
                {(msg.method === msgMethods.COMMENT) ? (
                  <CommentMsg reloaded={props.reloadMsg && (props.reloadIdx == msgIdx)} msg={msg}/>
                ) : (msg.method === msgMethods.PRICE) ? (
                  <PriceMsg reloaded={props.reloadMsg && (props.reloadIdx == msgIdx)} msg={msg} yourRole={props.yourRole}/>
                ) : (msg.method === msgMethods.PAYOUT) ? (
                  <PayoutMsg reloaded={props.reloadMsg && (props.reloadIdx == msgIdx)} msg={msg} yourRole={props.yourRole}/>
                ) : (msg.method === msgMethods.DATE) ? (
                  <DateMsg reloaded={props.reloadMsg && (props.reloadIdx == msgIdx)} msg={msg} yourRole={props.yourRole}/>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div ref={bottomOfChat} className="h-10"></div>
    </div>
  )
}

const mapStateToProps = ({ chat }) => ({
  messages: chat.messages,
  reloadMsg: chat.reloadMsg,
  reloadIdx: chat.reloadIdx,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(MainTimeline)