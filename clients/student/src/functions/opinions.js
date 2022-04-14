import axios from "axios";

export async function getOpinionsByUserId(userID) {
    return await axios.get(`http://localhost:8080/api/v1/opinions/users/${userID}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export async function postOpinion(body) {
    await axios.post(`http://localhost:8080/api/v1/opinions`, body)
    .then((res) => res)
    .catch((err) => console.log(err))
}

export async function updateOpinion(body) {
    await axios.put(`http://localhost:8080/api/v1/opinions/users/${body.userId}/publication/${body.publicationId}`, body)
    .then((res) => res)
    .catch((err) => console.log(err))
}

export async function deleteOpinion(userId, publicationId) {
    await axios.delete(`http://localhost:8080/api/v1/opinions/users/${userId}/publication/${publicationId}`)
    .then((res) => res)
    .catch((err) => console.log(err))
}