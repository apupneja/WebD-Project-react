import { Button, Form, Dropdown } from "semantic-ui-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import React from "react";

let inventory,
  categoryOptions = [],
  ID;
const MainAddProd = () => {
  const history = useHistory();
  const [productId, setProductId] = useState(null);
  const [aisleError, setAisleError]= useState("");
  const [costError, setCostError]= useState("");
  const [quantityError, setQuantityError]= useState("");
  const [newProd, setNewProd] = useState({
    name: "",
    cost: 0,
    quantity: 0,
    aisle: 0,
  });
  useEffect(() => {
    categoryOptions = [];
    axios
      .get("http://localhost:8000/api/inventory", {
        headers: {
          Authorization: localStorage.getItem("jwt"),
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
      .catch((err) => {
        history.push("/");
      });
  }, []);

  const handleProd = (e) => {
    setNewProd({
      ...newProd,
      name: e.target.value,
    });
  };
  const handleCost = (e) => {
    setNewProd({
      ...newProd,
      cost: e.target.value,
    });
  };
  const handleQuantity = (e) => {
    setNewProd({
      ...newProd,
      quantity: e.target.value,
    });
  };
  const handleAisle = (e) => {
    setNewProd({
      ...newProd,
      aisle: e.target.value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    ID = productId;
    axios
      .patch(`http://localhost:8000/api/add/${ID}`, {
        data: {
          new: newProd,
        },
        headers: {
          Authorization: localStorage.getItem("jwt"),
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
      <h3>Add a product</h3>
      <Form error onSubmit={handleClick}>
        <Form.Input label="Category">
          <Dropdown
            placeholder="Category"
            fluid
            onChange={(e, data) => {
              setProductId(data.value);
            }}
            selection
            options={categoryOptions}
          />
        </Form.Input>
        {productId && (
          <div>
            <Form.Input
              label="Enter product to add:"
              required
              onChange={(e) => {
                handleProd(e);
              }}
            />
            <Form.Input
              label="Cost:"
              required
              onChange={(e) => {
                handleCost(e);
              }}
            />
             <h4 style={{ fontSize: "14px", color: "red" }}>{costError}</h4>
            <Form.Input
              label="Quantity:"
              required
              onChange={(e) => {
                handleQuantity(e);
              }}
            />
            <h5 style={{ fontSize: "14px", color: "red" }}>{quantityError}</h5>
            <Form.Input
              label="Aisle number:"
              required
              onChange={(e) => {
                handleAisle(e);
              }}
            />
             <h5 style={{ fontSize: "14px", color: "red" }}>{aisleError}</h5>
             <Button>Submit</Button>
          </div>
        )}
      </Form>
    </div>
  );
};

export default MainAddProd;
