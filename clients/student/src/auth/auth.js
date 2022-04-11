import axios from "axios";

function handleUserResponse({user}) {
    window.localStorage.setItem("token", user.token)
    return user
  }

async function login({username, password}) {
    const result = await client('login', { username, password });
    return handleUserResponse(result);
}

async function logout() {
    window.localStorage.clear();
}

async function client(data) {  
    return axios.post("http://localhost:8080/api/v1/users", { body: JSON.stringify(data)})
    .then(async res => { 
        const data = await res.json();
        if(res.ok) return data;
        else return Promise.reject(data);
    }).catch(err => console.log(err.message));
}

export { login, logout }