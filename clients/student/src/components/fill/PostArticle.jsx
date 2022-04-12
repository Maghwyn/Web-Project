import React, {useState, useEffect, useCallback} from 'react';
import axios from "axios";

const PostArticle = (props) => {
  const [titlePublication, setTitlePublication] = useState('');
  const [contentPublication, setContentPublication] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [sendPublication, setSendPublication] = useState(true);
  const userId = props.userId;


  // Send Publication only when fields are full on
  let publicationTitle = document.getElementById("publicationTitle");
  let content = document.getElementById("content");
  let categoryId = document.getElementById("categoryId");

  const validForm = (e) => {
    if ((publicationTitle.value !== "") && (content.value !== "") && (categoryId.value !== "") ) {
      setSendPublication(false)
    } else {
      setSendPublication(true)
    }
  }
  // ---------------------------- 

  const getCategoryByName = async () => {
    try {const categoryId = await axios.get(`http://localhost:8080/api/v1/category/name/${categoryName}` , {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" : '*'
      },
    })
    .then((res) => { if (res.status === 200) {return res.data.categoryId} else {throw new Error("A problem appeared")}
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
      "userId" : userId,
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
      <form className="fill-postPublications-form" onSubmit={(e) => e.preventDefault()}>
        <div >
          <div>Titre de la ressource : </div>
          <input type="text" id="publicationTitle" name="publicationTitle" value={titlePublication} onChange={(e) => {setTitlePublication(e.target.value);
            validForm(e)}} />
          </div>
          <div >
            <div>Qu'avez vous à partager aujourd'hui ? </div>
          <input type="text" id="content" name="content" value={contentPublication} onChange={(e) => {setContentPublication(e.target.value);  validForm(e)}} />
          </div>
          <div >
            <div>À quelle catégorie appartient votre ressource ? </div>
          <input type="text" id="categoryId" name="categoryId" value={categoryName} onChange={(e) => {setCategoryName(e.target.value);  validForm(e)}} />
          </div>
          <button
           disabled={sendPublication}
              id="sendText"
              type="submit"
              onClick={async () => {
                await getCategoryByName();
                 await props.handleParentPublication(); 
                }}
          >
              Send your Coding Source !!!
          </button>
      </form>
    </>
  );
};

export default PostArticle;