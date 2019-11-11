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

async function hentFooter() {
    console.log("footer");

    const theFooter = await fetch("footer.html");
    let theFetched = await theFooter.text();
    document.querySelector("footer").innerHTML = theFetched;

    console.log("footer hentet");
}

function burgerAktiv() {
    console.log("Burger aktiv");

    const burgerKnap = document.querySelector("#burger_knap");
    const menu = document.querySelector("#menu");

    const dropElm = document.querySelector(".dropdown_elm");
    const dropElmH2 = document.querySelector(".dropdown_h2");

    const dropdown = document.querySelector("#dropdown");
    const dropdownLink = document.querySelector("#cykler");

    burgerKnap.addEventListener("click", () => {
        console.log("openMenu");

        burgerKnap.classList.toggle("open"); //Selve knappen toggler klassen .open, hvilket animerer den til et kryds
        burgerKnap.classList.toggle("pos_fixed"); //Knappen toggler position fixed, for at den bliver i toppen af skærmen når den er åben

        menu.classList.toggle("toggle_menu"); //Selve menuen toggler klassen .toggle_menu, som åbner og lukker menuen
    })

    dropdownLink.addEventListener("mouseover", () => {
        dropdown.style.display = "grid";
    })

    dropdown.addEventListener("mouseover", () => {
        dropdown.style.display = "grid";
        dropdownLink.style.color = "var(--koga-blue)";
    })

    dropdownLink.addEventListener("mouseout", () => {
        dropdown.style.display = "none";
    })

    dropdown.addEventListener("mouseout", () => {
        dropdown.style.display = "none";
        dropdownLink.style.color = "";
    })
}
