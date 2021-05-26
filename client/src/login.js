import "./login.css";
import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Grid, Segment, Button, Icon } from "semantic-ui-react";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleClick = (e) => {
    setPasswordError("");
    setNameError("");
    e.preventDefault();
      axios
      .post("http://localhost:8000/api/login", {
        data: {
          name: name,
          password: password,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        localStorage.setItem("jwt", res.data.jwt);
        history.push("/admin");
      })
      .catch((err) => {
        setNameError(err.response.data.errors.name);
        setPasswordError(err.response.data.errors.password);
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
              <h2 style={{fontSize:"14px",color:"red"}}>{nameError}</h2>
              <h2 style={{fontSize:"14px",color:"red"}}>{passwordError}</h2>
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
              <Button animated>
                <Button.Content visible>Submit</Button.Content>
                <Button.Content hidden>
                  <Icon name="chevron right" />
                </Button.Content>
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Login;
