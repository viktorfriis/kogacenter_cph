//Definerer variablen hvor alle vores posts kommer ind i et array
let bikes = [];

let eBikes = [];

let imgCount = 0;

//Definerer destinationen hvor hver article skal sættes ind
const dest = document.querySelector(".bikes");

//Definerer templaten hvor som hver øl post skal følge
const temp = document.querySelector("template");

document.addEventListener("DOMContentLoaded", start);

function start() {
    getJson();
    sortClickable();
    search();
}

function sortClickable() {
    document.querySelector("#sorter").addEventListener("change", sorter);
}
async function getJson() {
    console.log("getJson");

    const url = "https://viktorkjeldal.dk/kea/2sem/kogacenter_cph/wordpress/wp-json/wp/v2/cykel?per_page=100";

    //Henter data i filen som er defineret ovenfor
    const jsonData = await fetch(url);

    //Indsætter dataen i mit array
    bikes = await jsonData.json();

    eBikes = bikes.filter(eBike => eBike.kategori == "E-bike");

    console.log(eBikes);
    showBikes();

}

function showBikes() {
    console.log("showBikes");
    dest.innerHTML = "";
    //For hvert array objekt skriver jeg dataen ind i en template
    eBikes.forEach(eBike => {
        const klon = temp.cloneNode(true).content;

        klon.querySelector(".bike_img").src = eBike.billede.guid;
        klon.querySelector(".bike_img").alt = eBike.alt_tag;
        klon.querySelector(".model").textContent = eBike.model;
        klon.querySelector(".kort").textContent = eBike.kort;

        if (eBike.ny_pris == "") {
            klon.querySelector(".gammel_pris").textContent = eBike.pris + " DKK";
            klon.querySelector(".gammel_pris").style.textDecoration = "none";
            klon.querySelector(".gammel_pris").style.color = "black";
        } else {
            klon.querySelector(".gammel_pris").style.fontWeight = "100";
            klon.querySelector(".gammel_pris").textContent = eBike.pris + " DKK";
            klon.querySelector(".ny_pris").textContent = eBike.ny_pris + " DKK";
        }


        //Giver hver klon en eventlistener, så jeg kan klikke og åbne singleview på hver af dem
        //De bliver sendt videre med deres ID, som er defineret i JSON filen
        klon.querySelector(".bike").addEventListener("click", () => {
            location.href = `cykel.html?id=${eBike.id}`;
        })

        //Skriver klonen ud i destinationen, når den er udfyldt, og kører så loopet igen
        dest.appendChild(klon);
    })


    document.querySelectorAll(".bike_img").forEach(billede => {
        billede.addEventListener("load", imgLoaded);
    })
}

function imgLoaded() {
    console.log("billede loaded");
    imgCount++;

    if (imgCount === eBikes.length) {
        console.log("Alle billeder loaded");
        document.querySelectorAll(".loader").forEach(loader => {
            loader.style.display = "none";
        })

    } else if (imgCount > eBikes.length) {
        document.querySelectorAll(".loader").forEach(loader => {
            loader.style.display = "none";
        })

    }

}

function sorter() {
    console.log("sorter");
    searchBar.value = "";
    if (this.value === "alpha") {
        sortAlpha();
    } else if (this.value === "priceDown") {
        sortPriceDown();
    } else if (this.value === "priceUp") {
        sortPriceUp();
    }
}


function sortAlpha() {
    console.log("Sort alphabetically")
    eBikes.sort((a, b) => {
        if (a.model > b.model) {
            return 1
        } else {
            return -1
        }
    })

    showBikes();
}

function sortPriceDown() {
    console.log("Sort price down");
    eBikes.sort((a, b) => {
        if (a.pris < b.pris) {
            return 1
        } else {
            return -1
        }
    })

    showBikes();
}

function sortPriceUp() {
    console.log("Sort price up");
    eBikes.sort((a, b) => {
        if (a.pris > b.pris) {
            return 1
        } else {
            return -1
        }
    })

    showBikes();
}
