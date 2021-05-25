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
  const [productId, setProductId] = useState(null);
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
              type="number"
              onChange={(e) => {
                handleCost(e);
              }}
            />
            <Form.Input
              label="Quantity:"
              required
              type="number"
              onChange={(e) => {
                handleQuantity(e);
              }}
            />
            <Form.Input
              label="Aisle number:"
              required
              type="number"
              onChange={(e) => {
                handleAisle(e);
              }}
            />
          </div>
        )}
        <h2>
          {productId},{JSON.stringify(newProd)}
        </h2>
        <Button>Submit</Button>
      </Form>
    </div>
  );
};

export default MainAddProd;
