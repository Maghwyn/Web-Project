import React from 'react';

const PostArticle = () => {



  return (
    <>
    <div>
      <div className="post-article">

      <div>
        <form
          // onChange={Empty}
          // onSubmit={(e) =>
            // e.preventDefault() +
            // setSentence("") +
            // setWordCompletion("") +
            // setValidInputSentence(true) +
            // setValidInputWord(true) +
            // setValidButtonSend(true)
          // }
              >
          
          <p className="description">Quelles sont les news ? </p>
          <input
            className="surchText"
            id="sentenceText"
            type="text"
            // disabled={validInputSentence}
            // value={sentence}
            // onChange={(e) => setSentence(e.target.value)}
          />



              <button
                id="sendText"
                // disabled={validButtonSend}
                type="submit"
                value="word"
                onClick={async () => {
                  // const sentenceToTransform = { wordCompletion };
                  const response = await fetch("http://localhost:8080/api/v1/publications", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(),
                  })
                    .then((res) => res.json())
                    .then(
                      (resp) => console.log(resp));

                        // setSentiment(resp["sentence"]) +
                        // setAnimationTextFadeIn("animationTextFadeIn") 
                }}
              >
                {" "}
                Partagez vos connaissances !!!!
              </button>
              </form>
            </div>   
      </div>
    </div>
    </>
  );
};

export default PostArticle;