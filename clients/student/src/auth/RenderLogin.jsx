import axios from "axios";
import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import { useRef, useState } from "react";
import Portal from "../views/Portal";
import Auth from "../views/Auth";

const RenderLogin = () => {
    const [loginPage, setLoginPage] = useState(null);

    async function fetchLogin(e) {
        setLoginPage(preVal => preVal = true);
    }

    async function oath(e) {
        e.preventDefault();
        window.location = "http://localhost:5001/auth/google";
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
                <Route path="*" element={null} />
            </Switch>
        </Router>
    )
}

export default RenderLogin;