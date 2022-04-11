import React, {useEffect, useState } from 'react';
import axios from 'axios';
import PostArticle from './PostArticle';
import Articles from './Articles';
import CategoryArticles from './CategoryArticles';
import TagCategory from './TagCategory';
import Opinions from './Opinions';

const Fill = () => {
  const [fetchArrayPublications, setFetchArrayPublications] = useState([]);
  const [arrayCategoriesTag, setArrayCategoriesTag] = useState([]);


  //  URL FOR FETCHING ALL PUBLICATIONS 
  const url = "http://localhost:8080/api/v1/publications";
  const fetchPublications = async () => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin' : "*"
      },
    })
      .then((res) => res.json()).then((resp) => {
        // console.log(resp)
        setFetchArrayPublications(resp);
      });
  };
  // END FETCHING ALL PUBLICATIONS ---------------

  //  URL FOR FETCHING ALL CATEGORIES IN ALL PUBLICATIONS
  const urlTag = "http://localhost:8080/api/v1/publications/categoryTagName";
  const fetchCategoryTag = async () => {
    const responseTag = await fetch(urlTag, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin' : "*"
      },
    })
      .then((res) => res.json()).then((resp) => {
        // console.log(resp);
        setArrayCategoriesTag(resp);
      });
  };
  // END OF FETCHING CATEGORIES ----------------

  // CALL FUNCTIONS FETCHING IN USE EFFECT TO GET DATA
  useEffect(() => {
    fetchPublications();
    fetchCategoryTag();
    // console.log("bonjour")
  }, []);
  // -----------------------------
  


  // MAPPING ALL PUBLICATIONS FROM THE FETCH
  const printPublicationsFetched = fetchArrayPublications.map((data, index) => {
    // console.log(data);
    let like; 
    let review;
    let notLike;
    let count;
    if (data.notation === 1) {
      like = "like"
    }  
    if (data.notation === 2){
      review = "review";
    }
    if (data.notation === 3) {
      notLike = "not like"
    }
    // {data.notationPublicationId === data.publicationId ? count = count + 1 : null}
    // console.log(data);
    return <div key={index}>
      
      <ul>
      <li>{data.publicationTitle}</li>
        <li>{data.content}</li>
        <li>{data.date}</li>
        <li>{data.categoryName }</li>
        <li>{data.firstName}</li>
        <li>{like}{review}{notLike}</li>
        </ul></div> 
  });
  // ----------------------------

  const [user, setUser] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userCanView, setUserCanView] = useState(0);

  // MAPPING ALL CATEGORIES TAGS FROM THE FETCH
  const printTagCategory = arrayCategoriesTag.map((data, index) => {
    return <div key={index}  className={data.categoryName}>
      {data.categoryName}
    </div>
  } );
  // --------------------------



  return (
    <>
    <div className="fill">

      <div>{printPublicationsFetched}
      <CategoryArticles value={printPublicationsFetched}/>
      <Opinions props={printPublicationsFetched}/>
      <PostArticle />
      <Articles />


      
      </div>

      <form
      onSubmit={(e) => e.preventDefault()}>
        <input type="text" name="firstName" value={user} onChange={(e) => setUser(e.target.value)} />
        <input type="text" name="lastName" value={userLastName} onChange={(e) => setUserLastName(e.target.value)} />
        <input type="text" name="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
        <input type="text" name="canView" value={userCanView} onChange={(e) => setUserCanView(e.target.value)} />
        <button
                id="sendText"
                type="submit"
                onClick={async () => {
                  const response = await fetch("http://localhost:8080/api/v1/users", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({"firstName": user,
                    "lastName" : userLastName,
                    "email" : userEmail,
                    "canView" : userCanView})
                  })
                    .then((res) => 
                    res.json())
                    .then(
                      (resp) => console.log(resp)
                    );
                }}
              >CLIck onSubmit</button>


      </form>
      {/* PASSING DATA TO CHILD : TAGCATEGORY COMPONENT */}
      {/* <TagCategory printTagCategory={printTagCategory}/> */}

    </div> 
    </>
  );
};

export default Fill;