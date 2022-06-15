import React, { useEffect } from 'react';
import { Route, Link } from 'react-router-dom'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import NavBar from "../navbar"

import Home from '../home'
import Example from '../example'

import Login from '../login'
import Register from '../register'
import Profile from '../profile'

import { logout, clearMessage } from "../../reducers/user";
import {history} from '../../reducers'

import ContractsView from '../contracts_view';
import MessageView from '../message_view';


import ContractCreate from '../contract_create';
import ContractView from '../contract_view';
import ContractNegotiate from '../contract_negotiate';
import ContractSettle from '../contract_settle';

const App = (props) => {

  useEffect( () => {
    history.listen((location) => {
    });
  }) 
  const handleLogout = (e) => {
    e.preventDefault()
    props.logout(props.user.username)
  }
  
  const auth_links = () => {
    if (!props.user) {
      return (
        <div>
          <Link to="/login">login </Link>
          <Link to="/register">register </Link>
        </div>
      )
    } else {
      return (
        <div>
          <Link to="/profile">profile </Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )
    }
  }


  return (

    <div className="App">
      <header>
        <NavBar/>
        {/* <Link to="/">Home </Link>
        <Link to="/example">Example </Link>
        {auth_links()} */}
      </header>

      <main>
        <Route exact path="/contracts" element={<ContractsView/>} component={ContractsView} />
        <Route exact path="/messages" element={<MessageView/>} component={MessageView} />
        
        <Route path="/create" element={<ContractCreate/>} component={ContractCreate} />
        <Route path="/negotiate" element={<ContractNegotiate/>} component={ContractNegotiate} />
        <Route path="/view" element={<ContractView/>} component={ContractView} />
        <Route path="/settle" element={<ContractSettle/>} component={ContractSettle} />

        <Route exact path="/login" element={<Login/>} component={Login} />
        <Route exact path="/register" element={<Register/>} component={Register} />
        <Route exact path="/profile" element={<Profile/>} component={Profile} />

        {/* <Route exact path="/example" element={<Example/>} component={Example} /> */}
      </main>
    </div>
  );
}


const mapStateToProps = ({ user }) => ({
    user: user.user
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  logout,
  clearMessage,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
