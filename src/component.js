import React, {useState} from 'react';
import Popup from './popup';

const Component = (props) => { 
    const [pop, setpop] = useState(false);

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
            <button className="moreInfo" onClick={()=>setpop(true)}>
                More info
            </button>
            <Popup trigger={pop} setTrigger={setpop}>
                    <h3>More Info</h3>
                    <p>
                        Price : {props.price}<br></br>
                        Category : {props.category}
                    </p>
            </Popup>
            
            
        </div>
    );
}

export default Component;