import React, {} from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import ProfileSidebar from "./sidebar";
import AccountInfo from "./account_info"

const Profile = (props) => {
    const currentUser = props.user
    // if (!currentUser) {
    //     return(<Redirect to="/login"/>)
    // }
    // return (
    //     <div className="container">
    //         <header className="jumbotron">
    //             <h3>
    //                 <strong>{currentUser.username}</strong> Profile
    //             </h3>
    //         </header>
    //         <p>
    //             <strong>Token: </strong> {currentUser.accessToken.substring(0, 20)}...{" "}
    //             {currentUser.accessToken.substring(currentUser.accessToken.length-20)}
    //         </p>
    //         <p>
    //             <strong>Id:</strong> {currentUser.id}
    //         </p>
    //         <p>
    //             <strong>Email:</strong> {currentUser.email}
    //         </p>
    //         <strong>Authorities:</strong>
    //         <ul>
    //             {currentUser.roles &&
    //              currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
    //         </ul>
    //     </div>
    // )
    return (
        <div>
            <br/>
            <div className="flex">
                <div className="w-100">
                    <ProfileSidebar className=""/>
                </div>

                <div className="p-5">
                    <AccountInfo/>
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