import { useRef, useState } from "react";
import ClassesCard from "../components/items/ClassesCard";
import ClassesCardOpen from "../components/items/ClassCardOpen";

const Classes = ({classes, user}) => {
    const [cardState, setCardState] = useState(false);
    const data = useRef("");

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
                    classes && <ClassesCard classes={classes} event={openCard}/>
                  :
                    classes && <ClassesCardOpen data={data.current} event={closeCard}/>
            }
            </div>
        </main>
    )
}

export default Classes;