import React, {useEffect, useState, useRef} from 'react';
import PostArticle from './PostArticle';
import Articles from './Articles';
import CategoryArticles from './CategoryArticles';

const Fill = () => {
  const [articles, setArticles] = useState("");
  const [publicationsDate, setPublicationsDate] = useState("");
  const [category, setCategory] = useState("");
  const [arrayTest, setArrayTest] = useState([]);
  const isMounted = useRef(false);

  const url = "http://localhost:8080/articles";
  const fetchArticles = async () => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin' : "*"
      },
    })
      .then((res) => res.json()).then((resp) => {
        console.log(resp);
        setArrayTest(resp);
      });
      
   
  };

  useEffect(() => {
    fetchArticles();
    console.log("bonjour")
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      console.log("bonjour");
    } else {
      isMounted.current = false;
      console.log("au revoir");
    }
  }, [arrayTest]);


  const printArticles = arrayTest.map((data, index) => {
    return <div key={index}>
      <ul>
      <li>{data.publicationTitle}</li>
        <li>{data.content}</li>
        <li>{data.publicationDate}</li>
        <li>{data.categoryName }</li>
        <li>{data.userFirstName}</li>
        </ul></div> 
  });

  const filterCategories = arrayTest.map((data, index) => {
    if (data.categoryName === "Technologie")  { 
    return <div key={index}>
      <ul>
      <li>{data.publicationTitle}</li>
      <li>{data.content}</li>
      <li>{data.publicationDate}</li>
      <li>{data.categoryName}</li>
      <li>{data.userFirstName}</li>
      </ul>
    </div>
    }
    
    
  });

  

  
  

  return (
    <>
    <div className="fill">
      <div>{printArticles}</div>
      <CategoryArticles value={printArticles}/>
      
      
      <PostArticle />
      <Articles />
      
    </div>
    <div>
      {filterCategories}
    </div>
    </>
  );
};

export default Fill;