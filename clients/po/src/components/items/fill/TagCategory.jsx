import React, {useEffect, useState, useRef} from 'react';

const TagCategory = ({tag}) => {
  const [category, setCategory] = useState([]);




  useEffect(() => {
    // for (let i = 0; i < key.length; i++) {
    //   console.log(tag[i]);
    // }

    // console.log(tag[0].key);
    // console.log(key[1]);

  }, [tag]);
  








  // filter data to not have duplicate tags
  // const filterData = (data) => {
  //   const newFilter = Object.keys(tag).reduce((result, key) => {
  //     if (tag[key].values.includes(data)) {
  //       result.push(tag[key]);
  //     };
  //     return result;
  //   }, []);
  //   console.log(tag)
  //   setFilterData(newFilter);
  // };

  //call filter data function when search word is changed


//   for (let i = 0;  i < tag.length; i++)  {
//     let searchWord = tag[i].key; 
//   const newFilter = Object.keys(tag).reduce((result, key) => {
//     console.log(searchWord);
//     console.log("aziejiazjeiaeiz");
//     console.log(key.value);
//     // if (result[key].value.includes(searchWord)) {
//     //   result.push(tag[key]);
//     // };
//     // return result;
//   }, []);
//   // setFilterData(newFilter);
// }

//   console.log(FilterData);











  return (
    <div>
      
    </div>
  );
};

export default TagCategory;