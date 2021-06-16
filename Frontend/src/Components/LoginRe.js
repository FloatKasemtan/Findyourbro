import React, { useContext } from 'react';
import { userContext } from '../Contexts/userContext';
import Login from './Login';
import {
  BrowserRouter as Redirect
} from "react-router-dom";

const LoginRe = () => {
  const { loggedIn } = useContext(userContext);
  return loggedIn ? <Redirect to="/about" /> : <Login />
}

export default LoginRe;