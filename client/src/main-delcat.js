import { Button, Form, Message, Dropdown } from "semantic-ui-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import React from "react";

let inventory,
  categoryOptions = [],
  ID;

const MainDelcat = () => {
  const history = useHistory();
  const [productId, setProductId] = useState(null)
 
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

  const handleClick = (e) => {
    e.preventDefault();
    ID=productId;
    axios
      .delete(`http://localhost:8000/api/delete/${ID}`, {
        data: {
          cookie: localStorage.getItem("jwt"),
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
        <Form.Input label="Choose Category to delete">
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
        <h1>{productId}</h1>
        <Button>Submit</Button>
      </Form>
    </div>
  );
};

export default MainDelcat;