import "./App.css";
import { Outlet } from "react-router-dom"; // “placeholder” for nested routes.
import Header from "./components/header/Header"; // Header-komponenten, som altid skal vises øverst.
import { useState } from "react"; // gemme lokal state i komponenten
import facade from "./apiFacade"; // håndterer login, logout og token.

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // om brugeren er logget ind (boolean)
  const [username, setUsername] = useState("");   // navnet på brugeren
  const [roles, setRoles] = useState("");         // rollen på brugeren (USER eller ADMIN)

  const handleLogout = () => {
    facade.logout(); // fjerner token fra localStorage
    setLoggedIn(false);

    // rydder brugernavn og rolle.
    setUsername("");
    setRoles(""); 
  };

  return (
    <div className="app-container">
      <Header
      //vise login-knap/ brugernavn, role
        loggedIn={loggedIn}  
        username={username}
        roles={roles}
        handleLogout={handleLogout}
      />
      {/* Viser den aktuelle nested route og giver den adgang til login-state og funktioner til at opdatere den. */}
      <Outlet context={{ loggedIn, setLoggedIn, setUsername, setRoles }} />
    </div>
  );
}

export default App;