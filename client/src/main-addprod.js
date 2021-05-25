import { Button, Form, Message, Dropdown } from "semantic-ui-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import React from "react";


let inventory,
  categoryOptions = [],
  ID;
const MainAddProd = () => {
  const history = useHistory();
  const [productId, setProductId] = useState(null)
  const [newProd, setNewProd] = useState({
    
          name:"",
          cost: 0,
          quantity: 0,
          aisle: 0
    
  });
  useEffect(() => {
    axios
      .post("http://localhost:8000/api/inventory", {
        data: {
          cookie: localStorage.getItem("jwt"),
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        inventory = res.data.inventory;
        inventory.map((category) => {
          const object = {
            key: category._id,
            text: category.product,
            value: category._id,
          };
          categoryOptions.push(object);
        });
      })
      .catch(err=>{
        history.push("/");
      });
  }, []);

  const handleProd = (e) => {
      
      setNewProd({ 
        
            ...newProd.details, 
            name: e.target.value
        
    });
  }
  const handleCost = (e) => {

    setNewProd({ 
      
          ...newProd.details, 
          cost: e.target.value
    
  });
}
const handleQuantity = (e) => {
    
    setNewProd({ 
      
          ...newProd.details, 
          quantity: e.target.value
      
  });
}
const handleAisle = (e) => {
    
    setNewProd({
    
          ...newProd.details, 
          aisle: e.target.value
      
  });
}
  
  const handleClick = (e) => {
    e.preventDefault();
    ID=productId;
    axios
      .patch(`http://localhost:8000/api/add/${ID}`, {
        data: {
          cookie: localStorage.getItem("jwt"),
          newProd
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        localStorage.setItem("message", res.data.message);
        history.push("/admin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="edit">
      <Form error onSubmit={handleClick}>
      <Form.Input label="Category">
          <Dropdown
            placeholder="Category"
            fluid
            onChange ={(e,data)=>{setProductId(data.value)}}
            selection
            options={categoryOptions}
          />
        </Form.Input>
      <Form.Input
         label="Enter product to add:"
         required
         onChange={(e) => {handleProd}}
      />
      <Form.Input
         label="Cost:"
         required
         type='number'
         onChange={(e) => {handleCost}}
      />
      <Form.Input
         label="Quantity:"
         required
         type='number'
         onChange={(e) => {handleQuantity}}
      />
      <Form.Input
         label="Aisle number:"
         required
         type='number'
         onChange={(e) => {handleAisle}}
      />

    <Button>Submit</Button>
    </Form>
      
    </div>
  );
};

export default MainAddProd;