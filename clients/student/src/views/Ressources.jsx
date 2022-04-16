import { useState, useRef } from "react";
import PostArticle from "../components/ressources/PostArticle";
import TagCategory from "../components/ressources/TagCategory";
import Articles from "../components/ressources/Articles";
import { postOpinion, updateOpinion, deleteOpinion } from "../functions/opinions";
import { getAllPublications } from "../functions/publication";
import { Notif } from "../functions/popup";

const Ressources = ({publications, setPublications, categories, setCategories, opinions, setOpinions, foundPublication, userId}) => {
    const [articles, setArticles] = useState([]);
    const searchOkay = foundPublication;
    const tagActive = useRef("");

    const fillPrinted = async (e) => {
        // Create a filtered array based on the Category Name of the object and store in inside articles State.
        // We keep the publications unmodified to avoid fetching them again.
        // IF ELSE condition check wheter or not the user already clicked in this tag or not.
        // It manage the display between rendering the filtered array and publications array.
        const name = e.target.textContent;

        if(tagActive.current !== name) {
            const articles = publications.filter(el => el.categoryName === name);

            const setActiveTag = [];
            categories.forEach(el => {
                if(el.categoryName === name) setActiveTag.push({categoryName: el.categoryName, isActive: true});
                else setActiveTag.push({categoryName: el.categoryName, isActive: false});
            })

            tagActive.current = name;
            setCategories(preVal => preVal = setActiveTag);
            setArticles(preVal => preVal = articles);

        }else if(tagActive.current === name) {
            const setActiveTag = [];
            categories.forEach(el => {
                setActiveTag.push({categoryName: el.categoryName, isActive: false});
            })

            tagActive.current = "";
            setCategories(preVal => preVal = setActiveTag);
            setArticles(preVal => preVal = []);
        }
    };

    const updateTag = async (name) => {
        // Create the tag if not exist and add it dynamically to the state hook.
        // Fetch the publications again : NEED A REWORK.
        // The state should update while adding a new object, not by getting all publications.
        // TODO : Add an external refresh update to check wheter or not the database added a new post.
        let isExist = false;
        categories.forEach(el => { if(el.categoryName === name) isExist = true; })
        if(!isExist) setCategories(preVal => [...preVal, {categoryName: name}]);

        const data =  await getAllPublications();
        Notif("#d4c465", "Votre publication a bien été crée !");
        setPublications(preVal => preVal = data);
    };

    const cheatUpdateOpinion = (pid, choice, state) => {
        // Cheat mode : NOT OPTIMAL.
        // This function point directly at one of the object value of the state hook and increment it.
        // ++ and -- directely change the value of the notation inside the object state without rendering it. 
        const pub = publications.find(el => el.publicationId === pid);

        if(state === 1) choice === 1 ? pub.liked++ : choice === 2 ? pub.rework++ : pub.deprecated++;
        if(state === -1) choice === 1 ? pub.liked-- : choice === 2 ? pub.rework-- : pub.deprecated--;
    }

    const createOpinion = async (pid, choice, body, state) => {
        cheatUpdateOpinion(pid, choice, state);
        await postOpinion(body);
        setOpinions(preVal => [...preVal, body]);
    }

    const updatePublication = async (e, userID, publicationID, choice) => {
        // This function manage the user like on each post and between the three choice available.
        // IF the user never liked anything, return his first like choice on the post.
        // IF the user does not have a like on this article, return the like choice on the post.
        // IF the user does have a like on this article and is clicking on the same choice, decrement it.
        // IF the user does have a like on this article and is clicking on another choice, increment it and decrement the previous one.
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
                    {categories.length > 0 && <TagCategory fillPrinted={fillPrinted} tag={categories}/>}
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
                        {publications.length > 0 && <Articles userId={userId} searchFound={foundPublication} publications={publications} 
                            tagActive={tagActive.current} articles={articles} updatePublication={updatePublication}/>
                        }
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Ressources;