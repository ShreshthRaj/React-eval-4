import { useNavigate } from "react-router-dom";
import { Authcontext } from "../context/AppContext";
import { useContext,useEffect } from "react";
function PrivateRoute({ children }) {
  const Navigate = useNavigate();
  const {state} = useContext(Authcontext);
  console.log(`pri:`, state.isAuth);
  useEffect(()=>
  {
    if (!state.isAuth) {
      return Navigate("/login");
    }
  },[])
  return children;
}
export default PrivateRoute;
