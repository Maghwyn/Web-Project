import logo from "../../assets/img/Logo.png";
import profilePicture from "../../assets/img/wProfile-picture.png";
import { Link } from "react-router-dom";

const Header = () => (
    <header className="header">
        <div className="header-logo">
            <Link className="logo-wrapper" to="/home">
                <div className="logo-link">
                    <img src={logo} alt="" className="siteLogo"/>
                </div>
                <div className="logo-name">
                    <span>CodingSource</span>
                </div>
            </Link>
        </div>
        <nav className="header-nav">
            <ul>
                <li><Link to="/Ressource">Ressource</Link></li>
                <li><Link to="/Cours">Cours</Link></li>
            </ul>
        </nav>
        <div className="header-search">
            <form className="search-form">
                <input className="search-bar" placeholder="Faire une recherche.." required></input>
                <input className="search-submit" type="submit" value="GO" href="#"></input>
            </form>
        </div>
        <div className="header-user">
            <div className="user-pic">
                <img src={profilePicture} alt="user_pic"/>
            </div>
            <div className="user-name">
                <span>example@edu.esiee-it.fr</span>
            </div>
        </div>
    </header>
)


export default Header;