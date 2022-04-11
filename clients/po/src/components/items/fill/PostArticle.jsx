import React, {useState, useEffect, useCallback} from 'react';
import axios from "axios";

const PostArticle = () => {
  const [titlePublication, setTitlePublication] = useState('');
  const [contentPublication, setContentPublication] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const getCategoryByName = async () => {
    try {const categoryId = await axios.get(`http://localhost:8080/api/v1/category/name/${categoryName}` , {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" : '*'
      },
    })
    .then((res) => { if (res.status === 200) {return res.data.categoryId} else {throw new Error("a problem appeared")}
       })
    .catch(function(err) {console.error(err)});
    if(categoryId !== undefined) {
      await addPublication(categoryId);
    }
    else {
      await createCategory();
      await getCategoryByName();
    }
  } catch {console.error("error") }
  } 

  const addPublication = async (categoryId) => {
    await axios.post('http://localhost:8080/api/v1/publications', 
    {
      "categoryId" : categoryId,
      "userId" : "2",
      "publicationTitle": titlePublication,
      "content" : contentPublication  
    },
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => console.log(res))                    
  }


  const createCategory = async () => {
    await axios.post('http://localhost:8080/api/v1/category', { "categoryName" : categoryName},
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => console.log(res))
  }

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" name="publicationTitle" value={titlePublication} onChange={(e) => setTitlePublication(e.target.value)} />
          <input type="text" name="content" value={contentPublication} onChange={(e) => setContentPublication(e.target.value)} />
          <input type="text" name="categoryId" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
          <button
              id="sendText"
              type="submit"
              onClick={async () => {getCategoryByName()}}
          >
              CLIck insert publications
          </button>
      </form>
    </>
  );
};

export default PostArticle;