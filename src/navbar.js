// A basic navbar to add future links if needed
// with the name of the top.
import { Link} from 'react-router-dom';
import React from 'react';
// Also, since we are keeping the app simple, All 
// the css we need is in the index.css

const Navbar = () => {
    return ( 
      <div>
        <nav className="navbar">
            <div className="name">
                <Link to="./admin" className="link" >INVENTORY</Link>
                <Link to="./edit" className="link" >EDIT INVENTORY</Link>
                <Link to="./signup" className="link" >CREATE NEW ADMIN</Link>
                <Link to="./download" className="link">DOWNLOAD INVENTORY</Link>
                <Link to="./logout" className="link">LOGOUT</Link>
            </div>
        </nav>
      </div>
     );
}
 
export default Navbar;