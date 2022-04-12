import Header from "./items/Header";
import Footer from "./items/Footer";

const Layout = ({children, email, publications, setFoundPublication }) => {
    // console.log(publications);

    return (
    <div className="view" id="root-content">
        <Header publications={publications} setFoundPublication={setFoundPublication}  email={email}/>
        <div className="view-content">
            {children}
        </div>
        <Footer/>
    </div>
    )
    }
export default Layout;