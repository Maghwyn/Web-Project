import React, { useState, useRef } from "react";
import { addPublication, getCategoryByName, createCategory } from "../../functions/publication";
import { capitalize } from "../../functions/utils";

const PostArticle = ({userId, updateTag}) => {
    const [form, setForm] = useState({categoryName: "", userId: userId, publicationTitle: "", content: ""})
    const sendPublication = useRef(false);

    // !Careful with this, if the user change the field name of the form the app will send an error.
    const fieldState = (name, $value) => ({
        title   : () => setForm(valid => ({...valid, publicationTitle: $value})),
        content : () => setForm(valid => ({...valid, content: $value})),
        name    : () => setForm(valid => ({...valid, categoryName: $value}))
    })[name]()

    const validForm = (e) => {
        let {name, value} = e.target;
        if(name === "name") value = capitalize(value);

        fieldState(name, value);
        if(form.categoryName && form.content && form.publicationTitle && value !== "") sendPublication.current = true;
        else sendPublication.current = false;
    };

    const processForm = async () => {
        const data = await getCategoryByName(form.categoryName);

        if (data.categoryId !== undefined) {
            const body = {categoryId: data.categoryId, userId: userId, publicationTitle: form.publicationTitle, content: form.content}
            const status = await addPublication(body);
            return status;
        }else { 
            //Bug with recursive
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

        if(status === 200) {
            await updateTag(form.categoryName);
            sendPublication.current = false;
            setForm(preVal => ({...preVal, categoryName: "", publicationTitle: "", content: ""}));
        }
    }

    return (
        <form className="fill-form">
            <div className="fill-form-title">
                <h2>Rajouter une publication</h2>
            </div>
            <div className="fill-form-content">
                <div className="fill-form-pub">
                    <div className="fill-form-pub-title">
                        <label htmlFor="ftitle">Titre de la ressource :</label>
                        <input type="text" id="ftitle" name="title" value={form.publicationTitle} onChange={validForm}/>
                    </div>
                    <div className="fill-form-pub-content">
                        <label htmlFor="fcontent">Qu'avez vous à partager aujourd'hui ?</label>
                        <input type="text" id="fcontent" name="content" value={form.content} onChange={validForm}/>
                    </div>
                    <div className="fill-form-pub-cat">
                        <label htmlFor="fcat">À quelle catégorie appartient votre ressource ?</label>
                        <input type="text" id="fcat" name="name" value={form.categoryName} onChange={validForm}/>
                    </div>
                </div>
                <div className="fill-form-submit">
                    {sendPublication.current ?
                        <button id="sendText" type="submit" onClick={(e) => submitForm(e)}>Send your publications !!!</button>
                    :
                        <button disabled id="sendText">Send your publications !!!</button>
                    }
                </div>
            </div>
        </form>
    );
};

export default PostArticle;