import Component from './component';
import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useHistory } from 'react-router';

// import ComponentToPrint from './ComponentToPrint';

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}
 
const Main = () => {
    const [inventory, setInventory]= useState([]);
    const history= useHistory();
  
    const [message, setMessage]= useState(localStorage.getItem("message"));
    setTimeout(()=>{
        localStorage.removeItem("message");
        setMessage("");
    }, 5000);
    useEffect(() => {
        axios.post("http://localhost:8000/api/inventory", {
            data: {
                cookie: localStorage.getItem("jwt")
              },
              headers: {
                "Content-Type": "application/json"
              },
        }).then(res=>{
            const token=res.data.jwt;
            if(token){
                setInventory(res.data.inventory);
            }
            else{
                console.log(res.data.message);
                history.push("/");
            }
        })
    }, []);
 
    return (
        <> 
        <h1>{message}</h1>
        <div className="container">
            <span className="headingText">
                Database
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <br></br>
        <div>
            <div>
                {inventory.map(product=>(
                    <>
                    <br></br>
                    <h1 key={product._id}>{capitalize(product.product)}</h1>
                    <ul>
                        {product.details.map(detail=>(
                            <Component key={product._id}id={detail._id} name={detail.name} location={detail.aisle} quantity={detail.quantity} price={detail.cost} category={product.product}/>
                        ))}
                    </ul>
                    </>
                ))}
            </div>
        </div>
        </div>
        </>
     );
}

export default Main;