import React from "react";
import Layout from "../src/Components/Layout";
import Login from "./views/Sign-in";
import About from "./views/Guess";
import Users from "./views/Users";
import Regis from "./views/Sign-up";
import { UserContextProvider } from "../src/Contexts/userContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <UserContextProvider>
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
          <Route path="/regis">
            <Regis />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </UserContextProvider>
    </Router>
  );
}

export default App;
