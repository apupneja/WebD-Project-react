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
  Link
} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'

// The main page with all the routing

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
      <Route path='/' component={Login} exact/>
      <Route path='/admin'>
        <Navbar />
        <Main />
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
      <Route component={Error} />
      
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


