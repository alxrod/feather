import React, {useState, useEffect} from 'react';
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { queryContractNubs } from "../../reducers/contract/dispatchers/contract.dispatcher";
import { pullNewMessages } from "../../reducers/chat/dispatchers/chat.dispatcher";

import AccountAlert from "./account_alert"
import NewMessages from "./new_messages"
import ActivePayments from "./active_payments"

import ContractList from './contract_list'
import ContractTableHeader from './contracts_header'
import { contractStages } from "../../services/contract.service";
import { displayPrice } from '../helpers';

const ContractsList = (props) => {
    const [alreadyPulled, setAlreadyPulled] = useState(false)
    const defaultFilters = {}

    defaultFilters.active = (contracts) => {
        const active = []
        for (let i = 0; i < contracts.length; i++) {
            if (contracts[i].stage > contractStages.CREATE) {
                active.push(contracts[i])
            }
        }
        return active
    }
    defaultFilters.drafts = (contracts) => {
        const drafts = []
        for (let i = 0; i < contracts.length; i++) {
            if (contracts[i].stage === contractStages.CREATE) {
                drafts.push(contracts[i])
            }
        }
        return drafts
    }

    defaultFilters.disputed = (contracts) => {
        const display = []
        for (let i = 0; i < contracts.length; i++) {
            if (contracts[i].disputed) {
                display.push(contracts[i])
            }
        }
        return display
    }
    const [allFilters, setAllFilters] = useState(defaultFilters)
    const [selectedFilter, setSelectedFilter] = useState("active")
    const [refreshFilters, toggleRefreshFilters] = useState(false)

    useEffect( () => {
        let activesExist = false
        for (let i = 0; i < props.contractNubs.length; i++) {
            if (props.contractNubs[i].stage > contractStages.CREATE) {
                activesExist = true
                break
            } 
        }
        if (!activesExist) {
            setSelectedFilter("drafts")
        } else {
            setSelectedFilter("active")
        }
    }, [props.contractNubs.length])

    useEffect( () => {
        if (props.user && props.user.adminStatus) {
            const defaults = allFilters
            defaults.adminRequested = (contracts) => {
                const display = []
                for (let i = 0; i < contracts.length; i++) {
                    if (contracts[i].adminRequested) {
                        display.push(contracts[i])
                    }
                }
                return display
            }
            setAllFilters(defaults)
            toggleRefreshFilters(!refreshFilters)
        }
    }, [props.user])

    useEffect(() => {
        if (!alreadyPulled) {
            props.queryContractNubs()
            props.pullNewMessages()
            setAlreadyPulled(true)
        }
    })
    
    return (
      <div>
        {(!props.user.workerModeEnabled && props.user.outstandingBalance > 0) ? (
            <AccountAlert
                messageType="WARNING"
                message={"You have $" + displayPrice(props.user.outstandingBalance) + " on feather but need to connect a payout method to get the money"}
                level={2}
                customLink="/setup-payout"
            />
        ) : (!props.user?.workerModeEnabled && !props.user?.buyerModeEnabled) && (
            (props.user?.workerModeRequested || props.user?.buyerModeRequested) ? (
                <AccountAlert
                    messageType="WARNING"
                    message="stripe is still connecting your accounts, you will be able to make contracts soon"
                    level={2}
                />
            ) : (
                <AccountAlert
                    messageType="WARNING"
                    message="you have not set up payout or payment yet so you cannot create a contract"
                    level={3}
                />
            )
        )}


        <br/>
        <div className="px-4 md:px-20 lg:px-24">
          <div className="flex justify-center">
            <div 
            className={`w-full
                        mb-8 flex flex-col 
                        md:grid md:grid-cols-2 gap-4`}
            >
                <NewMessages/>
                <ActivePayments/>
            </div>
          </div>

        {props.contractNubs.length != 0 && (
          <ContractTableHeader 
            allFilters={allFilters} 
            selected={selectedFilter} 
            setSelected={setSelectedFilter}
            refreshFilters={refreshFilters}
            user={props.user}
          />
        )}

          <ContractList 
            allFilters={allFilters} 
            selected={selectedFilter}
            refreshFilters={refreshFilters}
          />
        </div>
      </div>
    )
}

const mapStateToProps = ({ user, contract, chat }) => ({
    user: user.user,
    contractNubs: contract.contractNubs ? contract.contractNubs : [],
    newMessages: chat.newMessages,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    queryContractNubs,
    pullNewMessages,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractsList)