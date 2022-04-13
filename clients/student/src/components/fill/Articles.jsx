import React, { useState } from "react";
import axios from "axios";
import revision from "../../assets/img/revision.png";


const Articles = (props) => {
  console.log(props);

  const searchOkay = props.foundPublication;

  const addLike = () => {
    return (
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
      </div>
    );
  };
  const addReview = () => {
    return <div><img className="review" src={revision} alt="review"/></div>
  }

  const addDislikes = () => {
    return <div>
      <svg xmlns="http://www.w3.org/2000/svg"width="24" height="24" viewBox="0 0 32 32"><g id="thumb_down_android_app_aplication_phone" data-name="thumb down android app aplication phone"><path d="M29.12,5.71,25.29,1.88A3,3,0,0,0,23.17,1H5A3,3,0,0,0,2,4V18a3,3,0,0,0,3,3H8.32l3.75,9.37A1,1,0,0,0,13,31a6.42,6.42,0,0,0,6-8.8L18.48,21H27a3,3,0,0,0,3-3V7.83A3,3,0,0,0,29.12,5.71ZM4,18V4A1,1,0,0,1,5,3H8V19H5A1,1,0,0,1,4,18Zm24,0a1,1,0,0,1-1,1H17a1,1,0,0,0-.93,1.37l1,2.57a4.38,4.38,0,0,1-.44,4.12,4.31,4.31,0,0,1-3,1.89L10,19.81V3H23.17a1,1,0,0,1,.71.29l3.83,3.83a1,1,0,0,1,.29.71Z"/></g></svg></div>
  }

  const renderResearch = props.foundPublication.map((data, index) => {
    let like = 0;
    let review = 0;
    let notLike = 0;
    if (
      data.publicationId === data.notationPublicationId &&
      data.notation === 1
    ) {
      like++;
    }
    if (
      data.publicationId === data.notationPublicationId &&
      data.notation === 2
    ) {
      console.log(data);
      review++;
    }
    if (
      data.publicationId === data.notationPublicationId &&
      data.notation === 3
    ) {
      notLike++;
    }

    return (
      <div key={index} className="fill-container-content">
        <ul>
          <li>
            <span className="title">{data.publicationTitle}</span>
          </li>
          <li>
            <span>{data.content}</span>
          </li>
          <li>
            <span>{data.date}</span>
          </li>
          <li>
            <span>{data.categoryName}</span>
          </li>
          <li>
            <span>{data.firstName}</span>
          </li>
          <li>
            <span>{addLike()}</span>
            <span>{like}</span>
            {/* <span>{addReview()}</span><span>{review}</span> */}
            {/* <span>{addDislikes()}</span> */}
            {/* <span>{notLike}</span> */}
          </li>
        </ul>
      </div>
    );
  });

  const printPublicationsFetched = props.fetchArrayPublications.map(
    (data, index) => {
      let like = 0;
      let review = 0;
      let notLike = 0;
      if (
        data.publicationId === data.notationPublicationId &&
        data.notation === 1
      ) {
        like++;
      }
      if (
        data.publicationId === data.notationPublicationId &&
        data.notation === 2
      ) {
        console.log(data);
        review++;
      }
      if (
        data.publicationId === data.notationPublicationId &&
        data.notation === 3
      ) {
        notLike++;
      }

      return (
        <div className="fill-container-content" key={index}>
          <ul>
            <li>
              <span className="title">{data.publicationTitle}</span>
            </li>
            <li>
              <span>{data.content}</span>
            </li>
            <li>
              <span>{data.date}</span>
            </li>
            <li>
              <span>{data.categoryName}</span>
            </li>
            <li>
              <span>{data.firstName}</span>
            </li>
            <li>
              <span>
                <button
                  onClick={async (e) => {
                    await axios
                      .post(
                        "http://localhost:8080/api/v1/opinions",
                        {
                          userId: 2,
                          publicationId: data.publicationId,
                          notation: 1,
                        },
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                        }
                      )
                      .then((res) => console.log(res));
                    await props.handleParentPublication();
                  }}
                >
                  {addLike()}
                </button>
              </span>
              <span>{like}</span>
              <span></span>
              <button  onClick={async (e) => {
                    await axios
                      .post(
                        "http://localhost:8080/api/v1/opinions",
                        {
                          userId: 2,
                          publicationId: data.publicationId,
                          notation: 2,
                        },
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                        }
                      )
                      .then((res) => console.log(res));
                    await props.handleParentPublication();
                  }}>{addReview()}</button>
              <span>{review}</span>

              <span>
                <button
                 onClick={async (e) => {
                  await axios
                    .post(
                      "http://localhost:8080/api/v1/opinions",
                      {
                        userId: 2,
                        publicationId: data.publicationId,
                        notation: 3,
                      },
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    )
                    .then((res) => console.log(res));
                  await props.handleParentPublication();
                }}
                >{addDislikes()}</button>
              </span>
              <span>{notLike}</span>
            </li>
          </ul>
        </div>
      );
    }
  );

  return (
    <>

      {/* RENDERING TEMPLATE FOR RESEARCH NAVBAR */}
      {searchOkay.length > 0 ? renderResearch : printPublicationsFetched}

    </>
  );
};

export default Articles;

// onClick={async (e) =>
//   await axios
//   .post(
//     "http://localhost:8080/api/v1/opinions",
//     {  "userId" : 1,
//     "publicationId": data.publicationId,
//     "notation" : 1 },
// {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
// }).then((res) => console.log(res))}>{addLike()}

// onClick={async (e) =>
//   await axios
//   .post(
//     "http://localhost:8080/api/v1/opinions",
//     {  "userId" : 1,
//     "publicationId": data.publicationId,
//     "notation" : 3 },
// {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
// }).then((res) => console.log(res))}>{addDislikes()}

// onClick={async (e) => {
//   await fetchPublications;
//   await printPublicationsFetched;
// await axios
// .post(
//   "http://localhost:8080/api/v1/opinions",
//   {  "userId" : 1,
//   "publicationId": data.publicationId,
//   "notation" : 2 },
// {
// method: "POST",
// headers: {
//   "Content-Type": "application/json",
// },
// }).then((res) => console.log(res))}}>{addReview()}
