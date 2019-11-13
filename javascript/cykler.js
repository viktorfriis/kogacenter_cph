  //Definerer variablen hvor alle vores posts kommer ind i et array
  let bikes = [];

  let kategori = "alle";

  //Definerer destinationen hvor hver article skal sættes ind
  const dest = document.querySelector(".bikes");

  //Definerer templaten hvor som hver øl post skal følge
  const temp = document.querySelector("template");

  const searchBar = document.querySelector("#search_bar");

  document.addEventListener("DOMContentLoaded", start);

  function start() {
      getJson();
      search();
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
      dest.innerHTML = "";
      //For hvert array objekt skriver jeg dataen ind i en template
      bikes.forEach(bike => {

          if (kategori == "alle" || kategori == bike.kategori) {

              const klon = temp.cloneNode(true).content;

              klon.querySelector(".bike_img").src = bike.billede.guid;
              klon.querySelector(".bike_img").alt = bike.alt_tag;
              klon.querySelector(".model").textContent = bike.model;
              klon.querySelector(".kort").textContent = bike.kort;

              if (bike.ny_pris == "") {
                  klon.querySelector(".gammel_pris").textContent = bike.pris + " DKK";
                  klon.querySelector(".gammel_pris").style.textDecoration = "none";
                  klon.querySelector(".gammel_pris").style.color = "black";
              } else {
                  klon.querySelector(".gammel_pris").style.fontWeight = "100";
                  klon.querySelector(".gammel_pris").textContent = bike.pris + " DKK";
                  klon.querySelector(".ny_pris").textContent = bike.ny_pris + " DKK";
              }

              //Giver hver klon en eventlistener, så jeg kan klikke og åbne singleview på hver af dem
              //De bliver sendt videre med deres ID, som er defineret i JSON filen
              klon.querySelector(".bike").addEventListener("click", () => {
                  location.href = `cykel.html?id=${bike.id}`;
              })

              //Skriver klonen ud i destinationen, når den er udfyldt, og kører så loopet igen
              dest.appendChild(klon);

          }
      })
      document.querySelector("#sorter").addEventListener("change", sorter);
      document.querySelector("#kategori_sorter").addEventListener("change", sorter);
  }

  function search() {
      searchBar.addEventListener("keyup", function (e) {
          console.log("key up");

          const term = e.target.value.toLowerCase();
          const eachBike = document.querySelectorAll(".bike");
          const cykler = document.querySelectorAll(".bike");
          console.log(cykler);

          Array.from(cykler).forEach(cykel => {
              console.log(cykler);
              console.log("for each");
              const title = cykel.querySelector("h2").firstChild.textContent;

              if (title.toLowerCase().indexOf(term) != -1) {
                  cykel.style.display = "block";

              } else {
                  cykel.style.display = "none";

              }
          })
      })
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
      } else if (this.value === "oCity") {
          sortCity();
      } else if (this.value === "oRace") {
          sortRace();
      } else if (this.value === "oEl") {
          sortEl();
      } else if (this.value === "oTrek") {
          sortTrek();
      }
  }


  function sortAlpha() {
      console.log("Sort alphabetically")
      bikes.sort((a, b) => {
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
      bikes.sort((a, b) => {
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
      bikes.sort((a, b) => {
          if (a.pris > b.pris) {
              return 1
          } else {
              return -1
          }
      })

      showBikes();
  }

  function sortCity() {
      console.log("sort city");

      kategori = "City & Touring";

      showBikes();
  }

  function sortRace() {
      console.log("sort race");

      kategori = "Race";

      showBikes();
  }

  function sortEl() {
      console.log("sort el");

      kategori = "E-bike";

      showBikes();
  }

  function sortTrek() {
      console.log("sort trek");

      kategori = "Trekking";

      showBikes();
  }
