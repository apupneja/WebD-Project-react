import React,{useState} from 'react';
import { useMediaQuery } from 'react-responsive';
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
import SideNav from './Sidenav';

function App() {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1144px)' })
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1145px)'
  })
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

    return (
        <Router>
      <Switch>
      <Route path='/' component={Login} exact/>
      <Route path='/admin'>
        {isDesktopOrLaptop && <Navbar /> }
        {isDesktopOrLaptop && <Main/> }
        {isTabletOrMobile &&  <SideNav/>}
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
      <Route path='/download'>
        <Navbar />
        <Download />
      </Route>
      <Route component={Error} />
      </Switch>
    </Router>
    )
}

export default App
