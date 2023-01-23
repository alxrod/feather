import React, { useEffect, useState } from 'react';
import { Redirect, Route, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import NavBar from "../navbar"

import Home from '../landing_page'

import Login from '../login'

import ForgotPassword from "../forgot_password"
import ResetPassword from "../reset_password"

import Register from '../register'
import SetupPayment from "../setup_payment"
import Profile from '../profile'

import { clearSelected } from "../../reducers/contract/dispatchers/contract.dispatcher";
import { clearChat } from "../../reducers/chat/dispatchers/chat.dispatcher"; 
import {history} from '../../reducers'

import ContractsView from '../contracts_view';

import ContractRedirect from '../contract/contract_redirect';
import ContractCreate from '../contract/contract_create';
import ContractView from '../contract/contract_view';
import ContractNegotiate from '../contract/contract_negotiate';
import ContractInvite from "../contract/contract_invite";
import ContractSettle from '../contract/contract_settle';

import { push } from 'connected-react-router'
import { useLocation } from 'react-router-dom'

import UnknownRoute from "../error_handling_routes/unknown_route"
import UnauthContractRoute from "../error_handling_routes/unauth_contract_route"

import FileUploadTest from "../file_upload_test";
import AccountOnboardingRefresh from "../payment_redirects/account_onboarding_refresh"


import { 
  pullUser,
  setRedirect
} from "../../reducers/user/dispatchers/user.dispatcher";

import {
  setNavbar,
  toggleFromRegister,
} from "../../reducers/site/site.reducer"

const STD_ROLE = 3
const UNAUTH_ROLE = 1 
const STD_UNAUTH_ROLE = 4

const routes = {
  "/": UNAUTH_ROLE,
  "/messages": STD_ROLE,
  "/contracts": STD_ROLE,

  "/contract": STD_ROLE,
  "/create": STD_ROLE,
  "/negotiate": STD_ROLE,
  "/view": STD_ROLE,
  "/settle": STD_ROLE,
  "/unknown": STD_UNAUTH_ROLE,
  "/unauth-contract": UNAUTH_ROLE,

  "/invite": STD_UNAUTH_ROLE,

  "/login": UNAUTH_ROLE,
  "/register": UNAUTH_ROLE,
  "/setup-payment": STD_ROLE,
  "/profile": STD_ROLE,
  "/profile/onboarding-refresh": STD_ROLE,

  "/file-upload-test": STD_ROLE,
  "/asset-cache": STD_ROLE,

  "/forgot-password": UNAUTH_ROLE,
  "/reset-password": UNAUTH_ROLE,
}

const select_routes = ["/negotiate", "/view", "/settle", "/create"]
const no_nav_routes = ["/login", "/register", "/invite", "/forgot-password"]

const App = (props) => {
  const loc = useLocation();
  const [pullReq, setPullReq] = useState(true);
  let firstLoad = true

  
  useEffect( () => {
    // console.log("Calling a link change to path: " + loc.pathname)
    const route_base = "/"+loc.pathname.split("/")[1]
    if (no_nav_routes.includes(route_base) && !props.isLoggedIn) {
      props.setNavbar(false)
    } else {
      props.setNavbar(true)
    }
    if (!select_routes.includes(route_base)) {
      props.clearSelected()
    }
    if (props.fromRegister && !(route_base === "/register" || route_base === "/setup-payment")) {
      props.toggleFromRegister(false)
    }
    if (props.chatRoomId !== "") {
      props.clearChat(props.chatRoomId)
    }
    
    authRedirect(route_base, loc.pathname)
    
  }, [loc, props.isLoggedIn]) 

  const authRedirect = (pathname, wholepath) => {
    if (!routes.hasOwnProperty(pathname)) {
      props.push("/unknown")
    } else if (props.user === null && routes[pathname] === STD_ROLE) {
      props.setRedirect(wholepath)
      props.push("/login")
      return false
    } else if (props.user !== null && routes[pathname] === UNAUTH_ROLE) {
      props.push("/contracts")
      return false
    }
    return true
  }

  useEffect( () => {
    if (pullReq == true && props.user !== null) {
      setPullReq(false);
      props.pullUser(props.user.id).then(() => {
        // console.log("Finished pull")
        setTimeout(() => {
          setPullReq(true)
        }, 10 * 60 * 1000)
      });
    }
  }, [pullReq, props.user, props.user?.id])

  return (
    <div className="App">
      <header>
        <NavBar/>
      </header>

      <main className="noisy">
        <Route exact path="/" element={<Home/>} component={Home} />

        <Route exact path="/contracts" element={<ContractsView/>} component={ContractsView} />

        <Route path="/create" element={<ContractCreate/>} component={ContractCreate} />

        <Route path="/invite/:contractId" element={<ContractInvite/>} component={ContractInvite} />

        <Route path="/contract/:contractId" element={<ContractRedirect/>} component={ContractRedirect} />
        <Route path="/negotiate/:contractId" element={<ContractNegotiate/>} component={ContractNegotiate} />
        <Route path="/view/:contractId" element={<ContractView/>} component={ContractView} />
        <Route path="/settle/:contractId" element={<ContractSettle/>} component={ContractSettle} />
        
        <Route exact path="/profile" element={<Profile/>} component={Profile} />
        <Route exact path="/profile/onboarding-refresh" element={<AccountOnboardingRefresh/>} component={AccountOnboardingRefresh} />

        <Route exact path="/login" element={<Login/>} component={Login} />    
        <Route exact path="/forgot-password" element={<ForgotPassword/>} component={ForgotPassword} />
        <Route exact path="/reset-password/:resetId" element={<ResetPassword/>} component={ResetPassword} />    
        
        <Route exact path="/register" element={<Register/>} component={Register} />
        <Route exact path="/setup-payment" element={<SetupPayment/>} component={SetupPayment} />

        <Route exact path="/unknown" element={<UnknownRoute/>} component={UnknownRoute} />
        <Route exact path="/unauth-contract" element={<UnauthContractRoute/>} component={UnauthContractRoute} />

        <Route exact path="/file-upload-test" element={<FileUploadTest/>} component={FileUploadTest} />

      </main>
    </div>
  );
}


const mapStateToProps = ({ user, site, stripe, chat }) => ({
    chatRoomId: chat.roomId,
    user: user.user,
    isLoggedIn: user.isLoggedIn,
    fromRegister: site.fromRegister,
    clientSecret: stripe.clientSecret
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  pullUser,
  setRedirect,
  setNavbar,
  clearSelected,
  clearChat,
  toggleFromRegister,
  push,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
