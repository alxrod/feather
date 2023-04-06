import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PlusIcon } from '@heroicons/react/solid'
import { createDocument, clearSelectedDoc } from "../../../reducers/document/dispatchers/document.dispatcher";
import { genEmptyDeadlineSet } from "../../contract_components/deadline/helpers";
import { BUYER_TYPE, WORKER_TYPE } from '../../../services/user.service';
import { useRouter } from "next/router";
import { useState } from "react"

import {Oval} from 'react-loading-icons'

const CreateDocument = (props) => {
  const router = useRouter()
  const [loadingNewDocument, setLoadingNewDocument] = useState(false)

  const setupNewDocument = () => {
    // createDocument(token, user_id, title, summary, deadlines, items) {
    setLoadingNewDocument(true)
    props.clearSelectedDoc().then(() => {
      props.createDocument("", "", [], []).then(
        (id) => {
          console.log("CREATED IS WAS ", id)
          // router.push("/document/view/"+id)
        }
      )
    })
    
  }

  return (
    <div className="flex items-center">
      {loadingNewDocument && (
        <Oval className="w-6 h-6 mr-2" stroke={"#7993A0"} fill={"#7993A0"} strokeWidth={4}/>
      )}
      <button
        type="button"
        className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary4 hover:bg-primary3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary4"
        onClick={setupNewDocument}
      >
        <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        New Document
      </button>
    </div>
  )
}

const mapStateToProps = ({  user }) => ({
  user: user.user,
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
  createDocument,
  clearSelectedDoc,
}, dispatch)
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateDocument)
