import Auth from "../views/Auth";
import Portal from "../views/Portal";

const unauthenticatedApp = ({login}) => {
    return window.location.pathname === "/auth" ?
        <Portal/>
      :
        <Auth login={login}/>
}

export default unauthenticatedApp;