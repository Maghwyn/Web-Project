import { fetchExtSvg } from "../../functions/utils";
import download from "../../assets/img/download.svg";
import edit from "../../assets/img/edit.svg";
import del from "../../assets/img/del.svg"

const ContentCard = ({content, cat, delEvent, key = 0}) => (
    content && content.map(el => {
        if(el.contentCategory !== cat) return null;
        const img = fetchExtSvg(el.contentName.slice(-4,));
        return (
            <div className="content-card" key={key++}>
                <div className="content-card-icon">
                    <img src={img} alt="ext_icon"></img>
                </div>
                <div className="content-card-name">
                    <span>{`${el.contentName}`}</span>
                </div>
                <div className="content-card-option">
                    <div className="content-card-option-wrap">
                        <a className="content-card-option-dl" href={el.contentBlob} download={el.contentName}>
                            <img src={download} alt="dl_icon"></img>
                        </a>
                        <div className="content-card-option-edit">
                            <img src={edit} alt="edit_icon"></img>
                        </div>
                        <div className="content-card-option-del">
                            <img src={del} alt="delete_icon" onClick={() => { delEvent(content, el) }}></img>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
)

export default ContentCard;