import { useState } from "react";
import { submit } from "../functions/submit";

const Contact = () => {
    const [form, setForm] = useState({email: "", sujet: "", msg: ""});

    const reset = (e) => {
        e.preventDefault();
        setForm(preVal => preVal = {email: "", sujet: "", msg: ""});
        e.target.reset();
    }

    return (
        <main className="contact-form-container">
            <form className="contact-form-content" onSubmit={(e) => {submit(form); reset(e)}}>
                {/* <div className="contact-form-"> */}
                    <div className="contact-form-content-field">
                        <label htmlFor="email">Votre adresse email : </label>
                        <input id="email" value={form.email} onChange={(e) => setForm(preVal => ({...preVal, email: e.target.value}))} />
                    </div>
                    <div className="contact-form-content-field">
                        <label htmlFor="subject">Le sujet de votre message : </label>
                        <input id="subject" value={form.sujet} onChange={(e) => setForm(preVal => ({...preVal, sujet: e.target.value}))} />
                    </div>
                    <div className="contact-form-content-field">
                        <label htmlFor="msg">Votre message : </label>
                        <input id="msg" value={form.msg} onChange={(e) => setForm(preVal => ({...preVal, msg: e.target.value}))} />
                    </div>
                {/* </div> */}
                <div className="contact-form-submit">
                    <input type="submit" value="Contactez nous !"></input>
                </div>
            </form>
        </main>
    )
}

export default Contact;