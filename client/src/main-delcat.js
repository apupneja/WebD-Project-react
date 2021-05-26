import { Button, Form, Dropdown } from "semantic-ui-react";
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
    categoryOptions=[];
    axios
      .get("/api/inventory", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("jwt"),
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
      .delete(`/api/delete/${ID}`, {
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
        history.push("/");
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
        {productId && <Button>Submit</Button>}
      </Form>
    </div>
  );
};

export default MainDelcat;