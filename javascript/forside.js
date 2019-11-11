    //Definerer variablen hvor alle vores posts kommer ind i et array
    let bikes = [];

    let popBikes = [];

    //Definerer destinationen hvor hver article skal sættes ind
    const dest = document.querySelector("#pop");

    //Definerer templaten hvor som hver øl post skal følge
    const temp = document.querySelector("template");

    document.addEventListener("DOMContentLoaded", start);

    function start() {
        getJson();
    }

    async function getJson() {
        console.log("getJson");

        const url = "https://viktorkjeldal.dk/kea/2sem/kogacenter_cph/wordpress/wp-json/wp/v2/cykel?per_page=100";

        //Henter data i filen som er defineret ovenfor
        const jsonData = await fetch(url);

        //Indsætter dataen i mit array
        bikes = await jsonData.json();

        //Filtrerer hele arrayet med alle cykler fra wordpress, og laver et nyt array, kun med de populære cykler.
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
        popBikes = bikes.filter(popBike => popBike.pop == "1");

        shuffle(popBikes);
    }

    //Funktionen nedenfor "shuffler", altså blander arrayet, så rækkefølgen af cyklerne er forskellig hver gang.
    //https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }

        //Sætter "længden" af arrayet til 3, dvs at der er kun er 3 cykler med i arrayet
        popBikes.length = 3;
        showBikes();
    }

    function showBikes() {
        console.log("SHOWBIKES");
        //For hvert array objekt skriver jeg dataen ind i en template
        popBikes.forEach(popBike => {
            const klon = temp.cloneNode(true).content;

            klon.querySelector(".bike_img").src = popBike.billede.guid;
            klon.querySelector(".bike_img").alt = popBike.alt_tag;
            klon.querySelector(".model").textContent = popBike.model;
            klon.querySelector(".kort").textContent = popBike.kort;

            if (popBike.ny_pris == "") {
                klon.querySelector(".gammel_pris").textContent = popBike.pris + " DKK";
                klon.querySelector(".gammel_pris").style.textDecoration = "none";
                klon.querySelector(".gammel_pris").style.color = "black";
            } else {
                klon.querySelector(".gammel_pris").style.fontWeight = "100";
                klon.querySelector(".gammel_pris").textContent = popBike.pris + " DKK";
                klon.querySelector(".ny_pris").textContent = popBike.ny_pris + " DKK";
            }


            //Giver hver klon en eventlistener, så jeg kan klikke og åbne singleview på hver af dem
            //De bliver sendt videre med deres ID, som er defineret i JSON filen
            klon.querySelector(".bike").addEventListener("click", () => {
                location.href = `cykel.html?id=${popBike.id}`;
            })

            //Skriver klonen ud i destinationen, når den er udfyldt, og kører så loopet igen
            dest.appendChild(klon);
        })
    }
