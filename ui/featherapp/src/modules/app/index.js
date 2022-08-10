import React, { useEffect, useState } from 'react';
import { Redirect, Route, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import NavBar from "../navbar"

import Home from '../home'

import Login from '../login'
import Register from '../register'
import Profile from '../profile'

import { clearSelected } from "../../reducers/contract.reducer";
import { clearChat } from "../../reducers/chat.reducer"; 
import {history} from '../../reducers'

import ContractsView from '../contracts_view';
import MessageView from '../message_view';

import ContractRedirect from '../contract/contract_redirect';
import ContractCreate from '../contract/contract_create';
import ContractView from '../contract/contract_view';
import ContractNegotiate from '../contract/contract_negotiate';
import ContractInvite from "../contract/contract_invite";
import ContractSettle from '../contract/contract_settle';
import { push } from 'connected-react-router'
import { useLocation } from 'react-router-dom'

import { 
  pullUser,
  setRedirect
} from "../../reducers/user.reducer";

import {
  setNavbar
} from "../../reducers/site.reducer"

const ADMIN_ROLE = 7 // 111
const STD_ROLE = 3 // 011
const UNAUTH_ROLE = 1 //001
const routes = {
  "/": UNAUTH_ROLE,
  "/messages": STD_ROLE,
  "/contracts": STD_ROLE,

  "/contract": STD_ROLE,
  "/create": STD_ROLE,
  "/negotiate": STD_ROLE,
  "/view": STD_ROLE,
  "/settle": STD_ROLE,

  "/invite": UNAUTH_ROLE,

  "/login": UNAUTH_ROLE,
  "/register": UNAUTH_ROLE,
  "/profile": STD_ROLE,
  
}

const select_routes = ["/negotiate", "/view", "/settle", "/create"]
const no_nav_routes = ["/login", "/register", "/invite"]

const App = (props) => {
  const loc = useLocation();
  const [pullReq, setPullReq] = useState(false);
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
    props.clearChat()
    authRedirect(route_base, loc.pathname)
    
  }, [loc, props.isLoggedIn]) 


  useEffect( () => {
    if (pullReq == true && props.user !== null && props.user.type === undefined) {
      console.log("Pulling user data")

      props.pullUser(props.user.user_id).then(() => {
        // console.log("Finished pull")
        setPullReq(false);
      });
    }
  }, [pullReq])

  const authRedirect = (pathname, wholepath) => {
    if (props.user === null && routes[pathname] !== UNAUTH_ROLE) {
      console.log("You aren't logged in yet")
      console.log(props.user)
      props.setRedirect(wholepath)
      props.push("/login")
      return false
    } else if (props.user !== null) {
      const role = props.user.role
      if ((routes[pathname] & role) !== routes[pathname]) {
        props.setRedirect(wholepath)
        props.push("/login")
        return false
      }
    }
    return true
  }

  return (

    <div className="App">
      <header>
        <NavBar/>
      </header>

      <main>
        <Route exact path="/" element={<Home/>} component={Home} />

        <Route exact path="/contracts" element={<ContractsView/>} component={ContractsView} />
        <Route exact path="/messages" element={<MessageView/>} component={MessageView} />

        <Route path="/create" element={<ContractCreate/>} component={ContractCreate} />

        <Route path="/invite/:contractId" element={<ContractInvite/>} component={ContractInvite} />

        <Route path="/contract/:contractId" element={<ContractRedirect/>} component={ContractRedirect} />
        <Route path="/negotiate/:contractId" element={<ContractNegotiate/>} component={ContractNegotiate} />
        <Route path="/view/:contractId" element={<ContractView/>} component={ContractView} />
        <Route path="/settle/:contractId" element={<ContractSettle/>} component={ContractSettle} />
        
        <Route exact path="/profile" element={<Profile/>} component={Profile} />

        <Route exact path="/login" element={<Login/>} component={Login} />    
        <Route exact path="/register" element={<Register/>} component={Register} />
      </main>
    </div>
  );
}


const mapStateToProps = ({ user }) => ({
    user: user.user,
    isLoggedIn: user.isLoggedIn,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  pullUser,
  setRedirect,
  setNavbar,
  clearSelected,
  clearChat,
  push,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
