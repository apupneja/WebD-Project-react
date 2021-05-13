import { Button, Form, Message , Dropdown} from 'semantic-ui-react'
import axios from "axios";
import {useEffect, useState} from "react";
import { useHistory } from 'react-router';

let categoryoptions=[];

const MainEdit = () => {
  const [inventory, setInventory]=useState([]);
  const [categoryOptions, setCategoryOptions]= useState([]);
  const history=useHistory();
  useEffect(() => {
    axios.post("http://localhost:8000/api/inventory", {
        data: {
            cookie: localStorage.getItem("jwt")
          },
          headers: {
            "Content-Type": "application/json"
          },
    }).then(res=>{
        const token=res.data.jwt;
        if(token){
            setInventory(res.data.inventory);
            inventory.map(category=>{
              const object={key: category.product,
                text: category.product,
                value: category.product,};
              categoryoptions.push(object);
            });
            setCategoryOptions(categoryoptions);
        }
        else{
            console.log(res.data.message);
            history.push("/");
        }
    })
}, []);
    return ( 
        <div className="edit">
            <Form error>
            <Form.Input label='Category' placeholder='Enter the type of product'>
                <Dropdown
                        placeholder='Category'
                        fluid
                        selection
                        options={categoryOptions}
                />
                <Form.Input label='Item' placeholder='Laptop' />
                <Form.Input label='Quantity' placeholder='3' />
                </Form.Input>
                <Form.Input label='Location' placeholder='Location' />
                <Button>Submit</Button>
            </Form>

        </div>
    
    );
}
 
export default MainEdit;