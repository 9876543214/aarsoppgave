
let selected = [];
const kjøptekst = document.getElementById("kjøp")
const movie = document.getElementById("poster-movie").textContent
const time = document.getElementById("poster-time").textContent
const sal = document.getElementById("sal").textContent
let id = localStorage.getItem("userid")
let usertickets = JSON.parse(localStorage.getItem("Billett " + movie + " " + time + " ID = " + id)) || [];
let alltickets = []
let billettData


function getalltickets() {
    for (let i = 0; i < localStorage.length; i++) { //denne funksjonen kjører 1 gang per element i localstorage
        let key = localStorage.key(i); //henter key til elementet i localstorage
        if (key.includes("Billett " + movie + " " + time)) { //kjører bare hvis key inneholder "Billett"
            let billett = JSON.parse(localStorage.getItem(key));
            // conact billett så den kan legge til flere
            alltickets = []
            alltickets = alltickets.concat(billett);
        }
    }
}

getalltickets()

function addreserved() {// legger til "reserved" på alle seter som er i localstorage
    if (alltickets.length > 0) {
        alltickets.forEach(ticket => {
            ticket.seats.forEach(seat => {
                let button = document.getElementById(`sete${seat}`);
                if(button){
                    button.classList.add("reserved"); 
                }
            });
        }); 
    }
}

addreserved()

function toggle(sete) { //setter valgte seter som selected
    const index = selected.indexOf(sete);
    
    if (index > -1) {
        selected.splice(index, 1);
    } else {
        selected.push(sete);
    }

    nyfarge();
}

function nyfarge() { //bytter farge på seter som er valgt
    
    const button = document.querySelectorAll('.sete')
    button.forEach(button => {
        const seteTall = parseInt(button.textContent.replace('Sete ', ''))
        if (selected.includes(seteTall)) {
            button.classList.add('valgt')
        } else {
            button.classList.remove('valgt')
        }
    })
    selected.sort((a, b) => a - b);//sorterer valgte seter
    kjøptekst.innerHTML = "Kjøp: " + pris() + "kr" //skriver pris ved siden av kjøp knappen
}




function kjøp() { //lagrer billettdata og resetter "selected"

    if (localStorage.getItem("notloggedin")) {
        return
    }
    if (selected.length >= 1) {

        // Create a new ticket object
        billettData = {
            seats: selected,
            time: time,
            location: sal,
            movie: movie
        }

        // legger til billett i usertickets

        storeticket()

        selected = []; // tømmer selected

        getalltickets()
        
        addreserved()
       
        console.log([billettData])
        nyfarge();

    }
}

function storeticket() {    
    if (usertickets.length > 0) {
        usertickets[0].seats = usertickets[0].seats.concat(billettData.seats)
        localStorage.removeItem("Billett " + movie + " " + time + " ID = " + id)
        localStorage.setItem("Billett " + movie + " " + time + " ID = " + id, JSON.stringify(usertickets));
    }else {
        usertickets.push(billettData);
        localStorage.setItem("Billett " + movie + " " + time + " ID = " + id, JSON.stringify(usertickets));
    }
}

function pris() {
    let penger = 149 * selected.length // setter pris som 149 * lengde på "selected"
    return penger
}


document.getElementById('kjøp').addEventListener('click', kjøp);

document.getElementById("clearstorage").addEventListener("click", clearlocalstorage)

function clearlocalstorage() {
    localStorage.clear()
    window.location.reload()

}