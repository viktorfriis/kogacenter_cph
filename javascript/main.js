window.addEventListener("DOMContentLoaded", start);

const urlParamsPage = new URLSearchParams(window.location.search);
const page = urlParamsPage.get("page");

console.log(page);

document.querySelector("#" + page).style.color = "var(--koga-blue)";


function start() {
    hentHeader();
    hentFooter();
}

async function hentHeader() {
    console.log("header");

    const theHeader = await fetch("header.html");
    let theFetched = await theHeader.text();
    document.querySelector("header").innerHTML = theFetched;

    burgerAktiv();
}

async function hentFooter() {
    //    console.log("footer");

    const theFooter = await fetch("footer.html");
    let theFetched = await theFooter.text();
    document.querySelector("footer").innerHTML = theFetched;

    //    console.log("footer hentet");
}

function burgerAktiv() {
    //    console.log("Burger aktiv");

    const burgerKnap = document.querySelector("#burger_knap");
    const menu = document.querySelector("#menu");

    const dropdown = document.querySelector("#dropdown");
    const dropdownLink = document.querySelector("#cykler");

    const hoverEffect = document.querySelector(".hover_effect");

    burgerKnap.addEventListener("click", () => {
        console.log("openMenu");

        burgerKnap.classList.toggle("open"); //Selve knappen toggler klassen .open, hvilket animerer den til et kryds
        burgerKnap.classList.toggle("pos_fixed"); //Knappen toggler position fixed, for at den bliver i toppen af skærmen når den er åben

        menu.classList.toggle("toggle_menu"); //Selve menuen toggler klassen .toggle_menu, som åbner og lukker menuen
    })

    dropdownLink.addEventListener("mouseover", () => {
        dropdown.style.display = "grid";
        hoverEffect.style.display = "block";
    })

    dropdown.addEventListener("mouseover", () => {
        dropdown.style.display = "grid";
        dropdownLink.style.color = "#3b95d1";
        hoverEffect.style.display = "block";
    })

    dropdownLink.addEventListener("mouseout", () => {
        dropdown.style.display = "none";
        hoverEffect.style.display = "none";
    })

    dropdown.addEventListener("mouseout", () => {
        dropdown.style.display = "none";
        dropdownLink.style.color = "";
        hoverEffect.style.display = "none";
    })

    dropdownLink.addEventListener("click", () => {
        dropdown.style.display = "grid";
        hoverEffect.style.display = "block";
    })

    if (page == "trekking" || page == "race" || page == "e-bikes" || page == "city") {
        dropdownLink.style.color = "#3b95d1";
    }
}

/*
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("active", "");
    }
    dots[slideIndex - 1].className += " active";

    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 5000); // Change image every 5 seconds
}*/
