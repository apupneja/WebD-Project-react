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
          password: password
        },
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem("jwt")}`
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
      <h3>Create New Admin</h3>
      <Form onSubmit={handleClick}>
        <Form.Field>
          <label style={{ fontSize: "16px" }}>New Username</label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name of the new user"
            name="name"
          />
          <h3 style={{ fontSize: "14px", color: "red" }}>{nameError}</h3>
        </Form.Field>
        <Form.Field>
          <label style={{ fontSize: "16px" }}>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password for the user"
            name="password"
          />
        </Form.Field>
        <h3 style={{ fontSize: "14px", color: "red" }}>{passwordError}</h3>
        <Form.Field>
          <Checkbox
            label="I want to create this new user"
            checked={check}
            onChange={Checked}
          />
        </Form.Field>
        {check && <Button  className="submit"  type="submit">Submit</Button>}
      </Form>
    </div>
  );
};

export default MainSignup;
