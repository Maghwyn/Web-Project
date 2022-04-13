import React, { useEffect, useState } from "react";

const TagCategory = (props) => {
  const printTagCategory = props.printTagCategory;
  const [category, setCategory] = useState([]);
  const [Once, setOnce] = useState(false);
  // console.log(props);

  useEffect(() => {
    if (Once === false) {
      for (let i = 0; i < printTagCategory.length; i++) {
        // console.log(printTagCategory[i].props.value);
        setCategory((category) => [
          ...category,
          printTagCategory[i].props.value,
        ]);
        // console.log("bonjour");
        setOnce(true);
      }
    } else {
      // console.log("already done");
    }
  }, [Once, printTagCategory]);

  const returnAllCategoryTag = category.map((data, index) => {
    return (
      <div key={index} value={data} className={data}>
        <button
          onClick={(e) => {
            props.fillPrinted(e);
          }}
        >
          {data}
        </button>
      </div>
    );
  });

  return (
    <>
      <div className="category-container">{returnAllCategoryTag}</div>
    </>
  );
};

export default TagCategory;
