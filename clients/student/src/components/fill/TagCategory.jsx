import React, {useEffect, useState, useCallback } from 'react';

const TagCategory = ({printTagCategory}) => {
  const [category, setCategory] = useState([]);
  const [Once, setOnce] = useState(false);
  const [arrayCategory, setArrayCategory] = useState([]);


  

  useEffect(() => {
    if (Once === false) {
    for (let i = 0; i < printTagCategory.length; i++) {
      // console.log(printTagCategory[i].props.value);
      setCategory(category => [...category, printTagCategory[i].props.value]);
      console.log("bonjour");
      setOnce(true);}
    }
    else {
      console.log("already done");
    }
  }, [Once , printTagCategory]);

  const refreshOne = useCallback((event) => {
    console.log(event);
    let category = event.target.innerText;
    // console.log("jjjejazhejazehaz");
    // console.log(event.target.innerText);
    const GetArticlesCategory = async () => {
      const response = await fetch(`http://localhost:8080/api/v1/publications/${category}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin" : '*'
        },
      })
        .then((res) => res.json()).then((resp) => {
          setArrayCategory(resp);
        });
      } 
      GetArticlesCategory();

    }
  );

      const tagArray =  arrayCategory.map((data, index) => {
        return <div key={index}>
          <ul>
            <li>{data.publicationTitle}</li>
            <li>{data.content}</li>
            <li>{data.date}</li>
            <li>{data.categoryName }</li>
            <li>{data.firstName}</li>
            </ul></div>
            });


      const returnAllCategoryTag = category.map((data, index) => {
        return <div key={index} value={data} className={data}>
          <button onClick={refreshOne} >{data}</button>
            </div> 
      });




  return (
    <>
    <div>
      {returnAllCategoryTag}
      {tagArray}
    </div>
    </>
  );
};

export default TagCategory;