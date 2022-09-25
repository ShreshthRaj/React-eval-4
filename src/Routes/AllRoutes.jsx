import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Login from "./Login";
import SingleUser from "./SingleUser";
import PageNotFound from "./PageNotFound";
import PrivateRoute from "../components/PrivateRoute";
function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <PrivateRoute>
              <SingleUser />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
export default AllRoutes;
