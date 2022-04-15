import axios from "axios";

export async function getAllPublications() {
    return await axios.get("http://localhost:8080/api/v1/publications")
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export async function getOpinions() {
    return await axios.get("http://localhost:8080/api/v1/opinions")
    .then((res) => res.data)
    .catch((err) => console.log(err))
}

export async function getCategoryTag() {
    const tag = [];
    const data = await axios.get("http://localhost:8080/api/v1/publications/categoryTagName")
    .then((res) => res.data)
    .catch((err) => console.log(err))

    data.forEach(el => {
        tag.push({categoryName: el.categoryName, isActive: false})
    });

    return tag;
}

export async function getArticlesCategory(category) {
    return await axios.get(`http://localhost:8080/api/v1/publications/${category}`)
    .then((res) => res.data)
    .catch((err) => console.log(err))
}

export async function getCategoryByName(categoryName) {
    return await axios.get(`http://localhost:8080/api/v1/category/name/${categoryName}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export async function addPublication(body) {
    return await axios.post("http://localhost:8080/api/v1/publications", body)
    .then((res) => res.status)
    .catch((err) => console.log(err));
}

export async function createCategory(categoryName) {
    await axios.post("http://localhost:8080/api/v1/category", { categoryName: categoryName })
    .then((res) => res.status)
    .catch((err) => console.log(err));
}