import React, { useState, useRef } from "react";
import { addPublication, getCategoryByName, createCategory } from "../../functions/publication";
import { capitalize } from "../../functions/utils";

const PostArticle = ({userId, updateTag}) => {
    const [form, setForm] = useState({categoryName: "", userId: userId, publicationTitle: "", content: ""})
    const sendPublication = useRef(false);

    const fieldState = (name, $value) => ({
        title   : () => setForm(valid => ({...valid, publicationTitle: $value})),
        content : () => setForm(valid => ({...valid, content: $value})),
        name    : () => setForm(valid => ({...valid, categoryName: $value}))
    })[name]()

    const validForm = (e) => {
        const {name, value} = e.target;
        if(name === "title") console.log(capitalize(value));

        fieldState(name, value);
        if(form.categoryName && form.content && form.publicationTitle) sendPublication.current = true;
        else sendPublication.current = false;
    };

    const processForm = async () => {
        const data = await getCategoryByName(form.categoryName);

        if (data.categoryId !== undefined) {
            const body = {categoryId: data.categoryId, userId: userId, publicationTitle: form.publicationTitle, content: form.content}
            const status = await addPublication(body);
            return status;
        }else { 
            await createCategory(form.categoryName);
            const data2 = await getCategoryByName(form.categoryName);
            const body = {categoryId: data2.categoryId, userId: userId, publicationTitle: form.publicationTitle, content: form.content}
            const status = await addPublication(body);
            return status;
        }
  };

    const submitForm = async (e) => {
        e.preventDefault();
        const status = await processForm();

        console.log(status)
        if(status === 200) {
            await updateTag(form.categoryName);
            sendPublication.current = false;
            setForm(preVal => ({...preVal, categoryName: "", publicationTitle: "", content: ""}));
        }
    }

    return (
        <form className="fill-postPublications-form" onSubmit={(e) => submitForm(e)}>
            <div>
                <h3>Titre de la ressource :</h3>
                <input type="text" id="publicationTitle" name="title" value={form.publicationTitle} onChange={validForm}/>
            </div>

            <div>
                <h3>Qu'avez vous à partager aujourd'hui ? </h3>
                <input type="text" id="content" name="content" value={form.content} onChange={validForm}/>
            </div>
                
            <div>
                <h3>À quelle catégorie appartient votre ressource ?</h3>
                <input type="text" id="categoryName" name="name" value={form.categoryName} onChange={validForm}/>
            </div>

            <div>
            {
                sendPublication.current ?
                    <button id="sendText" type="submit">Send your publications !!!</button>
                  :
                    <button disabled id="sendText">Send your publications !!!</button>
            }
            </div>
        </form>
    );
};

export default PostArticle;