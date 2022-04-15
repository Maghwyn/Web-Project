import axios from "axios";

export async function isUserAuthentificated(token = null) {
    const cookies = document.cookie.split(" ");
    
    cookies.forEach(cookie => {
        const params = new URLSearchParams(cookie);
        const value = params.get('po');
        if(value !== null) token = value;
    });

    if(token === null) return false;
    token = token.replace(";", "");

    const authentified = await axios.get(`http://localhost:8080/api/v1/productowners/session/${token}`)
    .then(res => { return res.data })
    .catch(function(err){ return false});

    if(!authentified) return false;

    localStorage.setItem('po', 'logged');
    return true;
}

export async function getUserInfo(token = null) {
    const cookies = document.cookie.split(" ");
    
    cookies.forEach(cookie => {
        const params = new URLSearchParams(cookie);
        const value = params.get('po');
        if(value !== null) token = value;
    });

    if(token === null) return false;

    const user = await axios.get(`http://localhost:8080/api/v1/productowners/g/${token}`)
    .then(res => { return res.data; })
    .catch(function(err){ return false});

    if(!user) return false;

    return user;
}