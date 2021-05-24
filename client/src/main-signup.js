import { useState } from "react";
import { useHistory } from "react-router";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
import React from "react";

const MainSignup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [check, isChecked] = useState(false);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function Checked() {
    isChecked(!check);
    console.log(check);
  }

  const handleClick = (e) => {
    e.preventDefault();
    setNameError("");
    setPasswordError("");
    axios
      .post("http://localhost:8000/api/signup", {
        data: {
          name: name,
          password: password,
          cookie: localStorage.getItem("jwt"),
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        localStorage.setItem("message", res.data.message);
        history.push("/admin");
      })
      .catch((err) => {
        if(err.response.data.message === "Invalid credentials"){
          history.push("/");
        }
        else{
          setNameError(err.response.data.errors.name);
          setPasswordError(err.response.data.errors.password);
        }
      });
  }
  return (
    <div className="edit">
      <Form onSubmit={handleClick}>
        <Form.Field>
          <label style={{ fontSize: "16px" }}>New Username</label>
          <h3 style={{ fontSize: "14px", color: "red" }}>{nameError}</h3>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name of the new user"
            name="name"
          />
        </Form.Field>
        <Form.Field>
          <label style={{ fontSize: "16px" }}>Password</label>
          <h3 style={{ fontSize: "14px", color: "red" }}>{passwordError}</h3>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password for the user"
            name="password"
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            label="I want to create this new user"
            checked={check}
            onChange={Checked}
          />
        </Form.Field>
        {check && <Button type="submit">Submit</Button>}
      </Form>
    </div>
  );
};

export default MainSignup;
