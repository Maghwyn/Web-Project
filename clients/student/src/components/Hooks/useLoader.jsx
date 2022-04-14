import { useState, useRef, useEffect } from "react";
import { getCategoryTag, getAllPublications } from "../../functions/publication";
import { getUserInfo } from "../../functions/auth";
import { getOpinionsByUserId } from "../../functions/opinions";
import { getClassesAccess } from "../../functions/classes";


const useLoader = () => {
    const [user, setUser] = useState({id: null, firstName: null, lastName: null, email: null, canview: null});
    const [classes, setClasses] = useState([])
    const [publications, setPublicationSaved] = useState([]);
    const [categories, setCategories] = useState([]);
    const [opinions, setOpinions] = useState([]);
    const loading = useRef(true);

    useEffect(() => {
        if(loading.current) {
            (async () => {
                const {id, firstName, lastName, canView, email} = await getUserInfo();
                const clas = await getClassesAccess(id);
                const cat = await getCategoryTag();
                const publi = await getAllPublications();
                const opi = await getOpinionsByUserId(id);
                
                setUser(preVal => ({...preVal, id: id, firstName: firstName, lastName: lastName, email: email, canview: canView}))
                setClasses(preVal => preVal = clas);
                setPublicationSaved(publi);
                setCategories(cat);
                setOpinions(opi);
            })();

            loading.current = false;
        }
    }, []);

    console.log(categories)

    return {user, classes, setClasses, publications, categories, setCategories, opinions, setOpinions}
}

export default useLoader;