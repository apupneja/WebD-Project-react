import Component from './component';
import React, {useState, useEffect} from "react";

const Main = () => {
    const[inventory, setInventory]= useState([]);

    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
  
    const [message, setMessage]= useState(localStorage.getItem("message"));
    setTimeout(()=>{
        localStorage.removeItem("message");
        setMessage("");
    }, 5000);
    useEffect(() => {
        fetch("http://localhost:8000/api/inventory")
            .then((response) => response.json())
            .then((json) =>{
                setInventory(json.inventory);
                console.log(inventory);
            });

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
                    <h1>{capitalize(product.product)}</h1>
                    <ul>
                        {product.details.map(detail=>(
                            <Component id={detail._id} name={detail.name} location={detail.aisle} quantity={detail.quantity} price={detail.cost} category={product.product}/>
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