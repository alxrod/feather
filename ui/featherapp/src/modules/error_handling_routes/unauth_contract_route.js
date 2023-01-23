/* This example requires Tailwind CSS v2.0+ */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Redirect } from "react-router-dom"

const UnauthContractRoute = (props) => {
  return (
    <div className="p-4">
      
      <div className="py-24 px-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center lg:justify-center">
            <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-700 w-full text-center">
              We're sorry, you do not belong to the contract you are trying to view
            </p>
            <div className="h-4"></div>
            {props.isLoggedIn ? (
                <Link className="text-primary5 text-xl" to={"/contracts"}>Return Home</Link>
            ) : (
                <Link className="text-primary5 text-xl" to={"/"}>Return Home</Link>
            )}
          </div> 
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ contract, user }) => ({
  user: user.user,
  isLoggedIn: user.isLoggedIn,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(UnauthContractRoute)