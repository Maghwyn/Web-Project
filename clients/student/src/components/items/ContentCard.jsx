import { fetchExtSvg } from "../../functions/utils";
import download from "../../assets/img/download.svg";

const ContentCard = ({content, cat, key = 0}) => (
    content && content.map(el => {
        if(el.contentCategory !== cat) return null;
        const ext = el.contentName.slice(-4,);
        const img = fetchExtSvg(ext);

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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
)

export default ContentCard;