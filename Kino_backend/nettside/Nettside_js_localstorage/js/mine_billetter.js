let existingTickets = []
let id = localStorage.getItem("userid")

for (let i = 0; i < localStorage.length; i++) { //denne funksjonen kjører 1 gang per element i localstorage
    let key = localStorage.key(i); //henter key til elementet i localstorage


    if (key.includes(id)) { //kjører bare hvis key inneholder id
        let billett = JSON.parse(localStorage.getItem(key));
        // Push billett så den kan legge til flere
        existingTickets = existingTickets.concat(billett);
    }

}

console.log(existingTickets)
if (existingTickets.length > 0) {
    document.addEventListener('DOMContentLoaded', function () {
        const container = document.getElementById('ticket')
        existingTickets.forEach(ticket => { //lager html billett for hver billett i localstorage
            console.log(ticket)
            console.log(ticket.movie)
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
                                                Sete ${ticket.seats}
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
} else {
    const noticket = document.getElementById("ingenbilletttekst")
    noticket.style.display = "block"
}