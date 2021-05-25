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
import Download from './download';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
      <Route path='/' component={Login} exact/>
      <Route path='/admin'>
        <Navbar />
        <Main />
      </Route>
      <Route path='/edit'>
        <Navbar />
        <MainEdit />
      </Route>
      <Route path='/delcat'>
        <Navbar />
        <MainDelcat />
      </Route>
      <Route path='/delprod'>
        <Navbar />
        <MainDelprod />
      </Route>
      <Route path='/addcat'>
        <Navbar />
        <MainAddCat />
      </Route>
      <Route path='/signup'>
        <Navbar />
        <MainSignup />
      </Route>
      <Route path='/logout'>
        <Logout />
      </Route>
      <Route path='/download'>
        <Navbar />
        <Download />
      </Route>
      <Route component={Error} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


