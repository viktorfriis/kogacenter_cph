window.addEventListener("DOMContentLoaded", start);
const urlParamsPage = new URLSearchParams(window.location.search);
const page = urlParamsPage.get("page");

const searchBar = document.querySelector("#search_bar");


function start() {
    hentHeader();
    hentFooter();
    search();
}

async function hentHeader() {
    console.log("header");


    const theHeader = await fetch("header.html");
    let theFetched = await theHeader.text();
    document.querySelector("header").innerHTML = theFetched;

    burgerAktiv();
    styleLink();
}

function styleLink() {
    document.querySelector("#" + page).style.color = "var(--koga-blue)";
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

function search() {
    document.querySelector("#no_results").style.display = "none";
    searchBar.addEventListener("keyup", function (search) {
        console.log("key up");

        const searchValue = search.target.value.toLowerCase();
        const cykler = document.querySelectorAll(".bike");

        let counter = 0;
        let numBikes = cykler.length;

        Array.from(cykler).forEach(cykel => {
            const title = cykel.querySelector("h2").firstChild.textContent;

            if (title.toLowerCase().indexOf(searchValue) != -1) {
                cykel.style.display = "block";

            } else {
                cykel.style.display = "none";
            }

            if (cykel.style.display == "none") {
                counter++;

            }

        })

        if (counter < numBikes) {
            document.querySelector("#no_results").style.display = "none";

        } else {
            document.querySelector("#no_results").style.display = "block";
        }
    })
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
