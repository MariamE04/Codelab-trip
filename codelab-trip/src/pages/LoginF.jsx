import { useState } from "react";
import { useOutletContext } from "react-router-dom";                                  // modtager state og setState-funktioner fra <Outlet context={...} /> (i App.jsx)
import facade from "../apiFacade";                                                    // login-logik, token-håndtering, fetchData osv.

function LoginF() {
  const { setLoggedIn, setUsername, setRoles } = useOutletContext();                  // Så LoginF kan ændre login-info direkte i App.jsx.  -gør at hele appen “ved”, at brugeren nu er logget ind.

  const init = { username: "", password: "" };                                        // et objekt med 2 felter -> starter som tomt
  const [loginCredentials, setLoginCredentials] = useState(init);                     // bruger setLoginCredentials hver gang brugeren skriver i input felterne

  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value });  // [evt.target.id]: input-feltets id bestemmer hvilket felt der opdateres  -gør: funktion kan opdatere både username og password
  };

  const performLogin = (evt) => {
    evt.preventDefault();                                                             // stopper  default adfærden -> React tager fuld kontrol over formularen.
    facade.login(loginCredentials.username, loginCredentials.password)                // Kalder facade.login() -> backend sender token tilbage (Token gemmes i localStorage af facaden)
      .then(res => {
        setLoggedIn(true);
        const [username, roles] = facade.getUserNameAndRoles();                       // henter username + roles ud af token
        setUsername(username);                                                        // opdaterer App.jsx state via setLoggedIn, setUsername, setRoles
        setRoles(roles);
        setLoginCredentials(init);
      })
      .catch(() => alert("Login failed. Check username and password."));              // Hvis login fejler
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={performLogin}>
        {/*id: hænger sammen med onChange(), value: kontrolleret input, autoComplete: browseren kan gemme brugernavnet for brugeren */}
        <input id="username" placeholder="Username" value={loginCredentials.username} onChange={onChange} autoComplete="username" />
        <input id="password" type="password" placeholder="Password" value={loginCredentials.password} onChange={onChange} autoComplete="current-password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginF;




//LoginF er den komponent der:
// ----------------------------
// viser login-formularen
// opdaterer login-staten i appen via useOutletContext
// kalder apiFacade for at logge brugeren ind
// gemmer brugerens username og roles, så resten af appen ved hvem der er logget ind