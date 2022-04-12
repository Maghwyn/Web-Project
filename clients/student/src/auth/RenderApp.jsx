import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import { get } from "../views/~index";
import { getUserInfo } from "../functions/auth";

const RenderApp = ({logged}) => {
    const [user, setUser] = useState({id: null, firstName: null, lastName: null, email: null, canview: null});
    const loading = useRef(true);
    const [fetchArrayPublications, setFetchArrayPublications] = useState([]);
    const [foundPublication, setFoundPublication] = useState([]);


    const GetAllPublications = 
        async () => {
            await axios.get("http://localhost:8080/api/v1/publications" , {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" : '*'
      },
    })
    .then((res) => { if (res.status === 200) {setFetchArrayPublications(res);} else {throw new Error("A problem appeared")}
       })
    .catch(function(err) {console.error(err)});
    }
        
        
    useEffect(() => {
        GetAllPublications();
        if(logged && loading.current) {
            (async() => {
                const {id, firstName, lastName, canView, email} = await getUserInfo();
                setUser(preVal => ({...preVal, id: id, firstName: firstName, lastName: lastName, email: email, canview: canView}))
            })()

            loading.current = false;
        }
    }, [logged])

    return (
        <Router>
            <Layout setFoundPublication={setFoundPublication} publications={fetchArrayPublications}  email={user.email}>
                <Switch>
                    <Route path="/home"      element={<get.Home/>}/>
                    <Route path="/ressource" element={<get.Ressources />}/>
                    <Route path="/fill"      element={<get.Fill publications={fetchArrayPublications} foundPublication={foundPublication} info={user}/>}/>
                    <Route path="/mes-cours" element={<get.Classes info={user}/>}/>
                    <Route path="/contact"   element={<get.Contact/>}/>
                    <Route path="*"          element={<get.Error/>}/>
                </Switch>
            </Layout>
        </Router>
    )
}

export default RenderApp;