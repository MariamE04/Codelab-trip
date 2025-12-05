import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import facade from "../apiFacade";

function LoginF() {
  const { setLoggedIn, setUsername, setRoles } = useOutletContext();

  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value });
  };

  const performLogin = (evt) => {
    evt.preventDefault();
    facade.login(loginCredentials.username, loginCredentials.password)
      .then(res => {
        setLoggedIn(true);
        const [username, roles] = facade.getUserNameAndRoles();
        setUsername(username);
        setRoles(roles);
        setLoginCredentials(init);
      })
      .catch(() => alert("Login failed. Check username and password."));
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={performLogin}>
        <input id="username" placeholder="Username" value={loginCredentials.username} onChange={onChange} autoComplete="username" />
        <input id="password" type="password" placeholder="Password" value={loginCredentials.password} onChange={onChange} autoComplete="current-password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginF;
