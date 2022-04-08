import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Classes from "./views/Classes";
import Home from "./views/Home";
import Ressources from "./views/Ressources";

const App = () => (
    <Router>
        <Layout>
            <Switch>
                <Route path="/home"                element={<Home/>}/>
                <Route path="/classes"                element={<Classes/>}/>
                <Route path="/ressources"                element={<Ressources/>}/>
            </Switch>
        </Layout>
    </Router>
)

export default App;