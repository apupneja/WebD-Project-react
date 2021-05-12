import Component from './component';
import React, {useState, useEffect} from "react";

//Below I tried to get data from the server.
//Tried 100s of different way and this was one of them
// This one isn't accurate. Pls fix if possible


const Main = () => {
    const[inventory, setInventory]= useState([]);
    const [message, setMessage]= useState(localStorage.getItem("message"));
    setTimeout(()=>{
        localStorage.removeItem("message");
        setMessage("");
    }, 5000);
    useEffect(() => {
        fetch("http://localhost:8000/api/inventory")
            .then((response) => response.json())
            .then((json) =>{
                setInventory(json);
                // console.log(json);
                console.log(inventory);
            });
    }, []);

    return (
        <> 
        <div className="container">
            <span className="headingText">
                Database
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button className="filter">Filter</button>
            <Component id="1" name="product" section="employee" location="2" quantity="4" category="elec" price="100"/>
        </div>
        <div>
            <h1>{message}</h1>
            <div>Filter goes here</div>
            <div>
            {inventory.map(product=>(
                <>
                <h1>{product.product}</h1>
                <ul>
                    {product.details.map(detail=>(
                        <div>
                            <p>{detail.name} Cost : {detail.cost}</p>
                        </div>
                    ))}
                </ul>
                </>
            ))}
            </div>
        </div>
        </>
     );
}
 
export default Main;