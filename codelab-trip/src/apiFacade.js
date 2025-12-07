const BASE_URL = "https://tripapi.cphbusinessapps.dk/api/";
const LOGIN_ENDPOINT = "auth/login";

// -------------------------
// HELPERS
// -------------------------
function handleHttpErrors(res) {                                                  // Hvis response IKKE er ok (status 200-299)
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });         // Reject: sender en fejl tilbage som et Promise
  }
  return res.json();                                                              // Ellers: parse JSON og gå videre
}

function setToken(token) {
  localStorage.setItem("jwtToken", token);                                        // Gemmer token i browserens localStorage
}

function getToken() {
  return localStorage.getItem("jwtToken");                                        // Henter token fra localStorage
}

function loggedIn() {
  return getToken() != null;                                                      // Hvis vi har en token: er brugeren logget ind
}

function logout() {
  localStorage.removeItem("jwtToken");                                            // Fjerner token → brugeren bliver "logget ud"
}

// -------------------------
// LOGIN
// -------------------------
const login = (username, password) => {                                           
  return fetch(BASE_URL + LOGIN_ENDPOINT, {
    method: "POST",                                                               // POST → vi sender data til backend
    headers: {
      "Content-Type": "application/json",                                         // sender JSON
      "Accept": "application/json"                                                // forventer JSON tilbage
    },
    body: JSON.stringify({ username, password })                                  // Body -> username + password gjort til JSON string
  })
    .then(handleHttpErrors)                                                       // Først tjek om der er fejl
    .then(res => {
      console.log("Login response:", res);
      setToken(res.token);                                                        // Gem token fra backend
      return res;                                                                 // Send login-svar tilbage
    });
};

// -------------------------
// FETCH WITH TOKEN
// -------------------------
const makeOptions = (method, addToken, body) => {
  const opts = {
    method: method,                                                    // sætter hvilken HTTP metode vi bruger (GET, POST, PUT, DELETE)
    headers: {                                                         // headers: fortæller backend, at vi sender/forventer JSON
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  };

  if (addToken && loggedIn()) {                                         // addToken = true betyder "denne request kræver token" -loggedIn() tjekker om vi HAR en token
    opts.headers["Authorization"] = "Bearer " + getToken();             // Hvis begge er true -> tilføjes: Authorization: Bearer <token>
  }

  if (body) {                                                         // laver body til JSON -sætter det ind som request body, Hvis det er GET: ingen body.  Hvis vi sender data (f.eks. POST):
    opts.body = JSON.stringify(body);
  }

  return opts;                                                        // Det her objekt sendes videre til fetch.
};

const fetchData = (endpoint, method = "GET") => {
  const options = makeOptions(method, true);                          // kalder makeOptions(method, true) -> betyder: “tilføj token”
  return fetch(BASE_URL + endpoint, options).then(handleHttpErrors);  // binder BASE_URL + endpoint sammen + sender request til backend og hvis responsen fejler → håndteres af handleHttpErrors 
};

// -------------------------
// READ USERNAME + ROLES FROM JWT
// -------------------------
function getUserNameAndRoles() { 
  const token = getToken();
  if (!token) return ["", ""];                                        // Hvis ingen token:  send tomme værdier

  const payload = token.split(".")[1];                                // JWT er delt i 3 dele: payload er nummer 2
  const claims = JSON.parse(atob(payload));                           // atob = decoding → laver payload til et JSON-objekt

  const username = claims.username;                                   // Henter username fra token

  const roles = claims.roles || username;                             // Henter roller ("admin" / "user")

  return [username, roles];                                           // Returner som array
}


function hasUserAccess(neededRole, isLoggedIn) {                      
  if (!isLoggedIn) return false;                                      // Hvis ikke logget ind: ingen adgang
  const [, roles] = getUserNameAndRoles();                            // Hent roller
  return roles.split(",").includes(neededRole);                       // Tjek om brugeren HAR den nødvendige rolle
}

const facade = {
  login,
  logout,
  loggedIn,
  fetchData,
  getUserNameAndRoles,
  hasUserAccess,
};

export default facade;
