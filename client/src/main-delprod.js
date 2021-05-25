import { Button, Form, Message, Dropdown } from "semantic-ui-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import React from "react";

let inventory,
  categoryOptions = [],
  itemOptions = [],
  id,
  ID;

const MainDelprod = () => {
  const history = useHistory();
  const [items, setItems] = useState([]);
  const [productId, setProductId] = useState(null);
  const [detailsId, setDetailsId] = useState(null);
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

  function DisplayItems(e, data) {
    itemOptions = [];
    setProductId(data.value);
    ID = data.value;
    inventory.map((product) => {
      if (product._id === ID) {
        product.details.map((item) => {
          const object = {
            key: item._id,
            text: item.name,
            value: item._id,
          };
          itemOptions.push(object);
        });
        setItems(itemOptions);
      }
    });
  }

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:8000/api/delete/${ID}/${id}`, {
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
        <Form.Input label="Category">
          <Dropdown
            placeholder="Category"
            fluid
            onChange={DisplayItems}
            selection
            options={categoryOptions}
          />
        </Form.Input>
        {productId && (
          <div>
            <Form.Input label="Item">
              <Form.Dropdown
                placeholder="Items"
                fluid
                onChange={(e, data) => {
                  setDetailsId(data.value);
                  id = data.value;
                }}
                selection
                options={items}
              />
            </Form.Input>
            <Button>Submit</Button>
          </div>
        )}
      </Form>
    </div>
  );
};

export default MainDelprod;