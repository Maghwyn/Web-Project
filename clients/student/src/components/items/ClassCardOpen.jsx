import { useState, useRef, useEffect } from "react";
import { fetchImages } from "../../functions/utils";
import ContentCard from "./ContentCard";
import { getClassesContent } from "../../functions/classes";

const ClassesCardOpen = ({data, event}) => {
    const [files, setFiles] = useState([]);
    const loading = useRef(true);
    const {image, user} = data;

    useEffect(() => {
        if(loading.current) {
            (async () => {
                const content = await getClassesContent(user.classId);
                if(content.length !== 0) setFiles(preArray => preArray = content);
            })()
            loading.current = false;
        }
    },[])

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
                        <li><span>{user.date} - L1TP</span></li>
                    </ul>
                </div>
                <div className="coc-course">
                    <div className="coc-course-content">
                        <div className="coc-course-content-title">
                            <span>Contenu du cours</span>
                        </div>
                        <div className="coc-course-content-cards">
                            {!loading.current && <ContentCard content={files} cat={1}/>}
                        </div>
                    </div>
                    <div className="coc-course-ressource">
                        <div className="coc-course-ressource-title">
                            <span>Ressources</span>
                        </div>
                        <div className="coc-course-ressource-cards">
                            {!loading.current && <ContentCard content={files} cat={2}/>}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ClassesCardOpen;