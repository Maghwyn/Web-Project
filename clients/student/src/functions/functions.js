import axios from "axios";

export async function isUserAuthentificated() {
    const params = new URLSearchParams(document.cookie);
    const token = params.get('user');

    if(token === null) return false;

    const status = await axios.get(`http://localhost:8080/api/v1/users/session/${token}`)
    .then(res => { return res.data })
    .catch(function(err){ return false});

    console.log(status)

    return status;
}