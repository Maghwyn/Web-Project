import React from 'react';
import CustomLink from "../utils/CustomLink";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
    <nav className="nav">
        <ul className="nav-main">
            <li><CustomLink href="/home" value="Home" className="nav-link"/></li>
            <li><CustomLink href="/classes" value="classe" className="nav-link"/></li>
        </ul>

    </nav>

      
    </>
  );
};

export default NavBar;