import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import { getUserInfo } from "../functions/auth";
import { getAllPublications } from "../functions/publication";
import Layout from "../components/Layout";
import { get } from "../views/~index";

const RenderApp = ({logged}) => {
    const [user, setUser] = useState({id: null, firstName: null, lastName: null, email: null, canview: null});
    const loading = useRef(true);
    const [publications, setPublications] = useState([]);
    const [foundPublication, setFoundPublication] = useState([]);

    useEffect(() => {
        if(logged && loading.current) {
            (async() => {
                const {id, firstName, lastName, canView, email} = await getUserInfo();
                const data = await getAllPublications();
                setPublications(preVal => preVal = data);
                setUser(preVal => ({...preVal, id: id, firstName: firstName, lastName: lastName, email: email, canview: canView}))
            })()

            loading.current = false;
        }
    }, [logged])

    const updatePublications = async () => (
        await getAllPublications()
    )

    return (
        <Router>
            <Layout setFoundPublication={setFoundPublication} publications={publications} email={user.email}>
                <Switch>
                    <Route path="/home"      element={<get.Home/>}/>
                    <Route path="/ressources" element={<get.Ressources publications={publications} foundPublication={foundPublication} updatePublications={updatePublications} userId={user.id}/>}/>
                    <Route path="/mes-cours" element={<get.Classes user={user}/>}/>
                    <Route path="/contact"   element={<get.Contact/>}/>
                    <Route path="*"          element={<get.Error/>}/>
                </Switch>
            </Layout>
        </Router>
    )
}

export default RenderApp;