import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import Auth from "../views/Auth";
import Redirect from "../components/items/Redirect";

const RenderLogin = () => {
    async function oath(e) {
        e.preventDefault();
        window.location = "http://localhost:5001/auth/google?user=po";
    }

    return (
        <Router>
            <Switch>
                <Route path="/auth" element={<Auth oath={oath} />}/>
                <Route path="*" element={<Redirect />} />
            </Switch>
        </Router>
    )
}

export default RenderLogin;