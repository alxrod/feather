import React, {useState, useRef} from "react";
import { Redirect } from 'react-router-dom';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { 
        register,
        createInstagram,
        createTiktok,
        verifyInstagram,
        verifyTiktok,
} from "../../reducers/user";

import PersonalInfo from "./personal_info"
import PaymentSetup from "./payment_setup"
import AccountConnect from "./account_connect"

const Register = (props) => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const [instaName, setInstaName] = useState("")
    const [instaCode, setInstaCode] = useState("")

    const [tiktokName, setTiktokName] = useState("")
    const [tiktokCode, setTiktokCode] = useState("")
    const [errorFlag, setErrorFlag] = useState(false)

    const [phase, setPhase] = useState(1)

    const checkBtn = useRef(null)
    const form = useRef(null)

    const handleRegister = (e) => {
        console.log("Registering: ")
        props.register(username, name, email, password).then( () => {
            console.log("Success")
        }, err => {
            console.log("Error: " + err)
        })
    }

    if (props.isLoggedIn === true) {
        return ( <Redirect to={'/contracts'}/> )
    }
    if (phase === 1) {
        return (<PersonalInfo 
                    setPhase={setPhase} 

                    username={username}
                    name={name}
                    email={email}
                    password={password}

                    setUsername={setUsername} 
                    setName={setName}
                    setEmail={setEmail} 
                    setPassword={setPassword}

                    flagError={setErrorFlag}
                    handleRegister={handleRegister}
                />)
    } else if (phase === 2) {
        return (<AccountConnect setPhase={setPhase}/>)
    } else if (phase === 3) {
        return (<PaymentSetup setPhase={setPhase}/>)
    } else {
        return ( <Redirect to={'/contracts'}/>)
    }
   
}

const mapStateToProps = ({ user }) => ({
    message: user.message,
    user: user.user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    register,
    createInstagram,
    createTiktok,
    verifyInstagram,
    verifyTiktok,

}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)
