class User {
    #_user = {
        id: "",
        name: { lastName: "", firstName: "" },
        email: { email: "", verified: "" }
    }

    setId(uid) {
        this.#_user.id = uid;
    }

    setLastName(lastName) {
        this.#_user.name.lastName = lastName;
    }

    setFirstName(firstName) {
        this.#_user.name.firstName = firstName;
    }

    setEmail(email) {
        this.#_user.email.email = email;
    }

    setVerified(verified) {
        this.#_user.email.verified = verified;
    }

    getUser() {
        return this.#_user;
    }
}

export default User;


// TS FILE
// class User {
//     private _user: any = {
//         id: "",
//         name: { lastName: "", firstName: "" },
//         email: { email: "", verified: "" }
//     }

//     setId(uid: string) {
//         this._user.id = uid;
//     }

//     setLastName(lastName: string) {
//         this._user.name.lastName = lastName;
//     }

//     setFirstName(firstName: string) {
//         this._user.name.firstName = firstName;
//     }

//     setEmail(email: string) {
//         this._user.email.email = email;
//     }

//     setVerified(verified: string) {
//         this._user.email.verified = verified;
//     }

//     get user() {
//         return this._user;
//     }
// }