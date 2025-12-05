const BASE_URL = "https://tripapi.cphbusinessapps.dk/api/";
const LOGIN_ENDPOINT = "auth/login";

// -------------------------
// HELPERS
// -------------------------
function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function setToken(token) {
  localStorage.setItem("jwtToken", token);
}

function getToken() {
  return localStorage.getItem("jwtToken");
}

function loggedIn() {
  return getToken() != null;
}

function logout() {
  localStorage.removeItem("jwtToken");
}

// -------------------------
// LOGIN
// -------------------------
const login = (username, password) => {
  return fetch(BASE_URL + LOGIN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ username, password })
  })
    .then(handleHttpErrors)
    .then(res => {
      console.log("Login response:", res);
      setToken(res.token); // gem token
      return res;
    });
};

// -------------------------
// FETCH WITH TOKEN
// -------------------------
const makeOptions = (method, addToken, body) => {
  const opts = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  };

  if (addToken && loggedIn()) {
    opts.headers["Authorization"] = "Bearer " + getToken();
  }

  if (body) {
    opts.body = JSON.stringify(body);
  }

  return opts;
};

const fetchData = (endpoint, method = "GET") => {
  const options = makeOptions(method, true);
  return fetch(BASE_URL + endpoint, options).then(handleHttpErrors);
};

// -------------------------
// READ USERNAME + ROLES FROM JWT
// -------------------------
function getUserNameAndRoles() {
  const token = getToken();
  if (!token) return ["", ""];

  const payload = token.split(".")[1];
  const claims = JSON.parse(atob(payload));

  const username = claims.username;
  // Hvis roles ikke findes i JWT, sæt det ud fra username
  const roles = claims.roles || (username === "admin" ? "ADMIN" : "USER");

  return [username, roles];
}

function hasUserAccess(neededRole, isLoggedIn) {
  if (!isLoggedIn) return false;
  const [, roles] = getUserNameAndRoles();
  return roles.split(",").includes(neededRole);
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
