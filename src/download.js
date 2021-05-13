import axios from "axios";
import React from 'react';
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import ReactToPrint from 'react-to-print';
 import {Table, Label, Menu, Icon, Button, Segment} from "semantic-ui-react"
 
const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
 
const Download = () => {
    const [inventory, setInventory]=useState([]);
    const componentRef = useRef();
    const history= useHistory();
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
        <div>
            <ReactToPrint
                trigger={() =><Segment inverted>
                     <Button animated inverted color='black'>
                    <Button.Content visible>Print</Button.Content>
                    <Button.Content hidden>
                      <Icon name='print' />
                    </Button.Content>
                  </Button>
                </Segment>}
                content={() => componentRef.current}
            />
            <Print inventory={inventory} ref={componentRef} />
        </div>
     );
}

class Print extends React.Component {
    render() {
      return (
        <div>
                {this.props.inventory.map(product=>(
                    <>
                    <br></br>
                    <h1 key={product._id}>{capitalize(product.product)}</h1>
                    <ul>
                        {product.details.map(detail=>(
                            <ComponentMod key={product._id}id={detail._id} name={detail.name} location={detail.aisle} quantity={detail.quantity} price={detail.cost} category={product.product}/>
                        ))}
                    </ul>
                    </>
                ))}
            </div>
      );
    }
}

const ComponentMod = (props) => { 
    return (
            <Table fixed>
    <Table.Header>
      <Table.Row>
      <Table.HeaderCell>ID Number</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Cost</Table.HeaderCell>
        <Table.HeaderCell>Aisle Number</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Label ribbon>{props.id}</Label>
        </Table.Cell>
        <Table.Cell>{props.name}</Table.Cell>
        <Table.Cell>{props.price}</Table.Cell>
        <Table.Cell>{props.location}</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
    );
}
 
export default Download;