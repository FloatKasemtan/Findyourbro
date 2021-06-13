import React from "react";
import Layout from "../src/Components/Layout"
import LoginRe from "./Components/LoginRe";
import Login from "./Components/Login";
import About from "../src/Components/About";
import Users from "../src/Components/Users";
import { UserContextProvider } from "../src/Contexts/userContext"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  return (
    <UserContextProvider>
      <Router>
        <Switch>
          <Route path="/about">
            <Layout>
              <About />
            </Layout>
          </Route>
          <Route path="/users">
            <Layout>
              <Users />
            </Layout>
          </Route>
          <Route path="/">
            <LoginRe />
          </Route>
        </Switch>
      </Router>
    </UserContextProvider>
  );
}

export default App;
