import { useEffect, useState } from 'react'
import { BellIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const PromotionAlert = (props) => {
  const [show, setShow] = useState(true)
  
  useEffect(() => {
    if (props.user?.freeContracts == 0) {
      setShow(false)
    }
  }, [props.user?.freeContracts])

  return (
    <>
      <div
        className={"w-full flex items-end py-2 mb-4 sm:items-start " + (show ? "" : "hidden")}
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
            <div className="w-full rounded-lg bg-green-100/30 shadow-md ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <BellIcon className="h-6 w-6 mt-1 text-green-900" aria-hidden="true" />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-lg font-medium text-green-900">{"You have "}{props.user?.freeContracts}{" more free contract"}{props.user?.freeContracts > 1 ? "s!" : "!"}</p>
                    <p className="mt-1 text-sm text-gray-500 pb-4">
                      As part of our launch, we are offering 2 free contracts with 0% transaction fee. Create a contract to take advantage of the deal. After you use up your free contracts, there will be a 5% service fee on future contracts.
                    </p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary5 focus:ring-offset-2"
                      onClick={() => {
                        setShow(false)
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
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
)(PromotionAlert)
