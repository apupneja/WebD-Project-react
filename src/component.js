import React, {useState} from 'react';
import Popup from './popup';

//This is the component that needs to be looped or 
//some other way like from the youtube video I sent on
//the group

//Ignore the set quantity code.

const Component = (props) => { 
    const [pop, setpop] = useState(false);
    // const [{quantity}, setQuantity] = useState(0);
  
    // const handleSubmit = (evt) => {
    //     alert(`Submitting quantity ${props.quantity}`)
    //     console.log(quantity)
    // }

    return (  
        <div className="product">
            <div className="element">
                {props.id}
            </div>
            <div className="element">
                {props.name}
            </div>
            <div className="element">
                {props.location}
            </div>
            {/* <form onSubmit={handleSubmit}> 
                <input
                type="number"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                ></input>
            </form> */}
            <button className="moreInfo" onClick={()=>setpop(true)}>
                More info
            </button>
            <Popup trigger={pop} setTrigger={setpop}>
                    <h3>More Info</h3>
                    <p>
                        Price={props.price}<br></br>
                        Employee={props.section}<br></br>
                        Category={props.category}
                    </p>
            </Popup>
            
            
        </div>
    );
}

export default Component;