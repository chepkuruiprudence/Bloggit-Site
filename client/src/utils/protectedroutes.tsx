import { Outlet, Navigate } from "react-router-dom";

const Protectedroutes = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/Login" />;
};


export default Protectedroutes
