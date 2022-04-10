import axios from "axios";

export async function studentExist(id) {
    return await axios.get(`http://localhost:8080/api/v1/users/g/${id}/${process.env.TOKEN}`)
          .then(res => { return res.data ? true : false; })
          .catch(function(error) { console.log(error)});
}

export async function createStudentSession(id) {
    await axios.post("htptp://localhost:8080/api/v1/users/session", {"userGID": id})
          .then(res => { return res });
}

export async function createNewStudent(firstName, lastName, email, id) {
    const body = {"firstName": firstName, "lastName": lastName, "canView": 1, "email": email, "userGID": id}
    await axios.post(`http://localhost:8080/api/v1/users`, body)
          .then(res => { return res });
}

export async function productOwnerExist(id) {
    return await axios.get(`http://localhost:8080/api/v1/productowners/g/${id}/${process.env.TOKEN}`)
          .then(res => { return res.data; })
          .catch(function(error) { console.log(error)});
}

export async function createProductOwnerSession(id) {
    await axios.post("htptp://localhost:8080/api/v1/productowners/session", {"productOwnerGID": id})
          .then(res => { return res });
}

export async function createNewProductOwner(firstName, lastName, email, id) {
    const body = {"firstName": firstName, "lastName": lastName, "email": email, "poGID": id}
    await axios.post(`http://localhost:8080/api/v1/productowners`, body)
          .then(res => { return res });
}