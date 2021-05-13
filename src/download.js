import axios from "axios";
import React from 'react';
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import ReactToPrint from 'react-to-print';
 
 
const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
 
const Download = () => {
    const [inventory, setInventory]=useState([]);
    const componentRef = useRef();
    const history= useHistory();
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
        <div>
            <ReactToPrint
                trigger={() => <button>Print</button>}
                content={() => componentRef.current}
            />
            <Print inventory={inventory} ref={componentRef} />
        </div>
     );
}

class Print extends React.Component {
    render() {
      return (
        <div>
                {this.props.inventory.map(product=>(
                    <>
                    <br></br>
                    <h1 key={product._id}>{capitalize(product.product)}</h1>
                    <ul>
                        {product.details.map(detail=>(
                            <ComponentMod key={product._id}id={detail._id} name={detail.name} location={detail.aisle} quantity={detail.quantity} price={detail.cost} category={product.product}/>
                        ))}
                    </ul>
                    </>
                ))}
            </div>
      );
    }
}

const ComponentMod = (props) => { 
    return (
        <div className="productMod">
            <div className="element">
                {props.id}
            </div>
            <div className="element">
                {props.name}
            </div>
            <div className="element">
                {props.location}
            </div>
            <div className="element">
                {props.price}
            </div>
            <div className="element">
                {props.category}
            </div>
            
            
        </div>
    );
}
 
export default Download;