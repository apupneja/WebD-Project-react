import { Button, Form, Message, Dropdown } from "semantic-ui-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import React from "react";

let categoryOptions = [], inventory;

const MainEdit = () => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [value, setValue] = useState("");
  const history = useHistory();
  const [productId, setProductId] = useState("");
  const [detailsId, setDetailsId] = useState("");
  const [details, setDetails] = useState({});

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
        const token = res.data.jwt;
        if (token) {
          inventory = res.data.inventory;
          inventory.map((category) => {
            const object = {
              key: category._id,
              text: category.product,
              value: category._id,
            };
            categoryOptions.push(object);
          });
          setCategoryOptions(categoryOptions);
        } else {
          console.log(res.data.message);
          history.push("/");
        }
      });
  }, []);

  const handleClick = (e) =>{
    e.preventDefault();
    
  }

  return (
    <div className="edit">
      <Form error  onSubmit={handleClick}>
        <Form.Input label="Category">
          <Form.Dropdown
            placeholder="Category"
            fluid
            onChange={(e, data)=> setProductId(data.value)}
            selection
            options={categoryOptions}
          />
          </Form.Input>
          <Form.Input label="Item" placeholder="Laptop" onChange={(e) => setProductId(e.target.value)} />
          <Form.Input label="Quantity" placeholder="3" />
        <Form.Input label="Location" placeholder="Location" />
        <Button>Submit</Button>
      </Form>
      <h1>{productId}</h1>
    </div>
  );
};

export default MainEdit;
