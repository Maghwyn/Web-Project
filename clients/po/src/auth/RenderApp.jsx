import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import Layout from "../components/Layout";
import { get } from "../views/~pages";
import useLoader from "../components/Hooks/useLoader";

const RenderApp = () => {
    const {user, classes} = useLoader();

    return (
        <Router>
            <Layout email={user.email}>
                <Switch>
                    <Route path="/home"      element={<get.Home/>}/>
                    <Route path="/mes-cours" element={<get.Classes classes={classes} user={user}/>}/>
                    <Route path="/contact"   element={<get.Contact/>}/>
                    <Route path="*"          element={<get.Error/>}/>
                </Switch>
            </Layout>
        </Router>
    )
}

export default RenderApp;