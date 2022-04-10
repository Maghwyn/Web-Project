import { Link } from "react-router-dom";

const Footer = ()=>(
    <footer className="footer">
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