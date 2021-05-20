import axios from "axios";
import React from 'react';
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import ReactToPrint from 'react-to-print';
 import {Table, Label, Icon, Button, Container} from "semantic-ui-react"
 
const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const slice = (id) => {
  return id.slice(18,24)
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
            setInventory(res.data.inventory);
    }).catch(err=>{
            history.push("/");
    })
}, []);
    return ( 
      <Container>
        <div>
            <Button as='a' href='./admin' animated color='red' floated='left'>
            <Button.Content visible>Back</Button.Content>
                    <Button.Content hidden>
                      <Icon name='angle left' />
                    </Button.Content>
            </Button>
            <ReactToPrint
                trigger={() =>
                     <Button animated color='red' floated='right'>
                    <Button.Content visible>Print</Button.Content>
                    <Button.Content hidden>
                      <Icon name='print' />
                    </Button.Content>
                  </Button>
                }
                content={() => componentRef.current}
            />
            <Print inventory={inventory} ref={componentRef} />
        </div>
      </Container>
     );
}

class Print extends React.Component {
    render() {
      return (
        <div>
                {this.props.inventory.map(product=>(
                    <div>
                    <br></br>
                    <h1 key={product._id}>{capitalize(product.product)}</h1>
                    <ul>
                        <Table fixed>
                        <Table.Header>
                          <Table.Row>
                          <Table.HeaderCell>ID Number</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Cost</Table.HeaderCell>
                            <Table.HeaderCell>Quantity</Table.HeaderCell>
                            <Table.HeaderCell>Aisle Number</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        {product.details.map(detail=>(
                            <ComponentMod key={product._id}id={slice(detail._id)} name={detail.name} location={detail.aisle} quantity={detail.quantity} price={detail.cost} category={product.product}/>
                        ))}
                        </Table>
                    </ul>
                    </div>
                ))}
            </div>
      );
    }
}

const ComponentMod = (props) => { 
    return (
           
    
    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Label >{props.id}</Label>
        </Table.Cell>
        <Table.Cell>{props.name}</Table.Cell>
        <Table.Cell>{props.price}</Table.Cell>
        <Table.Cell>{props.quantity}</Table.Cell>
        <Table.Cell>{props.location}</Table.Cell>
      </Table.Row>
    </Table.Body>
  
    );
}
 
export default Download;
