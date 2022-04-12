import React, {useEffect, useState, useCallback, useMemo} from 'react';
import axios from 'axios';
import PostArticle from "../components/fill/PostArticle"
import TagCategory from '../components/fill/TagCategory';
import Opinions from '../components/fill/Opinions';
import Articles from '../components/fill/Articles';

const Fill = ({info}) => {
  const [fetchArrayPublications, setFetchArrayPublications] = useState([]);
  const [arrayCategoriesTag, setArrayCategoriesTag] = useState([]);
  const userId = info.id
  // console.log({info})
  // console.log(userId)

  //  URL FOR FETCHING ALL PUBLICATIONS 
  const url = "http://localhost:8080/api/v1/publications";
  const fetchPublications = async () => {
    await fetch(url, {
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
  }, []);
  // -----------------------------

  const handleParentPublication = () => {
    fetchPublications();
    fetchCategoryTag();
      //  console.log("Parent have passed :)")
  };
 
   
 
  // MAPPING ALL PUBLICATIONS FROM THE FETCH
  const printPublicationsFetched = fetchArrayPublications.map((data, index) => {
    let like; 
    let review;
    let notLike;
    let count;
    // console.log(data);
    if (data.notation === 1) {
      like = "like"
    }  
    if (data.notation === 2){
      review = "review";
    }
    if (data.notation === 3) {
      notLike = "not like"
    }
    return (<div className="fill-container-content" key={index}>
      <ul>
      <li><span className="title">{data.publicationTitle}</span></li>
        <li><span>{data.content}</span></li>
        <li><span>{data.date}</span></li>
        <li><span>{data.categoryName }</span></li>
        <li><span>{data.firstName}</span></li>
        <li><span>{like}</span><span>{review}</span><span>{notLike}</span></li>
        </ul></div> )
  });
  // ----------------------------

  const printPublicationsFetchedTest = fetchArrayPublications.map((data, index) => {
    // console.log(data);
    return { data : data }
  });
  

//   useEffect(() => {


//     // printPublicationsFetched();
//  }, []);
  // useEffect(() => {
  //   console.log("bonjour");

  // }, [])

  // MAPPING ALL CATEGORIES TAGS FROM THE FETCH
  const printTagCategory = arrayCategoriesTag.map((data, index) => {
    return <div key={index} value={data.categoryName}  className={data.categoryName}>
      {data.categoryName}
    </div>
  } );
  // --------------------------

  


  return (
    <>
    <div className="fill">
      <div className="fill-postPublications">
      <PostArticle userId={userId}  handleParentPublication={() => { 
          handleParentPublication();
      }}/>
      </div>

      <div className="fill-container">
        {/* {printPublicationsFetched} */}
        </div>
    <div>
      <Opinions props={printPublicationsFetched}/>
      
      <Articles  value={printPublicationsFetchedTest} />

      
      </div>

      {/* PASSING DATA TO CHILD : TAGCATEGORY COMPONENT */}
      <TagCategory printTagCategory={printTagCategory}/>

    </div> 
    </>
  );
};

export default Fill;




















// Form for creating user accounts
// <form
// onSubmit={(e) => e.preventDefault()}>
//   <input type="text" name="firstName" value={user} onChange={(e) => setUser(e.target.value)} />
//   <input type="text" name="lastName" value={userLastName} onChange={(e) => setUserLastName(e.target.value)} />
//   <input type="text" name="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
//   <input type="text" name="canView" value={userCanView} onChange={(e) => setUserCanView(e.target.value)} />
//   <button
//           id="sendText"
//           type="submit"
//           onClick={async () => {
//             const response = await fetch("http://localhost:8080/api/v1/users", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({"firstName": user,
//               "lastName" : userLastName,
//               "email" : userEmail,
//               "canView" : userCanView})
//             })
//               .then((res) => 
//               res.json())
//               .then(
//                 (resp) => console.log(resp)
//               );
//           }}
//         >CLIck onSubmit</button>


// </form>