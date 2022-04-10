import React, {useState, useEffect} from 'react';

const Opinions = ({props}) => {
  const [arrayOpinions, setArrayOpinions] = useState([]);


  const url = "http://localhost:8080/api/v1/opinions";
  const fetchOpinions = async () => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin' : "*"
      },
    }).then((res) => res.json()).then((resp) => setArrayOpinions(resp));


  }
  useEffect(() => {
    fetchOpinions();
  }, [props]);


  const filterOpinions = arrayOpinions.map((data, index, {props}) => {

    return <div key={index}>
      {props}
      {data.notation}</div>;
  })





  return (
    <div>
      {/* {filterOpinions} */}
      bonjour
    </div>
  );
};

export default Opinions;