import React from "react";
import Error from "./error";
import Login from "./login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import SideNav from "./Sidenav";
import './index.css';

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/" component={Login} exact />
          <SideNav>
            <Route path="/admin"></Route>
            <Route path="/edit"></Route>
            <Route path="/addcat"></Route>
            <Route path="/addprod"></Route>
            <Route path="/delprod"></Route>
            <Route path="/delcat"></Route>
            <Route path="/signup"></Route>
            <Route path="/download"></Route>
            <Route path="/logout"></Route>
          </SideNav>
        <Route component={Error} />
      </Switch>
    </Router>
  );
}

export default App;
