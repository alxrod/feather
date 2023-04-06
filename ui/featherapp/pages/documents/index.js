import React, {useState, useEffect} from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { queryDocumentNubs } from "../../reducers/document/dispatchers/document.dispatcher";
import { pullNewMessages } from "../../reducers/chat/dispatchers/chat.dispatcher";

import NewMessages from "../../components/list_view/new_messages"

import DocumentList from '../../components/list_view/document/document_list'
import DocumentTableHeader from '../../components/list_view/document/list_header'

const DocumentsListView = (props) => {
    const [alreadyPulled, setAlreadyPulled] = useState(false)
    const defaultFilters = {}

    defaultFilters.all = (documents) => {
      return documents
    }

    const [allFilters, setAllFilters] = useState(defaultFilters)
    const [selectedFilter, setSelectedFilter] = useState("all")
    const [refreshFilters, toggleRefreshFilters] = useState(false)

    useEffect(() => {
      if (!alreadyPulled) {
        props.queryDocumentNubs()
        props.pullNewMessages(true)
        setAlreadyPulled(true)
      }
    })
    
    return (
      <div>
        <div className="px-4 md:px-20 lg:px-24">
          <br/>
          <div className="flex justify-center">
            <div 
            className={`w-full
                        mb-8 flex flex-col 
                        gap-4`}
            >
                <NewMessages/>
            </div>
          </div>

          <DocumentTableHeader 
            allFilters={allFilters} 
            selected={selectedFilter} 
            setSelected={setSelectedFilter}
            refreshFilters={refreshFilters}
            user={props.user}
          />
    
          <DocumentList 
            allFilters={allFilters} 
            selected={selectedFilter}
            refreshFilters={refreshFilters}
            documents={props.documents}
          />
        </div>
      </div>
    )
}

const mapStateToProps = ({ user, document, chat }) => ({
    user: user.user,
    documents: document.documentNubs ? document.documentNubs : [],
    newMessages: chat.newMessages,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    queryDocumentNubs,
    pullNewMessages,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DocumentsListView)