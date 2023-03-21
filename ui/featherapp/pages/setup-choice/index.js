import React, {useState, useRef, useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import {toggleRegisterMethods} from "../../reducers/site/site.reducer"
import { useRouter } from "next/router"

const SetupChoice = (props) => {
  const router = useRouter()

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">What do you want to use feather for?</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              You can always change this later!
            </p>

            <div className="grid grid-cols-1 gap-y-8 mt-8">
              <div 
                className="cursor-pointer rounded-md p-4 border border-gray-300 hover:border-2 hover:border-primary5 shadow-sm text-gray-700 hover:text-primary5"
                onClick={() => {
                  props.toggleRegisterMethods(false)
                  router.push("/setup-payment")
                }}
              >
                <h1 className="px-4 font-medium">I want to pay for contracts</h1>
              </div>

              <div 
                className="cursor-pointer rounded-md p-4 border border-gray-300 hover:border-2 hover:border-primary5 shadow-sm text-gray-700 hover:text-primary5"
                onClick={() => {
                  props.toggleRegisterMethods(false)
                  router.push("/setup-payout")
                }}
              >
                <h1 className="px-4 font-medium">I want to get paid for contracts</h1>
              </div>

              <div 
                className="cursor-pointer rounded-md p-4 border border-gray-300 hover:border-2 hover:border-primary5 shadow-sm text-gray-700 hover:text-primary5"
                onClick={() => {
                  props.toggleRegisterMethods(true)
                  router.push("/setup-payout")
                }}
              >
                <h1 className="px-4 font-medium">I want to do both</h1>
              </div>
              </div>
            </div>
        
          <div className="flex flex-col items-center py-8">
            
            <a onClick={() => router.push("/contracts")} className="text-secondary5 text-lg font-bold hover:text-secondary4 cursor-pointer">
              Choose later
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
    user: user.user,
    defaultRegisterRole: user.defaultRegisterRole,
    redirectLink: user.redirectLink
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleRegisterMethods
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SetupChoice)
