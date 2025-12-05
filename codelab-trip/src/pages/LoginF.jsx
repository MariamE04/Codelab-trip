import { useState } from "react";
import facade from "../apiFacade";

function LoginF({ setLoggedIn, setUsername, setRoles }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value });
  }

  const performLogin = (evt) => {
    evt.preventDefault();
    
    // Kald API-facade login
    facade.login(loginCredentials.username, loginCredentials.password)
      .then(res => {
        if (!res.token) {
          alert("Login failed. Token missing.");
          return;
        }

        // Login lykkedes – sæt state
        setLoggedIn(true);

        const [username, role] = facade.getUserNameAndRoles();
        setUsername(username);
        setRoles(role);

        // Ryd loginformular
        setLoginCredentials(init);
      })
      .catch(() => alert("Login failed. Check username and password."));
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={performLogin}>
        <input 
          id="username" 
          placeholder="Username" 
          value={loginCredentials.username} 
          onChange={onChange} 
          autoComplete="username"
        />
        <input 
          id="password" 
          type="password" 
          placeholder="Password" 
          value={loginCredentials.password} 
          onChange={onChange} 
          autoComplete="current-password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginF;
