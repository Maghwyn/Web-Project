const TagCategory = ({fillPrinted, tag, key = 0}) => (
    tag.map(el => {
        return (
            <li className="category-container" key={key++}>
                <span onClick={fillPrinted}>{el.categoryName}</span>
            </li>
        )
    })
);

export default TagCategory;
