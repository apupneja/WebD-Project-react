import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  MenuHeader,
  Segment,
  Sidebar,
  Button,
  SegmentGroup,
  Container,
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
          <Button onClick={() => setVisible(!visible)}>
          <Icon name="bars" />
        </Button>
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
              <Icon name="warehouse" />
              <Link to="./admin" className="link" onClick={()=> setVisible(false)}>
                Inventory
              </Link>
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="pencil" />
              <Link to="./edit" className="link" onClick={()=> setVisible(false)}>
                Edit Inventory
              </Link>
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="plus circle" />
              <Link to="./addcat" className="link"  onClick={()=> setVisible(false)}>
                Create a Category
              </Link>
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="plus" />
              <Link to="./addprod" className="link" onClick={()=> setVisible(false)}>
                Add a product
              </Link>
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="delete" />
              <Link to="./delprod" className="link" onClick={()=> setVisible(false)}>
                Delete a product
              </Link>
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="trash" />
              <Link to="./delcat" className="link" onClick={()=> setVisible(false)}>
                Delete a category
              </Link>
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="user plus" />
              <Link to="./signup" className="link" onClick={()=> setVisible(false)}>
                Create New Admin
              </Link>
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="download" />
              <Link to="./download" className="link" onClick={()=> setVisible(false)}>
                Download Inventory
              </Link>
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="sign-out" />
              <Link to="./logout" className="link" onClick={()=> setVisible(false)}>
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
