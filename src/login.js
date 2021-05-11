import "./login.css";
import { useHistory } from "react-router-dom";
import {
  Form,
  FormButton,
  Grid,
  Segment,
} from "semantic-ui-react";
import { useState } from "react";
import axios from "axios";
const jwt = require("jsonwebtoken");
//Used Semantic UI. This is the landing+login page.

const Login = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/login", {
        data: {
          name: name,
          password: password,
        },
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        history.push("/admin");
        console.log(res);
      });
  };

  return (
    <div className="back">
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Form size="large" onSubmit={handleClick}>
            <Segment stacked>
              <br></br>

              <div className="header">LOG-IN</div>

              <br></br>
              <br></br>
              <Form.Input
                fluid
                type="text"
                icon="user"
                iconPosition="left"
                name="name"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Input
                fluid
                icon="lock"
                name="password"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br></br>
              <FormButton>Submit</FormButton>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Login;
