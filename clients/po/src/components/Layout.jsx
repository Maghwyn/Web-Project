import Header from "./items/userInterface/Header";
import Footer from "./items/userInterface/Footer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Layout = props => {
    const location = useLocation();

    const renderFooter = () => {
        const routes = ["/", "/home", "/notre-approche", "/notre-offre", "/qui-sommes-nous", "/contact", "/legal"];
        return routes.includes(location.pathname.toLowerCase());
    }

    // useEffect(() => {
    //     if(location.pathname === "/legal") document.querySelector(".header").classList.add("scrolled");
    //     else document.querySelector(".header").classList.remove("scrolled");

    // }, [location]);

    return (
    <>
       <Header loc={location}/>
        <div className="root-content">
            { props.children }
        </div>
        {renderFooter() && <Footer/> }
        
    </>
);
    }

export default Layout;