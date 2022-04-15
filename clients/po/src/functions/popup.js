export function Notif(color, content){
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async function transition(){
        await sleep (500);
        div.style.left = "78%";
    }

    async function eraseNotif() {
        await sleep(5000);
        div.style.opacity = "0";
        await sleep(1000);
        div.remove();
    }
    
    const div = document.createElement('div');
    const p = document.createElement('p');
    div.style.background = color;
    p.textContent = content;
    document.body.appendChild(div);
    div.appendChild(p);

    const d = div.style;
    d.position = "absolute"; d.left = "100%"; d.top = "14%";
    d.width = "300px"; d.textAlign = "center"; d.borderRadius = "20px"; 
    d.padding = "10px"; d.transition = "all 1s ease";
    p.style.color = "white"; p.style.fontSize = "22px";
    
    transition();
    eraseNotif()
}