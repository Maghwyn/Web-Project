import axios from "axios";

export async function getClassesAccess(userID) {
    const classesID = await axios.get(`http://localhost:8080/api/v1/access/users/${userID}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));

    console.log(classesID)

    const classes = await axios.get("http://localhost:8080/api/v1/classes/productowners")
    .then((res) => res.data)
    .catch((err) => console.log(err));
 
    console.log(classes)
    

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