import { useState } from "react";
import { useHistory } from "react-router";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
import React from "react";

const MainSignup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [check, isChecked]= useState(false);

  function Checked(){
    isChecked(!check);
    console.log(check);
  }
  
  const handleClick = (e) => {
    e.preventDefault();
            axios.post("http://localhost:8000/api/signup", {
        data: {
          name: name,
          password: password,
          cookie: localStorage.getItem("jwt"),
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
        <Checkbox label='I want to create this new user' checked={check} onChange={Checked}/>
        </Form.Field>
        {check && <Button type="submit">Submit</Button>}
      </Form>
    </div>
  );
};

export default MainSignup;
