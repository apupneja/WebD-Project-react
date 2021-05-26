import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
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
import MainDelcat from './main-delcat'
import MainDelprod from './main-delprod'
import MainAddCat from './main-addcat'
import MainAddProd from './main-addprod'
import App from "./App"



  ReactDOM.render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>,
    document.getElementById('root')
  );
  



