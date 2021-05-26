import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Icon,
  Menu,
  Sidebar,
} from "semantic-ui-react";
import Download from "./download";
import Logout from "./logout";
import Main from "./main";
import MainAddCat from "./main-addcat";
import MainAddProd from "./main-addprod";
import MainDelcat from "./main-delcat";
import MainDelprod from "./main-delprod";
import MainEdit from "./main-edit";
import MainSignup from "./main-signup";

function Sidenav() {
  const [visible, setVisible] = React.useState(false);
  let {pathname} = useLocation();
  
  return (
        <div>
        <div className="topnav">
        {/* <Button className="btn" onClick={() => setVisible(!visible)}>  */}
          <Icon inverted name="bars" onClick={() => setVisible(!visible)}/>
        {/* </Button> */}
        </div>
        <Sidebar.Pushable className="sidenav">
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            color="blue"
            onHide={() => setVisible(false)}
            vertical
            visible={visible}
            width="wide"
          >
            <Menu.Item as="a">
              <Link to="./admin" className="link" onClick={()=> setVisible(false)}>
              <Icon name="warehouse" />
                Inventory
              </Link>
            </Menu.Item>
            <Menu.Item as="a">
              <Link to="./edit" className="link" onClick={()=> setVisible(false)}>
              <Icon name="pencil" />
                Edit Inventory
              </Link>
            </Menu.Item>
            <Menu.Item as="a">
              
              <Link to="./addcat" className="link"  onClick={()=> setVisible(false)}>
              <Icon name="plus circle" />
                Create a Category
              </Link>
            </Menu.Item>
            <Menu.Item as="a">
              <Link to="./addprod" className="link" onClick={()=> setVisible(false)}>
              <Icon name="plus" />
                Add a product
              </Link>
            </Menu.Item>
            <Menu.Item as="a">
              <Link to="./delprod" className="link" onClick={()=> setVisible(false)}>
              <Icon name="delete" />
                Delete a product
              </Link>
            </Menu.Item>
            <Menu.Item as="a">
              
              <Link to="./delcat" className="link" onClick={()=> setVisible(false)}>
              <Icon name="trash" />
                Delete a category
              </Link>
            </Menu.Item>
            <Menu.Item as="a">
              <Link to="./signup" className="link" onClick={()=> setVisible(false)}>
              <Icon name="user plus" />
                Create New Admin
              </Link>
            </Menu.Item>
            <Menu.Item as="a">
              <Link to="./download" className="link" onClick={()=> setVisible(false)}>
              <Icon name="download" />
                Download Inventory
              </Link>
            </Menu.Item>
            <Menu.Item as="a">
              <Link to="./logout" className="link" onClick={()=> setVisible(false)}>
              <Icon name="sign-out" />
                Log out
              </Link>
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={visible}>
              {pathname === "/admin" &&  <Main /> }
              {pathname === "/edit" && <MainEdit/>}
              {pathname === "/addcat" && <MainAddCat />}
              {pathname === "/addprod" && <MainAddProd />}
              {pathname === "/delprod" && <MainDelprod />}
              {pathname === "/delcat" && <MainDelcat />}
              {pathname === "/signup" && <MainSignup />}
              {pathname === "/download" && <Download />}
              {pathname === "/logout" && <Logout />}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        </div>
  );
}

export default Sidenav;
