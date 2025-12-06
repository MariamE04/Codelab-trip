// Importerer Navigate (til redirect), Outlet (til nested routes), og apiFacade (til login/token info).
import { Navigate, Outlet } from "react-router-dom";                       // brug react-router-dom
import facade from "./apiFacade";

function ProtectedRoute({ role }) {
  const isLoggedIn = facade.loggedIn(); // tjek login
  const [, roles] = facade.getUserNameAndRoles();                           // betyder: ignorer første værdi, tag kun anden (kun brug for roles)
  const hasRole = roles.toLowerCase().includes(role.toLowerCase());         // Tjekker: Indeholder rollen fra token den rolle, vi kræver for denne route?


  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;                               // redirect til login
  }

  if (!hasRole) {
    return <h2>Access denied</h2>;                                          // bruger har ikke den nødvendige rolle
  }

  return <Outlet />;                                                        // viser den nested route hvis adgang ok
}

export default ProtectedRoute;
