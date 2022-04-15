const Like = ({src, number, updateLike, design}) => (
    <div className={`like ${design}`} title={design} onClick={updateLike}>
        <div className="like-img">
            <img src={src}/>
        </div>
        <div className="like-number">
            <span>{number}</span>
        </div>
    </div>
)

export default Like;