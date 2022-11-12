import React, {useState, useRef, useEffect} from "react";
import { Redirect } from 'react-router-dom';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { 
        register,
        createInstagram,
        createTiktok,
        verifyInstagram,
        verifyTiktok,
        addPayment,
} from "../../reducers/user/dispatchers/user.dispatcher";

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

    const [cardNumber, setCardNumber] = useState("")
    const [cardHolder, setCardHolder] = useState("")
    const [expDate, setExpDate] = useState("")
    let month = ""
    let year = ""

    useEffect( () => {
        month = parseInt(expDate.split("/")[0])
        year = parseInt(expDate.split("/")[1])
    }, [expDate])
    const [zip, setZip] = useState("")
    const [cvv, setCvv] = useState("")

    const [phase, setPhase] = useState(1)

    const handleRegister = (e) => {
        return new Promise((resolve, reject) => {
            console.log("Registering: ")
            props.register(username, name, email, password).then( () => {
                console.log("Success")
                resolve()
            }, err => {
                console.log("Error: " + err)
                reject(err)
            })
        })
    }

    const handleAddInstagram = (e) => {
        // console.log("Trying to verify instagram")
        // console.log(props.user)
        return new Promise((resolve, reject) => {
            if (props.user.user_id === "") {
                reject("You must log in before trying to add an instagram account")
            }
            // console.log("Adding instagram")
            props.createInstagram(props.user.user_id, instaName).then( () => {
                console.log("Successfully added instagram")
                resolve()
            }, err => {
                // console.log("Instagram Add Error: " + err)
                reject(err)
            })
        })
    }

    const handleAddTiktok = (e) => {
        return new Promise((resolve, reject) => {
            if (props.user.user_id === "") {
                reject("You must log in before trying to add an tiktok account")
            }
            console.log("Adding instagram")
            props.createTiktok(props.user.user_id, tiktokName).then( () => {
                // console.log("Successfully added instagram")
                resolve()
            }, err => {
                // console.log("Tiktok Add Error: " + err)
                reject(err)
            })
        })
    }
    
    const handleVerifyInstagram = (e) => {
        
        return new Promise((resolve, reject) => {
            if (props.user.user_id === "") {
                reject("You must log in before trying to verify an instagram account")
            }
            console.log("Verifying instagram")
            props.verifyInstagram(props.user.user_id).then( () => {
                // console.log("Successfully verified instagram")
                resolve()
            }, err => {
                // console.log("Instagram Verify Error: " + err)
                reject(err)
            })
        })
    }

    const handleVerifyTiktok = (e) => {
        return new Promise((resolve, reject) => {
            if (props.user.user_id === "") {
                reject("You must log in before trying to verify a tiktok account")
            }
            console.log("Verifying tiktok")
            props.verifyTiktok(props.user.user_id).then( () => {
                // console.log("Successfully verified tiktok")
                resolve()
            }, err => {
                // console.log("Tiktok Verify Error: " + err)
                reject(err)
            })
        })
    }

    const handleAddPayment = (e) => {
        return new Promise((resolve, reject) => {
            if (props.user.user_id === "") {
                reject("You must log in before trying to setup a payment method")
            }
            console.log("Setting up payment")
            props.addPayment(props.user.user_id, cardNumber, cardHolder, month, year, zip, cvv).then( () => {
                // console.log("Successfully setup Payment")
                resolve()
            }, err => {
                // console.log("Payment Setup Error: " + err)
                reject(err)
            })
        })
    }

    const nextPhase = () => {
        setPhase(phase+1)
    }

    useEffect(() =>{
        if (props.user === null) {
            return
        }
        if (props.user.user_id) {
            setPhase(2)
            console.log("Advancing stage")
        }
        if (props.user.instagram && 
            props.user.tiktok && 
            props.user.instagram.verified == true && 
            props.user.tiktok.verified == true) {
            setPhase(3)
        } 
        if (props.user.paymentSetup == true) {
            setPhase(4)
        }
    })
    
    if (phase === 1) {
        return (<PersonalInfo 
                    username={username}
                    name={name}
                    email={email}
                    password={password}

                    setUsername={setUsername} 
                    setName={setName}
                    setEmail={setEmail} 
                    setPassword={setPassword}
                    nextPhase={nextPhase}

                    handleRegister={handleRegister}
                />)
    } else if (phase === 2) {
        return (<AccountConnect 
                    instaName={instaName}
                    tiktokName={tiktokName}
                    instaCode={instaCode}
                    tiktokCode={tiktokCode}

                    setInstaName={setInstaName}
                    setTiktokName={setTiktokName}
                    setInstaCode={setInstaCode}
                    setTiktokCode={setTiktokCode}

                    nextPhase={nextPhase}

                    handleAddInstagram={handleAddInstagram}
                    handleAddTiktok={handleAddTiktok}
                    handleVerifyInstagram={handleVerifyInstagram}
                    handleVerifyTiktok={handleVerifyTiktok}

                />)
    } else if (phase === 3) {
        return (<PaymentSetup 
                    cardNumber={cardNumber}
                    cardHolder={cardHolder}
                    expDate={expDate}
                    zip={zip}
                    cvv={cvv}
                    
                    setCardNumber={setCardNumber}
                    setCardHolder={setCardHolder}
                    setExpDate={setExpDate}
                    setZip={setZip}
                    setCvv={setCvv}
                    
                    nextPhase={nextPhase}
                    
                    handleAddPayment={handleAddPayment}
                />)
    } else {
        return ( <Redirect to={props.redirectLink}/>)
    }
   
}

const mapStateToProps = ({ user }) => ({
    message: user.message,
    user: user.user,
    redirectLink: user.redirectLink
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    register,
    createInstagram,
    createTiktok,
    verifyInstagram,
    verifyTiktok,
    addPayment,

}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)
