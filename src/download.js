import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";

const Download = () => {
    const history= useHistory();
    useEffect(()=>{
        axios.post("http://localhost:8000/api/pdf", {
        data: {
            cookie: localStorage.getItem("jwt")
          },
          headers: {
            "Content-Type": "application/json"
          },
    }).then(res=>{
        history.push("/admin");
    })
    })
    return ( 
        <div></div>
     );
}
 
export default Download;