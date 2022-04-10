import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../views/Home";

const authenticatedApp = () => {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route path="/home" element={<Home/>}/>
                </Switch>
            </Layout>
        </Router>
    )
}

export default authenticatedApp;