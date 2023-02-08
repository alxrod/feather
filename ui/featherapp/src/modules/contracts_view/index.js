import React, {useState, useEffect} from 'react';
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { queryContractNubs } from "../../reducers/contract/dispatchers/contract.dispatcher";
import { pullNewMessages } from "../../reducers/chat/dispatchers/chat.dispatcher";

import NewMessages from "./new_messages"
import ActivePayments from "./active_payments"

import ContractList from './contract_list'
import ContractTableHeader from './contracts_header'

const ContractsList = (props) => {
    const [alreadyPulled, setAlreadyPulled] = useState(false)
    const defaultFilters = {}
    defaultFilters.all = (contracts) => {
        return contracts
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
    const [selectedFilter, setSelectedFilter] = useState("all")
    const [refreshFilters, toggleRefreshFilters] = useState(false)
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

          <ContractTableHeader 
            allFilters={allFilters} 
            selected={selectedFilter} 
            setSelected={setSelectedFilter}
            refreshFilters={refreshFilters}
          />

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