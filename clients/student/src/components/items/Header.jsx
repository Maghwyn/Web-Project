import { useState } from "react";
import profilePicture from "../../assets/img/Profile-picture.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = ({ email, publications, setFoundPublication }) => {
    const [publicationName, setPublicationName] = useState("");
    const navigate = useNavigate();

    const filtering = (e) => {
        const keyword = e.target.value.toLowerCase();
        if(keyword === "" && publicationName.length >= 1) {
            setPublicationName("");
            setFoundPublication([]);
            return;
        }

        const regx = new RegExp(keyword, 'i');
        const results = publications.filter((data) => 
            regx.test(data.publicationTitle.toLowerCase())
        );

        setFoundPublication(results);
        setPublicationName(keyword);
    };

    return (
        <>
            <header className="header">
                <div className="header-logo">
                    <Link className="logo-wrapper" to="/home">
                        <div className="logo-name">
                            <span>CodingSource</span>
                        </div>
                    </Link>
                </div>
                <nav className="header-nav">
                    <ul>
                        <li><Link to="/ressources">Ressources</Link></li>
                        <li><Link to="/mes-cours">Cours</Link></li>
                    </ul>
                </nav>
                <div className="header-search">
                    <form className="search-form" onSubmit={(e) => {navigate("/ressources"); e.preventDefault();}}>
                        <input className="search-bar" value={publicationName} onChange={filtering} 
                            placeholder="Faire une recherche.." required/>
                        <input className="search-submit" type="submit" value="GO" onClick={() => navigate("/ressources")}/>
                    </form>
                </div>
                <div className="header-user">
                    <div className="user-pic">
                        <img src={profilePicture} alt="user_pic" />
                    </div>
                    <div className="user-name">
                        <span>{email}</span>
                    </div>
                </div>

                <div className="user-list"></div>
            </header>
            <div className="header-margin"/>
        </>
    );
};

export default Header;