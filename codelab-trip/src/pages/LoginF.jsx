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
    facade.login(loginCredentials.username, loginCredentials.password)
      .then(() => {
        setLoggedIn(true);
        const [username, role] = facade.getUserNameAndRoles();
        setUsername(username);
        setRoles(role);
      })
      .catch(() => alert("Login failed"));
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={performLogin}>
        <input id="username" placeholder="Username" value={loginCredentials.username} onChange={onChange} />
        <input id="password" type="password" placeholder="Password" value={loginCredentials.password} onChange={onChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginF;
