// import NoContracts from "./no_contracts_view"
import React, {useState, useEffect, Fragment } from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getProfilePicUrls } from '../../../reducers/file/dispatchers/file.profile_query.dispatcher';
import DocumentNub from "./document_nub"

const DocumentList = (props) => {
  const [no_docs, setNoDocs] = useState(true)
  const [newMsgs, setNewMsgs] = useState({})

  useEffect( () => {
    if (props.documents !== undefined && props.documents.length > 0) {
      // Made so only called once
      
      if (no_docs) {
        let user_ids = []
        for (let i = 0; i < props.documents.length; i++) {

          for (let j = 0; j < user_ids.length; j++) {
            let already_have_id = false
            for (let k = 0; k < props.documents[i].users.length; k++) {
              if (user_ids[j] === props.documents[i].users[k].id) {
                already_have_id = true
              }
            }
            if (!already_have_id) {
              user_ids.push(props.documents[i].users[j].id)
            }
          }
        }
        props.getProfilePicUrls(user_ids)
      }
      setNoDocs(false)
    }
  }, [props.documents.length])

  useEffect(() =>  {
    const newSet = {}
    for (let j = 0; j < props.documents.length; j++) {
      newSet[props.documents[j].id] = 0
      for (let i = 0; i < props.newMessages.length; i++) {
        if (props.newMessages[i].documentInfo.id === props.documents[j].id) {
          newSet[props.documents[j].id]++
        }
      }
    }
    setNewMsgs(newSet)
  }, [props.newMessages.length, props.documents.length])

  return (
    <>
    {!no_docs ? (
      <div className="mt-8 flex flex-col">
        <div>
          <div className="inline-block min-w-full py-2 align-middle md:px-12 lg:px-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
              { props.allFilters[props.selected](props.documents).sort((a, b) => (newMsgs[b.id] > 0) - (newMsgs[a.id] > 0)).map((document) => (
                <Fragment key={document.id}>
                  <DocumentNub document={document} newMsgs={newMsgs[document.id] ? newMsgs[document.id] : 0}/>
                </Fragment>
              ))}      
            </div>
          </div>
        </div>
      </div>
    ) : ( 
      <div className="flex justify-center mt-10 flex-col">
        {/* <NoContracts/> */}
      </div>
    )}
    </>   
  )
}

const mapStateToProps = ({ file, user, chat }) => ({
  cachedUrls: file.cachedProfileUrls,
  newMessages: chat.newMessages,
  user: user.user,
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getProfilePicUrls,
}, dispatch)
export default connect(
  mapStateToProps,
  mapDispatchToProps,

)(DocumentList)