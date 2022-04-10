import React, {useState, useEffect, useCallback} from 'react';

const PostArticle = () => {
  const [titlePublication, setTitlePublication] = useState('');
  const [contentPublication, setContentPublication] = useState('');
  const [categoryPublication, setCategoryPublication] = useState('');
  const [categoryId, setCategoryId] = useState();

  const fetchValue = useCallback = () => {
    // let category = e.target.innerText;
    // console.log(categoryPublication);
    const GetArticlesCategory = async () => {
      const response = await fetch(`http://localhost:8080/api/v1/publications/${categoryPublication}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin" : '*'
        },
      }).then((res) => res.json()).then((resp) => setCategoryId(resp[0].categoryId));
      // Fix the error if category is not present

    }
      GetArticlesCategory();
      console.log(categoryId);

  }




  return (
    <>

<form
      onSubmit={(e) => e.preventDefault()}>
        <input type="text" name="publicationTitle" value={titlePublication} onChange={(e) => setTitlePublication(e.target.value)} />
        <input type="text" name="content" value={contentPublication} onChange={(e) => setContentPublication(e.target.value)} />
        <input type="text" name="categoryId" value={categoryPublication} onChange={(e) => {
          setCategoryPublication(e.target.value);
          }} onKeyUp={fetchValue}/>
        <button
                id="sendText"
                type="submit"
                onClick={async () => {
                  const response = await fetch("http://localhost:8080/api/v1/publications", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      "categoryId" : categoryId,
                      "userId" : "2",
                      "publicationTitle": titlePublication,
                    "content" : contentPublication
                    
                    })
                  })
                    .then((res) =>  console.log(res)
                    // res.json())
                    // .then(
                    //   (resp) => console.log(resp)
                    );
                }}
              >CLIck insert publications</button>
              </form>


    </>
  );
};

export default PostArticle;