import React from 'react'
import { Link } from 'react-router-dom'
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
    Button
  } from 'semantic-ui-react'
import Main from './main'

function Sidenav() {
    const [visible, setVisible] = React.useState(false)

  return (
    <Grid columns={1} black>
      <Grid.Column>
          <Button  onClick={()=>setVisible(!visible)}><Icon name="bars"/></Button>
      </Grid.Column>

      <Grid.Column>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={() => setVisible(false)}
            vertical
            visible={visible}
            width='thin'
          >
            <Menu.Item as='a'>
              <Icon name='warehouse' />
              <Link to="./admin" className="link" >Inventory</Link>
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='pencil' />
              <Link to="./edit" className="link" >Edit Inventory</Link>
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='user plus' />
              <Link to="./signup" className="link" >Create New Admin</Link>
            </Menu.Item>
            <Menu.Item as='a'>
                <Icon name="download"/>
                <Link to="./download" className="link">Download Inventory</Link>
            </Menu.Item>
            <Menu.Item as='a'>
                <Icon name="sign-out"/>
                <Link to="./logout" className="link">Log out</Link>
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            <Segment basic>
              <Main/>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Grid.Column>
    </Grid>
  )
}

export default Sidenav

