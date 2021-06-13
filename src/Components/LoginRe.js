import React, {useContext, useState} from 'react';
import {userContext} from '../Contexts/userContext';
import Login from './Login';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

const LoginRe = () => {
    const { loggedIn, setloggedIn } = useContext(userContext);
    return loggedIn ? <Redirect to="/about" /> : <Login />
}

export default LoginRe;