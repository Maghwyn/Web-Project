import React from "react";
import { useState } from "react";
import * as auth from "./auth/auth";

const AuthenticatedApp = React.lazy(() => import('./auth/authenticatedApp'))
const UnauthenticatedApp = React.lazy(() => import('./auth/unauthenticatedApp'))

const App = () => {
    const [user, setUser] = useState(null);

    const login = form => auth.login(form).then(u => setUser(u));
    const logout = () => auth.logout().then(() => setUser(null));

    return user ?
        <AuthenticatedApp user={user} logout={logout} />
      :
        <UnauthenticatedApp login={login}/>
}

export default App;