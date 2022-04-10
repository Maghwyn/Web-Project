import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import { useState } from "react";
import Portal from "../views/Portal";
import Auth from "../views/Auth";
import Redirect from "../components/items/Redirect";

const RenderLogin = () => {
    const [loginPage, setLoginPage] = useState(null);

    async function fetchLogin(e) {
        setLoginPage(preVal => preVal = true);
    }

    async function oath(e) {
        e.preventDefault();
        window.location = "http://localhost:5001/auth/google?user=student";
    }

    return (
        <Router>
            <Switch>
                <Route path="/auth" element={
                    loginPage ? 
                        <Auth oath={oath}></Auth>
                      :
                        <Portal getLogin={fetchLogin}/>
                }/>
                <Route path="*" element={<Redirect />} />
            </Switch>
        </Router>
    )
}

export default RenderLogin;