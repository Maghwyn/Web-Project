import {useState} from "react";
import logo from "../../assets/img/Logo.png";
import profilePicture from "../../assets/img/Profile-picture.png";
import { Link } from "react-router-dom";

const Header = ({email, publications, setFoundPublication}) => {
    const [publicationName, setPublicationName] = useState('');
    const [research, setResearch] = useState(false);
    const [fieldResult, setFieldResult] = useState(false);

  const filtering = (e) => {
    let keyword = e.target.value;
    // console.log(keyword);
    // console.log(publications);

    if (keyword !== '') {
        setResearch(true)
        setFieldResult(true);
      const results = publications.data.filter((data) => {
        return data.publicationTitle.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoundPublication(results);
    } else {
        setResearch(false);
        setFoundPublication([])
    }
    if (keyword === '') { 
        setFieldResult(false);
        setFoundPublication([])
    }
    setPublicationName(keyword);
  };


return (
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
                <li><Link to="/fill">Flux</Link></li>
                <li><Link to="/mes-cours">Cours</Link></li>
            </ul>
        </nav>
        <div className="header-search">
            <form className="search-form" onSubmit={(e) => e.preventDefault()}>
                <input className="search-bar" value={publicationName} onChange={(e) => filtering(e)} placeholder="Faire une recherche.." required></input>
                <input className="search-submit" type="submit" value="GO"></input>
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
        <div className="user-list">
          
      </div>
    </header>
)};


export default Header;