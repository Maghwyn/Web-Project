import Header from "./items/Header";
import Footer from "./items/Footer";

const Layout = ({children, email}) => {

        console.log(email)
    return (
    <div className="view" id="root-content">
        <Header email={email}/>
        <div className="view-content">
            {children}
        </div>
        <Footer/>
    </div>
    )
    }
export default Layout;