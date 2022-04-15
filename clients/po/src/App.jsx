import React, { useEffect, useRef, useState } from "react";
import { isUserAuthentificated } from "./functions/auth";

const AuthenticatedApp = React.lazy(() => import('./auth/authenticatedApp'))
const UnauthenticatedApp = React.lazy(() => import('./auth/unauthenticatedApp'))

const App = () => {
    const [user, setUser] = useState(null);
    const loading = useRef(true);

    useEffect((auth) => {
        if(loading.current) {
            (async () => { 
            auth = await isUserAuthentificated()
            setTimeout(() => {
                setUser(prevVal => prevVal = auth);
            }, 1000);
            })()
            loading.current = false;
        }
    }, []);
 
    return user === null ?
        <main className="auth" />
      : user ?
        <AuthenticatedApp logged={user}/>
      :
        <UnauthenticatedApp/>
}

export default App;