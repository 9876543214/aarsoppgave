let selected = [];
const kjøptekst = document.getElementById("kjøp")
const movie = document.getElementById("poster-movie").textContent
const time = document.getElementById("poster-time").textContent
const sal = document.getElementById("sal").textContent
let id = localStorage.getItem("userid")
let billettData
let thisticket = [] //måtte lage en billett som bare inneholder seter som nettopp ble kjøpt, får å ungå at de samme setene ble sendt til tickets_db
if (localStorage.getItem("gettickets")) {
    setTimeout(() => {
        document.getElementById("retriveticket").submit()
        localStorage.removeItem("gettickets")
    }, 10);
}

localStorage.setItem("gettickets", 1)

let alltickets = []
let tickets = JSON.parse(localStorage.getItem("Database-tickets"))

tickets.forEach(ticket => {
    alltickets = alltickets.concat(ticket)
});



function addreserved() {// legger til "reserved" på alle seter som er i localstorage
    if (alltickets.length > 0) {
        alltickets.forEach(ticket => {
            if (ticket.time === time) { //sjekker om billetten har samme film, tid og sal som denne siden
                console.log("a")
                if (ticket.movie === movie) {
                    console.log("b")
                    if (ticket.location === sal) {
                        const seatNumbers = ticket.seats.split(',').map(Number)
                        seatNumbers.sort((a, b) => a - b)
                        seatNumbers.forEach(seat => {
                            let button = document.getElementById(`sete${seat}`);
                            if(button){
                                button.classList.add("reserved"); 
                            }
                        });
                    }
                }
            }

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




function kjøp(event) { //lagrer billettdata og resetter "selected"

    if (localStorage.getItem("notloggedin")) {
        return
    }
    if (selected.length >= 1) {

        // lagrer billettdata
        billettData = {
            seats: selected,
            time: time,
            location: sal,
            movie: movie,
            id: id
        }


        thisticket.push(billettData) //lagrer kun nettop kjøpte seter

        // legger til billett i usertickets

        storeticket()

        selected = []; // tømmer selected
        
        addreserved()
       
        nyfarge();

        document.getElementById("saveticket").submit();
    }
}

function storeticket() {    
    document.cookie = "Ticket=" + JSON.stringify(thisticket) + ";path=/Nettside_php_database/php_saveticket" //sender data til php via cookie
}

function pris() {
    let penger = 149 * selected.length // setter pris som 149 * lengde på "selected"
    return penger
}


