import { useState, useRef, useEffect } from "react";
import { fetchImages } from "../../functions/utils";
import ContentCard from "./ContentCard";
import { deleteClassesContent, getClassesContent, postClassesContent, updateClassesContent } from "../../functions/classes";
import { Notif } from "../../functions/popup";

const ClassesCardOpen = ({data, event}) => {
    const [files, setFiles] = useState([]);
    const loading = useRef(true);
    const {image, user} = data;

    const getImage = async (cat, e) => {
        const img = e.target.files[0];
        const type = ["image/jpg", "image/jpeg", "image/png", "image/webp", "application/pdf", "application/zip"]
        if(!type.includes(img.type)) return Notif("crimson", "Mauvais format de fichier, verifiez que l'extension du fichier comprend : [.jpg, .jpeg, .png, .webp, .pdf, .zip]");
        console.log(img);
        const promise = new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = function () {
                resolve(reader.result);
            }
            reader.readAsDataURL(img);
        });

        promise.then(async base => {
            const body = {classId: user.classId, contentCategory: cat, contentName: img.name, contentBlob: base};
            const status = await postClassesContent(body);
            if(status === 200) setFiles(preArray => [...preArray, body]);
        });
    }

    const deleteFile = async (allFiles, data, newData = []) => {
        await deleteClassesContent(data.classId, data.contentName);

        allFiles.forEach(element => {
            if(element.contentName !== data.contentName && element.contentCategory === 1) newData.push(element);
            if(element.contentName !== data.contentName && element.contentCategory === 2) newData.push(element);
        })

        setFiles(preArray => preArray = newData);
    }

    const editFile = async (e, allFiles, data, ext, newData = []) => {
        const card = e.target.closest(".content-card-wrapper");
        const input = e.target.closest(".content-card-option").previousSibling.childNodes[0];
        const newValue = `${input.value}${ext}`;

        if(newValue === data.contentName) return card.classList.remove("flip");
        if(newValue === "") return;

        const status = await updateClassesContent(data.classId, data.contentName, newValue);
        
        if(status === 200) {
            allFiles.forEach(element => {
                if(element.contentName !== data.contentName && element.contentCategory === 1) newData.push(element);
                else if(element.contentName !== data.contentName && element.contentCategory === 2) newData.push(element);
                else {
                    const {classId, contentCategory, contentBlob} = element;
                    newData.push({classId: classId, contentCategory: contentCategory, contentName: newValue, contentBlob: contentBlob})
                }
            })

            setFiles(preArray => preArray = newData);
            card.classList.remove("flip");
        }
    }

    const flipFile = (e) => {
        e.target.closest(".content-card-wrapper").classList.add("flip");
    }

    useEffect(() => {
        if(loading.current) {
            (async () => {
                const content = await getClassesContent(user.classId);
                if(content.length !== 0) setFiles(preArray => preArray = content);
            })()
            loading.current = false;

            addDragAndDropVisual(document.getElementById("fc-content"));
            addDragAndDropVisual(document.getElementById("fc-ress"));
        }
    },[])

    const addDragAndDropVisual = (element) => {
        element.addEventListener('dragenter', function() { this.parentNode.classList.add('dragged-over'); })
        element.addEventListener("dragexit", function() { this.parentNode.classList.remove('dragged-over'); });
        element.addEventListener("drop", function() { this.parentNode.classList.remove('dragged-over'); });
    }

    return (
        <main className="class-open">
            <div className="class-open-exit" onClick={event}>
                <img src={fetchImages("cross.svg")} alt="exit_pic"/>
            </div>
            <div className="class-open-banner">
                <div className="class-open-banner-image">
                    <img src={image} alt="tech_pic"></img>
                </div>
                <div className="class-open-banner-po">
                    <span>{user.productOwnerFirstName} {user.productOwnerLastName}</span>
                </div>
            </div>
            <div className="class-open-content">
                <div className="coc-options">
                    <ul>
                        <li><span>Cours</span></li>
                        <li><span>Participants</span></li>
                        <li><span>Vidéo conférence (V3)</span></li>
                        <li><span>Analyse Trello (V2)</span></li>
                        <li><span>{user.date} - L1TP</span></li>
                    </ul>
                </div>
                <div className="coc-course">
                    <div className="coc-course-content">
                        <div className="coc-course-content-title">
                            <span>Contenu du cours</span>
                        </div>
                        <div className="coc-course-content-cards">
                            {!loading.current && <ContentCard content={files} cat={1} delEvent={deleteFile} flip={flipFile} editEvent={editFile}/>}
                            <div className="add-card">
                                <label id="card-content" htmlFor="fc-content" className="add-card-design">
                                    <input id="fc-content" className="add-card-submit" type="file" accept=".jpg, .jpeg, .png, .webp, .pdf, .zip" 
                                        onChange={(e) => { getImage(1,e) }}/>
                                    <span className="add-card-design-placeholder">Ajouter un fichier.. [pdf/zip/png/jpg]</span>
                                    <span className="add-card-design-cross"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="coc-course-ressource">
                        <div className="coc-course-ressource-title">
                            <span>Ressources</span>
                        </div>
                        <div className="coc-course-ressource-cards">
                            {!loading.current && <ContentCard content={files} cat={2} delEvent={deleteFile} flip={flipFile} editEvent={editFile}/>}
                            <div className="add-card">
                                <label id="card-ress" htmlFor="fc-ress" className="add-card-design">
                                    <input id="fc-ress" className="add-card-submit" type="file" accept=".jpg, .jpeg, .png, .webp, .pdf, .zip" 
                                        onChange={(e) => { getImage(2,e) }}/>
                                    <span className="add-card-design-placeholder">Ajouter un fichier.. [pdf/zip/png/jpg]</span>
                                    <span className="add-card-design-cross"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ClassesCardOpen;