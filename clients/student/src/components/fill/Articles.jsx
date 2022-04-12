import React from 'react';

const Articles = (props) => {
  // console.log(key, elements);
  // console.log(props);
  const printPublications = [props];
  // console.log(printPublications);


  // const printPublicationsFetched = printPublications.map((data, index) => {
  //   // console.log(index, data);
  //   // console.log(data.value[index]);
  //   console.log("bonjouuuur")
  //   let like; 
  //   let review;
  //   let notLike;
  //   let count;
  //   // console.log(data);
  //   if (data.notation === 1) {
  //     like = "like"
  //   }  
  //   if (data.notation === 2){
  //     review = "review";
  //   }
  //   if (data.notation === 3) {
  //     notLike = "not like"
  //   }
  //   return (<div className="fill-container-content" key={props}>
  //     <ul>
  //     <li><span className="title">{data.value[1].data.publicationTitle}</span></li>
  //       <li><span>{data.content}</span></li>
  //       <li><span>{data.date}</span></li>
  //       <li><span>{data.categoryName }</span></li>
  //       <li><span>{data.firstName}</span></li>
  //       <li><span>{like}</span><span>{review}</span><span>{notLike}</span></li>
  //       </ul></div> )
  // });
  // console.log(printPublicationsFetched)


  return (
    <>
    <div className="articles">
    {/* {printPublicationsFetched} */}
      


    </div>

      
    </>
  );
};

export default Articles;