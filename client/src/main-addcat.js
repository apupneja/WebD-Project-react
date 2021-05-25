import { Button, Form, Message, Dropdown } from "semantic-ui-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import React from "react";



const MainAddCat = () => {
  const history = useHistory();
  const [newCat, setNameCat] = useState({
    product: "",
    details:[
        {
          name:"",
          cost: 0,
          quantity: 0,
          aisle: 0
        }
    ],
  });
  
  
  const handleCat = (e) => {
    setNameCat({ 
        ...newCat,
        product: e.target.value,
        details: {
            ...newCat.details, 
        }
    })
  }
  const handleProd = (e) => {
      setNameCat({ 
        ...newCat,
        details: {
            ...newCat.details, 
            name: e.target.value
        }
    });
  }
  const handleCost = (e) => {
    setNameCat({ 
      ...newCat,
      details: {
          ...newCat.details, 
          cost: e.target.value
      }
  });
}
const handleQuantity = (e) => {
    setNameCat({ 
      ...newCat,
      details: {
          ...newCat.details, 
          quantity: e.target.value
      }
  });
}
const handleAisle = (e) => {
    
  setNameCat({ 
    ...newCat,
    details: {
        ...newCat.details, 
        aisle: e.target.value
    }
});
}
  const handleClick = (e) => {
    e.preventDefault();
    
    axios
      .patch(`http://localhost:8000/api/add`, {
        data: {
          cookie: localStorage.getItem("jwt"),
          newCat
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
      <Form.Input
         label="Enter new Category"
         required
         onChange={(e) => {handleCat}}
      />
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

export default MainAddCat;