import { Link } from "react-router-dom";
import Copyright from "../../assets/img/Copyright.png"
const Footer = ()=>(


<footer>
    
    <Link to="/Contact">Contact</Link>
    <p>Framework utilisé "REACT"</p>
    <img src={Copyright} alt="" className="copyright"/>

</footer>    


)   

export default Footer;