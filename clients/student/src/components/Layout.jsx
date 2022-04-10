import Header from "./items/Header";
import Footer from "./items/Footer";

const Layout = ({children}) => (
    <div className="view" id="root-content">
        <Header/>
        <div className="view-content">
            {children}
        </div>
        <Footer/>
    </div>
)
export default Layout;