const TagCategory = ({fillPrinted, tag, key = 0}) => (
    tag.map(el => {
        return (
            <div className="category-container" key={key++}>
                <div value={el.categoryName} className={el.categoryName}>
                    <button onClick={fillPrinted}>{el.categoryName}</button>
                </div>
            </div>
        )
    })
);

export default TagCategory;
