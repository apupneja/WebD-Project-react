import Component from "./component";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
 
// import ComponentToPrint from './ComponentToPrint';
 
const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
 
const slice = (id) => {
  return id.slice(18, 24);
};
 
let datalist=[];
 
const Main = () => {
    const column=["details"];
  const [data, setData]=useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();
  const [message, setMessage] = useState(localStorage.getItem("message"));
 
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/inventory", {
        headers: {
          "Authorization": localStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        datalist=res.data.inventory;
        setData(datalist);
      })
      .catch((err) => {
        history.push("/");
      });
  }, []);
 
  setTimeout(() => {
    localStorage.removeItem("message");
    setMessage("");
  }, 5000);
 
  function Filter(e){
      setSearchTerm(e.target.value);
      Filterdata(e.target.value);
  }
 
  function Filterdata(value){
    const lcValue = value.toLowerCase().trim();
    if(lcValue===""){
        setData(datalist);
    }
    else{
        const filteredData= datalist.filter(item=>{
            return Object.keys(item).some(key=>column.includes(key)?false: item[key].toString().toLowerCase().includes(lcValue))
        })
        setData(filteredData)
    }
  }
  return (
    <div>
      <h1>{message}</h1>
      <div className="container">
        <span className="headingText">Database</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <br></br>
        <div className="search">
          <input
            type="text"
            value={searchTerm}
            placeholder="search"
            onChange={(e) => {
              Filter(e);
            }}
          ></input>
          {data.length === 0 && <span>No records found to display!</span>}
        </div>
        <h1>{searchTerm}</h1>
        <div>
          <div className="filter">
            {data.map((product) => (
              <div id={product._id}>
                <br></br>
                <h1 key={product._id}>{capitalize(product.product)}</h1>
                <ul>
                  {/* <Component id="ID" name="Available Product" location="Aisle Number" quantity="Available amount" /> */}
                  {product.details.map((detail) => (
                    <Component
                      key={detail._id}
                      id={slice(detail._id)}
                      name={detail.name}
                      location={detail.aisle}
                      quantity={detail.quantity}
                      price={detail.cost}
                      category={product.product}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Main;