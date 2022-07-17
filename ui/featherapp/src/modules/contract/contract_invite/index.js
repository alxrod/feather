/* This example requires Tailwind CSS v2.0+ */
import feather_logo from "../../../style/logo/feather_logo.svg";
import { DocumentIcon, CurrencyDollarIcon, CalendarIcon } from '@heroicons/react/outline'
import {useState, useEffect} from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ContractService from "../../../services/contract.service";
import { claimContract } from "../../../reducers/contract.reducer";
import { setRedirect } from "../../../reducers/user.reducer"
import { Link, Redirect } from "react-router-dom"
import BackButton from "../../general_components/back_button"

const ContractInvite = (props) => {
  const { params: { contractId } } = props.match;

  const [inviteBody, setBody] = useState({
    id: "",
    title: "",
    buyer: {id: "", username: ""},
    worker: {id: "", username: ""},
    summary: "",
    deadline: new Date()
  })
  const [dateStr, setDateStr] = useState("")
  useEffect( () => {
    setDateStr(inviteBody.deadline.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}))
  }, [inviteBody])

  const [isOwner, setOwner] = useState(false)
  const [existingUser, setExistingUser] = useState({
    username: "",
  })

  const [contractPassword, setContractPassword] = useState("")

  const [errorMessage, setErrorMessage] = useState("")
  const [copyMessage, setCopyMessage] = useState("")
  const changePassword = (e) => {
    setContractPassword(e.target.value)
  }
  const handleClick = (e) => {
    if (contractPassword === "") {
      setErrorMessage("Please enter a contract password first")
    } else {
      props.claimContract(contractId, contractPassword).then(() => {
        console.log("Contract claimed")
      }).catch((error) => {
        setErrorMessage(error)
      })
    }

  }
  
  const copyLinkToClipboard = () => {
    console.log("Coppying link")
    navigator.clipboard.writeText("http://localhost:3000/invite/"+contractId);
    setCopyMessage("Copied link to your clipboard")
  }
  useEffect( () => {
    if (inviteBody.id === "") {
      props.setRedirect("/invite/"+contractId)
      ContractService.queryInvite(contractId).then((body) => {
        setBody(body)
        console.log(body)
        console.log(props.user)
        if (props.user !== null && (body.worker.id === props.user.user_id || body.buyer.id === props.user.user_id)) {
          setOwner(true)
        } else if (body.buyer.id !== "") {
          setExistingUser(body.buyer)
        } else {
          setExistingUser(body.worker)
        }
        
      })
    }
  }, [contractId])

  if (props.contractClaimed) {
    return ( <Redirect to={"/negotiate/"+contractId}/>)
  }
  return (
    <div className="p-4">
      {!props.isLoggedIn && (
        <img
          className="block h-8 w-auto"
          src={feather_logo}
          alt="Workflow"
        />
      )}
      
      <div className="py-24 px-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col items-center lg:justify-center">
            {isOwner && (
              <div className="max-w-2xl w-full">
                <BackButton link={"/negotiate/"+contractId}/>
              </div>
            )}
            
            <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 w-full md:text-center">
              {inviteBody.title}
            </p>
            {isOwner && (
              <>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 w-full lg:text-center">
                  We are still waiting for your partner to accept the invite to the contract. Send them 
                  {" "}<a className="font-medium text-indigo-600" href="#" onClick={copyLinkToClipboard}>this link</a>{" "} 
                  and give then the contract password 
                  {" ("}<b className="font-medium text-indigo-600">{inviteBody.password}</b>{") "}to accept.
                </p>
                <p className="mt-1 text-indigo-600">{copyMessage}</p>
              </>
            )}
            
            {(!isOwner && props.isLoggedIn) && (
              <div>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 w-full lg:text-center">Enter the contract password to claim it</p>
                <div className="mt-1 ml-5">
                  <div className="mt-1 relative flex items-center">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="text-gray-600 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="your contract password"
                      value={contractPassword}
                      onChange={changePassword}
                    />
                    <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                      <button className="inline-flex items-center bg-indigo-500 rounded px-2 text-sm font-sans font-medium text-white" onClick={handleClick}>
                        Claim
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <p className="text-red mt-1">{errorMessage}</p>
                  </div>
                </div>
              </div>
            )}
            {(!isOwner && !props.isLoggedIn) && (
              <p className="mt-4 max-w-2xl text-xl text-gray-500 w-full lg:text-center">
                <b className="font-medium text-indigo-600">@{existingUser.username}</b>{" "}
                has invited you to a contract. To claim this contract and begin negotiating, you have to 
                {" "}<Link className="font-medium text-indigo-600" to="/login"><u>{"log in"}</u></Link>{" "}
                or 
                {" "}<Link className="font-medium text-indigo-600" to="/register"><u>{"register"}</u></Link>.{" "}
              </p>
              
            )}
            <div className="mt-10 w-[30vw]">
              <dl className="space-y-10">
                  <div key="summary" className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <DocumentIcon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Summary</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">{inviteBody.summary}</dd>
                  </div>
                  
                  <div key="price" className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <CurrencyDollarIcon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Price</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">{inviteBody.price}</dd>
                  </div>

                  <div key="deadline" className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <CalendarIcon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Deadline</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">{dateStr}</dd>
                  </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ contract, user }) => ({
  user: user.user,
  isLoggedIn: user.isLoggedIn,
  contractClaimed: contract.contractClaimed,
  contractNubs: contract.contractNubs,
  
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setRedirect,
  claimContract,
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(ContractInvite)