import { useEffect, useState, useRef } from "react";
import PostArticle from "../components/fill/PostArticle";
import TagCategory from "../components/fill/TagCategory";
import Opinions from "../components/fill/Opinions";
import Articles from "../components/fill/Articles";
import { getCategoryTag, getOpinions, getAllPublications } from "../functions/publication";

const Fill = ({ foundPublication, userId}) => {
    const [publicationSaved, setPublicationSaved] = useState([]);
    const [articles, setArticles] = useState([]);
    const [categoriesTag, setCategoriesTag] = useState([]);
    const [opinions, setOpinions] = useState([]);
    const loading = useRef(true);
    const tagActive = useRef("");
    const searchOkay = foundPublication;

    useEffect(() => {
        if(loading.current) {
            (async () => {
                const cat = await getCategoryTag();
                const opi = await getOpinions();
                const publi = await getAllPublications();
                    
                setPublicationSaved(publi);
                setCategoriesTag(cat);
                setOpinions(opi);
            })();

            loading.current = false;
        }
    }, []);

    const updateTag = async (name) => {
        let isExist = false;
        categoriesTag.forEach(el => { if(el.categoryName === name) isExist = true; })
        if(!isExist) setCategoriesTag(preVal => [...preVal, {categoryName: name}]);
    };

    const fillPrinted = async (e) => {
        const name = e.target.textContent;

        if(tagActive.current !== name) {
            const articles = publicationSaved.filter(el => el.categoryName === name);

            const setActiveTag = [];
            categoriesTag.forEach(el => {
                if(el.categoryName === name) setActiveTag.push({categoryName: el.categoryName, isActive: true});
                else setActiveTag.push({categoryName: el.categoryName, isActive: false});
            })

            tagActive.current = name;
            setCategoriesTag(preVal => preVal = setActiveTag);
            setArticles(preVal => preVal = articles);

        }else if(tagActive.current === name) {
            const setActiveTag = [];
            categoriesTag.forEach(el => {
                setActiveTag.push({categoryName: el.categoryName, isActive: false});
            })

            tagActive.current = "";
            setCategoriesTag(preVal => preVal = setActiveTag);
            setArticles(preVal => preVal = []);
        }
    };

    return (
        <main className="fill">
            <div className="fill-tag-fixed">
                <ul className="fill-tag-fixed-container">
                    <TagCategory fillPrinted={fillPrinted} tag={categoriesTag}/>
                    <div className="fill-tag-fixed-hider"><span>Scroll down</span></div>
                </ul>
            </div>
            <div className="fill-content">
                <div className="fill-content-margin"/>
                <div className="fill-content-pub">
                    <div className="fill-content-editor">
                        {!searchOkay.length > 0 && <PostArticle userId={userId} updateTag={updateTag}/>}
                    </div>
                    <div className="fill-content-article">
                        {publicationSaved.length > 0 && <Articles opinions={opinions} userId={userId} searchFound={foundPublication}
                            publications={publicationSaved} tagActive={tagActive.current} articles={articles}/>
                        }
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Fill;