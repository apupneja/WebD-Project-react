
import {useEffect} from "react";
import {useHistory} from "react-router-dom";
import React from 'react';

const Logout = () => {
  const history = useHistory();
  useEffect(() => {
    localStorage.removeItem("jwt");
    fetch("http://localhost:8000/api/logout")
      .then((res) => {
        history.push("/");
      });
  }, []);
  return (<div></div>);

};
  
export default Logout;

