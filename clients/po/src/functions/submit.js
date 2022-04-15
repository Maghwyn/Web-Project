import axios from "axios";
import emailjs from "emailjs-com"
import { Notif } from "./popup";

export async function submit(body, e) {    
    const data = await axios.get('http://localhost:5001/auth/email')
    .then(res=>{return res.data})
    .catch(err=> console.error(err));

    emailjs.send(data.serviceID, data.templateID, body, data.userID)
    .then(res => {Notif("#d4c465", "Merci de nous avoir contacté, on vous répondra dès que possible"); return res })
    .catch(err => Notif("crimson", "Votre message n'a pas pu être envoyé, rechargez la page s'il vous plait"));
}