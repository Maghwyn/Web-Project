import axios from "axios";
import emailjs from "emailjs-com"


export async function submit(body, e) {
    e.preventDefault();
    
    const data = await axios.get('http://localhost:5001/auth/email')
    .then(res=>{return res.data})
    .catch(err=> console.error(err));

     emailjs.send(data.serviceID, data.templateID, body, data.userID)
     .then(res => {return res})
     .catch(err => console.error(err));
     e.target.reset()
}
