import { useEffect, useState, useRef } from "react";
import PostArticle from "../components/ressources/PostArticle";
import TagCategory from "../components/ressources/TagCategory";
import Articles from "../components/ressources/Articles";
import { getCategoryTag, getAllPublications } from "../functions/publication";
import { getOpinionsByUserId, postOpinion, updateOpinion, deleteOpinion } from "../functions/opinions";

const Ressources = ({foundPublication, userId}) => {
    const [publicationSaved, setPublicationSaved] = useState([]);
    const [articles, setArticles] = useState([]);
    const [categoriesTag, setCategoriesTag] = useState([]);
    const [opinions, setOpinions] = useState([]);
    const loading = useRef(true);
    const tagActive = useRef("");
    const searchOkay = foundPublication;

    useEffect(() => {
        if(loading.current && userId) {
            (async () => {
                const cat = await getCategoryTag();
                const publi = await getAllPublications();
                const opi = await getOpinionsByUserId(userId);
                    
                setPublicationSaved(publi);
                setOpinions(opi)
                setCategoriesTag(cat);
            })();

            loading.current = false;
        }
    }, [userId]);

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

    const updateTag = async (name) => {
        let isExist = false;
        categoriesTag.forEach(el => { if(el.categoryName === name) isExist = true; })
        if(!isExist) setCategoriesTag(preVal => [...preVal, {categoryName: name}]);
    };


    // Cheat mode : active.
    const cheatUpdateOpinion = (pid, choice, state) => {
        const pub = publicationSaved.find(el => el.publicationId === pid);

        if(state === 1) choice === 1 ? pub.liked++ : choice === 2 ? pub.rework++ : pub.deprecated++;
        if(state === -1) choice === 1 ? pub.liked-- : choice === 2 ? pub.rework-- : pub.deprecated--;
    }

    const createOpinion = async (pid, choice, body, state) => {
        cheatUpdateOpinion(pid, choice, state);
        await postOpinion(body);
        setOpinions(preVal => [...preVal, body]);
    }

    const updatePublication = async (e, userID, publicationID, choice) => {
        const body = {userId: userID, publicationId: publicationID, notation: choice};
        if(opinions.length < 1) return createOpinion(publicationID, choice, body, 1);
        const opi = opinions.find(el => el.publicationId === publicationID);

        if(opi) {
            const color = e.target.closest(".like").title;
            const sameBtn = color === "blue" ? 1 : color === "green" ? 2 : 3;
            const operator = sameBtn === opi.notation ? -1 : 1;
            const newArray = opinions.filter(el => el.publicationId !== publicationID);
            
            if(operator > 0) {
                newArray.push(body);
                cheatUpdateOpinion(publicationID, opi.notation, -operator);
                await updateOpinion(body);
            }

            if(operator < 0) await deleteOpinion(userID, publicationID);
            cheatUpdateOpinion(publicationID, choice, operator);
            return setOpinions(preVal => preVal = newArray);
        }

        return createOpinion(publicationID, choice, body, 1)
    }

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
                        {publicationSaved.length > 0 && <Articles userId={userId} searchFound={foundPublication} publications={publicationSaved} 
                            tagActive={tagActive.current} articles={articles} updatePublication={updatePublication}/>
                        }
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Ressources;