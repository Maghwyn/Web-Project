import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Classes from "./views/Classes";
import Home from "./views/Home";

const App = () => (
    <Router>
        <Layout>
            <Switch>
                <Route path="/home"                element={<Home/>}/>
                <Route path="/classes"                element={<Classes/>}/>
            </Switch>
        </Layout>
    </Router>
)

export default App;