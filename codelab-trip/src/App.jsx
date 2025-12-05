import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import { useState } from "react";
import facade from "./apiFacade";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [roles, setRoles] = useState("");

  const handleLogout = () => {
    facade.logout();
    setLoggedIn(false);
    setUsername("");
    setRoles("");
  };

  return (
    <div className="app-container">
      <Header
        loggedIn={loggedIn}
        username={username}
        roles={roles}
        handleLogout={handleLogout}
      />
      <Outlet context={{ loggedIn, setLoggedIn, setUsername, setRoles }} />
    </div>
  );
}

export default App;