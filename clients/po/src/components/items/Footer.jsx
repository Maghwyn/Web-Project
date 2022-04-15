import { Link } from "react-router-dom";
import coding from "../../assets/img/coding_factory.png";

const Footer = ()=>(
    <footer className="footer">
        <div className="footer-coding">
            <img src={coding} alt="coding_pic"></img>
        </div>
        <div className="footer-contact">
            <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-copyright">
            <span>Framework : {"< "}React 18{" >"}</span>
            <span>Copyright 2022-2022 ©</span>
        </div>
    </footer>
)

export default Footer;