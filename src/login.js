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
const {secret}= require("./config/keys");

const Login = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]=useState("");
  
  const handleClick = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/login", {
        data: {
          name: name,
          password: password,
        },
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Origin": "http://localhost:3000"
        },
      })
      .then((res) => {
        const token= res.data.jwt;
        //This is the jwt
        console.log(res.data);
        //Decode the token
        if (token) {
          jwt.verify(token, `${secret}`, (err, decodedToken) => {
            if (err) {
              setError("Error occured, Try again")
              history.push("/");
            } else {
              console.log(decodedToken);
              history.push("/admin");
            }
          });
        } else {
          setError(res.data.message);
          history.push("/");
        }
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
              <h2>{error}</h2>
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
