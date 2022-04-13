import React from 'react';

const Articles = ({fetchArrayPublications, foundPublication}) => {
  const searchOkay = foundPublication;


  const renderResearch = () => {
    return (
            foundPublication.map((data, index) => (
                <div key={index}  className="fill-container-content">
              <ul>
        <li><span className="title">{data.publicationTitle}</span></li>
          <li><span>{data.content}</span></li>
          <li><span>{data.date}</span></li>
          <li><span>{data.categoryName }</span></li>
          <li><span>{data.firstName}</span></li>
          {/* <li><span>{like}</span><span>{review}</span><span>{notLike}</span></li> */}
          </ul></div> 
            )
            )

    )
}
  


  const printPublicationsFetched = 
    fetchArrayPublications.map((data, index) => {
      // fetchArrayPublications.map((data, index) => {
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


  return (
    <>
    {/* <div className="articles"> */}
    {/* RENDERING TEMPLATE FOR RESEARCH NAVBAR */}
        {searchOkay.length > 0 ? 
        renderResearch() : 
    printPublicationsFetched}
      


    {/* </div> */}

      
    </>
  );
};

export default Articles;