import { Navigate, Outlet } from "react-router-dom"; // brug react-router-dom
import facade from "./apiFacade";

function ProtectedRoute({ role }) {
  const isLoggedIn = facade.loggedIn(); // tjek login
  const hasRole = role ? facade.hasUserAccess(role, isLoggedIn) : true;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; // redirect til login
  }

  if (!hasRole) {
    return <h2>Access denied</h2>; // bruger har ikke den nødvendige rolle
  }

  return <Outlet />; // viser den nested route hvis adgang ok
}

export default ProtectedRoute;
