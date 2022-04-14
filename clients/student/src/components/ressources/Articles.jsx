import Like from "../items/Like";
import { fetchImages } from "../../functions/utils";

const Articles = ({userId, searchFound, publications, tagActive, articles, updatePublication}) => {
    const renderResearch = (array) => {
        return array.map((data, index) => (
            <div className="article-card" key={index}>
                <div className="article-title">
                    <h2>{data.publicationTitle}</h2>
                </div>
                <div className="article-content">
                    <div className="article-content-main">
                        <p>{data.content}</p>
                    </div>
                    <div className="article-content-footer">
                        <span>{data.categoryName} - {data.firstName}</span>
                        <span>{data.date}</span>
                    </div>
                </div>
                <div className="article-like">
                    <Like src={fetchImages("like.svg")} number={data.liked} updateLike={(e) => updatePublication(e, userId, data.publicationId, 1)} design={"blue"}/>
                    <Like src={fetchImages("pencil.svg")} number={data.rework} updateLike={(e) => updatePublication(e, userId, data.publicationId, 2)} design={"green"}/>
                    <Like src={fetchImages("outdated.svg")} number={data.deprecated} updateLike={(e) => updatePublication(e, userId, data.publicationId, 3)} design={"red"}/>
                </div>
            </div>
        ));
    };

    //TODO: La recherche ne recherche pas dans le tag spécifié
    return tagActive ? 
                searchFound.length > 0 ? renderResearch(searchFound) : renderResearch(articles)
              :
                searchFound.length > 0 ? renderResearch(searchFound) : renderResearch(publications)
};

export default Articles;