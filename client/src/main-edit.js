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

const MainEdit = () => {
  
  const history = useHistory();
  const [items, setItems] = useState([]);
  const [productId, setProductId] = useState(null);
  const [detailsId, setDetailsId] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");
  const [aisle, setAisle] = useState("");
  const [aisleError, setAisleError]= useState("");
  const [costError, setCostError]= useState("");
  const [quantityError, setQuantityError]= useState("");

  useEffect(() => {
    categoryOptions=[];
    axios
      .get("/api/inventory", {
        headers: {
          "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("jwt")}`,
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
    setCostError("");setAisleError("");setQuantityError("");
    axios
      .patch(`/api/edit/${ID}/${id}`, {
        data: {
          items: {
            quantity,
            cost,
            aisle,
          },
        },
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem("jwt")}`
        },
      })
      .then((res) => {
        localStorage.setItem("message", res.data.message);
        history.push("/admin");
      })
      .catch((err) => {
        if(err.message==="Invalid credentials"){
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
            {detailsId && (
              <div>
                <Form.Input
                required
                // type="number"  
                label="Quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <h3 style={{ fontSize: "14px", color: "red" }}>{quantityError}</h3>
                <Form.Input
                required
                  label="Cost"
                  // type="number"
                  icon="rupee"
                  onChange={(e) => setCost(e.target.value)}
                />
                <h3 style={{ fontSize: "14px", color: "red" }}>{costError}</h3>
                <Form.Input
                  label="Aisle Number"
                  required
                  // type="number"
                  onChange={(e) => setAisle(e.target.value)}
                />
                <h3 style={{ fontSize: "14px", color: "red" }}>{aisleError}</h3>
                <Button>Submit</Button>
              </div>
            )}
          </div>
        )}
      </Form>
    </div>
  );
};

export default MainEdit;