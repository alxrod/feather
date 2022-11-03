import React, {useState, useEffect} from 'react';
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { queryContractNubs } from "../../reducers/contract/dispatchers/contract.dispatcher";

import ContractList from './contract_list'
import ContractTableHeader from './contracts_header'

const ContractsList = (props) => {
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
        if (props.user && props.user.admin_status) {
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
        props.queryContractNubs()
    })

    
    return (
        <div>
            <br/>
            <div className="px-4 sm:px-6 lg:px-8">
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

const mapStateToProps = ({ user, contract }) => ({
    user: user.user
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    queryContractNubs
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractsList)