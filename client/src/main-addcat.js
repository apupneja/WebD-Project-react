import { Button, Form, Message, Dropdown } from "semantic-ui-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import React from "react";



const MainAddCat = () => {
  const history = useHistory();
  const [newCat, setNameCat] = useState({
    product: "",
    details:[]
  });
  const [items, setItems] = useState({
    name:"",
    cost: 0,
    quantity: 0,
    aisle: 0
  })
  const [aisleError, setAisleError]= useState("");
  const [costError, setCostError]= useState("");
  const [quantityError, setQuantityError]= useState("");
  
  const handleCat = (e) => {
    setNameCat({ 
        ...newCat,
        product: e.target.value,
    })
  }
  const handleProd = (e) => {
      setItems({ 
        ...items,
            name: e.target.value
    });
    setNameCat({
      ...newCat,
      details:[items]
    })
  }
  const handleCost = (e) => {
      setItems({ 
        ...items,
            cost: e.target.value
    });
    setNameCat({
      ...newCat,
      details:[items]
    })
}
const handleQuantity = (e) => {
  setItems({ 
    ...items,
        quantity: e.target.value
});
setNameCat({
  ...newCat,
  details:[items]
})
}
const handleAisle = (e) => {
  setItems({ 
    ...items,
        aisle: e.target.value
});
setNameCat({
  ...newCat,
  details:[items]
})
}
  const handleClick = (e) => {
    e.preventDefault();
    
    axios
      .patch(`http://localhost:8000/api/add`, {
        data: {
          new: newCat
        },
        headers: {
          "Authorization": localStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        localStorage.setItem("message", res.data.message);
        history.push("/admin");
      })
      .catch((err) => {
        if(err.response.data.message==="Invalid credentials"){
          history.push("/");
        }
        else{
          setCostError(err.response.data.errors.cost);
          setQuantityError(err.response.data.errors.quantity);
          setAisleError(err.response.data.errors.aisle);
        }
      });
  };

  return (
    <div className="edit">
      <Form error onSubmit={handleClick}>
      <Form.Input
         label="Enter new Category"
         required
         onChange={(e) => {handleCat(e)}}
      />
      <Form.Input
         label="Enter product to add:"
         required
         onChange={(e) => {handleProd(e)}}
      />
      <Form.Input
         label="Cost:"
         required
         onChange={(e) => {handleCost(e)}}
      />
      <h3 style={{ fontSize: "14px", color: "red" }}>{costError}</h3>
      <Form.Input
         label="Quantity:"
         required
         onChange={(e) => {handleQuantity(e)}}
      />
      <h3 style={{ fontSize: "14px", color: "red" }}>{quantityError}</h3>
      <Form.Input
         label="Aisle number:"
         required
         onChange={(e) => {handleAisle(e)}}
      />
      <h3 style={{ fontSize: "14px", color: "red" }}>{aisleError}</h3>
    <Button>Submit</Button>
    </Form>
      
    </div>
  );
};

export default MainAddCat;