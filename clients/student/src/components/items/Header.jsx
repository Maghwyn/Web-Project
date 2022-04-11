import logo from "../../assets/img/Logo.png";
import profilePicture from "../../assets/img/Profile-picture.png";
import { Link } from "react-router-dom";

const Header = ({email}) => (
    <header className="header">
        <div className="header-logo">
            <Link className="logo-wrapper" to="/home">
                <div className="logo-link">
                    <img src={logo} alt="logo"/>
                </div>
                <div className="logo-name">
                    <span>CodingSource</span>
                </div>
            </Link>
        </div>
        <nav className="header-nav">
            <ul>
                <li><Link to="/ressource">Ressource</Link></li>
                <li><Link to="/flux">Flux</Link></li>
                <li><Link to="/mes-cours">Cours</Link></li>
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
                <span>{email}</span>
            </div>
        </div>
    </header>
)


export default Header;