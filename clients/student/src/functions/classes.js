import axios from "axios";

export async function getClassesAccess(userID) {
    const classesID = await axios.get(`http://localhost:8080/api/v1/access/users/${userID}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));

    const classes = await axios.get("http://localhost:8080/api/v1/classes/productowners")
    .then((res) => res.data)
    .catch((err) => console.log(err));

    const hasAccesTo = [];
    classes.forEach(cl => {
        classesID.forEach(cli => {
            if(cl.classId === cli.classId) {
                hasAccesTo.push(cl);
            }
        })
    })

    return hasAccesTo;
}

export async function getClassesContent(classId) {
    const content = await axios.get(`http://localhost:8080/api/v1/content/classes/${classId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));

    return content;
}

export async function postClassesContent(content) {
    const status = await axios.post(`http://localhost:8080/api/v1/content`, content)
    .then(res => res.status)
    .catch((err) => err.reponse.status);

    return status;
}

export async function deleteClassesContent(classId, contentName) {
    await axios.delete(`http://localhost:8080/api/v1/content/classes/${classId}/${contentName}`)
    .then(res => res.status)
    .catch((err) => console.log(err));
}