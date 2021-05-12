import { useEffect } from "react";
import { useHistory } from "react-router";

const Logout = () => {
    const history = useHistory();
  useEffect(() => {
      localStorage.removeItem("jwt");
    fetch("http://localhost:8000/api/logout");
    history.push("/");
  }, []);
  return (
    <div></div>
  );
};

export default Logout;
