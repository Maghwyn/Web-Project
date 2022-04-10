import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../views/Home";
import "../assets/scss/packet.scss";

const authenticatedApp = () => {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/ressource" element={<Home/>}/>
                    <Route path="/flux" element={<Home/>}/>
                    <Route path="/mes-cours" element={<Home/>}/>
                    <Route path="/contact" element={<Home/>}/>
                    <Route path="*" element={<Home/>}/>
                </Switch>
            </Layout>
        </Router>
    )
}

export default authenticatedApp;