window.addEventListener("DOMContentLoaded", start);

function start() {
    hentHeader();
    hentFooter();
}

async function hentHeader() {
    console.log("header");

    const theHeader = await fetch("header.html");
    let theFetched = await theHeader.text();
    document.querySelector("header").innerHTML = theFetched;

    console.log("header hentet");
    burgerAktiv();
}

function burgerAktiv() {
    console.log("Burger aktiv");

    const burgerKnap = document.querySelector("#burger_knap");
    const menu = document.querySelector("#menu");

    burgerKnap.addEventListener("click", () => {
        console.log("openMenu");

        burgerKnap.classList.toggle("open"); //Selve knappen toggler klassen .open, hvilket animerer den til et kryds
        burgerKnap.classList.toggle("pos_fixed"); //Knappen toggler position fixed, for at den bliver i toppen af skærmen når den er åben

        menu.classList.toggle("toggle_menu"); //Selve menuen toggler klassen .toggle_menu, som åbner og lukker menuen
    })
}

async function hentFooter() {
    console.log("footer");

    const theFooter = await fetch("footer.html");
    let theFetched = await theFooter.text();
    document.querySelector("footer").innerHTML = theFetched;

    console.log("footer hentet");
}
