import React, {useEffect, useState, useRef} from 'react';
import PostArticle from './PostArticle';
import Articles from './Articles';
import CategoryArticles from './CategoryArticles';
import TagCategory from './TagCategory';

const Fill = () => {
  const [articles, setArticles] = useState("");
  const [publicationsDate, setPublicationsDate] = useState("");
  const [category, setCategory] = useState("");
  const [arrayTest, setArrayTest] = useState([]);
  const [arrayTag, setArrayTag] = useState([]);
  const isMounted = useRef(false);

  const url = "http://localhost:8080/api/v1/publications";
  const urlTag = "http://localhost:8080/api/v1/publications/categoryTagName";
  const fetchArticles = async () => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin' : "*"
      },
    })
      .then((res) => res.json()).then((resp) => {
        // console.log(resp);
        setArrayTest(resp);
      });
      
   
  };
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
        setArrayTag(resp);
      });
      
   
  };

  useEffect(() => {
    fetchArticles();
    fetchCategoryTag();
    // console.log("bonjour")
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      // console.log("bonjour");
    } else {
      isMounted.current = false;
      // console.log("au revoir");
    }
  }, [arrayTest, arrayTag]);


  const printArticles = arrayTest.map((data, index) => {
    return <div key={index}>
      <ul>
      <li>{data.publicationTitle}</li>
        <li>{data.content}</li>
        <li>{data.date}</li>
        <li>{data.categoryName }</li>
        <li>{data.firstName}</li>
        </ul></div> 
  });

  const tagCategory = arrayTag.map((data, index) => {
    return <div key={index}>
      <ul>
      <li>{data.categoryName}</li>
        </ul></div> 
  } );

  
  

  return (
    <>
    <div className="fill">
      <div>{printArticles}</div>
      <CategoryArticles value={printArticles}/>
      
      
      <PostArticle />
      <Articles />
      
    </div>
    <div>
      {tagCategory}
    </div>
    </>
  );
};

export default Fill;