import { PlusIcon, ArrowRightIcon } from '@heroicons/react/solid'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { useRouter } from "next/router"
import CreateContract from "./create_contract_button"

const NoContracts = (props) => {
  const router = useRouter()
  return (
    <div className="mx-auto rounded-lg text-center p-8 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
      <svg
        className="h-24 w-24 text-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <h3 className="mt-2 text-lg font-medium text-gray-900">No Contracts</h3>
      {(props.user?.workerModeEnabled || props.user?.buyerModeEnabled) ? (
        <>
        <p className="mt-1 text-lg text-gray-500 max-w-xs">Get started by creating a new contract.</p>
        <div className="mt-6">
          <CreateContract/>
        </div>
        </>
      ) : (
        <>
        <p className="mt-1 text-lg text-gray-500 max-w-xs">Set up a payment or payout method to enable contracts</p>
        <div className="mt-6">
          <button
            type="button"
            className="inline-flex items-center px-4 py-3 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-primary5 hover:bg-primary6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary4"
            onClick={() => router.push("/profile")}
          >
            Setup Account
            <ArrowRightIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
          </button>  
        </div>
        </>
      )}
    </div>
  )
}

const mapStateToProps = ({  user }) => ({
  user: user.user,
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NoContracts)
