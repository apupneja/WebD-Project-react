import Component from './component';
import React, {useState, useEffect} from "react";

//Below I tried to get data from the server.
//Tried 100s of different way and this was one of them
// This one isn't accurate. Pls fix if possible


const Main = () => {
    const[data, setData]= useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/inventory")
            .then((response) => response.json())
            .then((json) => setData(json));

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
            <div>Filter goes here</div>
            <div>
            {data && (data.map((dataset)=>(
                <div>
                    {dataset.product}
                </div>
            )))}
            </div>
        </div>
        </>
     );
}
 
export default Main;