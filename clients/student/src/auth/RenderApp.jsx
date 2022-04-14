import { useState } from "react";
import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import Layout from "../components/Layout";
import { get } from "../views/~index";
import useLoader from "../components/Hooks/useLoader";

const RenderApp = () => {
    const [foundPublication, setFoundPublication] = useState([]);
    const {user, classes, publications, setPublications, categories, setCategories, opinions, setOpinions} = useLoader();

    return (
        <Router>
            <Layout setFoundPublication={setFoundPublication} publications={publications} email={user.email}>
                <Switch>
                    <Route path="/home"      element={<get.Home/>}/>
                    <Route path="/ressources" element={<get.Ressources publications={publications} setPublications={setPublications} categories={categories} setCategories={setCategories} opinions={opinions} setOpinions={setOpinions} foundPublication={foundPublication} userId={user.id}/>}/>
                    <Route path="/mes-cours" element={<get.Classes classes={classes} user={user}/>}/>
                    <Route path="/contact"   element={<get.Contact/>}/>
                    <Route path="*"          element={<get.Error/>}/>
                </Switch>
            </Layout>
        </Router>
    )
}

export default RenderApp;