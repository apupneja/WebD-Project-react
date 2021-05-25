// A basic navbar to add future links if needed
// with the name of the top.
import { Link} from 'react-router-dom';
import React,{useState} from 'react';
import { useMediaQuery } from 'react-responsive';
import {Icon} from 'semantic-ui-react';
// Also, since we are keeping the app simple, All 
// the css we need is in the index.css

const Navbar = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1144px)' })
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1145px)'
  })
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
    return ( 
      <div>
      {isTabletOrMobile && (
      <div>
        
        <nav className="navbar">
        <Icon inverted name={sidebar?'close':'bars'} onClick={showSidebar}/>
          {sidebar && (
              <div className="name">
                <Link to="./admin" className="link" >INVENTORY</Link>
                <br></br>
                <Link to="./edit" className="link" >EDIT INVENTORY</Link>
                <br></br>
                <Link to="./delcat" className="link">DELETE CATEGORY</Link>
                <br></br>
                <Link to="./delprod" className="link">DELETE PRODUCT</Link>
                <br></br>
                <Link to="./addcat" className="link">ADD CATEGORY</Link>
                <br></br>
                <Link to="./addprod" className="link" >ADD PRODUCT</Link>
                <br></br>
                <Link to="./signup" className="link" >CREATE NEW ADMIN</Link>
                <br></br>
                <Link to="./download" className="link">DOWNLOAD INVENTORY</Link>
                <br></br>
                <Link to="./logout" className="link">LOGOUT</Link>
            </div>)}
        </nav>
      </div>
      )}
      {isDesktopOrLaptop && (
      <div>
        <nav className="navbar">
        <Icon inverted name={sidebar?'close':'bars'} onClick={showSidebar}/>
        {sidebar && (
            <div className="name">
                <Link to="./admin" className="link" >INVENTORY</Link>
                <br></br>
                <Link to="./edit" className="link" >EDIT INVENTORY</Link>
                <br></br>
                <Link to="./delcat" className="link">DELETE CATEGORY</Link>
                <br></br>
                <Link to="./delprod" className="link">DELETE PRODUCT</Link>
                <br></br>
                <Link to="./addcat" className="link">ADD CATEGORY</Link>
                <br></br>
                <Link to="./addprod" className="link" >ADD PRODUCT</Link>
                <br></br>
                <Link to="./signup" className="link" >CREATE NEW ADMIN</Link>
                <br></br>
                <Link to="./download" className="link">DOWNLOAD INVENTORY</Link>
                <br></br>
                <Link to="./logout" className="link">LOGOUT</Link>
            </div>)}
        </nav>
      </div>
      )}
      </div>
     );
}
 
export default Navbar;