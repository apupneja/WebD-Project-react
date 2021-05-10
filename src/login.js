import "./login.css";
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react'

//Used Semantic UI. This is the landing+login page.

const Login = () => {
  return (
      <div className="back">
          <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form size="large">
          <Segment stacked>
              <br></br>

              <div className="header">LOG-IN</div>
              
              <br></br>
              <br></br>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />
            <br></br>
            <Link to="/admin"  className="login">Login</Link>

          </Segment>
        </Form>
      </Grid.Column>
    </Grid>

      </div>
    
  );
};

export default Login;
