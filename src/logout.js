import {useEffect} from "react";
import {useHistory} from "react-router-dom";

const Logout = () => {
  const history = useHistory();
  useEffect(() => {
    localStorage.removeItem("jwt");
    fetch("http://localhost:8000/api/logout")
      .then((res) => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        history.push("/admin");
      });
  }, []);
  return <div></div>;
}
 
export default Logout;