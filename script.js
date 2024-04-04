

let selected = [];
let kjøptekst = document.getElementById("kjøp")
let existingTickets = JSON.parse(localStorage.getItem("Billett"));


function toggle(sete) {
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
    localStorage.setItem("Ting", JSON.stringify(selected));
    kjøptekst.innerHTML = "Kjøp: " + pris() + "kr" //skriver pris ved siden av kjøp knappen
}

function kjøp() {//lagrer billettdata og resetter "selected"
        // Create a new ticket object
        const billettData = {
            seats: selected,
            time: "12:00",
            location: "Sal 4",
            movie: "Dune: Part 2"
        };

        // Add the new ticket to the array of existing tickets if it exists
        if (existingTickets) {
            existingTickets.push(billettData);

            // Store the updated array back in local storage
            localStorage.setItem("Billett", existingTickets);
        } else {
            // If existingTickets doesn't exist, create a new array with the new ticket
            localStorage.setItem("Billett", [billettData]);
        }
        console.log(JSON.stringify(billettData))

        selected = [];

        nyfarge();
    }
function pris() {
    let penger = 149 * selected.length // setter pris som 149 * lengde på "selected"
    return penger
}

if (document.getElementById('kjøp')) { //kjører bare hvis 'kjøp' finnes
    document.getElementById('kjøp').addEventListener('click', kjøp);
}

/* document.addEventListener('DOMContentLoaded', function () {
    // Retrieve all tickets from local storage
    const ticketElement = document.createElement("div")
        existingTickets ? existingTickets.forEach(ticket => {
                ticket.seats.forEach(seat => {
                    let button = document.getElementById(`sete${seat}`);
                    if (button) {
                        button.classList.add("reserved");
                    }
                });
        }) : null;

    const container = document.getElementById('ticket');

    existingTickets.forEach(ticket => { //lager html billett for hver billett i localstorage
        console.log(localStorage.getItem("Billett"))
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

    })
    if(container){
        container.appendChild(ticketElement);
    }
}); */




function ingenbillett() {
    const billettData = JSON.parse(localStorage.getItem("Billett"));


    if (!billettData || billettData.length === 0) { //kjører bare hvis billett finnes

        // Show "Ingen billett funnet" message
        const noTicketMessage = document.getElementById('ingenbilletttekst');
        if (noTicketMessage) {
            noTicketMessage.style.display = 'block';
        }
    }
}


document.addEventListener('DOMContentLoaded', function () {
    ingenbillett();
});





