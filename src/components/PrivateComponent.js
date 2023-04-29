import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
  // const { user } = useSelector((state) => state.user);
  const user = JSON.parse(localStorage.getItem("user"));

  return user ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateComponent;
