// A basic navbar to add future links if needed
// with the name of the top.
import { Link} from 'react-router-dom';

// Also, since we are keeping the app simple, All 
// the css we need is in the index.css

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <div className="name">

                <Link to="./logout" className="link">LOGOUT</Link>
                <Link to="./edit" className="link" >EDIT</Link>
                <Link to="./signup" className="link" >SIGN UP</Link>
                <Link to="./admin" className="link" >INVENTORY</Link>

            </div>
        </nav>
     );
}
 
export default Navbar;