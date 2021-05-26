import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Main from "./main";
import Error from "./error";
import Login from "./login";
import MainEdit from "./main-edit";
import MainSignup from "./main-signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Logout from "./logout";
import Download from "./download";
import SideNav from "./Sidenav";
import MainAddCat from "./main-addcat";
import MainAddProd from "./main-addprod";
import MainDelprod from "./main-delprod";
import MainDelcat from "./main-delcat";
import './index.css';

function App() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1144px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1145px)",
  });
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

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
