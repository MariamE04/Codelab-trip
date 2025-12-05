const BASE_URL = "http://localhost:7070/api/";
const LOGIN_ENDPOINT = "auth/login"

function handleHttpErrors(res) {
if (!res.ok) {
  return Promise.reject({ status: res.status, fullError: res.json() })
}
return res.json()
}

/* Insert utility-methods from later steps 
here (REMEMBER to uncomment in the returned 
object when you do)*/

const setToken = (token) => {
    localStorage.setItem('jwtToken', token)
  }
const getToken = () => {
  return localStorage.getItem('jwtToken')
}
const loggedIn = () => {
  const loggedIn = getToken() != null;
  return loggedIn;
}

const logout = () => {
  localStorage.removeItem("jwtToken");
}

const login = (user, password) => {
  const options = makeOptions("POST", false, { username: user, password });
  return fetch(BASE_URL + LOGIN_ENDPOINT, options)
    .then(handleHttpErrors)
    .then(res => {
      setToken(res.token);
      return res;
    })
    .catch(err => {
      console.log(err);
      throw err; // vigtigt så App.jsx kan reagere på fejl
    });
};


const fetchData = (endpoint, method) => {
    const optionObject = makeOptions(method, true)
   return fetch(BASE_URL + endpoint, optionObject)
    .then(res => res.json());
}

const makeOptions= (method,addToken,body) =>{
  var opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      'Accept': 'application/json',
    }
  }
  if (addToken && loggedIn()) {
    opts.headers["Authorization"] = `Bearer ${getToken()}`;
  }
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
}

function getUserNameAndRoles() {
        const token = getToken()
        if (token != null) {
            const payloadBase64 = getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            const roles = decodedClaims.roles
            const username = decodedClaims.username;
            return [username, roles]
        } else return ""
    }

    const hasUserAccess = (neededRole, loggedIn) => {
        const roles = getUserNameAndRoles()[1].split(',')
        return loggedIn && roles.includes(neededRole)
    }

const facade = {
    getUserNameAndRoles,
    hasUserAccess,
    makeOptions,
    //setToken,
    //getToken,
    //loggedIn,
    login,
    logout,
    fetchData
}

export default facade;