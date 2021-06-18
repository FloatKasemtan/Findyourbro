import React from "react";
import Layout from "../src/Components/Layout"
import LoginRe from "./Components/LoginRe";
import Login from "./Components/Login";
import About from "./Components/Guess";
import Users from "../src/Components/Users";
import { UserContextProvider } from "../src/Contexts/userContext"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

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
          <Route path="/">
            {/* <LoginRe /> */}
            <Login />
          </Route>
        </Switch>

      </UserContextProvider>
    </Router >
  );
}

export default App;
