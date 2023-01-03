import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import ProfileSidebar from "./sidebar";
import AccountInfo from "./account_info"
import PaymentModule from "../setup_payment/payment_module"
import { CheckIcon } from '@heroicons/react/outline'
const Profile = (props) => {
    const currentUser = props.user

    const tabOptions = {
        BIO: 0,
        PAY: 1,
        TAX: 2,
    }
    const [selectedTab, setSelectedTab] = useState(tabOptions.BIO)
    const [paymentAdded, setPaymentAdded] = useState(false)
    
    const paymentSuccess = () => {
        setPaymentAdded(true)
    }

    return (
        <div>
            <br/>
            <div className="flex">
                <div className="w-100">
                    <ProfileSidebar 
                        className="" 
                        tabOptions={tabOptions}
                        setSelectedTab={setSelectedTab}
                        selectedTab={selectedTab}
                    />
                </div>

                <div className="p-5 w-full">
                    {selectedTab === tabOptions.BIO ? (
                        <AccountInfo/>
                    ) : selectedTab === tabOptions.PAY ? (
                        <div className="w-full flex justify-center">
                            <div className="flex flex-col">
                                {paymentAdded ? (
                                    <h1 className="text-center font-medium text-2xl text-gray-800 flex justify-center"><CheckIcon className="text-green w-8 h-8 mr-2"/>Payment Method Added</h1>
                                ) : (
                                    <h1 className="text-center font-medium text-2xl text-gray-800">Enter your information to add a payment method</h1>
                                )}
                                <PaymentModule
                                    paymentSuccess={paymentSuccess}
                                />
                            </div>
                        </div>
                        
                    ) : (
                        <h1>Unimplemented</h1>
                    )}
                    
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ user }) => ({
    user: user.user
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)