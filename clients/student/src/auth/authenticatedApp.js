import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import Layout from "../components/Layout";
import { get } from "../views/~index";
// import "../assets/scss/packet.scss";

const authenticatedApp = () => {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route path="/home"      element={<get.Home/>}/>
                    <Route path="/ressource" element={<get.Ressources/>}/>
                    <Route path="/flux"      element={<get.Flux/>}/>
                    <Route path="/mes-cours" element={<get.Classes/>}/>
                    <Route path="/contact"   element={<get.Contact/>}/>
                    <Route path="*"          element={<get.Error/>}/>
                </Switch>
            </Layout>
        </Router>
    )
}

export default authenticatedApp;