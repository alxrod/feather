import { ChatAltIcon } from '@heroicons/react/solid'
import { CheckIcon, XIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline'
import ChatLabel from "./chat_label"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {useEffect, useRef, useState } from 'react'

import {msgMethods} from "../../../../services/chat.service"

import CommentMsg from "./msg/msg_comment"
import PriceMsg from "./msg/msg_price"
import PayoutMsg from "./msg/msg_payout"
import DateMsg from "./msg/msg_date"
import ItemBodyMsg from "./msg/msg_item_body"
import ItemCreateMsg from "./msg/msg_item_create"
import ItemDeleteMsg from "./msg/msg_item_delete"
import DeadlineCreateMsg from "./msg/msg_deadline_create"
import DeadlineDeleteMsg from "./msg/msg_deadline_delete"
import DeadlineItemsMsg from "./msg/msg_deadline_items"
import ContractSignMsg from "./msg/msg_sign"
import ContractLockMsg from "./msg/msg_lock"
import ContractSettleMsg from "./msg/msg_settle"

function useOnScreen(ref) {

  const [isIntersecting, setIntersecting] = useState(false)

  const observer = new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting)
  )

  useEffect(() => {
    observer.observe(ref.current)
    // Remove the observer as soon as the component is unmounted
    return () => { observer.disconnect() }
  }, [])

  return isIntersecting
}

const MainTimeline = (props) => {
  const chat = useRef(null)
  const bottomOfChat = useRef(null)
  const isVisible = useOnScreen(chat)

  useEffect( () => {
    if (isVisible) {
      bottomOfChat.current?.scrollIntoView({behavior: 'auto', block: 'nearest', inline: 'start' });
    }
  }, [props.messages, isVisible])

  return (
    <div ref={chat} className="flow-root overflow-y-scroll grow h-[45vh]">
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
                ) : (msg.method === msgMethods.ITEM) ? (
                  <ItemBodyMsg reloaded={props.reloadMsg && (props.reloadIdx == msgIdx)} msg={msg} yourRole={props.yourRole}/>
                ) : (msg.method === msgMethods.ITEM_CREATE) ? (
                  <ItemCreateMsg reloaded={props.reloadMsg && (props.reloadIdx == msgIdx)} msg={msg} yourRole={props.yourRole}/> 
                ) : (msg.method === msgMethods.ITEM_DELETE) ? (
                  <ItemDeleteMsg reloaded={props.reloadMsg && (props.reloadIdx == msgIdx)} msg={msg} yourRole={props.yourRole}/> 
                ) : (msg.method === msgMethods.DEADLINE_CREATE) ? (
                  <DeadlineCreateMsg reloaded={props.reloadMsg && (props.reloadIdx == msgIdx)} msg={msg} yourRole={props.yourRole}/>
                ) : (msg.method === msgMethods.DEADLINE_DELETE) ? (
                  <DeadlineDeleteMsg reloaded={props.reloadMsg && (props.reloadIdx == msgIdx)} msg={msg} yourRole={props.yourRole}/>
                ) : (msg.method === msgMethods.DEADLINE_ITEMS) ? (
                  <DeadlineItemsMsg reloaded={props.reloadMsg && (props.reloadIdx == msgIdx)} msg={msg} yourRole={props.yourRole}/>
                ) : (msg.method === msgMethods.CONTRACT_SIGN) ? (
                  <ContractSignMsg reloaded={props.reloadMsg && (props.reloadIdx == msgIdx)} msg={msg} yourRole={props.yourRole}/>
                ) : (msg.method === msgMethods.CONTRACT_LOCK) ? (
                  <ContractLockMsg reloaded={props.reloadMsg && (props.reloadIdx == msgIdx)} msg={msg} yourRole={props.yourRole}/>
                ) : (msg.method === msgMethods.CONTRACT_SETTLE) ? (
                  <ContractSettleMsg reloaded={props.reloadMsg && (props.reloadIdx == msgIdx)} msg={msg} yourRole={props.yourRole}/>
                ) : null}
              </div>
            </div>
          </li>
        ))}
        <div ref={bottomOfChat} className="h-10"></div>
      </ul>
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