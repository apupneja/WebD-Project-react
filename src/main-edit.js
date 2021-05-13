import { Button, Form, Message , Dropdown} from 'semantic-ui-react'
import axios from "axios";
import {useEffect, useState} from "react";
import { useHistory } from 'react-router';

const categoryOptions = [
    {
      key: 'Dairy',
      text: 'Dairy',
      value: 'Dairy',
    },
    {
      key: 'Electronic',
      text: 'Electronic',
      value: 'Electronic',
    },
  {
      key: 'Fruits',
      text: 'Fruits',
      value: 'Fruits',
    },
]

const MainEdit = () => {
  const [inventory, setInventory]=useState([]);
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
                <Form.Input label='Item' placeholder='Laptop' />
                <Form.Input label='Quantity' placeholder='3' />
                <Form.Input label='Category' placeholder='Electronics'>
                <Dropdown
                        placeholder='Category'
                        fluid
                        selection
                        options={categoryOptions}
                />
                </Form.Input>
                <Form.Input label='Location' placeholder='Location' />
                {/* <Message
                error
                header='Action Forbidden'
                content='You can only sign up for an account once with a given e-mail address.'
                /> */}
                <Button>Submit</Button>
            </Form>

        </div>
    
    );
}
 
export default MainEdit;