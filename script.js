let selected = [];
let kjøptekst = document.getElementById("kjøp")
let existingTickets = JSON.parse(localStorage.getItem("Billett")) || [];

if (localStorage.getItem("Billett") != null) {
    const allTickets = JSON.parse(localStorage.getItem("Billett")); // legger til "reserved" på alle seter som allerede er i localstorage
    allTickets.forEach(ticket => {
        ticket.seats.forEach(seat => {
            let button = document.getElementById(`sete${seat}`);
            if(button){
                button.classList.add("reserved"); 
            }
        });
    });
}

function toggle(sete) { //setter valgte seter som selected
    const index = selected.indexOf(sete);
    
    if (index > -1) {
        selected.splice(index, 1);
    } else {
        selected.push(sete);
    }

    nyfarge();
    console.log(selected);
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
    if (selected.length >= 1) {
    // Create a new ticket object
    const billettData = {
        seats: selected,
        time: "12:00",
        location: "Sal 4",
        movie: "Dune: Part 2"
    }

    // legger til billett i existingtickets hvis existingtickets finnes
    if(existingTickets) {
        existingTickets.push(billettData);
        localStorage.setItem("Billett", JSON.stringify(existingTickets));
    } else {
        localStorage.setItem("Billett", JSON.stringify([billettData]));
    }

    selected = []; // tømmer selected

    const allTickets = JSON.parse(localStorage.getItem("Billett"));// legger til "reserved" på alle seter som allerede er i localstorage
    allTickets.forEach(ticket => {
        ticket.seats.forEach(seat => {
            let button = document.getElementById(`sete${seat}`);
            if(button){
                button.classList.add("reserved");
            }
        });
    });

    console.log([billettData])
    nyfarge();
    }
}


function pris() {
    let penger = 149 * selected.length // setter pris som 149 * lengde på "selected"
    return penger
}

if (document.getElementById('kjøp') != null){ //kjører bare hvis 'kjøp' finnes
document.getElementById('kjøp').addEventListener('click', kjøp);
}

if (document.getElementById("ticket") != null) {
    document.addEventListener('DOMContentLoaded', function() {
        // Retrieve all tickets from local storage
        const allTickets = JSON.parse(localStorage.getItem("Billett"));
        allTickets.forEach(ticket => {
            ticket.seats.forEach(seat => {
                let button = document.getElementById(`sete${seat}`);
                if(button){
                    button.classList.add("reserved"); // Provide value true to disable the button
                }
            });
        });

        const container = document.getElementById('ticket')

        allTickets.forEach(ticket => { //lager html billett for hver billett i localstorage
            const ticketElement = document.createElement("div")
            ticketElement.classList.add("ticket")
            ticketElement.innerHTML = `
            <div class="ticket">  <!--html for billettdesign (ikke lagd selv)-->
            <div class="section">   
                <div class="container pt-5">
                    <div class="row justify-content-center">
                        <div class="col-12 text-center">
                            <div class="section">
                                <label for="ticket-1">
                                    <span class="top-dots">
                                        <span class="section dots">
                                            <span></span>
                                            <span></span> <!--dotter i ticketdesign-->
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </span>
                                    </span>
                                    <p class="minfilm1" id="minfilm"><!--får innhold fra localstorage-->
                                        ${ticket.movie}
                                    </p>
                                    <p class="mittsete1 mt-2 pb-4 mb-3" id="mittsete"><!--får innhold fra localstorage-->
                                        ${ticket.seats}
                                    </p>
                                    <span class="gap">l</span>
                                    <span class="section dots">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </span>
                                    <span class="gap">1</span>
                                    <span class="gap">l</span>
                                    <p class="minsal1 mt-2" id="minsal"><!--får innhold fra localstorage-->
                                    ${ticket.location}
                                        
                                    </p>
                                    <p class="mintid1 mt-2" id="mintid"><!--får innhold fra localstorage-->
                                    ${ticket.time}
                                        
                                    </p>
                                    <span class="bottom-dots">
                                        <span class="section dots">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </span>
                                    </span>
                                </label>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
            container.appendChild(ticketElement);

        })
    });
}
if (document.getElementById('clearstorage') != null)
document.getElementById("clearstorage").addEventListener("click", clearlocalstorage)

function clearlocalstorage() {
    localStorage.clear()
    window.location.reload()
}

function ingenbillett() {
    const billettData = JSON.parse(localStorage.getItem("Billett"));

    
    if (!billettData || billettData.length === 0) { //kjører bare hvis billett finnes
        const tickets = document.querySelectorAll('.ticket');//setter display none på tomme billetten
        tickets.forEach(ticket => {
            ticket.style.display = 'none';
        });

        // Show "Ingen billett funnet" message
        const noTicketMessage = document.getElementById('ingenbilletttekst');
        if (noTicketMessage) {
            noTicketMessage.style.display = 'block';
        }
    }
}


document.addEventListener('DOMContentLoaded', function() {
    ingenbillett();
})





