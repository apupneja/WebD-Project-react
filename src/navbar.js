// A basic navbar to add future links if needed
// with the name of the top.
import { Link,useHistory } from 'react-router-dom';

// Also, since we are keeping the app simple, All 
// the css we need is in the index.css

const Navbar = () => {
    const history = useHistory();
    return ( 
        <nav className="navbar">
            <div className="name">
                <span className="heading">
                    Tool
                </span>
                
                <Link to="./edit" className="link" >EDIT</Link>
                <Link to="./signup" className="link2" >SIGN UP</Link>
                <Link to="./admin" className="link3" >INVENTORY</Link>


            </div>
        </nav>
     );
}
 
export default Navbar;