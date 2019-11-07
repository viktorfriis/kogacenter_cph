  //Definerer variablen hvor alle vores posts kommer ind i et array
  let bikes = [];

  //Definerer destinationen hvor hver article skal sættes ind
  const dest = document.querySelector(".bikes");

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

      console.log(bikes);
      showBikes();
  }

  function showBikes() {
      console.log("SHOWBIKES");
      //For hvert array objekt skriver jeg dataen ind i en template
      bikes.forEach(bike => {

          const klon = temp.cloneNode(true).content;

          klon.querySelector(".bike_img").src = bike.billede.guid;
          klon.querySelector(".bike_img").alt = bike.alt_tag;
          klon.querySelector(".model").textContent = bike.model;
          klon.querySelector(".kort").textContent = bike.kort;
          klon.querySelector(".pris").textContent = bike.pris + " DKK";

          //Giver hver klon en eventlistener, så jeg kan klikke og åbne singleview på hver af dem
          //De bliver sendt videre med deres ID, som er defineret i JSON filen
          klon.querySelector(".bike").addEventListener("click", () => {
              location.href = `cykel.html?id=${bike.id}`;
          })

          //Skriver klonen ud i destinationen, når den er udfyldt, og kører så loopet igen
          dest.appendChild(klon);

      })
  }
