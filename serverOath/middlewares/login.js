import { studentExist, createNewStudent, createStudentSession, 
        productOwnerExist, createNewProductOwner, createProductOwnerSession } from "../controllers/axios.js";

export const saveUserRole = async (req, res, next) => {
    try {
        const query = req.query?.user;
        if(!["student", "po"].includes(query)) throw new Error("Access forbidden");

        res.locals.role = query;
        next();
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
}

export const onUserSuccessPO = async (req, res, next) => {
    res.locals.role = req.query.state;

    if(res.locals.role === "po") {
        const id = req.user.id;
        const isUserInDatabase = await productOwnerExist(id);

        if(isUserInDatabase) {
            console.log("po exist")
            await createProductOwnerSession(id);
            res.locals.role = "student";
        }
        else {
            console.log("po didn't exist")
            const { lastName, firstName } = req.user.name;
            const { email } = req.user.email;

            await createNewProductOwner(firstName, lastName, email, id);
            await createProductOwnerSession(id);
            res.locals.role = "student";
        }
    }
    next();
}

export const onUserSuccessStudent = async (req, res, next) => {
    res.locals.valid = false;
    
    if(res.locals.role === "student") {
        const id = req.user.id;
        const isUserInDatabase = await studentExist(id);

        if(isUserInDatabase) {
            console.log("student exist")
            if(req.query.state !== "po") await createStudentSession(id);
            res.locals.valid = true;
        }else {
            console.log("student didn't exist")
            console.log("care here")
            const { lastName, firstName } = req.user.name;
            const { email } = req.user.email;

            await createNewStudent(firstName, lastName, email, id);
            if(req.query.state !== "po") await createStudentSession(id);
            res.locals.valid = true;
        }
    }
    next();
}

export const resolveAuth = async (req, res) => {
    if(!res.locals.valid) return res.status(403).json({ message : "Access Forbidden" });

    if(req.query.state === "student") {
        res.cookie("student", req.user.id, {expires: new Date(Date.now() + 6048000)});
        res.redirect('http://localhost:3000/auth');
    }else {
        res.cookie("po", req.user.id, {expires: new Date(Date.now() + 6048000)});
        res.redirect('http://localhost:3001/auth');
    }
}