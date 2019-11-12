  //Definerer variablen hvor alle vores posts kommer ind i et array
  let information;

  document.addEventListener("DOMContentLoaded", start);

  function start() {
      getJson();
  }

  async function getJson() {
      console.log("getJson");

      const url = "https://viktorkjeldal.dk/kea/2sem/kogacenter_cph/wordpress/wp-json/wp/v2/om-os/125";

      //Henter data i filen som er defineret ovenfor
      const jsonData = await fetch(url);

      //Indsætter dataen i mit array
      information = await jsonData.json();

      console.log(information);
      showInformation();
  }

  function showInformation() {
      console.log("showInformation");

      document.querySelector("#tekst_1").textContent = information.tekst_1;
      document.querySelector("#tekst_2").textContent = information.tekst_2;
  }
