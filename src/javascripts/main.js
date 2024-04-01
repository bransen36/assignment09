//TODO - Your ES6 JavaScript code (if any) goes here
import "bootstrap"

let initial_guests = []

function getGuests(){
    let storedGuests = []
    storedGuests = localStorage.getItem("guests");
    if (storedGuests && storedGuests !== "[]") {
        return JSON.parse(storedGuests);
    }
    else {
        localStorage.setItem("guests", JSON.stringify(initial_guests));
        return initial_guests;
    }
}


function addNewGuest(e){
    e.preventDefault()
    
    let fn = document.querySelector("#fName").value
    let ln = document.querySelector("#lName").value

    let guests = getGuests()
    if (fn && ln){
        let guest = {fName: fn, lName: ln}
        guests.push(guest)
        localStorage.setItem("guests", JSON.stringify(guests))
        displayGuests()
    }

    this.reset()
}

function displayGuests() {
    let guests = getGuests();
    let guests_html = "";


    for (let g of guests) {
        guests_html += `
            <div class="guest row">
                <div class="col-6 border-bottom my-2">
                    ${g.fName}
                </div>
                <div class="col-6 border-bottom my-2">
                    ${g.lName}
                </div>
            </div>
        `
    }

    document.querySelector("#guest_names").innerHTML = guests_html;

    document.querySelectorAll("#clear_list").forEach(function(btn){
        btn.onclick = function(){
            if(confirm("Are you sure you want to clear the guestbook?")){
                localStorage.clear()
                initial_guests = []
                displayGuests()
            }
        }
    })
}


document.querySelector("#guestForm").onsubmit = addNewGuest
