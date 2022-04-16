import { useState, useRef, useEffect } from "react";
import { getUserInfo } from "../../functions/auth";
import { getClassesAccess } from "../../functions/classes";


// Custom Hook resolving a few issue with the like when the publications array is filtered.
// All data is fetched and distribued to the component needing them which avoid the use of useMemo/useCallback to prevent
// the browser from fetching the data each time we switch from one page to another.
// Issue : It takes more time to load the application.
const useLoader = () => {
    const [user, setUser] = useState({id: null, firstName: null, lastName: null, email: null, canview: null});
    const [classes, setClasses] = useState([])
    const loading = useRef(true);

    useEffect(() => {
        if(loading.current) {
            (async () => {
                const {id, firstName, lastName, canView, email} = await getUserInfo();
                const clas = await getClassesAccess(id);
                
                setUser(preVal => ({...preVal, id: id, firstName: firstName, lastName: lastName, email: email, canview: canView}))
                setClasses(preVal => preVal = clas);
            })();

            loading.current = false;
        }
    }, []);

    return {user, classes}
}

export default useLoader;