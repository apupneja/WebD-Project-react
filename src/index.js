import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navbar from './navbar';
import Main from './main';
import Error from './error';
import Login from './login';
import MainEdit from './main-edit';
import MainSignup from './main-signup';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import Logout from './logout';

window.jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTgyMWU0MDA2ZWMxMzU4ODE0MzM5MyIsImlhdCI6MTYyMDY1MTkyNywiZXhwIjoxNjIwOTExMTI3fQ.gd0L67z6Knc6spQpOAH8eSXunGyvDFnbFKFzY390PLA";

// The main page with all the routing

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
      <Route path='/' component={Login} exact/>
      <Route path='/admin'>
        <Navbar/>
        <Main/>
      </Route>
      <Route path='/admin'>
        <Navbar />
        <Main />
      </Route>
      <Route path='/edit'>
        <Navbar />
        <MainEdit />
      </Route>
      <Route path='/signup'>
        <Navbar />
        <MainSignup />
      </Route>
      <Route path='/logout'>
        <Logout />
      </Route>
      <Route component={Error} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


