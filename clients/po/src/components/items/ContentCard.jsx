import { fetchExtSvg } from "../../functions/utils";
import download from "../../assets/img/download.svg";
import edit from "../../assets/img/edit.svg";
import del from "../../assets/img/del.svg";
import save from "../../assets/img/save.svg";

const ContentCard = ({content, cat, delEvent, flip, editEvent, key = 0}) => (
    content && content.map(el => {
        if(el.contentCategory !== cat) return null;
        const arr = el.contentName.split(".");
        const ext = arr[arr.length - 1];
        const name = el.contentName.slice(0,-ext.length - 1);
        const img = fetchExtSvg(`.${ext}`);

        return (
            <div className="content-card-wrapper" key={key++}>
                <div className="content-card-front">
                    <div className="content-card">
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
                                    <img src={edit} alt="edit_icon" onClick={flip}></img>
                                </div>
                                <div className="content-card-option-del">
                                    <img src={del} alt="delete_icon" onClick={() => { delEvent(content, el) }}></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-card-back">
                    <div className="content-card">
                        <div className="content-card-edit">
                            <input defaultValue={name} id="file-rename"></input>
                            <span>{`.${ext}`}</span>
                        </div>
                        <div className="content-card-option">
                            <div className="content-card-option-wrap">
                                <div className="content-card-option-save" onClick={(e) => editEvent(e, content, el, `.${ext}`)}>
                                    <img src={save} alt="save_icon"></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
)

export default ContentCard;