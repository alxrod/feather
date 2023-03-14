import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Redirect, Route, Link, Router } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import NavBar from "../navbar"

import Home from '../landing_page'

import Login from '../login'

import ForgotPassword from "../forgot_password"
import ResetPassword from "../reset_password"

import Register from '../sign_up/register'
import SetupPayment from "../sign_up/setup_payment"
import SetupPayout from "../sign_up/setup_payout"
import SetupProfilePicture from "../sign_up/setup_profile_pic"
import SetupChoice from "../sign_up/setup_choice"

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

import FigmaOAuthCallback from "../figma_oauth_callback";

import { push } from 'connected-react-router'
import { useLocation } from 'react-router-dom'

import UnknownRoute from "../error_handling_routes/unknown_route"
import UnauthContractRoute from "../error_handling_routes/unauth_contract_route"

import AccountOnboardingRefresh from "../payment_redirects/account_onboarding_refresh"

import "animate.css/animate.min.css";

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
  "^/$": UNAUTH_ROLE,
  "^/messages$": STD_ROLE,
  "^/contracts$": STD_ROLE,

  "^/contract/[^/]*$": STD_ROLE,
  "^/create/[^/]*$": STD_ROLE,
  "^/negotiate/[^/]*$": STD_ROLE,
  "^/view/[^/]*$": STD_ROLE,
  "^/settle/[^/]*$": STD_ROLE,
  "^/invite/[^/]*/[^/]*$": STD_UNAUTH_ROLE,
  
  "^/figma/oauth-callback[^/]*$": STD_ROLE,

  "^/unknown$": STD_UNAUTH_ROLE,
  "^/unauth-contract$": UNAUTH_ROLE,

  "^/login$": UNAUTH_ROLE,
  "^/register$": UNAUTH_ROLE,

  "^/setup-payment$": STD_ROLE,
  "^/setup-payout$": STD_ROLE,
  "^/setup-profile-pic$": STD_ROLE,
  "^/setup-choice$": STD_ROLE,

  "^/profile$": STD_ROLE,
  "^/profile/onboarding-refresh$": STD_ROLE,

  "^/file-upload-test$": STD_ROLE,
  "^/asset-cache$": STD_ROLE,

  "^/forgot-password$": UNAUTH_ROLE,
  "^/reset-password$": UNAUTH_ROLE,
  
}

const select_routes = ["/negotiate", "/view", "/settle", "/create"]
const contract_routes = [
  "/contract",
  "/create",
  "/negotiate",
  "/view",
  "/settle",
]

const App = (props) => {
  const loc = useLocation();
  const [pullReq, setPullReq] = useState(true);
  const [reloadStripeEnables, setReloadStripeEnables] = useState(true)

  useLayoutEffect( () => {
    const route_base = "/"+loc.pathname.split("/")[1]
    
    if (!select_routes.includes(route_base)) {
      props.clearSelected()
    }
    if (props.fromRegister && !(route_base === "/register" || route_base === "/setup-payment")) {
      props.toggleFromRegister(false)
    }
    if (props.isLoggedIn && props.chatRoomId !== "" && props.chatRoomId !== undefined) {
      props.clearChat(props.chatRoomId)
    }
    
    authRedirect(route_base, loc.pathname)
    
  }, [loc, props.isLoggedIn]) 

  useEffect( () => {
    if (Object.keys(props.curContract).length !== 0 && props.curContract.id !== "" && props.curContract.id !== undefined && props.isLoggedIn) {
      const route_base = "/"+loc.pathname.split("/")[1]
      if (contract_routes.includes(route_base)) {
        console.log(props.curContract, props.user)
        if (props.curContract?.id !== "" && props.curContract.worker?.id !== props.user.id && props.curContract?.buyer.id !== props.user.id) {
          props.push("/login")
        }
      }
    }
  }, [props.curContract, props.isLoggedIn, loc])

  const authRedirect = (pathname, wholepath) => {
    let match_found = false;
    let used_key = ""
    for (let i = 0; i < Object.keys(routes).length; i++) {
      if (wholepath.match(Object.keys(routes)[i])) {
        match_found = true;
        used_key = Object.keys(routes)[i]
        break;
      }
    }
    if (!match_found) {
      props.push("/unknown")
    } else if (props.user === null && routes[used_key] === STD_ROLE) {
      props.pullUser().then(
        () => {
          return true
        },
        () => {
          props.setRedirect(wholepath)
          props.push("/login")
          return false
        }
      )
    } else if (props.user !== null && routes[used_key] === UNAUTH_ROLE) {
      props.push("/contracts")
      return false
    }
    console.log("Auth redirect ran: ", props.user, routes[pathname])
    return true
  }

  useLayoutEffect( () => {
    if (pullReq == true && props.user !== null) {
      setPullReq(false);
      props.pullUser().then(() => {
        // console.log("Finished pull")
        setTimeout(() => {
          setPullReq(true)
        }, 10 * 60 * 1000)
      });
    }
  }, [pullReq, props.user, props.user?.id])


  useEffect(() => {
    if ((props.user?.buyerModeRequested && !props.user?.buyerModeEnabled) 
      || props.user?.workerModeRequested && !props.user?.workerModeEnabled && reloadStripeEnables) {
      
      setReloadStripeEnables(false)
      setTimeout(() => {
        props.pullUser(props.user.id).then(() => {
          setReloadStripeEnables(true)
        });
      }, 10 * 1000)
    }
  }, [
      props.user?.buyerModeRequested,
      props.user?.workerModeRequested,
      props.user?.buyerModeEnabled,
      props.user?.workerModeEnabled,
      reloadStripeEnables
  ])

  return (
    <div className="App">
      <header>
        <NavBar/>
      </header>

      <main className="noisy">
        <Route exact path="/" element={<Home/>} component={Home} />

        <Route exact path="/contracts" element={<ContractsView/>} component={ContractsView} />

        <Route path="/create/:contractId" element={<ContractCreate/>} component={ContractCreate} />

        <Route path="/invite/:contractId/:contractSecret" element={<ContractInvite/>} component={ContractInvite} />

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
        <Route exact path="/setup-payout" element={<SetupPayment/>} component={SetupPayout} />
        <Route exact path="/setup-profile-pic" element={<SetupProfilePicture/>} component={SetupProfilePicture} />
        <Route exact path="/setup-choice" element={<SetupChoice/>} component={SetupChoice} />
        
        <Route exact path="/unknown" element={<UnknownRoute/>} component={UnknownRoute} />
        <Route exact path="/unauth-contract" element={<UnauthContractRoute/>} component={UnauthContractRoute} />

        <Route path="/figma/oauth-callback" element={<FigmaOAuthCallback/>} component={FigmaOAuthCallback} />

      </main>
    </div>
  );
}


const mapStateToProps = ({ user, site, stripe, chat, contract }) => ({
    chatRoomId: chat.roomId,
    user: user.user,
    isLoggedIn: user.isLoggedIn,
    fromRegister: site.fromRegister,
    clientSecret: stripe.clientSecret,
    curContract: contract.curContract,
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
