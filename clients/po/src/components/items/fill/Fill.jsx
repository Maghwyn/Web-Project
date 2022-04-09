import React, {useEffect, useState } from 'react';
import axios from 'axios';
import PostArticle from './PostArticle';
import Articles from './Articles';
import CategoryArticles from './CategoryArticles';
import TagCategory from './TagCategory';

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
        // console.log(resp);
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
    return <div key={index}>
      <ul>
      <li>{data.publicationTitle}</li>
        <li>{data.content}</li>
        <li>{data.date}</li>
        <li>{data.categoryName }</li>
        <li>{data.firstName}</li>
        </ul></div> 
  });
  // ----------------------------

  // MAPPING ALL CATEGORIES TAGS FROM THE FETCH
  const printTagCategory = arrayCategoriesTag.map((data, index) => {
    return <div key={index} value={data.categoryName} className={data.categoryName}>
      {data.categoryName}
    </div>
  } );
  // --------------------------


  return (
    <>
    <div className="fill">

      <div>{printPublicationsFetched}
      <CategoryArticles value={printPublicationsFetched}/>
      <PostArticle />
      <Articles />


      {/* PASSING DATA TO CHILD : TAGCATEGORY COMPONENT */}
      <TagCategory printTagCategory={printTagCategory}/>
      </div>

    </div> 
    </>
  );
};

export default Fill;