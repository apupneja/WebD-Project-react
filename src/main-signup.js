import { useState } from "react";
import { useHistory } from "react-router";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
const jwt = require("jsonwebtoken");
const { secret } = require("./config/keys");

const MainSignup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const token = localStorage.getItem("jwt");

if (token) {
    jwt.verify(token, `${secret}`, (err, decodedToken) => {
      if (err) {
        history.push("/");
      }
    })}
    else{
        history.push("/");
    }
  const handleClick = (e) => {
    e.preventDefault();
            axios.post("http://localhost:8000/api/signup", {
        data: {
          name: name,
          password: password,
          cookie: token,
        },
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Origin": "http://localhost:3000"
        },
      }).then(res=>{
        localStorage.setItem("message", res.data.message)
        history.push("/admin");
      });
  };
  return (
    <div className="edit">
      <Form onSubmit={handleClick}>
        <Form.Field>
          <label>New Username</label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name of the new user"
            name="name"
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password for the user"
            name="password"
          />
        </Form.Field>
        <Form.Field>
          <Checkbox label="I want to create this user" />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default MainSignup;
