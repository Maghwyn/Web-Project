import logo from "../../assets/img/Logo.png";
import profilePicture from "../../assets/img/Profile-picture.png";
import magnifyingGlass from "../../assets/img/Black-Magnifying-Glass.png"
import { Link } from "react-router-dom";




const Header = ()=>{ 

    const Burger=()=>{
    }

    return(
    <header className="header">
        <nav className="navPhone">
            <button className="burgerBTN" >burger</button>
            <ul className="ulBurger">
                <li> <Link to="/Ressource">Ressource</Link></li>
                <li><Link to="/Cours">Cours</Link></li>
            </ul>
        </nav>
        <div className="logoName">
            <Link to="/">
                <a className="siteName"> CodingSource</a>
                <img src={logo} alt="" className="siteLogo"/>
            </Link>
        </div>
        <nav className="navPC">
            <ul className="ulNav">
                <li> <Link to="/Ressource">Ressource</Link></li>
                <li><Link to="/Cours">Cours</Link></li>
            </ul>
        </nav>
            <form className="surchBar" method="POST">
                <input type="text" className="typeSurch" />
                <button type="submit"  className="magnifyingGlassBtn">
                    <img src={magnifyingGlass} alt="" className="magnifiyingGlassLogo"/>
                </button>
            </form>
        <div className="profileSet">
            <img src={profilePicture} alt="" className="profilPicture"/>
            <p>userName</p>
            <p>userFirstName</p>
        </div>
    </header>
    )
}


export default Header;