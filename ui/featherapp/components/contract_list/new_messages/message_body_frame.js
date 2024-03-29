import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

import {msgMethods} from "../../../services/chat.service"

import CommentMsg from "../../contract_components/chat/msg/msg_comment"
import PriceMsg from "../../contract_components/chat/msg/msg_price"
import PayoutMsg from "../../contract_components/chat/msg/msg_payout"
import DateMsg from "../../contract_components/chat/msg/msg_date"
import ItemBodyMsg from "../../contract_components/chat/msg/msg_item_body"
import ItemCreateMsg from "../../contract_components/chat/msg/msg_item_create"
import ItemDeleteMsg from "../../contract_components/chat/msg/msg_item_delete"
import DeadlineCreateMsg from "../../contract_components/chat/msg/msg_deadline_create"
import DeadlineDeleteMsg from "../../contract_components/chat/msg/msg_deadline_delete"
import DeadlineItemsMsg from "../../contract_components/chat/msg/msg_deadline_items"
import ContractSignMsg from "../../contract_components/chat/msg/msg_sign"
import ContractLockMsg from "../../contract_components/chat/msg/msg_lock"
import ContractSettleMsg from "../../contract_components/chat/msg/msg_settle"
import ItemSettleMsg from "../../contract_components/chat/msg/msg_item_settle"
import RequestAdminMsg from "../../contract_components/chat/msg/msg_request_admin"
import ResolveAdminMsg from "../../contract_components/chat/msg/msg_resolve_admin"
import ContractFinalizeMsg from "../../contract_components/chat/msg/msg_finalize"
import DeadlineExpiredMsg from "../../contract_components/chat/msg/msg_deadline_expired"
import DeadlineSettledMsg from "../../contract_components/chat/msg/msg_deadline_settled"
import Avatar from "../../avatar"

import { ArrowRightIcon } from '@heroicons/react/solid'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const MessageBodyFrame = (props) => {

  const genTimeString = (timestamp) => {
    if (timestamp === undefined) {
      return ""
    }
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString([], {timeStyle: 'short'}) + " " + date.toLocaleDateString() 
  }

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow grow">
      <div className="bg-white px-4 py-5 h-full sm:px-6">
        <div className="flex space-x-3 h-full">
          {props.message.user && (
            <div className="flex-shrink-0">
              <Avatar width={8} height={8} user_id={props.message.user?.id} />
            </div>
          )}
          <div className="min-w-0 flex-1 flex flex-col justify-between">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  <a href="#" className="hover:underline">
                    { props.message.user?.username }
                  </a>
                </p>
                <p className="text-xs text-gray-500">
                  <a href="#" className="hover:underline">
                  { genTimeString(props.message.timestamp) }
                  </a>
                </p>
              </div>
              {props.message.label && !(props.message?.label.type == 0) && (
                <div className="flex flex-col">
                  <div className="grow"/>

                  <div className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-xs">
                    <span className="absolute flex-shrink-0 flex items-center justify-center">
                      <span
                          className='bg-primary4 h-1.5 w-1.5 rounded-full'
                          aria-hidden="true"
                      />
                    </span>
                    <span className="ml-3.5 font-medium text-gray-900">{props.message.label.name}</span>
                  </div>

                  <div className="grow"/>
                </div>
              )}
            </div>

            {(props.message?.method === msgMethods.COMMENT) ? (
              <CommentMsg embedded={true} msg={props.message}/>
            ) : (props.message?.method === msgMethods.PRICE) ? (
              <PriceMsg embedded={true} msg={props.message} yourRole={props.yourRole}/>
            ) : (props.message?.method === msgMethods.PAYOUT) ? (
              <PayoutMsg embedded={true} msg={props.message} yourRole={props.yourRole}/>
            ) : (props.message?.method === msgMethods.DATE) ? (
              <DateMsg embedded={true} msg={props.message} yourRole={props.yourRole}/>
            ) : (props.message?.method === msgMethods.ITEM) ? (
              <ItemBodyMsg embedded={true} msg={props.message} yourRole={props.yourRole}/>
            ) : (props.message?.method === msgMethods.ITEM_CREATE) ? (
              <ItemCreateMsg embedded={true} msg={props.message} yourRole={props.yourRole}/> 
            ) : (props.message?.method === msgMethods.ITEM_DELETE) ? (
              <ItemDeleteMsg embedded={true} msg={props.message} yourRole={props.yourRole}/> 
            ) : (props.message?.method === msgMethods.DEADLINE_CREATE) ? (
              <DeadlineCreateMsg embedded={true} msg={props.message} yourRole={props.yourRole}/>
            ) : (props.message?.method === msgMethods.DEADLINE_DELETE) ? (
              <DeadlineDeleteMsg embedded={true} msg={props.message} yourRole={props.yourRole}/>
            ) : (props.message?.method === msgMethods.DEADLINE_ITEMS) ? (
              <DeadlineItemsMsg embedded={true} msg={props.message} yourRole={props.yourRole}/>
            ) : (props.message?.method === msgMethods.CONTRACT_SIGN) ? (
              <ContractSignMsg embedded={true} msg={props.message} yourRole={props.yourRole}/>
            ) : (props.message?.method === msgMethods.CONTRACT_LOCK) ? (
              <ContractLockMsg embedded={true} msg={props.message} yourRole={props.yourRole}/>
            ) : (props.message?.method === msgMethods.CONTRACT_SETTLE) ? (
              <ContractSettleMsg embedded={true} msg={props.message} yourRole={props.yourRole}/>
            ) : (props.message?.method === msgMethods.CONTRACT_ITEM_SETTLE) ? (
              <ItemSettleMsg embedded={true} msg={props.message} yourRole={props.yourRole}/>
            ) : (props.message?.method === msgMethods.REQUEST_ADMIN) ? (
              <RequestAdminMsg embedded={true} msg={props.message} yourRole={props.yourRole}/>
            ) : (props.message?.method === msgMethods.RESOLVE_ADMIN) ? (
              <ResolveAdminMsg embedded={true} msg={props.message} yourRole={props.yourRole}/>
            ) : (props.message?.method === msgMethods.FINALIZE_SETTLE) ? (
              <ContractFinalizeMsg embedded={true} msg={props.message} yourRole={props.yourRole}/>
            ) : (props.message?.method === msgMethods.DEADLINE_EXPIRED) ? (
              <DeadlineExpiredMsg embedded={true} msg={props.message} yourRole={props.yourRole}/>
            ) : (props.message?.method === msgMethods.DEADLINE_SETTLED) ? (
              <DeadlineSettledMsg embedded={true} msg={props.message} yourRole={props.yourRole}/>
            ) : null}
            <div className="flex justify-end">
              <a href={"/contract/"+props.message.contractInfo?.id} className="text-xs font-medium text-primary5 flex items-center">
                View Contract
                <ArrowRightIcon className="w-3 h-3 text-primary5"/>
              </a>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ chat }) => ({
  newMessages: chat.newMessages,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(MessageBodyFrame)