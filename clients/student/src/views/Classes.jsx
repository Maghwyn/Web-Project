import { useEffect, useRef, useState } from "react";
import { getClassesAccess } from "../functions/classes";
import ClassesCard from "../components/items/ClassesCard";
import ClassesCardOpen from "../components/items/ClassCardOpen";

const Classes = ({user}) => {
    const [classes, setClasses] = useState(false);
    const [cardState, setCardState] = useState(false);
    const loading = useRef(true);
    const data = useRef("");

    useEffect(() => {
        if(loading.current && user.id !== null) {
            (async () => {
                const classesObject = await getClassesAccess(user.id);
                setClasses(preVal => preVal = classesObject);
            })()

            loading.current = false;
        }
    }, [user.id])

    const openCard = (img, el) => {
        data.current = {image: img, user: el};
        setCardState(preVal => preVal = true);
    }

    const closeCard = () => {
        setCardState(preVal => preVal = false);
    }

    return (
        <main className="classes">
            <div className="classes-options">
                <ul>
                    <li><span>{user.lastName} {user.firstName}</span></li>
                    <li><span>Mes cours</span></li>
                </ul>
            </div>
            <div className="classes-content">
            {
                !cardState ? 
                    !loading.current && <ClassesCard classes={classes} event={openCard}/>
                  :
                    !loading.current && <ClassesCardOpen data={data.current} event={closeCard}/>
            }
            </div>
        </main>
    )
}

export default Classes;