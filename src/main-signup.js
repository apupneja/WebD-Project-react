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
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function Checked(){
    isChecked(!check);
    console.log(check);
  }
  
  const handleClick = (e) => {
    e.preventDefault();
    setNameError("");
    setPasswordError("");
    if(name===""){
      setNameError("Please enter a username");
      setTimeout(()=>{
        setNameError("");
      },4000)
    }
    else if(name.length<5){
      setNameError("Username should have a minimum length of 5 characters");
      setTimeout(()=>{
        setNameError("");
      },4000)
    }
    else if(password===""){
      setPasswordError("Please enter a password");
      setTimeout(()=>{
        setPasswordError("");
      },4000)
    }
    else if(password.length<5){
      setPasswordError("Password length should be of minimum 5 characters");
      setTimeout(()=>{
        setPasswordError("");
      },4000)
    }
    else{
            axios.post("http://localhost:8000/api/signup", {
        data: {
          name: name,
          password: password,
          cookie: localStorage.getItem("jwt"),
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then(res=>{
        localStorage.setItem("message", res.data.message)
        history.push("/admin");
      })
      .catch(err=>{
        history.push("/");
      });
    }
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
          <h3>{nameError}</h3>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password for the user"
            name="password"
          />
          <h3>{passwordError}</h3>
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
