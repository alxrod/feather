import React, { useEffect, useState } from 'react';
import { Redirect, Route, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import NavBar from "../navbar"

import Home from '../home'

import Login from '../login'
import Register from '../register'
import Profile from '../profile'

import { logout, clearMessage } from "../../reducers/user.reducer";
import {history} from '../../reducers'

import ContractsView from '../contracts_view';
import MessageView from '../message_view';


import ChatTest from '../contract/chat_test';

import ContractRedirect from '../contract/contract_redirect';
import ContractCreate from '../contract/contract_create';
import ContractView from '../contract/contract_view';
import ContractNegotiate from '../contract/contract_negotiate';
import ContractSettle from '../contract/contract_settle';
import { push } from 'connected-react-router'
import { useLocation } from 'react-router-dom'

import { 
  pullUser
} from "../../reducers/user.reducer";

const ADMIN_ROLE = 7 // 111
const STD_ROLE = 3 // 011
const UNAUTH_ROLE = 1 //001
const routes = {
  "/": UNAUTH_ROLE,
  "/chat": STD_ROLE,
  "/messages": STD_ROLE,
  "/contracts": STD_ROLE,

  "/contract": STD_ROLE,
  "/create": STD_ROLE,
  "/negotiate": STD_ROLE,
  "/view": STD_ROLE,
  "/settle": STD_ROLE,

  "/login": UNAUTH_ROLE,
  "/register": UNAUTH_ROLE,
  "/profile": STD_ROLE,
  
}
const App = (props) => {
  const loc = useLocation();
  const [pullReq, setPullReq] = useState(false);
  let firstLoad = true

  useEffect( () => {
    console.log("Calling a link change to path: " + loc.pathname)
    const route_base = "/"+loc.pathname.split("/")[1]
    console.log(route_base)
    authRedirect(route_base)
    
  }, [loc]) 

  useEffect( () => {
    if (pullReq == true && props.user !== null && props.user.type === undefined) {
      console.log("Pulling user data")
      props.pullUser(props.user.user_id).then(() => {
        console.log("Finished pull")
        setPullReq(false);
      });
    }
  }, [pullReq])

  const authRedirect = (pathname) => {
    if (props.user === null && routes[pathname] !== UNAUTH_ROLE) {
      console.log("You aren't logged in yet")
      console.log(props.user)
      props.push("/login")
      return false
    } else if (props.user !== null) {
      const role = props.user.role
      if ((routes[pathname] & role) !== routes[pathname]) {
        props.push("/login")
        return false
      }
    }
    console.log("And no redirect")
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

        <Route path="/chat/:chatId" element={<ChatTest/>} component={ChatTest} />

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
  clearMessage,
  push,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
