import { useState, useRef, useEffect } from "react";
import { getUserInfo } from "../../functions/auth";
import { getClassesAccess } from "../../functions/classes";


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