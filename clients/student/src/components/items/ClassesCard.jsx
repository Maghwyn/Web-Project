import { fetchImages } from "../../functions/utils";

const ClassesCard = ({classes, event}) => (
    classes.map(el => {
        const img = fetchImages(`${el.className}.png`);
        return (
            <div className="card-classes" key={el.classId} onClick={() => {event(img, el)}}>
                <div className="card-classes-name">
                    <span className="info-name">{el.className.toUpperCase()}</span>
                </div>
                <div className="card-classes-content">
                    <div className="card-classes-img">
                        <img src={img} alt="tech_pic"></img>
                    </div>
                    <div className="card-classes-info">
                        <span className="info-po">{el.productOwnerFirstName} {el.productOwnerLastName}</span>
                        <span className="info-date">{el.date}</span>
                    </div>
                </div>
            </div>
        )
    })
)

export default ClassesCard;